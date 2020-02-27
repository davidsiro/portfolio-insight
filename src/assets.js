const pool = require("./postgres");

class Assets {

    findAllAssets() {
        return pool.query('SELECT * FROM asset').then(rs => rs.rows);
    }

}

module.exports = new Assets();

