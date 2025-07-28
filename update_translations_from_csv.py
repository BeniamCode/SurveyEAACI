#!/usr/bin/env python3
"""
Script to update zh-tw.json translations from CSV files.
This script matches English translations in en.json with CSV entries
and updates the corresponding Chinese translations in zh-tw.json.
"""

import json
import csv
import sys
import os
from pathlib import Path


def load_json(file_path):
    """Load JSON file and return the data."""
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def save_json(file_path, data):
    """Save data to JSON file with proper formatting."""
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def load_csv_translations(csv_path):
    """
    Load CSV and create a mapping of English -> Chinese translations.
    Returns a dictionary where keys are English text and values are Chinese text.
    """
    translations = {}
    
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        headers = next(reader)
        
        # Find the indices for EN and TC (Traditional Chinese) columns
        en_idx = None
        tc_idx = None
        
        for i, header in enumerate(headers):
            if header == 'EN':
                en_idx = i
            elif header == 'TC':
                tc_idx = i
        
        if en_idx is None or tc_idx is None:
            raise ValueError("Could not find EN or TC columns in CSV")
        
        # Read all rows and build translation mapping
        for row in reader:
            if len(row) > max(en_idx, tc_idx):
                en_text = row[en_idx].strip()
                tc_text = row[tc_idx].strip()
                
                # Only add non-empty translations
                if en_text and tc_text:
                    translations[en_text] = tc_text
    
    return translations


def find_and_update_translations(obj, en_obj, translations, path=""):
    """
    Recursively find matching English text in en_obj and update corresponding
    values in obj with Chinese translations from the translations mapping.
    """
    if isinstance(obj, dict) and isinstance(en_obj, dict):
        for key in obj:
            if key in en_obj:
                new_path = f"{path}.{key}" if path else key
                find_and_update_translations(obj[key], en_obj[key], translations, new_path)
    
    elif isinstance(obj, list) and isinstance(en_obj, list):
        for i in range(min(len(obj), len(en_obj))):
            new_path = f"{path}[{i}]"
            find_and_update_translations(obj[i], en_obj[i], translations, new_path)
    
    elif isinstance(en_obj, str):
        # Check if this English text has a translation
        if en_obj in translations:
            # Update the parent object with the Chinese translation
            # We need to return the new value up the call stack
            return translations[en_obj]
    
    return obj


def update_nested_value(obj, path_parts, value):
    """Update a nested value in an object given a path."""
    current = obj
    for i, part in enumerate(path_parts[:-1]):
        if part.endswith(']'):
            # Handle array index
            key = part[:part.index('[')]
            index = int(part[part.index('[')+1:-1])
            if key:
                current = current[key][index]
            else:
                current = current[index]
        else:
            current = current[part]
    
    # Set the final value
    final_key = path_parts[-1]
    if final_key.endswith(']'):
        key = final_key[:final_key.index('[')]
        index = int(final_key[final_key.index('[')+1:-1])
        if key:
            current[key][index] = value
        else:
            current[index] = value
    else:
        current[final_key] = value


def update_translations_smart(zh_data, en_data, translations):
    """
    Update zh_data with translations by matching structure with en_data.
    """
    updates = []
    
    def collect_updates(zh_obj, en_obj, path=""):
        if isinstance(zh_obj, dict) and isinstance(en_obj, dict):
            for key in zh_obj:
                if key in en_obj:
                    new_path = f"{path}.{key}" if path else key
                    collect_updates(zh_obj[key], en_obj[key], new_path)
        
        elif isinstance(zh_obj, list) and isinstance(en_obj, list):
            for i in range(min(len(zh_obj), len(en_obj))):
                new_path = f"{path}[{i}]"
                collect_updates(zh_obj[i], en_obj[i], new_path)
        
        elif isinstance(en_obj, str) and isinstance(zh_obj, str):
            # Check if this English text has a translation
            if en_obj in translations:
                updates.append((path, translations[en_obj]))
    
    # Collect all updates
    collect_updates(zh_data, en_data)
    
    # Apply updates
    for path, value in updates:
        path_parts = path.replace('[', '.').replace(']', ']').split('.')
        update_nested_value(zh_data, path_parts, value)
    
    return len(updates)


def main():
    if len(sys.argv) < 2:
        print("Usage: python update_translations_from_csv.py <csv_file>")
        print("Example: python update_translations_from_csv.py blocks/block001.csv")
        sys.exit(1)
    
    csv_file = sys.argv[1]
    
    # Set up file paths
    script_dir = Path(__file__).parent
    locales_dir = script_dir / "src" / "locales"
    en_json_path = locales_dir / "en.json"
    zh_json_path = locales_dir / "zh-tw.json"
    csv_path = script_dir / csv_file
    
    # Verify files exist
    if not csv_path.exists():
        print(f"Error: CSV file not found: {csv_path}")
        sys.exit(1)
    
    if not en_json_path.exists():
        print(f"Error: English JSON file not found: {en_json_path}")
        sys.exit(1)
    
    if not zh_json_path.exists():
        print(f"Error: Chinese JSON file not found: {zh_json_path}")
        sys.exit(1)
    
    try:
        # Load files
        print(f"Loading {en_json_path}...")
        en_data = load_json(en_json_path)
        
        print(f"Loading {zh_json_path}...")
        zh_data = load_json(zh_json_path)
        
        print(f"Loading translations from {csv_path}...")
        translations = load_csv_translations(csv_path)
        print(f"Found {len(translations)} translations in CSV")
        
        # Create backup
        backup_path = zh_json_path.with_suffix('.json.bak')
        print(f"Creating backup at {backup_path}...")
        save_json(backup_path, zh_data)
        
        # Update translations
        print("Updating translations...")
        update_count = update_translations_smart(zh_data, en_data, translations)
        
        # Save updated file
        print(f"Saving updated translations to {zh_json_path}...")
        save_json(zh_json_path, zh_data)
        
        print(f"\nSuccess! Updated {update_count} translations.")
        print(f"Backup saved to: {backup_path}")
        
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()