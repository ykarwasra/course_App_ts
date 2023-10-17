import mongoose from "mongoose";
//user have access to only purchased courses
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required: true,
        unique:false,
    },
    purchasedCourse:[{type:mongoose.Schema.Types.ObjectId, ref:'Course'}]
});

//admin have access to all the courses

const adminSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        },
    password:{
        type:String,
        required:true ,  
        unique:false,
        }
});

const courseSchema=new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    published:Boolean,
    imageLink: String
});

export const User=mongoose.model('User',userSchema);
export const Admin=mongoose.model('Admin',adminSchema);
export const Course=mongoose.model('Course',courseSchema);

