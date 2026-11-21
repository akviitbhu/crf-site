# Consilience Research Foundation website
Static site (HTML, CSS, JavaScript). No build tools needed to run it.
- Edit content in `build.py`, then run `python3 build.py` to regenerate the pages, or edit the HTML files directly.
- Preview: `python3 -m http.server 8000`, then open http://localhost:8000
- Deploy: GitHub Pages (Settings > Pages > main branch) or Vercel; point consilienceresearch.in at it.
- The intro animation plays once per browser session and can be skipped; it is off for reduced-motion users.
