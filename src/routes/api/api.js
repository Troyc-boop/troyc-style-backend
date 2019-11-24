import express from 'express';
import userRouter from './user/router';
import itemRouter from './item/router';
import favoriteCombinationRouter from './favorite/router';
const apiRouter = express.Router();

/* GET home page. */
apiRouter.get('/', (req, res) =>{
    res.send('test');
});

const requireLogin = (router)=>{
    return (req, res, next) =>{
        if (!req.user) {
            res.status(401).send('You must be logged in');
        }
        router(req, res, next);
    };

};

apiRouter.use('/user', userRouter);

apiRouter.use('/item', requireLogin(itemRouter));

apiRouter.use('/favorite', requireLogin(favoriteCombinationRouter));


export default apiRouter;
