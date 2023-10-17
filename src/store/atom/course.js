import {atom} from "recoil"

export const courseState=atom({
    key:'courseStat',  
    default:{
        isLoading:true,
        course:null
    },
});