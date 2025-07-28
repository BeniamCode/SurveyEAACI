#!/usr/bin/env python3
"""
Script to revert family meal translations back to exactly what's in the CSV files.
CSV is the ultimate source of truth, regardless of semantic appropriateness.
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
    print("Reverting family meal translations to match CSV exactly...")
    
    # Load current data
    chinese_data = load_chinese_json()
    
    # Revert to exact CSV translations (even if they seem wrong semantically)
    csv_exact = {
        # From CSV: g_addit_guid_2 -> "Share family meal with salt" -> "食鹽"
        "foodItems.additional.family_meal_salt": "食鹽",
        
        # From CSV: g_addit_guid_3 -> "Share family meal without salt" -> "香料／草藥（如胡椒，肉桂等）"
        "foodItems.additional.family_meal_no_salt": "香料／草藥（如胡椒，肉桂等）"
    }
    
    for json_path, csv_translation in csv_exact.items():
        keys = json_path.split('.')
        current = chinese_data
        
        # Navigate to the parent
        for key in keys[:-1]:
            current = current[key]
        
        # Update to match CSV exactly
        old_value = current.get(keys[-1], "NOT FOUND")
        current[keys[-1]] = csv_translation
        print(f"Reverted {json_path}:")
        print(f"  From: {old_value}")
        print(f"  To:   {csv_translation} (CSV exact)")
    
    # Save the reverted file
    save_chinese_json(chinese_data)
    print("\nFamily meal translations reverted to match CSV exactly!")
    print("CSV is now the ultimate source of truth for all translations.")

if __name__ == "__main__":
    main()