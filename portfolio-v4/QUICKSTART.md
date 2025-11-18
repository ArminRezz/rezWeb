# Quick Start Guide

Get your terminal portfolio up and running in 3 simple steps!

## Step 1: Generate the Filesystem

Run the Python script to generate `portfolio.json` from your content:

```bash
python3 generate_fs.py
```

This will:
- ✅ Scan `portfolio-source/` directory
- ✅ Read all text files
- ✅ Copy media files to `media/`
- ✅ Generate `portfolio.json`

## Step 2: Start a Local Server

Choose your preferred method:

### Option A: Python (Recommended)
```bash
python3 -m http.server 8000
```

### Option B: Node.js
```bash
npx http-server -p 8000
```

### Option C: npm script
```bash
npm start
```

## Step 3: Open in Browser

Navigate to:
```
http://localhost:8000
```

## 🎉 That's It!

You should now see your terminal portfolio. Try these commands:

```bash
help          # See all available commands
ls            # List current directory
cd Documents  # Navigate to Documents
cat about.txt # Read a file
tree          # View directory structure
ls -a         # Show hidden files
```

## 📝 Updating Content

1. Edit files in `portfolio-source/`
2. Run `python3 generate_fs.py`
3. Refresh your browser

## 🎨 Customization

- **Colors:** Edit `styles.css`
- **Welcome Message:** Edit `index.html`
- **Commands:** Edit `main.js`
- **Content:** Edit files in `portfolio-source/`

## ❓ Troubleshooting

### Portfolio doesn't load?
- Make sure you ran `generate_fs.py` first
- Check that `portfolio.json` exists
- Check browser console for errors

### Files not showing?
- Verify files are in `portfolio-source/`
- Re-run `generate_fs.py`
- Hard refresh browser (Ctrl+Shift+R)

### Commands not working?
- Make sure JavaScript is enabled
- Check browser console for errors
- Try a different browser

## 🚀 Ready to Deploy?

See the main README.md for deployment instructions to:
- GitHub Pages
- Netlify
- Vercel

---

**Need help?** Check the full [README.md](README.md) for detailed documentation.

