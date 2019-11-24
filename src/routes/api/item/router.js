import {itemDeleteRequestSchema, itemRequestSchema} from './schema';
import Item from '../../../models/item';
import base64Img from 'base64-img';
import express from 'express';
import fs from 'fs';


const itemRouter = express.Router();

itemRouter.post('/', (req, res) => {

    itemRequestSchema.validate(req.body).then(() => {
        const item = new Item();
        item.name = req.body.name;
        item.itemType = req.body.itemType;
        item.price = req.body.price;
        item.user = req.user._id;
        item.save((err, item) => {
            if (err) {
                res.status(400).send(err);
                return;
            }
            base64Img.img(req.body.img, '/home/troyc/Documents/bitbucket/backend/public/images', item._id, (err, filepath) => {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                res.status(200).send('The item is saved');
            });
        });
    });
});

itemRouter.get('/', (req, res) => {

    Item.find({user: req.user._id}, (err, item)=>{
        if (err) {
            res.status(404).send('There is no items');
            return;
        }
        res.send(item);
    });
});

itemRouter.delete('/', function (req, res) {

    itemDeleteRequestSchema.validate(req.body).then(() => {

        Item.findById(req.body.id, (err, item) => {
            if (err) {
                res.status(404).send(err);
                return;
            }

            if (req.user._id.toString() !== item.user.toString()) {
                res.status(401).send('You can only edit your items');
                return;
            }

            // Delete image from disk
            fs.unlink(`/home/troyc/Documents/bitbucket/backend/public/images/${req.body.id}.jpg`, (err) => {
                if (err && err.code !== 'ENOENT') {
                    res.status(500).send(err);
                    return;
                }
                Item.remove({
                    _id: req.body.id
                }, err => {
                    if (err) {
                        res.status(500).send(err);
                        return;
                    }
                    res.send('The item is removed');
                });
            });

        });
    });
});

export default itemRouter;