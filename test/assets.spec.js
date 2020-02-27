require('dotenv').config();

const {findAllAssets} = require('../src/assets');
const assert = require('assert');

describe('Assets', () => {
    describe('loading configured assets', () => {
        it('should load configured assets', async () => {
            const all = await findAllAssets();
            console.log(all);
        });
    });
});
