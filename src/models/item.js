import mongoose from 'mongoose';


const itemSchema = new mongoose.Schema({

    name: String,
    itemType: String,
    price: Number,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}

});

const Item = mongoose.model('Item', itemSchema);

export default Item;