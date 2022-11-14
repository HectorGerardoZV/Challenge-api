const superTest = require("supertest");
require("dotenv").config({ path: ".env" });
const { generate } = require("shortid");
const gloabls = require("../src/config/globals");
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
        console.log(roleId);
    });
    test("Testing Login User -> happy path", async () => {
        const emailUser = `email${generate()}@email.com`;
        const passwordUser = `password`;
        const roleUser = roleId;
        const responseUser = await request.post("/users", {
            email: emailUser,
            password: passwordUser,
            role: roleUser,
        });
        const { body: bodyUser } = responseUser;
        const { email, password } = bodyUser;

        const responseLogin = await request.post("/auth", {
            email,
            password,
        });
        const { body: bodyLogin } = responseLogin;
        const { token } = bodyLogin;
        expect(token).not.toBe(undefined);
    });

    test("Testing Login User -> bad path: Bad user credentials", async () => {
        try {
            await request.post("/auth", {
                email: "email",
                password: "password",
            });
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            
        }
    });
});
