import dispatcher from '../dispatchers/dispatcher.js';
import axios from 'axios';
import _ from 'lodash';
import * as constants from '../common/constants.js';
axios.defaults.timeout = 3000;

export function getSpecialties(apiUrl){
    dispatcher.dispatch('FETCH');
    axios.get(apiUrl)
    .then(result =>{
         dispatcher.dispatch({type: constants.ActionEvents.receiveData,
         specialtyData: result.data,
         dataCount: result.data.length,
         totalCount: _.get(result.headers,"x-total-count"),
         message: constants.SuccessMessage
         });
    })
    .catch(result =>{
        if(result instanceof Error) {
        console.log(result.message);
        } else {
        console.log(result.data);
        }
        dispatcher.dispatch({type: constants.ActionEvents.receiveData,
         specialtyData: result.data,
         dataCount: 0,
         totalCount: 0
         });
    });
}