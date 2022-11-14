const superTest = require("supertest");
require("dotenv").config({ path: ".env" });
const { generate } = require("shortid");
const gloabls = require("../src/config/globals");
const { jwtHelpers } = require("../src/helpers");
gloabls.DATABASE = process.env.DB_TEST_URL;
gloabls.COLLECTION = process.env.DB_TEST_COLLECTION;
const tokenTest = `Bearer ${process.env.TOKEN_TEST}`;

describe("Testing Login Flow", () => {
    let request;
    let roleId;
    beforeEach(async () => {
        const appConfiguration = require("../src/main");
        const app = await appConfiguration();
        request = superTest(app);
        const { body: rolesReponse } = await request.get("/roles").set("Authorization", tokenTest);
        roleId = rolesReponse.find((roleAux) => roleAux.name === "Normal")._id;
    });

    test("Should login successfully -> happy path", async () => {
        const nameUser = `user${generate()}`;
        const emailUser = `email${generate()}@email.com`;
        const passwordUser = `password`;
        const roleUser = roleId;
        const responseUser = await request.post("/users").set("Authorization", tokenTest).send({
            name: nameUser,
            email: emailUser,
            password: passwordUser,
            role: roleUser,
        });
        const { body: bodyUser } = responseUser;
        const { email } = bodyUser;
        const responseLogin = await request.post("/auth").send({
            email,
            password: passwordUser,
        });
        const { body: bodyLogin } = responseLogin;
        const { token } = bodyLogin;

        const isValidToken = jwtHelpers.validateJWT(token);
        expect(isValidToken.access).toBe(true);
    });

    test("Should not login successfully  -> bad path: Bad user credentials", async () => {
        const response = await request.post("/auth", {
            email: "email",
            password: "password",
        });
        const { errors } = response.body;
        const errorsEqual = [
            { param: "email", msg: "Email is required" },
            { param: "email", msg: "Invalid email format" },
            { param: "password", msg: "Password is required" },
            { param: "email", msg: "Invalid credentials" },
            { param: "password", msg: "Invalid credentials" },
        ];
        expect(errors.length).toBe(5);
        expect(errors).toEqual(errorsEqual);
    });
});
