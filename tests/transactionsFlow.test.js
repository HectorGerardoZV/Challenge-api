jest.setTimeout(60000);
const superTest = require("supertest");
require("dotenv").config({ path: ".env" });
const { generate } = require("shortid");
const gloabls = require("../src/config/globals");
const _ = require("mongoose-paginate-v2");
gloabls.DATABASE = process.env.DB_TEST_URL;
gloabls.COLLECTION = process.env.DB_TEST_COLLECTION;
const tokenTest = `Bearer ${process.env.TOKEN_TEST}`;
describe("Testing TransactionsLog Flow", () => {
    let request;
    let roleId;
    beforeEach(async () => {
        
        const appConfiguration = require("../src/main");
        const app = await appConfiguration();
        request = superTest(app);
        const { body: rolesReponse } = await request.get("/roles").set("Authorization", tokenTest);
        roleId = rolesReponse.find((roleAux) => roleAux.name === "Normal")._id;
    });

    test("Should get all transactions", async () => {
        const nameUser = `username${generate()}`;
        const emailUser = `email${generate()}@gmail.com`;
        const passwordUser = `password`;
        const roleUser = roleId;

        const { body: userAdded } = await request
            .post("/users")
            .set("Authorization", tokenTest)
            .send({
                name: nameUser,
                email: emailUser,
                password: passwordUser,
                role: roleUser,
            });

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

        await request
            .post("/teams")
            .set("Authorization", tokenTest)
            .send({ team: accountCreated.team, user: userAdded. _id });

        const { body: transactions } = await request.get("/transactionsLog").set(
            "Authorization",
            tokenTest
        );
        expect(transactions.length).toBeGreaterThan(0);
    });
});
