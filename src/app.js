require('dotenv').config();
const DBMigrate = require('db-migrate');
const dbmigrate = DBMigrate.getInstance(true);

async function run() {
    console.log("Starting up...");
    console.log("Migrating database...");

    await dbmigrate.up();

    console.log("Migration finished...");

    console.log(process.env.ALPHA_VANTAGE_API_KEY)

    setTimeout(() => console.log("HELLO"), 1000);
}

run();

