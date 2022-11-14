const superTest = require("supertest");
require("dotenv").config({ path: ".env" });
const { generate } = require("shortid");
const gloabls = require("../src/config/globals");
const {jwtHelpers} = require("../src/helpers");
gloabls.DATABASE = process.env.DB_TEST_URL;
gloabls.COLLECTION = process.env.DB_TEST_COLLECTION;

describe("Testing Login Flow", () => {
    let request;
    let roleId;
    beforeEach(async () => {
        const appConfiguration = require("../src/main");
        const app = await appConfiguration();
        request = superTest(app);
        const rolesReponse = await request.get("/roles");
        roleId = rolesReponse.body[1]._id;
    });
    test("Testing Login User -> happy path", async () => {
        const nameUser = `user${generate()}`;
        const emailUser = `email${generate()}@email.com`;
        const passwordUser = `password`;
        const roleUser = roleId;
        const responseUser = await request.post("/users").send({
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

    test("Testing Login User -> bad path: Bad user credentials", async () => {
        const response = await request.post("/auth", {
            email: "email",
            password: "password",
        });
        const {errors} = response.body;
        expect(errors.length).toBe(5);
        expect(errors[0].param).toBe("email");
        expect(errors[0].msg).toBe("Email is required");
        expect(errors[1].param).toBe("email");
        expect(errors[1].msg).toBe("Invalid email format");
        expect(errors[2].param).toBe("password");
        expect(errors[2].msg).toBe("Password is required");
    });
});
