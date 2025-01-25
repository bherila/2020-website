SELECT t_symbol, SUM(t_amt) as total_amount
FROM fin_account_line_items
WHERE t_account = ?
AND when_deleted IS NULL
AND t_symbol IS NOT NULL
GROUP BY t_symbol
ORDER BY (SUM(t_amt)) DESC