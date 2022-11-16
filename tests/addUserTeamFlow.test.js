const superTest = require("supertest");
require("dotenv").config({ path: ".env" });
const { generate } = require("shortid");
const gloabls = require("../src/config/globals");
gloabls.DATABASE = process.env.DB_TEST_URL;
gloabls.COLLECTION = process.env.DB_TEST_COLLECTION;
const tokenTest = `Bearer ${process.env.TOKEN_TEST}`;

describe("Testing Add User To Team Flow", () => {
    let request;
    let roleId;
    beforeEach(async () => {
        const appConfiguration = require("../src/main");
        const app = await appConfiguration();
        request = superTest(app);
        const { body: rolesReponse } = await request.get("/roles").set("Authorization", tokenTest);
        roleId = rolesReponse.find((roleAux) => roleAux.name === "Normal")._id;
    });

    test("Should add user to team -> happy path", async () => {
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
        const { body: response } = await request
            .post("/teams")
            .set("Authorization", tokenTest)
            .send({ team: accountCreated.team, user: userAdded._id });
        expect(response).toEqual({
            team: {
                _id: accountCreated.team,
                members: [userAdded._id],
                __v: 0,
            },
            msg: "User added successfully",
        });
    });
    test("Should add user to team -> bad path: user repeated in the same account", async () => {
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
            .send({ team: accountCreated.team, user: userAdded._id });
        const { body: response } = await request
            .post("/teams")
            .set("Authorization", tokenTest)
            .send({ team: accountCreated.team, user: userAdded._id });
        expect(response).toEqual({ msg: "This user is already registered in this account." });
    });
    test("Should move a user from a account to other account -> happy path", async () => {
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
        const accountNameString1 = `accountName-${generate()}`;
        const clientNameString1 = `clientName-${generate()}`;
        const responsibleNameString1 = `responsibleName-${generate()}`;
        const accountNameString2 = `accountName-${generate()}`;
        const clientNameString2 = `clientName-${generate()}`;
        const responsibleNameString2 = `responsibleName-${generate()}`;
        const account1 = {
            accountName: accountNameString1,
            clientName: clientNameString1,
            responsible: responsibleNameString1,
        };
        const account2 = {
            accountName: accountNameString2,
            clientName: clientNameString2,
            responsible: responsibleNameString2,
        };
        const { body: accountCreated1 } = await request
            .post("/accounts")
            .set("Authorization", tokenTest)
            .send(account1);
        const { body: accountCreated2 } = await request
            .post("/accounts")
            .set("Authorization", tokenTest)
            .send(account2);

        await request
            .post("/teams")
            .set("Authorization", tokenTest)
            .send({ team: accountCreated1.team, user: userAdded._id });
        const { body: response } = await request
            .post("/teams")
            .set("Authorization", tokenTest)
            .send({ team: accountCreated2.team, user: userAdded._id });

        expect(response).toEqual({
            team: {
                _id: accountCreated2.team,
                members: [userAdded._id],
                __v: 0,
            },
            msg: "User added successfully",
        });
    });
    test("Should add user to team -> bad path: invalid values", async () => {
        const { body: response } = await request
            .post("/teams")
            .set("Authorization", tokenTest)
            .send({ team: "", user: "" });
        expect(response.errors).toEqual([
            { param: "user", msg: "User is required" },
            { param: "user", msg: "Invalid user id format" },
            { param: "team", msg: "Team is required" },
            { param: "team", msg: "Invalid team id format" },
        ]);
    });
});
