import express from 'express';
import FavoriteCombination from '../../../models/favoriteCombination';
import {favoriteCombinationSaveRequestSchema} from './schema';


const favoriteCombinationRouter = new express.Router();


favoriteCombinationRouter.post('/', (req, res) => {

    favoriteCombinationSaveRequestSchema.validate(req.body).then(() => {
        const favoriteCombination = new FavoriteCombination();
        favoriteCombination.combination = req.body.combination;
        favoriteCombination.user = req.user._id;

        favoriteCombination.save(err => {

            if (err) {
                res.status(400).send(err);
                return;
            }

            res.send('The combination is saved');
        });

    }).catch(err => {
        res.status(400).send(err);
    });

});


favoriteCombinationRouter.get('/', (req, res)=> {
    FavoriteCombination.find({user: req.user._id}, (err, combination) => {
        if (err) {
            res.status(404).send(err);
            return;
        }

        res.send(combination);
    });
});


favoriteCombinationRouter.delete('/', (req, res)=> {
    FavoriteCombination.findById(req.body._id, (err, favoriteCombination) => {
        if (err) {
            res.status(404).send(err);
            return;
        }

        if (req.user._id.toString() !== favoriteCombination.user.toString()){
            res.status(401).send('You can only delete your combinations');
            return;
        }
        FavoriteCombination.remove({_id: req.body._id}, err =>{
           if (err) {
               res.status(500).send(err);
           }
            res.send('The favorite combination is removed');
        });
    });

});

export default favoriteCombinationRouter;
