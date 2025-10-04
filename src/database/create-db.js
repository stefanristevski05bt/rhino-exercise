const { Client } = require("pg");

const env = process.env.NODE_ENV || 'development';
const config = require(`../../settings.${env}.json`);
const dbConfig = {
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password
}

const databaseName = config.database.name;

async function createDb() {
    const client = new Client(dbConfig);

    try {
        await client.connect();
        const existingDb = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [databaseName]);

        if (existingDb.rowCount > 0) {
            console.log(`${databaseName} is allready existing`);
        }
        else {
            await client.query(`CREATE DATABASE ${databaseName}`);
        }
    }
    catch (error) {
        console.error('There was an error while creating database', error);
    }
    finally {
        await client.end();
    }
}

createDb();