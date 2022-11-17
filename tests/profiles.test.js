const superTest = require("supertest");
require("dotenv").config({ path: ".env" });
const { generate } = require("shortid");
const gloabls = require("../src/config/globals");
const _ = require("mongoose-paginate-v2");
gloabls.DATABASE = process.env.DB_TEST_URL;
gloabls.COLLECTION = process.env.DB_TEST_COLLECTION;
const tokenTest = `Bearer ${process.env.TOKEN_TEST}`;

describe("Testing prfoiles flow", () => {
    let request;
    let roleId;
    beforeEach(async () => {
        const appConfiguration = require("../src/main");
        const app = await appConfiguration();
        request = superTest(app);
        const { body: rolesReponse } = await request.get("/roles").set("Authorization", tokenTest);
        roleId = rolesReponse.find((roleAux) => roleAux.name === "Normal")._id;
    });

    test("Should add a profile -> happy path", async () => {
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

        const englishLevel = "Level B2";
        const technicalKnowledge = "HTML5, CSS3, JavaScript, ReactJS, NodeJS";
        const linkCV = "https://google.com/drive/userCV.pdf";
        const profile = {
            user: userAdded._id,
            englishLevel,
            technicalKnowledge,
            linkCV,
        };
        const { body: profileAdded } = await request
            .post("/profiles/normal")
            .set("Authorization", tokenTest)
            .send(profile);
        expect(profileAdded.user.toString()).toBe(profile.user.toString());
        expect(profileAdded.englishLevel).toBe(profile.englishLevel);
        expect(profileAdded.technicalKnowledge).toBe(profile.technicalKnowledge);
        expect(profileAdded.linkCV).toBe(profile.linkCV);
    });

    test("Should add a profile -> bad path: user has already a profile", async () => {
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

        const englishLevel = "Level B2";
        const technicalKnowledge = "HTML5, CSS3, JavaScript, ReactJS, NodeJS";
        const linkCV = "https://google.com/drive/userCV.pdf";
        const profile = {
            user: userAdded._id,
            englishLevel,
            technicalKnowledge,
            linkCV,
        };
        await request.post("/profiles/normal").set("Authorization", tokenTest).send(profile);
        const { body: { errors } = response } = await request
            .post("/profiles/normal")
            .set("Authorization", tokenTest)
            .send(profile);

        expect(errors).toEqual([{ param: "user", msg: "This user already has a profile" }]);
    });

    test("Should add a profile -> bad path: invalid values", async () => {
        const { body: { errors } = response } = await request
            .post("/profiles/normal")
            .set("Authorization", tokenTest)
            .send({ user: "", englishLevel: "", technicalKnowledge: "", linkCV: "" });

        expect(errors).toEqual([
            { param: "user", msg: "User is required" },
            { param: "user", msg: "Error, user is not valid" },
            {
                param: "user",
                msg: 'Cast to ObjectId failed for value "" (type string) at path "user" for model "normalProfiles"',
            },
            { param: "englishLevel", msg: "English level is required" },
            { param: "englishLevel", msg: "English level is too short" },
            {
                param: "technicalKnowledge",
                msg: "Technical knowledge is required",
            },
            {
                param: "technicalKnowledge",
                msg: "Technical knowledge is too short",
            },
            { param: "linkCV", msg: "CV Link is required" },
        ]);
    });
});
