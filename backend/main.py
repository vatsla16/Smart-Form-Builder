# backend/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional

# Import your checker functions
from a11y_rules import run_all_checks

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://vatsla16.github.io"],  # local: http://localhost:3000
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FormField(BaseModel):
    id: str
    type: str
    label: Optional[str]
    required: bool
    settings: dict

@app.post("/validate-form/", response_model=List[Dict])
def validate_form(fields: List[FormField]):
    """
    Validate form fields for accessibility.
    Returns a list of suggestion objects.
    """
    # Convert each Pydantic model into a plain dict
    raw_fields = [f.dict() for f in fields]
    return run_all_checks(raw_fields)
