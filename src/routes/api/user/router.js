import {signinRequestSchema, signupRequestSchema} from './schema';
import User from '../../../models/user';
import express from 'express';
import jwt from 'jsonwebtoken';


const userRouter = express.Router();


userRouter.post('/signup', (req, res) => {
    signupRequestSchema.validate(req.body).then(() => {

        const user = new User();
        user.name = req.body.name;
        user.gender = req.body.gender;
        user.password = req.body.password;
        user.username = req.body.username;
        user.save((err, user) => {
            if (err) {
                res.status(400).send(err);
                return;
            }
            res.send(user._id);
        });

    }).catch((err) => {
        res.status(400).send(err.errors);
    });
});


userRouter.post('/signin', (req, res) => {


    signinRequestSchema.validate(req.body).then(() => {
        User.findOne({
            username: req.body.username,
            password: req.body.password
        }, (err, user) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            if (!user) {
                res.status(404).send('Incorect username or password');
                return;
            }
            const token = jwt.sign({userId: user._id}, 'tin');
            res.send({token, user: user.toDto()});
        });
    });
});

export default userRouter;

// troyc eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDY0ZjUxNGY1NWFlNDRhODYxNTg5MTYiLCJpYXQiOjE1NjY4OTc2MTR9.vwGt5i33qWBNsi8Enf9OCq-gj1rBvl7QE3thLOMxMsg
// ante eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDY3OWMyM2YwMzFlYjE5MGE0Zjc1MjgiLCJpYXQiOjE1NjcwNzEyODl9.zdHFwwKEoKca5DDw7IeF772XhzTJgkRcx1DjY-H70rE