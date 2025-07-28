#!/usr/bin/env python3
"""
Script to refactor all language JSON files based on refactor-map.json.
This script will:
1. Merge duplicate keys into common keys
2. Rename keys to more descriptive names
3. Apply structural changes like shared interval choices
"""

import json
import sys
from pathlib import Path
from copy import deepcopy


def load_json(file_path):
    """Load JSON file and return the data."""
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def save_json(file_path, data):
    """Save data to JSON file with proper formatting."""
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


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


def delete_nested_value(obj, path):
    """Delete a value from a nested object using a dot-notation path."""
    keys = path.split('.')
    current = obj
    
    # Navigate to the parent of the target
    for key in keys[:-1]:
        if isinstance(current, dict) and key in current:
            current = current[key]
        else:
            return  # Path doesn't exist
    
    # Delete the final key
    if isinstance(current, dict) and keys[-1] in current:
        del current[keys[-1]]


def clean_empty_dicts(obj):
    """Recursively remove empty dictionaries."""
    if not isinstance(obj, dict):
        return obj
    
    # Clean nested dictionaries first
    for key in list(obj.keys()):
        obj[key] = clean_empty_dicts(obj[key])
        # Remove empty dictionaries
        if isinstance(obj[key], dict) and not obj[key]:
            del obj[key]
    
    return obj


def refactor_language_file(lang_data, refactor_map, en_data):
    """Refactor a language file according to the refactor map."""
    # Create a copy to work with
    new_data = {}
    
    # First, copy the structure from en.json (already refactored)
    # This ensures we have the correct structure
    for key in en_data:
        if key not in ['foodItems', 'foodCategories']:  # These we'll handle specially
            new_data[key] = deepcopy(en_data[key])
    
    # Handle key merges
    for new_key, merge_info in refactor_map['key_merges'].items():
        if new_key == 'documentation':
            continue
            
        # Find the first non-null value from the old keys
        value = None
        for old_key in merge_info['replaces']:
            old_value = get_nested_value(lang_data, old_key)
            if old_value is not None:
                value = old_value
                break
        
        # Set the value in the new structure
        if value is not None:
            set_nested_value(new_data, new_key, value)
    
    # Handle key renames
    for new_key, old_key_info in refactor_map['key_renames'].items():
        if new_key == 'documentation':
            continue
            
        # For key renames, the value is the CSV code
        old_key = None
        
        # Find the old key by searching through lang_data
        # We need to map from CSV code to actual key path
        if old_key_info.startswith('str'):
            # Interface strings
            for k, v in lang_data.get('survey', {}).get('interface', {}).items():
                if k == old_key_info:
                    old_key = f'survey.interface.{k}'
                    break
        elif old_key_info.startswith('q'):
            # Question-related keys
            # These are more complex, need to handle differently
            pass
        
        # For now, let's use the existing structure
        old_value = get_nested_value(lang_data, new_key)
        if old_value is not None:
            set_nested_value(new_data, new_key, old_value)
    
    # Handle structural changes
    
    # 1. Interval choices - consolidate from q15-q18
    interval_choices = {}
    for q_num in ['15', '16', '17', '18']:
        q_key = f'survey.questions.q{q_num}.choices'
        choices = get_nested_value(lang_data, q_key)
        if choices:
            # Map old choice keys to new standardized keys
            if '1_day' in choices:
                interval_choices['d1'] = choices['1_day']
            if '1_3_days' in choices:
                interval_choices['d1_3'] = choices['1_3_days']
            if 'more_3_days' in choices:
                interval_choices['d_gt3'] = choices['more_3_days']
            break  # Use the first one we find
    
    if interval_choices:
        set_nested_value(new_data, 'survey.questions.interval_choices', interval_choices)
    
    # 2. Q9 elaborate - consolidate from q9a and q9b
    q9_elaborate = get_nested_value(lang_data, 'survey.questions.q9a.elaborate')
    if not q9_elaborate:
        q9_elaborate = get_nested_value(lang_data, 'survey.questions.q9b.elaborate')
    
    if q9_elaborate:
        set_nested_value(new_data, 'survey.questions.q9_elaborate', q9_elaborate)
    
    # Copy over other important sections
    # Questions
    if 'survey' in lang_data and 'questions' in lang_data['survey']:
        for q_key, q_data in lang_data['survey']['questions'].items():
            new_path = f'survey.questions.{q_key}'
            existing = get_nested_value(new_data, new_path)
            if existing is None:
                set_nested_value(new_data, new_path, q_data)
            else:
                # Merge with existing structure
                if isinstance(q_data, dict) and isinstance(existing, dict):
                    for k, v in q_data.items():
                        if k not in existing:
                            existing[k] = v
    
    # Food categories and items
    if 'foodCategories' in lang_data:
        new_data['foodCategories'] = lang_data['foodCategories']
    
    if 'foodItems' in lang_data:
        new_data['foodItems'] = lang_data['foodItems']
    
    # Clean up empty dictionaries
    new_data = clean_empty_dicts(new_data)
    
    return new_data


def main():
    # Set up paths
    script_dir = Path(__file__).parent
    locales_dir = script_dir / "src" / "locales"
    refactor_map_path = locales_dir / "refactor-map.json"
    en_path = locales_dir / "en.json"
    
    # Load refactor map and English file (already refactored)
    print("Loading refactor map...")
    refactor_map = load_json(refactor_map_path)
    
    print("Loading English reference...")
    en_data = load_json(en_path)
    
    # Get all language files to refactor
    lang_files = [
        'de.json', 'el.json', 'es.json', 'fr.json', 
        'it.json', 'nl.json', 'pl.json', 'pt.json', 
        'ro.json', 'zh-tw.json'
    ]
    
    for lang_file in lang_files:
        lang_path = locales_dir / lang_file
        if not lang_path.exists():
            print(f"Skipping {lang_file} - file not found")
            continue
        
        print(f"\nProcessing {lang_file}...")
        
        # Create backup
        backup_path = lang_path.with_suffix('.json.bak')
        lang_data = load_json(lang_path)
        save_json(backup_path, lang_data)
        print(f"  Created backup: {backup_path}")
        
        # Refactor the file
        try:
            new_data = refactor_language_file(lang_data, refactor_map, en_data)
            
            # Save the refactored file
            save_json(lang_path, new_data)
            print(f"  ✓ Refactored successfully")
            
        except Exception as e:
            print(f"  ✗ Error refactoring {lang_file}: {e}")
            # Restore from backup
            save_json(lang_path, lang_data)
            print(f"  Restored from backup due to error")
    
    print("\nRefactoring complete!")
    print("\nNext steps:")
    print("1. Review the refactored files to ensure translations are preserved")
    print("2. Update your application code to use the new key structure")
    print("3. Run the update_translations_with_dictionary.py script with the updated dictionary.json")


if __name__ == "__main__":
    main()