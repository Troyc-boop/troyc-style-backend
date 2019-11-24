import * as yup from 'yup';


export const itemDeleteRequestSchema = yup.object().shape({
    id : yup.string().required()
});

export const itemRequestSchema = yup.object().shape({
    name: yup.string().notRequired(),
    itemType: yup.string().required(),
    price: yup.number().notRequired(),

});
