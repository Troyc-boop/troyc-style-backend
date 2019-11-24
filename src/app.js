import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import apiRouter from './routes/api/api';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import User from './models/user';



mongoose.connect('mongodb://backend:secret@localhost/troycstyle', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', () => console.error(console, 'connection error:'));
db.once('open', function () {
    console.log('conected to database');

});

const app = express();
app.use(bodyParser({limit: '50mb'}));
app.use(logger('dev'));
app.use(express.json());
app.use((req, res, next) => {

    const authorizationHeader = req.get('Authorization');
    if (!authorizationHeader){
        return next();
    }
    const authorizationHeaderFragments = authorizationHeader.split(' ');
    if (authorizationHeaderFragments.length !== 2) {

        return res.status(400). send('Authorization header format incorrect. Use format "Bearer <tonken>"');
    }
    else if (authorizationHeaderFragments[0] !== 'Bearer'){

        return res.status(400). send('Authorization header format incorrect. Use format "Bearer <tonken>"');
    }
    const token = authorizationHeaderFragments[1];
    try {
        const decodedToken = jwt.verify(token, 'tin');
        User.findById(decodedToken.userId, (err, user) =>{
            if (err) {
                res.status(500).send(err);
                return;
            }
            req.user = user;
            next();
        });
    }
    catch (e) {

        res.status(403).send('E neces razbojnice');
    }
});

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/public', express.static('/home/troyc/Documents/bitbucket/backend/public'));



app.use('/api', apiRouter);

export default app;
