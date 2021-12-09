const MongoClient = require("mongodb").MongoClient;

let client;

module.exports.initializeDbConnection = async () => {
    client = await MongoClient.connect('mongodb://localhost:27017', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

module.exports.getDbConnection = dbName => {
    const db = client.db(dbName);
    return db;
}