import axios from "axios";
import { GET_IMAGE_OBJECT } from "./types";
import { getError } from './errorActions';

export const getImageObject = (entityType, id, sizeKey) => dispatch => {
    const entityObject = {
        id: id,
        sizeKey: sizeKey
    };

    if (entityType === 'product') {
        entityObject.entityType = 'prodconf$Product';
    } else if (entityType === 'category') {
        entityObject.entityType = 'prodconf$Category';
    } else if (entityType === 'article') {
        entityObject.entityType = 'prodconf$Article';
    } else if (entityType === 'component') {
        entityObject.entityType = 'prodconf$Component';
    }
    
    // console.log("EntityObject", entityObject)
    
    axios
        .post("/prodconf_ImageApiService/retrieveImageObjForEntity", entityObject)
        .then(res =>
            dispatch({
                type: GET_IMAGE_OBJECT,
                payload: res.data,
                image_id : JSON.parse(res.config.data).id
            })
        )
        .catch(err =>
            dispatch(getError(err))
        );
};
