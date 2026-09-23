export enum Status {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}
//Todo: this is going to be replaced by a database
export const db = {
    courses: [
        {id: 1, name: "Node.js"},
        {id: 2, name: "React"},
        {id: 3, name: "Angular"},
        {id: 4, name: "Vue"},
    ],
};
