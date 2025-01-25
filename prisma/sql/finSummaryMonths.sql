SELECT 
    DATE_FORMAT(t_date, '%Y-%m') as month,
    SUM(t_amt) as total_amount
FROM fin_account_line_items
WHERE t_account = ?
AND when_deleted IS NULL
GROUP BY DATE_FORMAT(t_date, '%Y-%m')
ORDER BY month DESC