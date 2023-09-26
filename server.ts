import express from 'express';
import RouterFunction from './controllers/routerFunction';
import connectDB from './models/dbconn';
const app = express();

const routerFunction = new RouterFunction(app);

connectDB().then(() => {
    routerFunction.start(3000);
});
