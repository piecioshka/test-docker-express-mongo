const MongoClient = require("mongodb").MongoClient;
const config = require("./config.json");

const mongoConnectionUrl = `mongodb://${config.MONGO.host}:${config.MONGO.port}`;

module.exports = {
    async canConnect() {
        const client = await MongoClient.connect(
            mongoConnectionUrl,
            { useNewUrlParser: true }
        );

        client.close();
        return true;
    },

    async buildScheme() {
        const client = await MongoClient.connect(
            mongoConnectionUrl,
            { useNewUrlParser: true }
        );

        const db = client.db(config.MONGO.dbName);

        await db.createCollection("cars");

        db.collection("cars").insertMany([
            { name: "Ferrari", price: 1000000 },
            { name: "Mercedes", price: 1000000 }
        ]);

        client.close();
        return true;
    },

    async getByName(name) {
        const client = await MongoClient.connect(
            mongoConnectionUrl,
            { useNewUrlParser: true }
        );

        const db = client.db(config.MONGO.dbName);

        const result = db
            .collection("cars")
            .find({
                name: new RegExp(name, "i")
            })
            .toArray();

        client.close();
        return result;
    }
};
