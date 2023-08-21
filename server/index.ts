const express = require("express");
const app = express();
const cors = require("cors");
const DBPool = require("./db");

import { Request, Response, NextFunction } from "express";

app.use(cors());
app.use(express.json());

const PORT: number = 5000;

app.post("/v1/users", async (req: Request, res: Response) => {
    try {
        console.log(req.body)
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error.message)
        }
    }
})

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`)
})