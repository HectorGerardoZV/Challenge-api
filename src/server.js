require("dotenv").config({ path: ".env" });
const app = require("./main");

const port = process.env.PORT;
const host = process.env.HOST;

app.listen(port, host, () => {
    console.log(`Server running in ${host}:${port}`);
});
