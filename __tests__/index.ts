import request from "supertest";
import {app} from "../src/app.js";
import {db, Status} from "../src/constants/index.js";

describe("Check getCourses request", () => {
    it("returns 200 and the list of courses", async () => {
        const res = await request(app).get("/courses");

        expect(res.status).toBe(Status.OK);
        expect(res.headers["content-type"]).toMatch(/json/);
        expect(res.body).toEqual(db.courses);
    });
});
describe("Check getCoursesById request", () => {
    it("returns 200 and the list of courses", async () => {
        const res = await request(app).get("/courses/1");

        expect(res.status).toBe(Status.OK);
        expect(res.headers["content-type"]).toMatch(/json/);
        expect(res.body).toEqual(db.courses[0]);
    });
    it("returns 404 and the error message", async () => {
        const res = await request(app).get("/courses/0");

        expect(res.status).toBe(Status.NOT_FOUND);
        expect(res.headers["content-type"]).toMatch(/json/);
        expect(res.body.message).toEqual("Course not found");
    });
});
describe("Check createCourse request", () => {
    it("returns 201 and the updated list of courses", async () => {
        const res = await request(app)
            .post("/courses")
            .send({name: "NodeJS1"})
            .set("Content-Type", "application/json");

        expect(res.status).toBe(Status.CREATED);
        expect(res.headers["content-type"]).toMatch(/json/);
        //TODO: it is temporary solution for first move
        expect(res.body[4].name).toEqual("NodeJS1");
    });
    it("returns 400 and the error message", async () => {
        const res = await request(app).post("/courses");
        expect(res.status).toBe(Status.BAD_REQUEST);
        expect(res.headers["content-type"]).toMatch(/json/);
        expect(res.body.message).toEqual("Body is required");
    });
    it("returns 400 and the error message", async () => {
        const res = await request(app).post("/courses").set("Content-Type", "application/json");
        expect(res.status).toBe(Status.BAD_REQUEST);
        expect(res.headers["content-type"]).toMatch(/json/);
        expect(res.body.message).toEqual("Name is required");
    });
});
describe("Check updateCourse request", () => {
    it("returns 200 and the updated list of courses", async () => {
        const res = await request(app)
            .put("/courses/1")
            .send({name: "NodeJS1"})
            .set("Content-Type", "application/json");

        expect(res.status).toBe(Status.OK);
        expect(res.headers["content-type"]).toMatch(/json/);
        expect(res.body[0].name).toEqual("NodeJS1");
    });
    it("returns 200 and the list of courses", async () => {
        const res = await request(app).put("/courses/1").set("Content-Type", "application/json");

        expect(res.status).toBe(Status.OK);
        expect(res.headers["content-type"]).toMatch(/json/);
        expect(res.body).toEqual(db.courses);
    });
    it("returns 400 and the error message", async () => {
        const res = await request(app).put("/courses/1");
        expect(res.status).toBe(Status.BAD_REQUEST);
        expect(res.headers["content-type"]).toMatch(/json/);
        expect(res.body.message).toEqual("Body is required");
    });
    it("returns 404 and the error message", async () => {
        const res = await request(app)
            .put("/courses/0")
            .send({name: "NodeJS1"})
            .set("Content-Type", "application/json");
        expect(res.status).toBe(Status.NOT_FOUND);
        expect(res.headers["content-type"]).toMatch(/json/);
        expect(res.body.message).toEqual("Course not found");
    });
});
describe("Check deleteCourse request", () => {
    it("returns 200 and the updated list of courses", async () => {
        const res = await request(app).delete("/courses/1");

        expect(res.status).toBe(Status.OK);
        expect(res.headers["content-type"]).toMatch(/json/);
        expect(res.body).toEqual(db.courses);
    });
    it("returns 404 and the error message", async () => {
        const res = await request(app).delete("/courses/0");

        expect(res.status).toBe(Status.NOT_FOUND);
        expect(res.headers["content-type"]).toMatch(/json/);
        expect(res.body.message).toEqual("Course not found");
    });
});
