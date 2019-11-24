import * as yup from 'yup';


export const favoriteCombinationSaveRequestSchema = yup.object().shape({

    combination: yup.array().required()

});