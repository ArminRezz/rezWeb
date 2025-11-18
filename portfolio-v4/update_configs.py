#!/usr/bin/env python3
"""
Update Config Files from JSON

This script reads a config.json file and updates all the individual
config files (.term, .audiojunkie, .dock, .arminOS) in portfolio-source/

Usage:
    python3 update_configs.py [config.json]

If no file is specified, it looks for 'config.json' in the current directory.
"""

import os
import json
import sys
from pathlib import Path

def update_config_file(config_path, config_data, filename):
    """Update a config file with new data"""
    file_path = config_path / filename
    
    # Build the file content
    lines = []
    for key, value in config_data.items():
        lines.append(f"{key}={value}")
    
    # Write the file
    with open(file_path, 'w') as f:
        f.write('\n'.join(lines) + '\n')
    
    print(f"✓ Updated {filename}")

def main():
    # Determine config file path
    if len(sys.argv) > 1:
        config_file = Path(sys.argv[1])
    else:
        config_file = Path('config.json')
    
    if not config_file.exists():
        print(f"Error: Config file not found: {config_file}")
        print(f"Usage: python3 update_configs.py [config.json]")
        sys.exit(1)
    
    # Read JSON config
    try:
        with open(config_file, 'r') as f:
            config = json.load(f)
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON in {config_file}: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"Error reading config file: {e}")
        sys.exit(1)
    
    # Get portfolio-source directory
    portfolio_source = Path('portfolio-source')
    if not portfolio_source.exists():
        print("Error: portfolio-source/ directory not found")
        print("Make sure you're running this from the portfolio-v4 directory")
        sys.exit(1)
    
    print("============================================================")
    print("Config File Updater")
    print("============================================================")
    print(f"Reading config from: {config_file}")
    print()
    
    # Update .term file
    if 'term' in config:
        update_config_file(portfolio_source, config['term'], '.term')
    
    # Update .audiojunkie file
    if 'audiojunkie' in config:
        update_config_file(portfolio_source, config['audiojunkie'], '.audiojunkie')
    
    # Update .dock file
    if 'dock' in config:
        update_config_file(portfolio_source, config['dock'], '.dock')
    
    # Update .arminOS file
    if 'os' in config:
        update_config_file(portfolio_source, config['os'], '.arminOS')
    
    print()
    print("✓ All config files updated!")
    print()
    print("Next steps:")
    print("  1. Run: python3 generate_fs.py")
    print("  2. Refresh your browser to see changes")
    print()

if __name__ == '__main__':
    main()

