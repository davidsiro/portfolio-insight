CREATE TABLE asset (
    symbol        char(20) PRIMARY KEY,
    name         varchar NOT NULL
);

INSERT INTO asset (symbol, name) VALUES ('WRD.PAR', 'HSBC MSCI World UCITS ETF')