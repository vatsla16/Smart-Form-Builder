import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_validate_form_missing_label():
    # Field with missing label
    fields = [
        {
            "id": "text-field-1",
            "type": "text",
            "label": "",
            "required": True,
            "settings": {}
        }
    ]
    response = client.post("/validate-form/", json=fields)
    assert response.status_code == 200
    data = response.json()
    assert any("Missing label" in issue["issue"] for issue in data)

def test_validate_form_good_field():
    fields = [
        {
            "id": "text-field-2",
            "type": "text",
            "label": "Name *",
            "required": True,
            "settings": {}
        }
    ]
    response = client.post("/validate-form/", json=fields)
    assert response.status_code == 200
    data = response.json()
    assert not data  # No issues

def test_validate_form_contrast():
    fields = [
        {
            "id": "text-field-3",
            "type": "text",
            "label": "Name",
            "required": False,
            "settings": {
                "textColor": "#888888",
                "backgroundColor": "#f8f9fa"
            }
        }
    ]
    response = client.post("/validate-form/", json=fields)
    assert response.status_code == 200
    data = response.json()
    assert any("Low color contrast" in issue["issue"] for issue in data)