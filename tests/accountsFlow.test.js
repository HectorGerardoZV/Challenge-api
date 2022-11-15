const superTest = require("supertest");
require("dotenv").config({ path: ".env" });
const { generate } = require("shortid");
const gloabls = require("../src/config/globals");
const { isValidObjectId } = require("mongoose");
gloabls.DATABASE = process.env.DB_TEST_URL;
gloabls.COLLECTION = process.env.DB_TEST_COLLECTION;
const tokenTest = `Bearer ${process.env.TOKEN_TEST}`;

describe("Testing Accounts Flow", () => {
    let request;
    beforeEach(async () => {
        const appConfiguration = require("../src/main");
        const app = await appConfiguration();
        request = superTest(app);
    });

    test("Should create a new account -> happy path", async () => {
        const accountNameString = `accountName-${generate()}`;
        const clientNameString = `clientName-${generate()}`;
        const responsibleNameString = `responsibleName-${generate()}`;

        const account = {
            accountName: accountNameString,
            clientName: clientNameString,
            responsible: responsibleNameString,
        };

        const { body: accountCreated } = await request
            .post("/accounts")
            .set("Authorization", tokenTest)
            .send(account);

        const { accountName, clientName, responsible, team } = accountCreated;
        expect(accountName).toBe(accountNameString);
        expect(clientName).toBe(clientNameString);
        expect(responsible).toBe(responsibleNameString);
        expect(isValidObjectId(team)).toBe(true);
    });
    test("Should not create a new account -> bad path: without token", async () => {
        const { body: response } = await request.post("/accounts").send({});
        expect(response.access).toBe(false);
    });
    test("Should not create a new account -> bad path: invalid values", async () => {
        const { body: response } = await request
            .post("/accounts")
            .set("Authorization", tokenTest)
            .send({});
        expect(response.errors).toEqual([
            { param: "accountName", msg: "Account name is required" },
            { param: "clientName", msg: "Client name is required" },
            { param: "responsible", msg: "Responsible is required" },
            { param: "accountName", msg: "Account name is too short" },
            { param: "clientName", msg: "Client name is too short" },
            { param: "responsible", msg: "Responsible is too short" },
        ]);
    });

});
