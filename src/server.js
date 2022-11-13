require("dotenv").config({ path: ".env" });
const globals = require("./config/globals");
const appConfiguration = require("./main");
const PORT = globals.PORT;
const HOST = globals.HOST;

const start = async () => {
    const app = await appConfiguration();
    app.listen(PORT, HOST, () => {
        console.log(`Server running in ${HOST}:${PORT}`);
    });
};
start();
