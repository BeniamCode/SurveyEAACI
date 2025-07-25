#!/usr/bin/env python3
"""
Script to update translations in any language JSON file using CSV files and the dictionary mapping.
This script uses dictionary.json to map CSV codes to JSON paths for accurate translation updates.
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


def load_csv_translations(csv_path, language_code):
    """
    Load CSV and create a mapping of code -> translation for the specified language.
    Returns a dictionary where keys are codes and values are translations.
    """
    translations = {}
    
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        headers = next(reader)
        
        # Find the indices for CODE and the target language column
        code_idx = None
        lang_idx = None
        
        for i, header in enumerate(headers):
            if header == 'CODE':
                code_idx = i
            elif header == language_code.upper():
                lang_idx = i
        
        if code_idx is None:
            raise ValueError("Could not find CODE column in CSV")
        if lang_idx is None:
            raise ValueError(f"Could not find {language_code.upper()} column in CSV")
        
        # Read all rows and build translation mapping
        for row in reader:
            if len(row) > max(code_idx, lang_idx):
                code = row[code_idx].strip()
                translation = row[lang_idx].strip()
                
                # Only add non-empty translations
                if code and translation:
                    translations[code] = translation
    
    return translations


def get_nested_value(obj, path):
    """Get a value from a nested object using a dot-notation path."""
    keys = path.split('.')
    current = obj
    
    for key in keys:
        if isinstance(current, dict) and key in current:
            current = current[key]
        else:
            return None
    
    return current


def set_nested_value(obj, path, value):
    """Set a value in a nested object using a dot-notation path."""
    keys = path.split('.')
    current = obj
    
    # Navigate to the parent of the target
    for key in keys[:-1]:
        if key not in current:
            current[key] = {}
        current = current[key]
    
    # Set the final value
    current[keys[-1]] = value


def update_translations_with_dictionary(target_data, translations, dictionary):
    """
    Update target_data with translations using the dictionary mapping.
    """
    updates = []
    
    # Go through each mapping in the dictionary
    for code, json_path in dictionary['mapping'].items():
        if code in translations:
            # Get the translation for this code
            translation = translations[code]
            
            # Update the value at the JSON path
            try:
                set_nested_value(target_data, json_path, translation)
                updates.append((code, json_path, translation))
            except Exception as e:
                print(f"Warning: Could not update {json_path} with {code}: {e}")
    
    return len(updates)


def main():
    if len(sys.argv) < 3:
        print("Usage: python update_translations_with_dictionary.py <csv_file> <language_code>")
        print("Example: python update_translations_with_dictionary.py blocks/block001.csv zh-tw")
        print("Language codes: el, pl, it, es, de, pt, nl, fr, ro, tc (for zh-tw)")
        sys.exit(1)
    
    csv_file = sys.argv[1]
    language_code = sys.argv[2]
    
    # Map TC to zh-tw for file naming
    json_language = 'zh-tw' if language_code.lower() == 'tc' else language_code.lower()
    
    # Set up file paths
    script_dir = Path(__file__).parent
    locales_dir = script_dir / "src" / "locales"
    dictionary_path = locales_dir / "dictionary.json"
    target_json_path = locales_dir / f"{json_language}.json"
    csv_path = script_dir / csv_file
    
    # Verify files exist
    if not csv_path.exists():
        print(f"Error: CSV file not found: {csv_path}")
        sys.exit(1)
    
    if not dictionary_path.exists():
        print(f"Error: Dictionary file not found: {dictionary_path}")
        sys.exit(1)
    
    if not target_json_path.exists():
        print(f"Error: Target JSON file not found: {target_json_path}")
        sys.exit(1)
    
    try:
        # Load files
        print(f"Loading dictionary from {dictionary_path}...")
        dictionary = load_json(dictionary_path)
        
        print(f"Loading {target_json_path}...")
        target_data = load_json(target_json_path)
        
        print(f"Loading translations from {csv_path} for language {language_code.upper()}...")
        translations = load_csv_translations(csv_path, language_code)
        print(f"Found {len(translations)} translations in CSV")
        
        # Create backup
        backup_path = target_json_path.with_suffix('.json.bak')
        print(f"Creating backup at {backup_path}...")
        save_json(backup_path, target_data)
        
        # Update translations
        print("Updating translations...")
        update_count = update_translations_with_dictionary(target_data, translations, dictionary)
        
        # Save updated file
        print(f"Saving updated translations to {target_json_path}...")
        save_json(target_json_path, target_data)
        
        print(f"\nSuccess! Updated {update_count} translations.")
        print(f"Backup saved to: {backup_path}")
        
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()