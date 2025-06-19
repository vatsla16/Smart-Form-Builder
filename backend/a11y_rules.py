from typing import List, Dict

# ─── Utility Functions ───────────────────────────────────────────────────────

def _hex_to_rgb(hex_color: str):
    """Convert #RRGGBB to (R, G, B) floats in [0,1]."""
    hex_color = hex_color.lstrip('#')
    r, g, b = [int(hex_color[i:i+2], 16)/255 for i in (0, 2, 4)]
    return r, g, b

def _relative_luminance(r: float, g: float, b: float) -> float:
    """Calculate the WCAG relative luminance of an sRGB color."""
    def _chan(c):
        return c/12.92 if c <= 0.03928 else ((c+0.055)/1.055)**2.4
    r_lin, g_lin, b_lin = map(_chan, (r, g, b))
    return 0.2126*r_lin + 0.7152*g_lin + 0.0722*b_lin

def _contrast_ratio(fg: str, bg: str) -> float:
    """Compute contrast ratio between two #RRGGBB colors."""
    lum1 = _relative_luminance(*_hex_to_rgb(fg))
    lum2 = _relative_luminance(*_hex_to_rgb(bg))
    lighter, darker = max(lum1, lum2), min(lum1, lum2)
    return (lighter + 0.05)/(darker + 0.05)


# ─── Individual Field Checks ─────────────────────────────────────────────────

def check_missing_label(fields: List[Dict]) -> List[Dict]:
    """All input fields except 'section' must have a label."""
    issues = []
    for f in fields:
        # These types require a label
        if f["type"] in ("text", "email", "textarea", "select", "checkbox", "radio", "number", "date", "password", "url", "tel", "file"):
            if not f.get("label") or not f["label"].strip():
                issues.append({
                    "field_id": f["id"],
                    "issue": "Missing label",
                    "suggestion": "Add a visible label or aria-label for this field.",
                    "severity": "high"
                })
    return issues

def check_placeholder_without_label(fields: List[Dict]) -> List[Dict]:
    """Warn if placeholder is used without a label on text-like inputs."""
    issues = []
    for f in fields:
        if f["type"] in ("text", "email", "textarea", "number", "password", "url", "tel"):
            lbl = f.get("label", "").strip()
            ph  = f.get("settings", {}).get("placeholder", "").strip()
            if ph and not lbl:
                issues.append({
                    "field_id": f["id"],
                    "issue": "Placeholder without label",
                    "suggestion": "Placeholders disappear on focus—add a visible label instead.",
                    "severity": "medium"
                })
    return issues

def check_contrast(fields: List[Dict]) -> List[Dict]:
    """Ensure textColor/backgroundColor meet at least 4.5:1 contrast."""
    issues = []
    for f in fields:
        settings = f.get("settings", {})
        fg = settings.get("textColor")
        bg = settings.get("backgroundColor")
        if fg and bg:
            ratio = _contrast_ratio(fg, bg)
            if ratio < 4.5:
                issues.append({
                    "field_id": f["id"],
                    "issue": "Low color contrast",
                    "suggestion": f"Contrast is {ratio:.1f}:1; increase to at least 4.5:1.",
                    "severity": "medium"
                })
    return issues

def check_required_indicator(fields: List[Dict]) -> List[Dict]:
    """Required fields must have an asterisk (*) in the label and/or aria-required."""
    issues = []
    for f in fields:
        if f.get("required"):
            lbl = f.get("label", "")
            # If they didn't mark it visually or via aria in builder
            if "*" not in lbl:
                issues.append({
                    "field_id": f["id"],
                    "issue": "Missing required indicator",
                    "suggestion": "Mark required fields with an asterisk (*) and add aria-required=\"true\".",
                    "severity": "low"
                })
    return issues

def check_group_options(fields: List[Dict]) -> List[Dict]:
    """
    Checkbox/radio/select need at least one option and a group label.
    Radios and checkboxes should be wrapped in a fieldset with a legend.
    """
    issues = []
    for f in fields:
        t = f["type"]
        opts = f.get("settings", {}).get("options", [])
        if t in ("checkbox", "radio", "select"):
            # No options provided
            if not opts:
                issues.append({
                    "field_id": f["id"],
                    "issue": "No options provided",
                    "suggestion": "Add at least one option to this field.",
                    "severity": "high"
                })
            # Missing group label (fieldset legend)
            if t in ("checkbox", "radio"):
                lbl = f.get("label", "").strip()
                if not lbl:
                    issues.append({
                        "field_id": f["id"],
                        "issue": "Missing group label",
                        "suggestion": "Wrap options in a fieldset and add a legend for the group.",
                        "severity": "high"
                    })
    return issues

