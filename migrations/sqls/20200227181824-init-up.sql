CREATE TABLE asset (
    symbol       char(20) PRIMARY KEY,
    isin         varchar UNIQUE not null,
    name         varchar NOT NULL,
    constraint isin_uq unique (isin));
);

CREATE TABLE asset_price (
    day        date not null,
    symbol     char(20) references asset(symbol) not null,
    open       bigint not null,
    high       bigint not null,
    low        bigint not null,
    close      bigint not null,
    adjusted_close       bigint not null,
    volume bigint not null,
    dividend_amount bigint not null,
    split_coefficient numeric not null
);

ALTER TABLE asset_price ADD CONSTRAINT asset_price_pk PRIMARY KEY (day, symbol);


CREATE TABLE asset_allocation (
   transaction_id varchar primary key,
   event_timestamp timestamp without timezone not null,
   isin varchar not null,
   quantity bigint not null,
   price bigint not null,
   buy_sell char(1) not null
);


INSERT INTO asset (symbol, name) VALUES ('WRD.PAR', 'HSBC MSCI World UCITS ETF')