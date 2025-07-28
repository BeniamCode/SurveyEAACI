#!/usr/bin/env python3
"""
Script to add missing translations that aren't in CSV but exist in original JSON.
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
    print("Adding missing translations not found in CSV...")
    
    # Load current data
    chinese_data = load_chinese_json()
    
    # These translations were missing from CSV but we need them
    missing_translations = {
        "foodItems.starch.semolina_pudding": "粗粒小麥粉布丁（含牛奶）",
        "foodItems.starch.trahanas": "特拉哈納"
    }
    
    for json_path, translation in missing_translations.items():
        keys = json_path.split('.')
        current = chinese_data
        
        # Navigate to the parent
        for key in keys[:-1]:
            current = current[key]
        
        # Add the missing translation
        current[keys[-1]] = translation
        print(f"Added missing translation for {json_path}: {translation}")
    
    # Save the corrected file
    save_chinese_json(chinese_data)
    print("\nMissing translations have been added!")

if __name__ == "__main__":
    main()