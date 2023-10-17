import { selector } from "recoil";
import { userState } from "../atom/user"

export const userEmailState=selector ({
    key:'userEmail',
    get:({get})=>{
        const state=get(userState);
        return  state.userEmail;
    }
});