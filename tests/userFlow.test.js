const superTest = require("supertest");
require("dotenv").config({ path: ".env" });
const { generate } = require("shortid");
const gloabls = require("../src/config/globals");
const { bcryptHelpers } = require("../src/helpers");
gloabls.DATABASE = process.env.DB_TEST_URL;
gloabls.COLLECTION = process.env.DB_TEST_COLLECTION;
const tokenTest = `Bearer ${process.env.TOKEN_TEST}`;

describe("Testing CRUD Users", () => {
    let request;
    let roleId;
    beforeEach(async () => {
        const appConfiguration = require("../src/main");
        const app = await appConfiguration();
        request = superTest(app);
        const { body: rolesReponse } = await request.get("/roles").set("Authorization", tokenTest);
        roleId = rolesReponse.find((roleAux) => roleAux.name === "Normal")._id;
    });

    test("Should create a normal user -> happy path", async () => {
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

        const { name, email, password, role } = userAdded;
        expect(name).toBe(nameUser);
        expect(email).toBe(emailUser);
        expect(role).toBe(roleUser);
        expect(await bcryptHelpers.compareInfo(passwordUser, password)).toBe(true);
    });

    test("Should not create a normal user -> bad path: request without token", async () => {
        const { body: response } = await request.post("/users").send({
            name: "",
            email: "",
            password: "",
            role: "",
        });
        expect(response.access).toBe(false);
    });
    test("Should not create a normal user -> bad path: bad user values", async () => {
        const { body: response } = await request
            .post("/users")
            .set("Authorization", tokenTest)
            .send({
                name: "",
                email: "",
                password: "",
                role: "",
            });

        const { errors } = response;
        expect(errors.length).toBe(8);
        const errosEqual = [
            { param: "role", msg: "Role is required" },
            { param: "role", msg: "Invalid role id format" },
            { param: "name", msg: "Name is required" },
            { param: "name", msg: "Name is too short" },
            { param: "password", msg: "Password is required" },
            { param: "password", msg: "Password is too short" },
            { param: "email", msg: "Email is required" },
            { param: "email", msg: "Invalid email format" },
        ];

        expect(errors).toEqual(errosEqual);
    });

    test("Should get All users from page 1 -> hppy path", async () => {
        const { body: response } = await request
            .get(`/users?page=${1}`)
            .set("Authorization", tokenTest);
        expect(response.users.length).toBeGreaterThan(0);
    });

    test("Should get All users from page 1 -> bad path: invalid query", async () => {
        const { body: response } = await request.get(`/users`).set("Authorization", tokenTest);
        const { errors } = response;
        const errorsEqual = [
            { param: "page", msg: "page query value is required" },
            { param: "page", msg: "Page must be a number" },
        ];
        expect(errors).toEqual(errorsEqual);
    });

    test("Should get a user by id -> happy path", async () => {
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

        const { _id } = userAdded;
        const { body: userFound } = await request
            .get(`/users/${_id}`)
            .set("Authorization", tokenTest);
        expect(userFound).toEqual(userAdded);
    });
    test("Should get a user by id -> bad path: invalid id user", async () => {
        const { body: response } = await request.get(`/users/${1}`).set("Authorization", tokenTest);
        const { errors } = response;
        const errorsEqual = [{ param: "id", msg: "Invalid id" }];
        expect(errors).toEqual(errorsEqual);
    });

    test("Should get users by name -> happy path", async () => {
        const code = generate();
        const nameUser1 = `username1${code}`;
        const emailUser1 = `email1${generate()}@gmail.com`;
        const passwordUser1 = `password`;
        const roleUser1 = roleId;
        const nameUser2 = `username2${code}`;
        const emailUser2 = `email2${generate()}@gmail.com`;
        const passwordUser2 = `password`;
        const roleUser2 = roleId;

        const { body: userAdded1 } = await request
            .post("/users")
            .set("Authorization", tokenTest)
            .send({
                name: nameUser1,
                email: emailUser1,
                password: passwordUser1,
                role: roleUser1,
            });
        const { body: userAdded2 } = await request
            .post("/users")
            .set("Authorization", tokenTest)
            .send({
                name: nameUser2,
                email: emailUser2,
                password: passwordUser2,
                role: roleUser2,
            });

        const { body: users } = await request
            .get(`/users/name/${code}`)
            .set("Authorization", tokenTest);
        const usersEqual = [userAdded1, userAdded2];
        expect(users).toEqual(usersEqual);
    });

    test("Should update user by id -> happy path", async () => {
        const code = generate();
        const nameUser = `username1${code}`;
        const emailUser = `email1${generate()}@gmail.com`;
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

        const newUserInfo = {
            name: `otherName-${generate()}`,
            password: "otherPassword",
        };

        const { body: userUpdated } = await request
            .put(`/users/${userAdded._id}`)
            .set("Authorization", tokenTest)
            .send(newUserInfo);

        expect(userAdded.email).toBe(userUpdated.email);
        expect(userAdded.name).not.toBe(userUpdated.name);
    });

    test("Should update user by id -> bad path: Bad email and role", async () => {
        const { body: response } = await request
            .put(`/users/${1}`)
            .set("Authorization", tokenTest)
            .send({ email: "email", role: "1" });

        expect(response.errors).toEqual([
            { param: "id", msg: "Invalid user id format" },
            { param: "role", msg: "Invalid role id format" },
            { param: "email", msg: "Invalid email format" },
            {
                param: "id",
                msg: 'Cast to ObjectId failed for value "1" (type string) at path "_id" for model "users"',
            },
        ]);
    });

    test("Should delte user by id -> happy path", async () => {
        const nameUser = `username1${generate()}`;
        const emailUser = `email1${generate()}@gmail.com`;
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

        const { body: response } = await request
            .delete(`/users/${userAdded._id}`)
            .set("Authorization", tokenTest);
        expect(response.msg).toBe("User successfully deleted");
    });

    test("Should delte user by id -> bad path", async () => {
        const { body: response } = await request
            .delete(`/users/6371362a9545253g68d76555`)
            .set("Authorization", tokenTest);
        expect(response.errors).toEqual([{ param: "id", msg: "Invalid id" }]);
    });
});
