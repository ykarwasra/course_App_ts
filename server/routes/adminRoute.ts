import { Router } from "express";
import { Admin, Course, User } from "../db/index.js";
import jwt from "jsonwebtoken";
import { authenticateJwt, SECRET } from "../middleware/auth.js";
const adminRoute=Router();

adminRoute.get("/me",authenticateJwt,async(req,res)=>{
    const username=req.headers["user"];

    const user=await Admin.findOne({username});

    if(user){
        res.send({username:user.username});
    }
    else{
        res.status(404).send({message:"Admin does not exist"});
    }
});
adminRoute.post("/signup",async(req,res)=>{
    const {username,password}=req.body;

    const user=await Admin.findOne({username,password});

    if(user){
        res.status(403).json({message:"user is already exist!"});
    }
    else{
        const newAdmin=new Admin({
            username:username,
            password:password
        });
        await  newAdmin.save();
        const token=jwt.sign({username,role:"admin"},SECRET,{expiresIn:"1h"});
        res.status(200).json({message:"admin Signup successfully",token});
    }
});

adminRoute.post("/courses",authenticateJwt,async(req,res)=>{
        const course=req.body; 
        const newCourse=new Course(course);
        await newCourse.save();
        res.json({ message: 'Course created successfully', courseId: newCourse.id });
});
adminRoute.get("/courses",authenticateJwt,async(req,res)=>{
        const courses=await Course.find({});
        if(!courses) {
         res.status(404).send('No courses found');
        }
        else{
            res.json({courses})
        }
});

adminRoute.post("/signin",async(req,res)=>{
    const {username,password} = req.body;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });

adminRoute.put("/course/:courseId",authenticateJwt,async(req,res)=>{
    const course =await Course.findByIdAndUpdate(req.params.courseId,req.body,{new:true});
    if(course){
        res.json({message:"course updated successfully!"});
    }
    else{
        res.json({message:"no such course is present!"});
    }
});

adminRoute.get("/course/:courseId",authenticateJwt,async(req,res)=>{
    const courseId=req.params.courseId;
    const course =await Course.findById(courseId);
    if(course){
        res.json({course});
    }
    else{
        res.status(404).json({message:"course not found!"});
    }
});

interface Courses{
    title?: string | undefined;
    description?: string | undefined;
    price?: number | undefined;
    published?: boolean | undefined;
    imageLink?: string | undefined;
}
  adminRoute.delete("/delete/:courseId",authenticateJwt,async(req,res)=>{
    try{
        const courseId=req.params.courseId;
        const course =await Course.findById(courseId);
        const deletedCourse=await  Course.deleteOne({"_id":req.params.courseId});
        if(deletedCourse.deletedCount===1){
            const courses=await Course.find({});
            res.json({message:`course has been removed`,courses});
    }
    else{
        res.json({message:'No such course to delete!'});
    }
}
    catch(err){
        res.json(err);
    }
  });
export default adminRoute;