/**
 * Filesystem Module
 * 
 * Handles loading and navigation of the portfolio filesystem from JSON.
 * Provides utilities for path resolution and file operations.
 */

class FileSystem {
    constructor() {
        this.root = {};
        this.currentPath = [];
        this.loaded = false;
    }

    /**
     * Load the filesystem from portfolio.json
     */
    async load() {
        try {
            const response = await fetch('portfolio.json');
            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}, statusText: ${response.statusText}`);
                console.error('Attempted URL:', window.location.href + 'portfolio.json');
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (!data || Object.keys(data).length === 0) {
                console.error('portfolio.json is empty or invalid');
                throw new Error('portfolio.json is empty or invalid');
            }
            this.root = data;
            this.loaded = true;
            console.log('✓ Filesystem loaded successfully');
            return true;
        } catch (error) {
            console.error('Failed to load filesystem:', error);
            console.error('Error details:', {
                message: error.message,
                stack: error.stack,
                url: window.location.href
            });
            return false;
        }
    }

    /**
     * Get current directory object
     */
    getCurrentDir() {
        let current = this.root;
        for (const dir of this.currentPath) {
            if (current && typeof current === 'object' && dir in current) {
                current = current[dir];
            } else {
                return null;
            }
        }
        return current;
    }

    /**
     * Get current path as string
     */
    getCurrentPathString() {
        return '/' + this.currentPath.join('/');
    }

    /**
     * Navigate to a directory
     * @param {string} path - Path to navigate to (relative or absolute)
     * @returns {boolean} - Success status
     */
    changeDirectory(path) {
        if (!path || path === '.') {
            return true;
        }

        // Handle root
        if (path === '/') {
            this.currentPath = [];
            return true;
        }

        // Handle parent directory
        if (path === '..') {
            if (this.currentPath.length > 0) {
                this.currentPath.pop();
            }
            return true;
        }

        // Handle absolute paths
        if (path.startsWith('/')) {
            const parts = path.substring(1).split('/').filter(p => p);
            const tempPath = [];
            let current = this.root;

            for (const part of parts) {
                if (part === '..') {
                    if (tempPath.length > 0) {
                        tempPath.pop();
                        current = this.getDirectoryAtPath(tempPath);
                    }
                } else if (part !== '.') {
                    if (current && typeof current === 'object' && part in current) {
                        const next = current[part];
                        if (typeof next === 'object' && !Array.isArray(next)) {
                            tempPath.push(part);
                            current = next;
                        } else {
                            return false; // Not a directory
                        }
                    } else {
                        return false; // Directory doesn't exist
                    }
                }
            }

            this.currentPath = tempPath;
            return true;
        }

        // Handle relative paths
        const parts = path.split('/').filter(p => p);
        const tempPath = [...this.currentPath];
        let current = this.getCurrentDir();

        for (const part of parts) {
            if (part === '..') {
                if (tempPath.length > 0) {
                    tempPath.pop();
                    current = this.getDirectoryAtPath(tempPath);
                }
            } else if (part !== '.') {
                if (current && typeof current === 'object' && part in current) {
                    const next = current[part];
                    if (typeof next === 'object' && !Array.isArray(next)) {
                        tempPath.push(part);
                        current = next;
                    } else {
                        return false; // Not a directory
                    }
                } else {
                    return false; // Directory doesn't exist
                }
            }
        }

        this.currentPath = tempPath;
        return true;
    }

    /**
     * Get directory object at specific path
     */
    getDirectoryAtPath(pathArray) {
        let current = this.root;
        for (const dir of pathArray) {
            if (current && typeof current === 'object' && dir in current) {
                current = current[dir];
            } else {
                return null;
            }
        }
        return current;
    }

    /**
     * List contents of current directory
     * @param {boolean} showHidden - Show hidden files (starting with .)
     * @returns {Array} - Array of file/directory names
     */
    list(showHidden = false) {
        const current = this.getCurrentDir();
        if (!current || typeof current !== 'object') {
            return [];
        }

        const items = Object.keys(current);
        
        if (!showHidden) {
            return items.filter(item => !item.startsWith('.'));
        }
        
        return items;
    }

    /**
     * Get file contents
     * @param {string} filename - Name of file to read
     * @returns {string|null} - File contents or null if not found
     */
    getFile(filename) {
        const current = this.getCurrentDir();
        
        if (!current || typeof current !== 'object') {
            return null;
        }

        if (filename in current) {
            const item = current[filename];
            // Return content if it's a string (file)
            if (typeof item === 'string') {
                return item;
            }
            // Return error if it's a directory
            if (typeof item === 'object') {
                return null;
            }
        }

        return null;
    }

    /**
     * Check if item is a directory
     */
    isDirectory(name) {
        const current = this.getCurrentDir();
        if (!current || typeof current !== 'object') {
            return false;
        }
        
        if (name in current) {
            return typeof current[name] === 'object';
        }
        
        return false;
    }

    /**
     * Check if item is a file
     */
    isFile(name) {
        const current = this.getCurrentDir();
        if (!current || typeof current !== 'object') {
            return false;
        }
        
        if (name in current) {
            return typeof current[name] === 'string';
        }
        
        return false;
    }

    /**
     * Generate tree structure recursively
     */
    generateTree(obj = this.root, prefix = '', isLast = true, showHidden = false) {
        let output = '';
        const items = Object.keys(obj).filter(key => showHidden || !key.startsWith('.'));
        
        items.forEach((key, index) => {
            const isLastItem = index === items.length - 1;
            const item = obj[key];
            const isDir = typeof item === 'object';
            
            // Draw branch
            const branch = isLastItem ? '└── ' : '├── ';
            const icon = isDir ? '📁 ' : '📄 ';
            
            output += prefix + branch + icon + key + '\n';
            
            // Recursively process directories
            if (isDir) {
                const newPrefix = prefix + (isLastItem ? '    ' : '│   ');
                output += this.generateTree(item, newPrefix, isLastItem, showHidden);
            }
        });
        
        return output;
    }

    /**
     * Get autocomplete suggestions
     */
    getCompletions(partial) {
        const items = this.list(true);
        return items.filter(item => item.startsWith(partial));
    }
}

// Export singleton instance
export const fs = new FileSystem();

