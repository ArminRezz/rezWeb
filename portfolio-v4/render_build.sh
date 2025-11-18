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
echo "=========================================="

