const ora = require("ora");
const spinner = ora("Loading...").start();

const express = require("express");
const morgan = require("morgan");
const config = require("./config.json");
const router = require("./router");

const app = express();

app.use(morgan("dev"));
app.use(router);

app.listen(config.PORT, () => {
    spinner.succeed(`Server was started at http://localhost:${config.PORT}`);
});
