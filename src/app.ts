import express from "express";
import coursesRouter from "./routes/courses.js";

const app = express();
const port = process.env.PORT || 3003;

const jsonBodyParser = express.json();
app.use(jsonBodyParser);

app.use("/courses", coursesRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
export default app;
