import { EventEmitter } from "events";
import dispatcher from '../dispatchers/dispatcher';
import * as constants from '../common/constants.js';
let dataField = constants.DataCallback.Data;
let pageCountField = constants.DataCallback.pageCount;
let totalCountField = constants.DataCallback.totalCount;

class specialtiesStore extends EventEmitter{
    
    constructor(){
        super();
        this.specialtyData=[];
        this.dataCount = 0;
        this.totalCount = 0;
    }

    getSpecialties(){
        return { dataField :this.specialtyData,pageCountField: this.dataCount,totalCountField:this.totalCount };        
    }
    
    handleActions(action) {
        switch(action.type) {
        case constants.ActionEvents.createNew: {
            //Handle CREATE data here
            break;
        }
        case constants.ActionEvents.receiveData: {
            this.specialtyData = action.specialtyData;
            this.dataCount = action.dataCount;
            this.totalCount= action.totalCount;            
            this.emit("change");
            break;
        }
    }
}
}
const specialtyStore = new specialtiesStore;
dispatcher.register(specialtyStore.handleActions.bind(specialtyStore));
export default specialtyStore;