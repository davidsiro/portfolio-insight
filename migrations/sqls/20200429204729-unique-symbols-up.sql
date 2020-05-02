-- migrating to new symbols that alpha vantage api uses

SET CONSTRAINTS ALL DEFERRED;

ALTER TABLE asset
    ADD alpha_vantage_symbol char(20);

UPDATE asset
SET alpha_vantage_symbol = symbol;

ALTER TABLE asset
    ALTER COLUMN alpha_vantage_symbol SET NOT NULL;


UPDATE asset SET symbol = 'EUEA.AMS' WHERE symbol = 'EUEA.AS';
UPDATE asset_price SET symbol = 'EUEA.AMS' WHERE symbol = 'EUEA.AS';