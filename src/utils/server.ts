import express, { Request, Response, NextFunction, Application, ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import createHttpError, { HttpError } from 'http-errors';

import books from '../routes/books';

function createServer() {
    const app: Application = express();
    dotenv.config();

    const corsOptions = {
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200 
    };

    app.use(express.json());
    app.use(cors(corsOptions));

    app.use('/books', books);


    app.use((req: Request, res: Response, next: NextFunction) => {
        next(new createHttpError.NotFound());
    });

    const errorHandler: ErrorRequestHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
        res.status(err.status || 500);
        res.send({
            status: err.status || 500,
            message: err.message
        });
    };
    app.use(errorHandler);

    return app;
}

export default createServer;