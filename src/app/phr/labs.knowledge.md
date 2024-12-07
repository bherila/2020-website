# PHR Labs Module

# Database Schema

```sql
CREATE TABLE `phr_lab_results` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `user_id` int(11) DEFAULT NULL COMMENT 'FK to users.id, the logged in user',
 `test_name` varchar(255) DEFAULT NULL,
 `collection_datetime` datetime DEFAULT NULL,
 `result_datetime` datetime DEFAULT NULL,
 `result_status` varchar(50) DEFAULT NULL,
 `ordering_provider` varchar(100) DEFAULT NULL,
 `resulting_lab` varchar(100) DEFAULT NULL,
 `analyte` varchar(100) DEFAULT NULL,
 `value` varchar(20) DEFAULT NULL,
 `unit` varchar(20) DEFAULT NULL,
 `range_min` decimal(10,2) DEFAULT NULL COMMENT 'Value (unit) should be greater than or equal to this value',
 `range_max` decimal(10,2) DEFAULT NULL COMMENT 'Value (unit) should be less than or equal to this value',
 `range_unit` varchar(20) DEFAULT NULL COMMENT 'Unit of range_min and range_max',
 `normal_value` varchar(50) DEFAULT NULL COMMENT 'Value is normal if it equals this e.g. "Not Detected"',
 `message_from_provider` mediumtext DEFAULT NULL,
 `result_comment` mediumtext DEFAULT NULL,
 `lab_director` varchar(100) DEFAULT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci
```

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

### Database Schema
- Numeric values stored with 4 decimal precision 
- Range bounds stored with 2 decimal precision
- All text fields are nullable to handle incomplete/pending results
- User relationship enforced through user_id foreign key
