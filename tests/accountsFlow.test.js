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

    test("Should not get all accounts from the page 1 -> bad path: whitout token", async () => {
        const { body: response } = await request.get(`/accounts?page=1`);
        expect(response.access).toBe(false);
    });

    test("Should update a account -> happy path", async () => {
        const accountNameString = `accountName-${generate()}`;
        const clientNameString = `clientName-${generate()}`;
        const responsibleNameString = `responsibleName-${generate()}`;

        const accountNameStringUpdated = `accountName-${generate()}`;
        const clientNameStringUpdated = `clientName-${generate()}`;
        const responsibleNameStringUpdated = `responsibleName-${generate()}`;

        const account = {
            accountName: accountNameString,
            clientName: clientNameString,
            responsible: responsibleNameString,
        };
        const accountUpdatedInfo = {
            accountName: accountNameStringUpdated,
            clientName: clientNameStringUpdated,
            responsible: responsibleNameStringUpdated,
        };

        const { body: accountCreated } = await request
            .post("/accounts")
            .set("Authorization", tokenTest)
            .send(account);

        const { _id } = accountCreated;
        const { body: accountUpdated } = await request
            .put(`/accounts/${_id}`)
            .set("Authorization", tokenTest)
            .send(accountUpdatedInfo);

        expect(accountCreated.accountName).not.toBe(accountUpdated.name);
        expect(accountCreated.clientName).not.toBe(accountUpdated.clientName);
        expect(accountCreated.responsible).not.toBe(accountUpdated.responsible);
    });
    test("Should not update a account -> bad path: invalid values", async () => {
        const accountNameString = `accountName-${generate()}`;
        const clientNameString = `clientName-${generate()}`;
        const responsibleNameString = `responsibleName-${generate()}`;
        const account = {
            accountName: accountNameString,
            clientName: clientNameString,
            responsible: responsibleNameString,
        };
        const accountUpdatedInfo = {
            accountName: "",
            clientName: "",
            responsible: "",
        };

        const { body: accountCreated } = await request
            .post("/accounts")
            .set("Authorization", tokenTest)
            .send(account);

        const { _id } = accountCreated;
        const { body: response } = await request
            .put(`/accounts/${_id}`)
            .set("Authorization", tokenTest)
            .send(accountUpdatedInfo);

        expect(response.errors).toEqual([
            { param: "accountName", msg: "Account name is too short" },
            { param: "clientName", msg: "Client name is too short" },
            { param: "responsible", msg: "Responsible is too short" },
        ]);
    });
    test("Should not update a account -> bad path: without token", async () => {
        const { body: response } = await request.put(`/accounts/invalidId`).send({});
        expect(response.access).toBe(false);
    });

    test("Should get account by id -> happy path", async () => {
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

        const { _id } = accountCreated;

        const { body: accountFound } = await request
            .get(`/accounts/${_id}`)
            .set("Authorization", tokenTest);

        const { accountName, clientName, responsible } = accountFound;
        expect(accountName).toBe(accountNameString);
        expect(clientName).toBe(clientNameString);
        expect(responsible).toBe(responsibleNameString);
    });

    test("Should get account by id -> bad path: invalid id", async () => {
        const { body: response } = await request
            .get(`/accounts/fff`)
            .set("Authorization", tokenTest);

        expect(response.errors).toEqual([{ param: "id", msg: "Invalid id format" }]);
    });
    test("Should get accounts by name -> happy path", async () => {
        const code = generate();
        const accountNameString1 = `accountName-${code}`;
        const clientNameString1 = `clientName-${code}`;
        const responsibleNameString1 = `responsibleName-${code}`;
        const account1 = {
            accountName: accountNameString1,
            clientName: clientNameString1,
            responsible: responsibleNameString1,
        };

        const { body: accountCreated1 } = await request
            .post("/accounts")
            .set("Authorization", tokenTest)
            .send(account1);

        const { body: accounts } = await request
            .get(`/accounts/accountName/${code}`)
            .set("Authorization", tokenTest);
        expect(accounts.length).toBe(1);
        expect(accounts[0].accountName).toBe(accountCreated1.accountName);
    });

    test("Should delete account by id -> happy path", async () => {
        const code = generate();
        const accountNameString1 = `accountName-${code}`;
        const clientNameString1 = `clientName-${code}`;
        const responsibleNameString1 = `responsibleName-${code}`;
        const account1 = {
            accountName: accountNameString1,
            clientName: clientNameString1,
            responsible: responsibleNameString1,
        };

        const { body: accountCreated1 } = await request
            .post("/accounts")
            .set("Authorization", tokenTest)
            .send(account1);

        const { body: response } = await request
            .delete(`/accounts/${accountCreated1._id}`)
            .set("Authorization", tokenTest);
        expect(response.msg).toBe("Account successfully deleted");
    });
    test("Should not delete account by id -> bad path: invalid id", async () => {
        const { body: response } = await request
            .delete(`/accounts/faosudhirnw`)
            .set("Authorization", tokenTest);
        expect(response.msg).toBe("Error while deleting team");
    });
});
