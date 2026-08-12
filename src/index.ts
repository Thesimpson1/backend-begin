import  express from 'express';
const app = express();
const port = process.env.PORT || 3003;

const jsonBodyParser = express.json();
app.use(jsonBodyParser);

const db = {
    courses: [
        {id: 1, name: 'Node.js'},
        {id: 2, name: 'React'},
        {id: 3, name: 'Angular'},
        {id: 4, name: 'Vue'}
    ]
};

enum Status {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}

app.get('/', (req, res) => {
   res.status(Status.OK).json({ message: 'Hello Backend!'});
});
app.get('/courses', (req, res) => {
    res.status(Status.OK).json(db.courses);
});

app.get('/courses/:id', (req, res) => {
    const course = db.courses.find(course => course.id === +req.params.id);
    if (!course) {
        return res.status(Status.NOT_FOUND).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
});
app.post('/courses', (req, res) => {
    if (!req?.body) {
        return res.status(Status.BAD_REQUEST).json({ message: 'Body is required' });
    }
    if (!req?.body.title) {
        return res.status(Status.BAD_REQUEST).json({ message: 'Title is required' });
    }
    const newCourse = {
        id: db.courses.length + 1,
        name: req.body.title
    };
    db.courses.push(newCourse);
    res.status(Status.CREATED).json(db.courses);
});
//Can be changed only title
app.put('/courses', (req, res) => {
    if (!req?.body) {
        return res.status(Status.BAD_REQUEST).json({ message: 'Body is required' });
    }
    if (!req?.body.id) {
        return res.status(Status.BAD_REQUEST).json({ message: 'id is required' });
    }
    if (!req?.body.title) {
        return res.status(Status.OK).json(db.courses);
    }
    const course = db.courses.find(course => course.id === +req.body.id);

    if (!course) {
        return res.status(Status.NOT_FOUND).json({ message: 'Course not found' });
    }

    const newCourse = {
        ...course,
        title: req.body.title
    };
    db.courses = db.courses.map(course => course.id === newCourse.id ? newCourse : course);
    res.status(Status.OK).json(db.courses);
});

app.delete('/courses/:id', (req, res) => {
    const course = db.courses.find(course => course.id === +req.params.id);
    if (!course) {
        return res.status(Status.NOT_FOUND).json({ message: 'Course not found' });
    }
    db.courses = db.courses.filter(course => course.id !== +req.params.id);
    res.status(200).json(db.courses);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
