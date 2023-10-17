import {atom, RecoilState} from "recoil"

export const courseState:RecoilState<{isLoading:boolean; course:{} }>=atom({
    key:'courseStat',  
    default:{
        isLoading:true,
        course:{}
    },
});