#!/usr/bin/env python3
"""
Script to verify that all translations in the JSON are correctly aligned with CSV sources.
"""

import json
import csv
from pathlib import Path

# File paths
BASE_DIR = Path("/Users/beniam/Documents/LOMI/astro-antd-survey")
CSV_FILES = [
    BASE_DIR / "src/blocks/block001.csv",
    BASE_DIR / "src/blocks/block002.csv", 
    BASE_DIR / "src/blocks/block003.csv"
]
DICTIONARY_FILE = BASE_DIR / "src/locales/dictionary.json"
CHINESE_JSON_FILE = BASE_DIR / "src/locales/zh-tw.json"

def load_files():
    """Load all necessary files"""
    with open(DICTIONARY_FILE, 'r', encoding='utf-8') as f:
        dictionary = json.load(f)
    
    with open(CHINESE_JSON_FILE, 'r', encoding='utf-8') as f:
        chinese_data = json.load(f)
    
    return dictionary, chinese_data

def extract_csv_translations():
    """Extract all Chinese translations from CSV files"""
    translations = {}
    
    for csv_file in CSV_FILES:
        with open(csv_file, 'r', encoding='utf-8') as f:
            reader = csv.reader(f)
            headers = next(reader)
            
            try:
                code_idx = headers.index('CODE')
                en_idx = headers.index('EN') 
                tc_idx = headers.index('TC')
            except ValueError:
                continue
            
            for row in reader:
                if len(row) > max(code_idx, en_idx, tc_idx):
                    code = row[code_idx].strip()
                    english = row[en_idx].strip()
                    chinese = row[tc_idx].strip()
                    
                    if code and chinese:
                        translations[code] = {
                            'english': english,
                            'chinese': chinese
                        }
    
    return translations

def get_nested_value(data, path):
    """Get a value from nested dictionary using dot notation"""
    keys = path.split('.')
    current = data
    
    for key in keys:
        if key not in current:
            return None
        current = current[key]
    
    return current

def main():
    print("Verifying Chinese translations alignment with CSV sources...")
    
    # Load files
    dictionary, chinese_data = load_files()
    csv_translations = extract_csv_translations()
    
    print(f"\nFound {len(csv_translations)} translations in CSV files")
    print(f"Found {len(dictionary['mapping'])} mappings in dictionary")
    
    # Verify each mapping
    correct_count = 0
    missing_count = 0
    incorrect_count = 0
    
    print("\n=== VERIFICATION RESULTS ===")
    
    for code, json_path in dictionary['mapping'].items():
        json_value = get_nested_value(chinese_data, json_path)
        
        if code in csv_translations:
            csv_chinese = csv_translations[code]['chinese']
            
            if json_value == csv_chinese:
                correct_count += 1
                print(f"✓ {code}: CORRECT")
            else:
                incorrect_count += 1
                print(f"✗ {code}: MISMATCH")
                print(f"    JSON: {json_value}")
                print(f"    CSV:  {csv_chinese}")
                print(f"    Path: {json_path}")
        else:
            # Check if we have a value in JSON (might be manual addition)
            if json_value:
                missing_count += 1
                print(f"! {code}: MISSING FROM CSV (but has JSON value)")
                print(f"    JSON: {json_value}")
                print(f"    Path: {json_path}")
            else:
                missing_count += 1
                print(f"! {code}: MISSING FROM BOTH CSV AND JSON")
                print(f"    Path: {json_path}")
    
    print(f"\n=== SUMMARY ===")
    print(f"Correct matches: {correct_count}")
    print(f"Incorrect matches: {incorrect_count}")
    print(f"Missing from CSV: {missing_count}")
    print(f"Total mappings: {len(dictionary['mapping'])}")
    
    if incorrect_count == 0:
        print("\n🎉 All translations are correctly aligned with CSV sources!")
    else:
        print(f"\n⚠️  {incorrect_count} translations need attention.")

if __name__ == "__main__":
    main()