# ♿ Smart Form Builder for People with Disabilities

## 🧠 Overview
A highly accessible, robust form builder focused on WCAG/ARIA compliance. Build forms that are keyboard navigable, screen-reader friendly, and accessible to all. Features a 3-column layout: Add Fields palette, Canvas preview, and Inspector panel.

## 💻 Tech Stack
- **Frontend:** React, Bootstrap 5, Sass, axe-core
- **Backend:** Python (FastAPI)
- **Accessibility:** WCAG, ARIA, axe-core
- **Testing:** Jest, Pytest, axe-core
- **Deployment:** GitHub Pages

## 🔑 Features
- Click-to-add accessible field palette (no drag-and-drop)
- Real-time and global accessibility checks (backend and axe-core)
- ARIA roles, aria-required, live regions, and landmarks in export
- Keyboard navigation, skip links, focus indicators, accessible modals
- Inspector panel for field properties (label, required, color, etc.)
- New field types: number, date, password, url, tel, file, section title
- Export accessible HTML (opens in new tab for copy/save)
- LocalStorage persistence of form state
- Reorder fields via modal
- Readable field IDs (e.g., text-field-1)
- Live color contrast preview and warnings

## ⚙️ Getting Started

### Frontend
```bash
cd frontend
npm install
npm start
```
- Runs at http://localhost:3000
- Requires Node.js 18+ and npm

### Backend
Create `backend/requirements.txt` with:
```
fastapi
uvicorn
pydantic
```
Then run:
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
- Runs at http://localhost:8000
- Requires Python 3.8+

## 🧑‍💻 How to Use
1. Click a field type in the left sidebar to add it to your form.
2. Click a field in the center canvas to select it.
3. Edit the field's properties in the right sidebar (label, required, color, etc.).
4. Use the "Quick Check" (backend) or "Full Scan" (axe-core) buttons for accessibility checks.
5. Reorder fields using the ExportBar modal.
6. Export your form as accessible HTML (opens in a new tab for copy/save).

### Accessibility Features
- **Skip links** for Add Fields, Canvas, and Inspector
- **Focus indicators** and keyboard navigation everywhere
- **Accessible modals** (with focus trap and close button)
- **Live color contrast preview** in Inspector
- **ARIA roles, aria-required, aria-labelledby, live regions** in export
- **Global accessibility checks:**
  - **Quick Check:** Backend (schema/logic, field-level)
  - **Full Scan:** axe-core (DOM-level, WCAG 2.1 AA)
- **LocalStorage**: Form state is saved automatically and restored on reload

### Backend API
- `POST /validate-form/` — Accepts a list of field objects, returns accessibility issues (see `backend/a11y_rules.py` for rules)

## 🙏 Credits & Attribution
- Inspired by accessibility best practices (WCAG, ARIA)
- Built as a learning project for React, FastAPI, and a11y

---
Happy building! ♿ 