# Lab Results Business Rules

## Range Checking
- When `normal_value` is specified, the result must exactly match this value
- Otherwise, check if value falls between `range_min` and `range_max`
- Treat `range_max` > 999999 as infinity
- Treat `range_min` < -999999 as negative infinity

## Display Views
- Table View: Complete detailed view with all fields
- Tile View: Grouped by test name to show trends over time
  - Shows latest range information at top of each group
  - Displays warning icon for out-of-range values

## Data Organization
- Results are primarily organized by test name
- Within each test group, sort by result date descending
- Range information should be taken from most recent result in group
