# ♿ Smart Form Builder for People with Disabilities

## 🧠 Overview
A robust, accessible form builder (React + FastAPI) focused on WCAG/ARIA compliance. Build forms that are keyboard navigable, screen-reader friendly, and export as accessible HTML.

## 🏗️ Architecture
```
+-------------------+         HTTP (JSON)         +-------------------+
|   React Frontend  | <-------------------------> |  FastAPI Backend  |
| - Form Builder UI |   /validate-form/ endpoint  | - WCAG/ARIA rules |
| - axe-core scan   |---------------------------> |                   |
+-------------------+                            +-------------------+
        |  |  
        |  |  (DOM scan, WCAG 2.1 AA)
        |  +-----------------------------+
        |                                |
        v                                v
  axe-core (in-browser)           Accessibility UI
```

## 💻 Tech Stack
- **Frontend:** React, Bootstrap 5, Sass, axe-core
- **Backend:** Python (FastAPI)
- **Accessibility:** WCAG, ARIA, axe-core

## 🔑 Features
- Click-to-add accessible field palette
- Real-time and global accessibility checks (backend and axe-core)
- ARIA roles, aria-required, live regions, and landmarks in export
- Keyboard navigation, skip links, focus indicators, accessible modals
- Inspector panel for field properties
- New field types: number, date, password, url, tel, file, section title
- Export accessible HTML (opens in new tab)
- LocalStorage persistence
- Reorder fields via modal
- Readable field IDs
- Live color contrast preview

## ♿ Accessibility Checks
- **Backend:** Missing label, placeholder without label, color contrast, required indicator, group options, button attributes, file input accept, min/max logic, empty section, duplicate IDs, button type ([see code](backend/a11y_rules.py))
- **Frontend:** Full WCAG 2.1 A/AA scan with axe-core (DOM-level, ARIA, color contrast, landmarks, etc.)

## ⚙️ Getting Started

**Frontend**
```bash
cd frontend
npm install
npm start
```

**Backend**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

## 🧑‍💻 How to Use
1. Click a field type to add it.
2. Select and edit field properties.
3. Use "Quick Check" (backend) or "Full Scan" (axe-core) for accessibility.
4. Reorder fields as needed.
5. Export as accessible HTML.

## 🙏 Credits
- Inspired by accessibility best practices (WCAG, ARIA)
- Built as a learning project for React, FastAPI, and a11y

---
Happy building! ♿ 