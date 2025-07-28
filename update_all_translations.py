#!/usr/bin/env python3
"""
Script to update all language translations using CSV files with the new refactored structure.
"""

import subprocess
import sys
from pathlib import Path


def run_translation_update(csv_file, language_code):
    """Run the translation update script for a specific language and CSV file."""
    cmd = ["python", "update_translations_with_dictionary.py", csv_file, language_code]
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        return True, result.stdout
    except subprocess.CalledProcessError as e:
        return False, e.stderr


def main():
    # Language mappings: file name -> CSV language code
    language_mappings = {
        'de.json': 'de',
        'el.json': 'el', 
        'es.json': 'es',
        'fr.json': 'fr',
        'it.json': 'it',
        'nl.json': 'nl',
        'pl.json': 'pl',
        'pt.json': 'pt',
        'ro.json': 'ro',
        'zh-tw.json': 'tc'
    }
    
    # CSV files to process
    csv_files = [
        'src/blocks/block001.csv',
        'src/blocks/block002.csv', 
        'src/blocks/block003.csv'
    ]
    
    print("Starting translation updates for all languages...")
    
    for lang_file, lang_code in language_mappings.items():
        print(f"\n=== Updating {lang_file} ({lang_code.upper()}) ===")
        
        success_count = 0
        total_files = len(csv_files)
        
        for csv_file in csv_files:
            print(f"  Processing {csv_file}...")
            success, output = run_translation_update(csv_file, lang_code)
            
            if success:
                # Extract update count from output
                lines = output.strip().split('\n')
                for line in lines:
                    if 'Updated' in line and 'translations' in line:
                        print(f"    ✓ {line.split('Updated ')[-1]}")
                        break
                success_count += 1
            else:
                print(f"    ✗ Error: {output}")
        
        print(f"  {lang_file}: {success_count}/{total_files} CSV files processed successfully")
    
    print("\n=== Translation update complete! ===")
    print("\nNext steps:")
    print("1. Review the updated translation files")
    print("2. Test the application with the new translation structure")
    print("3. Update your application code to use the refactored keys")


if __name__ == "__main__":
    main()