#!/usr/bin/env python3
"""
Script to fix incorrect family meal translations that appear to be wrong in the CSV.
"""

import json
from pathlib import Path

# File paths
BASE_DIR = Path("/Users/beniam/Documents/LOMI/astro-antd-survey")
CHINESE_JSON_FILE = BASE_DIR / "src/locales/zh-tw.json"

def load_chinese_json():
    """Load the current Chinese JSON file"""
    with open(CHINESE_JSON_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_chinese_json(chinese_data):
    """Save the updated Chinese JSON file"""
    with open(CHINESE_JSON_FILE, 'w', encoding='utf-8') as f:
        json.dump(chinese_data, f, ensure_ascii=False, indent=2)

def main():
    print("Fixing incorrect family meal translations...")
    
    # Load current data
    chinese_data = load_chinese_json()
    
    # Fix the incorrect translations based on English meanings
    corrections = {
        # g_addit_guid_2 -> "Share family meal with salt" should be about sharing family food WITH salt
        "foodItems.additional.family_meal_salt": "與家人分享含鹽膳食",
        
        # g_addit_guid_3 -> "Share family meal without salt" should be about sharing family food WITHOUT salt  
        "foodItems.additional.family_meal_no_salt": "與家人分享無鹽膳食"
    }
    
    for json_path, correct_translation in corrections.items():
        keys = json_path.split('.')
        current = chinese_data
        
        # Navigate to the parent
        for key in keys[:-1]:
            current = current[key]
        
        # Update the translation
        old_value = current.get(keys[-1], "NOT FOUND")
        current[keys[-1]] = correct_translation
        print(f"Fixed {json_path}:")
        print(f"  Old: {old_value}")
        print(f"  New: {correct_translation}")
    
    # Save the corrected file
    save_chinese_json(chinese_data)
    print("\nFamily meal translations have been corrected!")

if __name__ == "__main__":
    main()