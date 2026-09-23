import {Router} from "express";
import {
    createCourse,
    deleteCourse,
    getCourses,
    getCoursesById,
    updateCourse,
} from "../controllers/courses.js";

const coursesRouter = Router();

coursesRouter.get("/", getCourses);
coursesRouter.get("/:id", getCoursesById);

coursesRouter.post("/", createCourse);

coursesRouter.put("/:id", updateCourse);

coursesRouter.delete("/:id", deleteCourse);

export default coursesRouter;
