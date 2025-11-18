#!/bin/bash
# Render build script for portfolio-v4
# This script handles both normal generation and copying from Secret Files if they exist

set -e  # Exit on error

echo "=========================================="
echo "Starting build process..."
echo "Current directory: $(pwd)"
echo "Contents: $(ls -la)"
echo "=========================================="

# Check if Secret Files exist and copy them if available
if [ -f "/etc/secrets/portfolio.json" ]; then
    echo "✓ Found portfolio.json in Secret Files, copying..."
    cp /etc/secrets/portfolio.json ./portfolio.json
    echo "✓ Copied portfolio.json from Secret Files"
    
    # Validate JSON
    echo "Validating portfolio.json..."
    if python3 -c "import json; json.load(open('./portfolio.json'))" 2>&1; then
        echo "✓ portfolio.json is valid JSON"
        FILE_SIZE=$(wc -c < ./portfolio.json)
        echo "✓ File size: $FILE_SIZE bytes"
        if [ "$FILE_SIZE" -lt 100 ]; then
            echo "WARNING: File seems too small, falling back to generation..."
            python3 generate_fs.py || python generate_fs.py
        fi
    else
        echo "ERROR: portfolio.json from Secret Files is invalid JSON!"
        echo "Falling back to generation from portfolio-source/..."
        python3 generate_fs.py || python generate_fs.py
    fi
else
    echo "No portfolio.json in Secret Files, generating from portfolio-source/..."
    echo "Checking Python version..."
    python3 --version || echo "WARNING: python3 not found, trying python..."
    python3 generate_fs.py || python generate_fs.py
fi

# Verify portfolio.json was created
if [ ! -f "./portfolio.json" ]; then
    echo "ERROR: portfolio.json was not created!"
    echo "Current directory contents:"
    ls -la
    exit 1
else
    echo "✓ Verified portfolio.json exists"
    echo "File size: $(wc -c < portfolio.json) bytes"
    echo "File location: $(pwd)/portfolio.json"
    # Ensure it's readable
    chmod 644 ./portfolio.json
fi

# Handle config.json similarly
if [ -f "/etc/secrets/config.json" ]; then
    echo "✓ Found config.json in Secret Files, copying..."
    cp /etc/secrets/config.json ./config.json
    echo "✓ Copied config.json from Secret Files"
else
    echo "No config.json in Secret Files, using default if exists..."
    # config.json is optional, so we don't fail if it doesn't exist
fi

echo "=========================================="
echo "Build complete! Final contents:"
ls -la *.json *.html *.js *.css 2>/dev/null || echo "Some files may not exist (this is OK)"
echo ""
echo "Verifying portfolio.json is ready to serve:"
if [ -f "./portfolio.json" ]; then
    echo "✓ portfolio.json exists and is readable"
    echo "  Size: $(wc -c < portfolio.json) bytes"
    echo "  Permissions: $(ls -l portfolio.json | awk '{print $1}')"
    echo "  Full path: $(pwd)/portfolio.json"
    
    # Test JSON one more time
    if python3 -c "import json; data=json.load(open('./portfolio.json')); print('✓ JSON structure valid,', len(str(data)), 'characters')" 2>&1; then
        echo "✓ Final validation passed"
    else
        echo "ERROR: Final validation failed!"
        exit 1
    fi
    
    # Ensure file is readable by web server
    chmod 644 ./portfolio.json
    echo "✓ Set permissions to 644 (readable by web server)"
    
    # Verify it's actually readable
    if [ -r "./portfolio.json" ]; then
        echo "✓ File is readable"
    else
        echo "ERROR: File is not readable!"
        exit 1
    fi
else
    echo "ERROR: portfolio.json missing!"
    exit 1
fi

# List all files that will be published
echo ""
echo "Files that will be published:"
find . -maxdepth 1 -type f \( -name "*.json" -o -name "*.html" -o -name "*.js" -o -name "*.css" \) -ls

# CRITICAL: Ensure portfolio.json is explicitly in the root
# Render might filter files, so we'll create a symlink or ensure it's there
if [ ! -f "./portfolio.json" ]; then
    echo "ERROR: portfolio.json is missing after all steps!"
    exit 1
fi

# Touch the file to ensure it has a recent timestamp (helps with caching)
touch ./portfolio.json

echo ""
echo "Final verification - portfolio.json details:"
ls -lh ./portfolio.json
file ./portfolio.json
echo "=========================================="

