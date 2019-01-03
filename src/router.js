const express = require("express");
const mongoHelper = require("./mongo-helper");

const router = express.Router();

function getRoutes(routerInstance) {
    return routerInstance.stack.map(layer => ({
        [Object.keys(layer.route.methods)]: layer.route.path
    }));
}

router.get("/", (req, res) => {
    res.json({
        status: "ok",
        message: "welcome",
        links: getRoutes(router).map(x => `http://localhost${x.get}`)
    });
});

router.get("/test", async (req, res) => {
    try {
        await mongoHelper.canConnect();
        res.json({
            status: "ok",
            message: "connected"
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
});

router.get("/setup", async (req, res) => {
    try {
        await mongoHelper.buildScheme();
        res.json({
            status: "ok",
            message: "inserted data into database"
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
});

router.get("/cars/:name", async (req, res) => {
    try {
        const results = await mongoHelper.getByName(req.params.name);
        res.json({
            status: "ok",
            message: "returns data from database",
            results
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
});

router.get("/*", (req, res) => {
    res.status(400).json({
        status: "error",
        message: "unsupported endpoint"
    });
});

module.exports = router;
