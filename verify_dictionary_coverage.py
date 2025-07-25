#!/usr/bin/env python3
"""
Script to verify that all codes from block001.csv, block002.csv, and block003.csv
are present in dictionary.json
"""

import pandas as pd
import json
import sys
from pathlib import Path

def read_csv_codes(file_path):
    """Read CSV file and extract all codes from the CODE column"""
    try:
        df = pd.read_csv(file_path)
        # Get codes from CODE column, excluding empty/NaN values
        codes = df['CODE'].dropna().astype(str).tolist()
        # Remove empty strings and whitespace-only entries
        codes = [code.strip() for code in codes if code.strip()]
        return codes
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return []

def read_dictionary_json(file_path):
    """Read dictionary.json and extract all codes from mapping"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return list(data.get('mapping', {}).keys())
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return []

def main():
    # File paths
    block001_path = "src/blocks/block001.csv"
    block002_path = "src/blocks/block002.csv" 
    block003_path = "src/blocks/block003.csv"
    dictionary_path = "src/locales/dictionary.json"
    
    print("Verifying dictionary.json coverage for all CSV blocks...")
    print("=" * 60)
    
    # Read all CSV codes
    block001_codes = read_csv_codes(block001_path)
    block002_codes = read_csv_codes(block002_path)
    block003_codes = read_csv_codes(block003_path)
    
    # Combine all CSV codes
    all_csv_codes = set(block001_codes + block002_codes + block003_codes)
    
    # Read dictionary codes
    dictionary_codes = set(read_dictionary_json(dictionary_path))
    
    print(f"Total codes found in CSV files: {len(all_csv_codes)}")
    print(f"Total codes found in dictionary.json: {len(dictionary_codes)}")
    print()
    
    # Find missing codes (in CSV but not in dictionary)
    missing_codes = all_csv_codes - dictionary_codes
    
    # Find extra codes (in dictionary but not in CSV)
    extra_codes = dictionary_codes - all_csv_codes
    
    if missing_codes:
        print("❌ MISSING CODES in dictionary.json:")
        print("-" * 40)
        for code in sorted(missing_codes):
            print(f"  - {code}")
        print()
    else:
        print("✅ All CSV codes are present in dictionary.json")
        print()
    
    if extra_codes:
        print("ℹ️  EXTRA CODES in dictionary.json (not in CSV files):")
        print("-" * 50)
        for code in sorted(extra_codes):
            print(f"  - {code}")
        print()
    
    # Summary by block
    print("Summary by block:")
    print("-" * 20)
    
    block001_set = set(block001_codes)
    block002_set = set(block002_codes)
    block003_set = set(block003_codes)
    
    missing_from_001 = block001_set - dictionary_codes
    missing_from_002 = block002_set - dictionary_codes
    missing_from_003 = block003_set - dictionary_codes
    
    print(f"Block001: {len(block001_codes)} codes, {len(missing_from_001)} missing")
    if missing_from_001:
        print(f"  Missing: {sorted(missing_from_001)}")
    
    print(f"Block002: {len(block002_codes)} codes, {len(missing_from_002)} missing")
    if missing_from_002:
        print(f"  Missing: {sorted(missing_from_002)}")
    
    print(f"Block003: {len(block003_codes)} codes, {len(missing_from_003)} missing")
    if missing_from_003:
        print(f"  Missing: {sorted(missing_from_003)}")
    
    print()
    if missing_codes:
        print(f"❌ VERIFICATION FAILED: {len(missing_codes)} codes are missing from dictionary.json")
        return 1
    else:
        print("✅ VERIFICATION PASSED: All CSV codes are present in dictionary.json")
        return 0

if __name__ == "__main__":
    sys.exit(main())