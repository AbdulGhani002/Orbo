const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase() {
    const client = await MongoClient.connect(process.env.MONGO_URI);
    database = client.db("orbo");
}

function getDb() {
    if (!database) {
        throw new Error("You must connect first!");
    }

    return database;
}

module.exports = {
    connectToDatabase: connectToDatabase,
    getDb: getDb,
};