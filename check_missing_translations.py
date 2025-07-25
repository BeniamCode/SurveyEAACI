#!/usr/bin/env python3
"""
Script to check for missing translations in en.json by comparing with dictionary.json
"""

import json

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

def main():
    # Read dictionary and English translations
    dictionary = read_json_file("src/locales/dictionary.json")
    en_translations = read_json_file("src/locales/en.json")
    
    mapping = dictionary.get('mapping', {})
    missing_translations = []
    
    print("Checking for missing English translations...")
    print("=" * 50)
    
    for code, json_path in mapping.items():
        value = get_nested_value(en_translations, json_path)
        if value is None:
            missing_translations.append((code, json_path))
    
    if missing_translations:
        print(f"❌ Found {len(missing_translations)} missing translations:")
        print()
        for code, path in missing_translations:
            print(f"Code: {code}")
            print(f"Path: {path}")
            print(f"Expected location: {path}")
            print("-" * 30)
    else:
        print("✅ All dictionary codes have corresponding English translations!")
    
    # Additional check: find keys that might be displaying instead of translations
    print("\nLooking for potential issues:")
    print("-" * 30)
    
    # Check for missing q2 other placeholder
    q2_other_path = "survey.questions.q2.other"
    q2_other_placeholder_path = "survey.questions.q2.otherPlaceholder"
    
    q2_other = get_nested_value(en_translations, q2_other_path)
    q2_other_placeholder = get_nested_value(en_translations, q2_other_placeholder_path)
    
    if q2_other is None:
        print(f"Missing: {q2_other_path}")
    if q2_other_placeholder is None:
        print(f"Missing: {q2_other_placeholder_path}")
    
    # Check for missing q5a other
    q5a_other_path = "survey.questions.q5a.other"
    q5a_other_placeholder_path = "survey.questions.q5a.otherPlaceholder"
    
    q5a_other = get_nested_value(en_translations, q5a_other_path)
    q5a_other_placeholder = get_nested_value(en_translations, q5a_other_placeholder_path)
    
    if q5a_other is None:
        print(f"Missing: {q5a_other_path}")
    if q5a_other_placeholder is None:
        print(f"Missing: {q5a_other_placeholder_path}")
        
    # Check for missing q8 other
    q8_other_path = "survey.questions.q8.other"
    q8_other_placeholder_path = "survey.questions.q8.otherPlaceholder"
    
    q8_other = get_nested_value(en_translations, q8_other_path)
    q8_other_placeholder = get_nested_value(en_translations, q8_other_placeholder_path)
    
    if q8_other is None:
        print(f"Missing: {q8_other_path}")
    if q8_other_placeholder is None:
        print(f"Missing: {q8_other_placeholder_path}")
        
    # Check for missing q9_elaborate other
    q9_other_path = "survey.questions.q9_elaborate.other"
    q9_other_placeholder_path = "survey.questions.q9_elaborate.otherPlaceholder"
    
    q9_other = get_nested_value(en_translations, q9_other_path)
    q9_other_placeholder = get_nested_value(en_translations, q9_other_placeholder_path)
    
    if q9_other is None:
        print(f"Missing: {q9_other_path}")
    if q9_other_placeholder is None:
        print(f"Missing: {q9_other_placeholder_path}")
        
    # Check for missing q14 other
    q14_other_path = "survey.questions.q14.other"
    q14_other_placeholder_path = "survey.questions.q14.otherPlaceholder"
    
    q14_other = get_nested_value(en_translations, q14_other_path)
    q14_other_placeholder = get_nested_value(en_translations, q14_other_placeholder_path)
    
    if q14_other is None:
        print(f"Missing: {q14_other_path}")
    if q14_other_placeholder is None:
        print(f"Missing: {q14_other_placeholder_path}")

    # Check for missing choices for q5 and q9a/q9b
    q5_choices = get_nested_value(en_translations, "survey.questions.q5.choices")
    if q5_choices is None:
        print(f"Missing: survey.questions.q5.choices")
        
    q9a_choices = get_nested_value(en_translations, "survey.questions.q9a.choices")
    if q9a_choices is None:
        print(f"Missing: survey.questions.q9a.choices")
        
    q9b_choices = get_nested_value(en_translations, "survey.questions.q9b.choices")
    if q9b_choices is None:
        print(f"Missing: survey.questions.q9b.choices")
        
    q10_choices = get_nested_value(en_translations, "survey.questions.q10.choices")
    if q10_choices is None:
        print(f"Missing: survey.questions.q10.choices")
        
    q11_choices = get_nested_value(en_translations, "survey.questions.q11.choices")
    if q11_choices is None:
        print(f"Missing: survey.questions.q11.choices")

if __name__ == "__main__":
    main()