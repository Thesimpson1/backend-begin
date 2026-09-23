import type {Request, Response} from "express";
import {db, Status} from "../constants/index.js";
import type {RequestWithBody, RequestWithParams} from "../types/index.js";
import {
    createCourse as createCourseService,
    deleteCourse as deleteCourseService,
    getCoursesById as getCoursesByIdService,
    updateCourse as updateCourseService,
} from "../services/courses.js";

export const getCourses = (req: Request, res: Response) => {
    res.status(Status.OK).json(db.courses);
};
export const getCoursesById = (req: RequestWithParams<{id: string}>, res: Response) => {
    const idCourse = req.params.id;
    const course = getCoursesByIdService(idCourse);
    if (!course) {
        return res.status(Status.NOT_FOUND).json({message: "Course not found"});
    }
    res.status(Status.OK).json(course);
};
export const createCourse = (req: RequestWithBody<{name: string}>, res: Response) => {
    if (!req?.body) {
        return res.status(Status.BAD_REQUEST).json({message: "Body is required"});
    }
    if (!req?.body.name) {
        return res.status(Status.BAD_REQUEST).json({message: "Name is required"});
    }
    const updatedCourses = createCourseService(req.body.name);
    res.status(Status.CREATED).json(updatedCourses);
};
export const updateCourse = (req: RequestWithParams<{id: string}>, res: Response) => {
    const idCourse = req.params.id;
    if (!req?.body) {
        return res.status(Status.BAD_REQUEST).json({message: "Body is required"});
    }

    if (!req?.body.name) {
        return res.status(Status.OK).json(db.courses);
    }
    const updatedCourses = updateCourseService({id: idCourse, name: req.body.name});
    if (!updatedCourses) {
        return res.status(Status.NOT_FOUND).json({message: "Course not found"});
    }
    res.status(Status.OK).json(updatedCourses);
};
export const deleteCourse = (req: RequestWithParams<{id: string}>, res: Response) => {
    const idCourse = req.params.id;
    const updatedCourses = deleteCourseService(idCourse);
    if (!updatedCourses) {
        return res.status(Status.NOT_FOUND).json({message: "Course not found"});
    }
    res.status(200).json(updatedCourses);
};
