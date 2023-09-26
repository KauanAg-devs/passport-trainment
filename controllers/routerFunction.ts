import Crud from './crud';
import express, { Application } from 'express';
import Middlewares from './middlewares';
import passport from 'passport';
import session from 'express-session';

const crud = new Crud();
const middleware = new Middlewares();

class RouterHandler {
    public async getHandler(req: any, res: any) {
        const foundUser = await crud.get(req.body);
        console.log('found user:'+ foundUser);
        
        res.status(200).json({ message: foundUser });
    }

    public async postHandler(req: any, res: any) {
        const createdUser = await crud.post(req.body);
        res.status(200).json({ message: createdUser });
    }

    public async putHandler(req: any, res: any) {
        const { email, password, newEmail, newPassword } = req.body;
        const updatedUser = await crud.put(
            { email, password },
            { email: newEmail, password: newPassword }
        );
        res.status(200).json({ message: updatedUser });
    }

    public async deleteHandler(req: any, res: any) {
        const deletedUser = await crud.delete(req.body);
        res.status(200).json({ message: deletedUser });
    }
}

class RouterFunction {
    private app: Application;
    private router = new RouterHandler();
    constructor(app: Application) {
        this.app = app;
    }

    private routes() {
        const Router = express.Router();
        this.app.use(express.json());
        Router.use(
            session({
                secret: `key-api-key-`,
                resave: true,
                saveUninitialized: true,
            })
        );
        middleware.isUserAccepted();

        Router.post(
            '/login',
            passport.authenticate('local', { failureRedirect: `/` }),
            this.router.getHandler
        );
        Router.post('/signin', this.router.postHandler);
        Router.put('/updateAccount', this.router.putHandler);
        Router.delete('/deleteAccount', this.router.deleteHandler);
        Router.use(middleware.routeDoesntExists);
        this.app.use(Router);
    }
    public start(PORT: number) {
        this.routes();
        this.app.listen(PORT, () =>
            console.log(`server loading on PORT ${PORT}`)
        );
    }
}

export default RouterFunction;
