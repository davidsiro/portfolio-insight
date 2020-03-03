CREATE TABLE asset (
    symbol       char(20) PRIMARY KEY,
    name         varchar NOT NULL
);

CREATE TABLE asset_price (
    day        date,
    symbol     char(20) references asset(symbol),
    open       bigint,
    high       bigint,
    low        bigint,
    close      bigint,
    adjusted_close       bigint,
    volume bigint,
    dividend_amount bigint,
    split_coefficient numeric
);

ALTER TABLE asset_price ADD CONSTRAINT asset_price_pk PRIMARY KEY (day, symbol);


INSERT INTO asset (symbol, name) VALUES ('WRD.PAR', 'HSBC MSCI World UCITS ETF')