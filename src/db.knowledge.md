# Database Guidelines

## Schema Design
- Primary keys (id) are the preferred way to identify records
- Use primary key for updates/deletes instead of composite keys
- UTF8MB3 is the standard character set for text fields
- ASCII is used for technical fields (e.g. product keys)
- Use nullable fields by default unless required by business logic
- Standard varchar sizes: 100 for names/identifiers, 2000 for long text
- Add unique constraints on business-critical fields that must be unique

## Query Patterns
- Always query/update using primary key when available
- Use prepared statements with parameterized queries
- Avoid composite key conditions unless required by business logic

## Tables
### product_keys

Table for storing software product license keys:
```sql
CREATE TABLE `product_keys` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `uid` int(11) DEFAULT NULL,
 `product_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
 `product_key` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
 `product_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
 `computer_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
 `comment` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
 `used_on` date DEFAULT NULL,
 `claimed_date` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
 `key_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
 `key_retrieval_note` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
 PRIMARY KEY (`id`),
 UNIQUE KEY `product_key` (`product_key`) USING HASH
) ENGINE=MyISAM AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```