def check_button_attributes(fields: List[Dict]) -> List[Dict]:
    """Buttons need descriptive text and an explicit type attribute."""
    issues = []
    for f in fields:
        if f["type"] == "button":
            lbl = f.get("label", "").strip()
            if not lbl or lbl.lower() == "button":
                issues.append({
                    "field_id": f["id"],
                    "issue": "Generic or missing button label",
                    "suggestion": "Use descriptive text (e.g. 'Submit form') and set type='button' or 'submit'.",
                    "severity": "low"
                })
    return issues

def check_file_accept(fields: List[Dict]) -> List[Dict]:
    """Warn if file input is missing accept attribute."""
    issues = []
    for f in fields:
        if f["type"] == "file":
            accept = f.get("settings", {}).get("accept", "").strip()
            if not accept:
                issues.append({
                    "field_id": f["id"],
                    "issue": "File input missing accept attribute",
                    "suggestion": "Specify allowed file types using the accept attribute (e.g. .jpg,.png,.pdf).",
                    "severity": "medium"
                })
    return issues

def check_min_max_logic(fields: List[Dict]) -> List[Dict]:
    """Warn if number/date min > max."""
    issues = []
    for f in fields:
        if f["type"] in ("number", "date"):
            settings = f.get("settings", {})
            min_val = settings.get("min")
            max_val = settings.get("max")
            if min_val and max_val:
                try:
                    if f["type"] == "number":
                        if float(min_val) > float(max_val):
                            issues.append({
                                "field_id": f["id"],
                                "issue": "Min greater than max",
                                "suggestion": "Minimum value should not be greater than maximum value.",
                                "severity": "medium"
                            })
                    elif f["type"] == "date":
                        if min_val > max_val:
                            issues.append({
                                "field_id": f["id"],
                                "issue": "Min date after max date",
                                "suggestion": "Minimum date should not be after maximum date.",
                                "severity": "medium"
                            })
                except Exception:
                    pass
    return issues

def check_empty_section(fields: List[Dict]) -> List[Dict]:
    """Warn if section/heading is empty."""
    issues = []
    for f in fields:
        if f["type"] == "section":
            if not f.get("label") or not f["label"].strip():
                issues.append({
                    "field_id": f["id"],
                    "issue": "Empty section heading",
                    "suggestion": "Section headings should not be empty.",
                    "severity": "low"
                })
    return issues

def check_duplicate_ids(fields: List[Dict]) -> List[Dict]:
    """Warn if any two fields have the same id."""
    issues = []
    seen = set()
    for f in fields:
        if f["id"] in seen:
            issues.append({
                "field_id": f["id"],
                "issue": "Duplicate field id",
                "suggestion": "Each field must have a unique id.",
                "severity": "high"
            })
        seen.add(f["id"])
    return issues

def check_button_type(fields: List[Dict]) -> List[Dict]:
    """Warn if button is missing type attribute or has an invalid type."""
    issues = []
    for f in fields:
        if f["type"] == "button":
            btn_type = f.get("settings", {}).get("type", "button")
            if btn_type not in ("button", "submit", "reset"):
                issues.append({
                    "field_id": f["id"],
                    "issue": "Button missing or invalid type",
                    "suggestion": "Button should have type='button', 'submit', or 'reset'.",
                    "severity": "low"
                })
    return issues


# ─── Aggregator ───────────────────────────────────────────────────────────────

def run_all_checks(fields: List[Dict]) -> List[Dict]:
    """
    Run every accessibility check and return a flat list of
    all issues found across all field types.
    """
    results = []
    results.extend(check_missing_label(fields))
    results.extend(check_placeholder_without_label(fields))
    results.extend(check_contrast(fields))
    results.extend(check_required_indicator(fields))
    results.extend(check_group_options(fields))
    results.extend(check_button_attributes(fields))
    results.extend(check_file_accept(fields))
    results.extend(check_min_max_logic(fields))
    results.extend(check_empty_section(fields))
    results.extend(check_duplicate_ids(fields))
    results.extend(check_button_type(fields))
    return results
