import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import pool from "./src/config/db.js";
import serverless from "serverless-http";
import router from './src/routes/routes.js'
import errorHandling from "./src/middlewares/errorHandler.js";
//import createCompanyTable from "./src/data/createCompanyTable.js";
//import createUserTable from "./src/data/createUserTable.js";
//import createOrderTable from "./src/data/createOrderTable.js"

dotenv.config();
const app = express();

//Middlewares
app.use(express.json({ limit: '50mb' }));
app.use(cors());

//Routes
app.use("/api", router);

// Error Handling middleware
app.use(errorHandling);
{/*
//testing
app.get("/", async (req, res) => {

    const result = await pool.query("SELECT current_database()");
    res.send(`The database name is : ${result.rows[0].current_database}`)
})

//Server dev running
if (process.env.ENV === 'DEV') {
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
        console.log(`Server is running on http:localhost:${port}`)
    });
}
*/}

const handleRequest = serverless(app);

export const handler = async (event,context) => {
    return await handleRequest(event,context);
}



