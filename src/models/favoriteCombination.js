import mongoose from 'mongoose';
import item from './item';

const favoriteCombinationSchema = new mongoose.Schema({

    combination: [item.schema],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}

});

const FavoriteCombination = mongoose.model('FavoriteCombination', favoriteCombinationSchema);

export default FavoriteCombination;