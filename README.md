# ♿ Smart Form Builder for People with Disabilities

## 🧠 Overview
A drag-and-drop form builder that ensures accessibility compliance with WCAG 2.1 standards. Designed to help developers and teams build forms that are keyboard navigable, screen-reader friendly, and accessible to all.

## 💻 Tech Stack
- Frontend: React, Bootstrap 5, Sass
- Backend: Python (Flask/FastAPI)
- Accessibility: WCAG, ARIA, axe-core
- Drag & Drop: React DnD / @dnd-kit
- Testing: Jest, Pytest, axe-core
- Deployment: GitHub Pages (FE), Render (BE)

## 🔑 Features
- Accessible drag-and-drop interface
- Real-time a11y suggestions (e.g., missing label warning)
- ARIA roles auto-added to inputs
- Keyboard-only navigation support
- Save/load form definitions via backend
- JSON-based form schema storage

## ⚙️ Getting Started

```bash
# Frontend
cd frontend
npm install
npm start

# Backend
cd backend
pip install -r requirements.txt
python app.py
