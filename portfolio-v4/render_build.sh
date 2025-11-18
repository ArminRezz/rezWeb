#!/bin/bash
# Render build script for portfolio-v4
# This script handles both normal generation and copying from Secret Files if they exist

set -e  # Exit on error

echo "Starting build process..."

# Check if Secret Files exist and copy them if available
if [ -f "/etc/secrets/portfolio.json" ]; then
    echo "✓ Found portfolio.json in Secret Files, copying..."
    cp /etc/secrets/portfolio.json ./portfolio.json
    echo "✓ Copied portfolio.json from Secret Files"
else
    echo "No portfolio.json in Secret Files, generating from portfolio-source/..."
    python3 generate_fs.py
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

echo "Build complete!"

