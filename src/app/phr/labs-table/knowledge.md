# SQL schema

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
 `value` decimal(10,4) DEFAULT NULL,
 `unit` varchar(20) DEFAULT NULL,
 `range_min` decimal(10,2) DEFAULT NULL COMMENT 'Value (unit) should be greater than or equal to this value',
 `range_max` decimal(10,2) DEFAULT NULL COMMENT 'Value (unit) should be less than or equal to this value',
 `range_unit` varchar(20) DEFAULT NULL COMMENT 'Unit of range_min and range_max',
 `normal_value` varchar(50) DEFAULT NULL COMMENT 'Value is normal if it equals this e.g. "Not Detected"',
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci
```

