import { selector } from "recoil";
import { courseState } from "../atom/course";

export const isCourseLoading=selector({
        key:"isCourseLoading",
        get:({get})=>{
            return  get(courseState).isLoading;
        }
});

export const courseDetail=selector({
    key:"courseDetail",
    get:({get})=>{
        return  get(courseState).course;
    }
}); 

export const courseTitle=selector({
    key:"courseTitle",
    get:({get})=>{
        return  get(courseState).course.title;
    }
});

export const courseImage=selector({
    key:"courseImage",
    get:({get})=>{
        if(get(courseState).course)
            return  get(courseState).course.imageLink;

        else return "";
    }
});

export const coursePrice=selector({
    key:"coursePrice",
    get:({get})=>{
        if(get(courseState).course)
            return  get(courseState).course.price;
        
            else return "";
    }
});
