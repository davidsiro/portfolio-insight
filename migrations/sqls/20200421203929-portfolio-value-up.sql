create view portfolio_value as
select symbol,
       sum(aa.quantity * aa.price) * 0.0001 as invested_amount,
       sum((select close from asset_price ap where ap.symbol = a.symbol order by day desc limit 1) * quantity) * 0.0001
                                            as current_value
from asset_allocation aa
         left join asset a on aa.isin = a.isin
where buy_sell = 'B'
group by symbol;