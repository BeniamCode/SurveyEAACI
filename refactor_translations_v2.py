#!/usr/bin/env python3
"""
Script to refactor all language JSON files based on refactor-map.json.
This version properly maps translations from old structure to new structure.
"""

import json
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


def create_base_structure():
    """Create the base structure matching the refactored en.json."""
    return {
        "title": "",
        "introduction": {
            "description": "",
            "duration": "",
            "passwordPrompt": "",
            "continue": "",
            "extraHeader": "",
            "errors": {
                "incorrectPassword": ""
            }
        },
        "survey": {
            "thanks": "",
            "basicInfo": "",
            "submit": "",
            "pages": {
                "complementary_feeding": {
                    "title": ""
                }
            },
            "interface": {
                "dragDrop": {
                    "desktop": "",
                    "mobile": ""
                },
                "foodPicker": {
                    "lowRiskLabel": "",
                    "highRiskLabel": "",
                    "adviceLabel": ""
                },
                "mobileVersion": {
                    "lowRisk": "",
                    "highRisk": ""
                },
                "timeline": {
                    "birth": ""
                },
                "errors": {
                    "duplicateItem": ""
                }
            },
            "questions": {}
        },
        "foodCategories": {},
        "foodItems": {},
        "common": {
            "yes": "",
            "no": "",
            "other": "",
            "placeholders": {
                "specify": "",
                "explain": "",
                "define": ""
            },
            "time": {
                "month_singular": "",
                "months_plural": "",
                "years": ""
            }
        }
    }


