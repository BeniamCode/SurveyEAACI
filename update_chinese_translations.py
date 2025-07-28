#!/usr/bin/env python3
"""
Script to update Chinese translations in zh-tw.json using CSV files as the source of truth.
"""

import json
import csv
import os
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

def load_dictionary():
    """Load the dictionary mapping from dictionary.json"""
    with open(DICTIONARY_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def load_chinese_json():
    """Load the current Chinese JSON file"""
    with open(CHINESE_JSON_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_translations_from_csvs():
    """Extract Chinese translations from all CSV files using CODE as key"""
    translations = {}
    
    for csv_file in CSV_FILES:
        print(f"Processing {csv_file}")
        
        with open(csv_file, 'r', encoding='utf-8') as f:
            reader = csv.reader(f)
            headers = next(reader)  # Read header row
            
            # Find column indices
            try:
                code_idx = headers.index('CODE')
                en_idx = headers.index('EN') 
                tc_idx = headers.index('TC')  # Traditional Chinese
            except ValueError as e:
                print(f"Missing column in {csv_file}: {e}")
                continue
            
            # Extract translations
            for row_num, row in enumerate(reader, start=2):
                if len(row) > max(code_idx, en_idx, tc_idx):
                    code = row[code_idx].strip()
                    english = row[en_idx].strip()
                    chinese = row[tc_idx].strip()
                    
                    if code and chinese:  # Only include rows with both code and Chinese
                        translations[code] = {
                            'english': english,
                            'chinese': chinese
                        }
                        print(f"  {code}: {english} -> {chinese}")
    
    return translations

def set_nested_value(data, path, value):
    """Set a value in nested dictionary using dot notation path"""
    keys = path.split('.')
    current = data
    
    # Navigate to the parent of the target key
    for key in keys[:-1]:
        if key not in current:
            current[key] = {}
        current = current[key]
    
    # Set the value
    current[keys[-1]] = value

def update_chinese_json(csv_translations, dictionary_mapping, chinese_data):
    """Update Chinese JSON data using CSV translations and dictionary mapping"""
    updated_count = 0
    
    for code, json_path in dictionary_mapping['mapping'].items():
        if code in csv_translations:
            chinese_text = csv_translations[code]['chinese']
            if chinese_text:  # Only update if Chinese translation exists
                set_nested_value(chinese_data, json_path, chinese_text)
                print(f"Updated {json_path}: {chinese_text}")
                updated_count += 1
            else:
                print(f"Warning: No Chinese translation for {code}")
        else:
            print(f"Warning: Code {code} not found in CSV files")
    
    return updated_count

def save_chinese_json(chinese_data):
    """Save the updated Chinese JSON file"""
    with open(CHINESE_JSON_FILE, 'w', encoding='utf-8') as f:
        json.dump(chinese_data, f, ensure_ascii=False, indent=2)

def main():
    print("Starting Chinese translation update process...")
    
    # Load files
    print("\n1. Loading dictionary mapping...")
    dictionary = load_dictionary()
    
    print("\n2. Loading current Chinese JSON...")
    chinese_data = load_chinese_json()
    
    print("\n3. Extracting translations from CSV files...")
    csv_translations = extract_translations_from_csvs()
    
    print(f"\nFound {len(csv_translations)} translations in CSV files")
    
    print("\n4. Updating Chinese JSON with CSV translations...")
    updated_count = update_chinese_json(csv_translations, dictionary, chinese_data)
    
    print(f"\n5. Saving updated Chinese JSON file...")
    save_chinese_json(chinese_data)
    
    print(f"\nCompleted! Updated {updated_count} translations.")
    print("Chinese translations have been updated using CSV files as source of truth.")

if __name__ == "__main__":
    main()