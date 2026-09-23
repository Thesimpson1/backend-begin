import {db} from "../constants/index.js";

export const getCoursesById = (id: string) => {
    return db.courses.find((course) => course.id === +id);
};
export const createCourse = (name: string) => {
    const newCourse = {
        id: db.courses.length + 1,
        name,
    };
    db.courses.push(newCourse);
    return db.courses;
};
export const updateCourse = ({id, name}: {id: string; name: string}) => {
    const course = db.courses.find((course) => course.id === +id);

    if (!course) {
        return null;
    }

    const newCourse = {
        ...course,
        name,
    };
    db.courses = db.courses.map((course) => (course.id === newCourse.id ? newCourse : course));
    return db.courses;
};
export const deleteCourse = (id: string) => {
    const course = db.courses.find((course) => course.id === +id);
    if (!course) {
        return false;
    }

    db.courses = db.courses.filter((course) => course.id !== +id);
    return db.courses;
};