def refactor_language_file(lang_data, refactor_map):
    """Refactor a language file according to the refactor map."""
    new_data = create_base_structure()
    
    # Handle direct mappings first
    direct_mappings = {
        # Basic info
        "title": "title",
        "introduction.description": "introduction.description",
        "introduction.duration": "introduction.duration", 
        "introduction.passwordPrompt": "introduction.passwordPrompt",
        "introduction.continue": "introduction.continue",
        
        # Survey basics
        "survey.thanks": "survey.thanks",
        "survey.guidance": "survey.thanks",  # They often have the same text
        "survey.basicInfo": "survey.basicInfo",
        "survey.title": "title",  # Often duplicated
        
        # Food categories and items
        "foodCategories": "foodCategories",
        "foodItems": "foodItems"
    }
    
    # Apply direct mappings
    for old_path, new_path in direct_mappings.items():
        value = get_nested_value(lang_data, old_path)
        if value is not None:
            set_nested_value(new_data, new_path, value)
    
    # Handle interface strings from the mapping
    interface_mappings = {
        "str1": "title",
        "str2": "introduction.description",
        "str3": "introduction.duration",
        "str4": "introduction.passwordPrompt",
        "str5": "common.time.month_singular",
        "str6": "survey.pages.complementary_feeding.title",
        "str7": "survey.interface.dragDrop.desktop",
        "str8": "survey.interface.dragDrop.mobile",
        "str9": "survey.interface.foodPicker.lowRiskLabel",
        "str10": "survey.interface.foodPicker.highRiskLabel",
        "str11": "survey.interface.mobileVersion.lowRisk",
        "str12": "survey.interface.mobileVersion.highRisk",
        "str13": "survey.submit",
        "str14": "survey.interface.timeline.birth",
        "str15": "survey.thanks",
        "str16": "survey.submit",
        "str17": "survey.basicInfo",
        "str18": "survey.interface.errors.duplicateItem",
        "str19": "survey.interface.foodPicker.adviceLabel",
        "str20": "common.time.years",
        "str21": "common.time.months_plural",
        "str22": "introduction.continue",
        "str23": "introduction.errors.incorrectPassword",
        "str24": "introduction.extraHeader"
    }
    
    # Look for interface strings
    if 'survey' in lang_data and 'interface' in lang_data['survey']:
        for str_key, new_path in interface_mappings.items():
            value = get_nested_value(lang_data, f'survey.interface.{str_key}')
            if value is not None:
                set_nested_value(new_data, new_path, value)
    
    # Handle key merges (collect translations for common keys)
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
        
        if value is not None:
            set_nested_value(new_data, new_key, value)
    
    # Handle questions
    if 'survey' in lang_data and 'questions' in lang_data['survey']:
        questions = lang_data['survey']['questions']
        new_questions = {}
        
        # Copy all questions
        for q_key, q_data in questions.items():
            if q_key.startswith('q'):
                new_questions[q_key] = deepcopy(q_data)
        
        # Handle Q9 elaborate consolidation
        if 'q9a' in questions and 'elaborate' in questions['q9a']:
            new_questions['q9_elaborate'] = deepcopy(questions['q9a']['elaborate'])
            # Remove elaborate from q9a and q9b
            if 'q9a' in new_questions and 'elaborate' in new_questions['q9a']:
                del new_questions['q9a']['elaborate']
            if 'q9b' in new_questions and 'elaborate' in new_questions['q9b']:
                del new_questions['q9b']['elaborate']
        elif 'q9b' in questions and 'elaborate' in questions['q9b']:
            new_questions['q9_elaborate'] = deepcopy(questions['q9b']['elaborate'])
            if 'q9b' in new_questions and 'elaborate' in new_questions['q9b']:
                del new_questions['q9b']['elaborate']
        
        # Handle interval choices consolidation
        interval_choices = {}
        for q_num in ['15', '16', '17', '18']:
            q_key = f'q{q_num}'
            if q_key in questions and 'choices' in questions[q_key]:
                choices = questions[q_key]['choices']
                if '1_day' in choices:
                    interval_choices['d1'] = choices['1_day']
                if '1_3_days' in choices:
                    interval_choices['d1_3'] = choices['1_3_days']
                if 'more_3_days' in choices:
                    interval_choices['d_gt3'] = choices['more_3_days']
                
                # Remove choices from individual questions
                if q_key in new_questions and 'choices' in new_questions[q_key]:
                    del new_questions[q_key]['choices']
        
        if interval_choices:
            new_questions['interval_choices'] = interval_choices
        
        # Update yes/no choices to use common values
        for q_key in new_questions:
            if isinstance(new_questions[q_key], dict) and 'choices' in new_questions[q_key]:
                choices = new_questions[q_key]['choices']
                # Don't modify yes/no in choices - let the app reference common.yes/no
        
        new_data['survey']['questions'] = new_questions
    
    # Handle any missing translations from pages
    if 'survey' in lang_data and 'pages' in lang_data['survey']:
        pages = lang_data['survey']['pages']
        if 'complementary_feeding' in pages and 'title' in pages['complementary_feeding']:
            set_nested_value(new_data, 'survey.pages.complementary_feeding.title', 
                           pages['complementary_feeding']['title'])
    
    # Special handling for months
    if 'survey' in lang_data:
        if 'months' in lang_data['survey']:
            set_nested_value(new_data, 'common.time.months_plural', lang_data['survey']['months'])
        if 'month' in lang_data['survey']:
            set_nested_value(new_data, 'common.time.month_singular', lang_data['survey']['month'])
    
    return new_data


def main():
    # Set up paths
    script_dir = Path(__file__).parent
    locales_dir = script_dir / "src" / "locales"
    refactor_map_path = locales_dir / "refactor-map.json"
    
    # Load refactor map
    print("Loading refactor map...")
    refactor_map = load_json(refactor_map_path)
    
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
        
        # Load original data
        lang_data = load_json(lang_path)
        
        # Create backup
        backup_path = lang_path.with_suffix('.json.bak.refactor')
        save_json(backup_path, lang_data)
        print(f"  Created backup: {backup_path}")
        
        # Refactor the file
        try:
            new_data = refactor_language_file(lang_data, refactor_map)
            
            # Save the refactored file
            save_json(lang_path, new_data)
            print(f"  ✓ Refactored successfully")
            
        except Exception as e:
            print(f"  ✗ Error refactoring {lang_file}: {e}")
            import traceback
            traceback.print_exc()
    
    print("\nRefactoring complete!")
    print("\nIMPORTANT: The refactored files now match the structure of en.json")
    print("You may need to run update_translations_with_dictionary.py to fill in any missing translations")


if __name__ == "__main__":
    main()