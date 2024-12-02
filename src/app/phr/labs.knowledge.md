# PHR Labs Module

## Domain Knowledge

### Lab Result Structure
- A lab test (e.g., "Complete Blood Count") can contain multiple analytes
- Each analyte (e.g., "White Blood Cell Count", "Hemoglobin") has its own reference range
- Reference ranges must be checked per analyte, not per lab test
- Reference ranges can be either:
  - A normal/expected value that results should equal
  - A numeric range with min/max bounds

### Display Guidelines
- Group results first by test name, then by analyte
- Show reference ranges with each analyte's results
- For normal value matches, display as "Equal to [value]"
- For range checks, display as "[min] to [max] [unit]"
