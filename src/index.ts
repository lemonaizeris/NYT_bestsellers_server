import { Application } from 'express';
import { Server } from 'http';
import createServer from './utils/server';

const PORT: number = Number(process.env.PORT) || 4000;
const app: Application = createServer();

const server: Server = app.listen(PORT, () => {
    console.log(`\x1b[33m%s ${PORT}\x1b[0m`, `Server is running on port`);
});