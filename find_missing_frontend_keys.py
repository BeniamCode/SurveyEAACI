#!/usr/bin/env python3
"""
Script to find translation keys used in frontend but missing from en.json
"""

import json
import re
import os
from pathlib import Path

def read_json_file(file_path):
    """Read JSON file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return {}

def get_nested_value(data, path):
    """Get value from nested dictionary using dot notation path"""
    keys = path.split('.')
    current = data
    try:
        for key in keys:
            current = current[key]
        return current
    except (KeyError, TypeError):
        return None

def find_translation_keys_in_file(file_path):
    """Find all t('...') translation keys in a file"""
    keys = set()
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            # Find all t('...') and t("...") patterns
            patterns = [
                r"t\(['\"]([^'\"]+)['\"]",  # t('key') or t("key")
                r"t\(`([^`]+)`",           # t(`key`)
            ]
            
            for pattern in patterns:
                matches = re.findall(pattern, content)
                for match in matches:
                    # Handle template literals with variables
                    if '${' not in match:  # Skip template literals with variables
                        keys.add(match)
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
    
    return keys

def scan_frontend_files():
    """Scan all frontend files for translation keys"""
    frontend_keys = set()
    
    # Define directories to scan
    src_dirs = ['src/components', 'src/pages', 'src/utils']
    
    for src_dir in src_dirs:
        if os.path.exists(src_dir):
            for root, dirs, files in os.walk(src_dir):
                for file in files:
                    if file.endswith(('.tsx', '.ts', '.jsx', '.js')):
                        file_path = os.path.join(root, file)
                        keys = find_translation_keys_in_file(file_path)
                        frontend_keys.update(keys)
    
    return frontend_keys

def main():
    print("Finding translation keys used in frontend but missing from en.json...")
    print("=" * 70)
    
    # Read English translations
    en_translations = read_json_file("src/locales/en.json")
    
    # Find all translation keys used in frontend
    frontend_keys = scan_frontend_files()
    
    print(f"Found {len(frontend_keys)} unique translation keys in frontend")
    print()
    
    # Check which keys are missing
    missing_keys = []
    existing_keys = []
    
    for key in sorted(frontend_keys):
        value = get_nested_value(en_translations, key)
        if value is None:
            missing_keys.append(key)
        else:
            existing_keys.append(key)
    
    if missing_keys:
        print(f"❌ Missing {len(missing_keys)} translation keys in en.json:")
        print("-" * 50)
        for key in missing_keys:
            print(f"  - {key}")
        print()
    
    print(f"✅ Found {len(existing_keys)} existing translation keys")
    
    # Group missing keys by category for easier fixing
    if missing_keys:
        print("\nMissing keys grouped by category:")
        print("-" * 40)
        
        categories = {}
        for key in missing_keys:
            category = key.split('.')[0] + '.' + key.split('.')[1] if '.' in key else 'root'
            if category not in categories:
                categories[category] = []
            categories[category].append(key)
        
        for category, keys in sorted(categories.items()):
            print(f"\n{category.upper()}:")
            for key in keys:
                print(f"  - {key}")

if __name__ == "__main__":
    main()