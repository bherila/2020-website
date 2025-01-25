SELECT 
    SUM(ABS(t_amt)) as total_volume,
    SUM(t_commission) as total_commission,
    SUM(t_fee) as total_fee
FROM fin_account_line_items 
WHERE t_account = ?
AND when_deleted IS NULL