#!/bin/bash

docker exec -i portfolioinsight_pi-data-collector_1 node src/stream-asset-allocation-csv-importer.js < $1
