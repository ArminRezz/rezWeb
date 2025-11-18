#!/usr/bin/env python3
"""
Filesystem JSON Generator for Terminal Portfolio

This script recursively scans the portfolio-source/ directory and generates
a JSON file representing the filesystem structure. Text files have their
contents embedded, while media files are represented by their relative paths.

Usage:
    python generate_fs.py

Output:
    portfolio.json - JSON representation of the filesystem
"""

import os
import json
from pathlib import Path


def should_include_file(filename):
    """
    Determine if a file should be included in the filesystem.
    
    Args:
        filename: Name of the file to check
        
    Returns:
        bool: True if file should be included, False otherwise
    """
    # Exclude common system files
    exclude_patterns = [
        '.DS_Store',
        'Thumbs.db',
        '.gitkeep',
        '__pycache__',
        '*.pyc'
    ]
    
    for pattern in exclude_patterns:
        if pattern.startswith('*'):
            if filename.endswith(pattern[1:]):
                return False
        elif filename == pattern:
            return False
    
    return True


def is_text_file(filepath):
    """
    Determine if a file should be read as text.
    
    Args:
        filepath: Path to the file
        
    Returns:
        bool: True if file is text, False otherwise
    """
    text_extensions = ['.txt', '.md', '.json', '.js', '.py', '.html', '.css', '.xml', '.yaml', '.yml']
    
    # If file has a text extension, it's a text file
    if any(filepath.suffix == ext for ext in text_extensions):
        return True
    
    # Files without extensions (like .secret, .gitignore) are treated as text
    if not filepath.suffix or filepath.name.startswith('.'):
        return True
    
    return False


def is_media_file(filepath):
    """
    Determine if a file is a media file (image, audio, video, pdf).
    
    Args:
        filepath: Path to the file
        
    Returns:
        bool: True if file is media, False otherwise
    """
    media_extensions = [
        '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg',  # Images
        '.mp3', '.wav', '.ogg', '.m4a',  # Audio
        '.mp4', '.webm', '.mov',  # Video
        '.pdf', '.doc', '.docx'  # Documents
    ]
    return any(filepath.suffix.lower() == ext for ext in media_extensions)


def scan_directory(directory_path, base_path):
    """
    Recursively scan a directory and build a nested dictionary structure.
    
    Args:
        directory_path: Path object for the current directory
        base_path: Path object for the base directory (for relative paths)
        
    Returns:
        dict: Nested dictionary representing the filesystem structure
    """
    result = {}
    
    try:
        # Get all items in the directory
        items = sorted(directory_path.iterdir())
        
        for item in items:
            # Skip files that shouldn't be included
            if not should_include_file(item.name):
                continue
            
            if item.is_file():
                # Handle text files - embed content
                if is_text_file(item):
                    try:
                        with open(item, 'r', encoding='utf-8') as f:
                            result[item.name] = f.read()
                    except Exception as e:
                        print(f"Warning: Could not read {item}: {e}")
                        result[item.name] = f"[Error reading file: {e}]"
                
                # Handle media files - store relative path
                elif is_media_file(item):
                    # Calculate relative path from portfolio-source/ directory
                    relative_to_source = item.relative_to(base_path)
                    relative_path = f"portfolio-source/{relative_to_source}"
                    result[item.name] = relative_path
                
                # Handle other files
                else:
                    result[item.name] = f"[Binary file: {item.name}]"
            
            elif item.is_dir():
                # Recursively scan subdirectories
                result[item.name] = scan_directory(item, base_path)
    
    except PermissionError as e:
        print(f"Warning: Permission denied for {directory_path}: {e}")
    
    return result


def copy_media_files(source_dir, target_dir):
    """
    Copy media files from portfolio-source to media/ directory.
    
    Args:
        source_dir: Path to the portfolio-source directory
        target_dir: Path to the media directory
    """
    import shutil
    
    target_dir.mkdir(exist_ok=True)
    
    for root, dirs, files in os.walk(source_dir):
        for file in files:
            file_path = Path(root) / file
            if is_media_file(file_path) and should_include_file(file):
                source_file = file_path
                target_file = target_dir / file
                
                try:
                    shutil.copy2(source_file, target_file)
                    print(f"Copied: {file} -> media/{file}")
                except Exception as e:
                    print(f"Warning: Could not copy {file}: {e}")


def generate_filesystem_json(source_dir='portfolio-source', output_file='portfolio.json'):
    """
    Generate the filesystem JSON from the source directory.
    
    Args:
        source_dir: Path to the source directory
        output_file: Path to the output JSON file
    """
    source_path = Path(source_dir)
    output_path = Path(output_file)
    
    # Check if source directory exists
    if not source_path.exists():
        print(f"Error: Source directory '{source_dir}' does not exist!")
        print(f"Please create it and add your portfolio content.")
        return False
    
    print(f"Scanning {source_dir}...")
    
    # Scan the directory structure
    print(f"\nGenerating filesystem structure...")
    filesystem = scan_directory(source_path, source_path)
    
    # Write to JSON file
    try:
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(filesystem, f, indent=2, ensure_ascii=False)
        
        print(f"\n✓ Successfully generated {output_file}")
        print(f"  Total items: {count_items(filesystem)}")
        return True
    
    except Exception as e:
        print(f"Error writing to {output_file}: {e}")
        return False


def count_items(filesystem_dict):
    """
    Count the total number of items in the filesystem.
    
    Args:
        filesystem_dict: Dictionary representing the filesystem
        
    Returns:
        int: Total count of files and directories
    """
    count = 0
    for key, value in filesystem_dict.items():
        count += 1
        if isinstance(value, dict):
            count += count_items(value)
    return count


def main():
    """Main entry point for the script."""
    print("=" * 60)
    print("Portfolio Filesystem Generator")
    print("=" * 60)
    print()
    
    success = generate_filesystem_json()
    
    if success:
        print("\nYou can now use portfolio.json in your frontend!")
        print("To update the content, modify files in portfolio-source/")
        print("and run this script again.")
    else:
        print("\nGeneration failed. Please check the errors above.")
        exit(1)


if __name__ == "__main__":
    main()

