import { Router } from "express";
import { Course, User } from "../db/index.js";
import { authenticateJwt, SECRET } from "../middleware/auth.js";
import jwt from "jsonwebtoken";

const userRoute=Router();


    userRoute.post("/signup",async(req,res)=>{
        const {username,password}=req.body;

        const user=await User.findOne({username});

        if(user){
            res.status(403).send({message:"user already exist!"});
        }

        else{
            const newUser=new User({username,password});
            await newUser.save();
            const token=jwt.sign({username,role:'user'},SECRET,{expiresIn:'1h'});
            res.json({message:"user added successfully", token});
        }
    });

    userRoute.post('/signin',async(req,res)=>{
        const {username,password}=req.body;

        const user=await User.findOne({username,password});

        if(user){
            const token=jwt.sign({username,role:'user'},SECRET,{expiresIn:'1h'});
            res.json({message:"logged in Successfully", token});
        }
    });

    userRoute.get('/courses',authenticateJwt,async(req,res)=>{
        const course=await Course.find({published:true});
        res.json({course});
    })

    userRoute.post("/courses/:courseId",authenticateJwt,async(req,res)=>{
        const course=await Course.findById(req.params.courseId);
        if(course!==null){
            const user=await User.findOne({username:req.headers["user"]});
            if(user){
                user.purchasedCourse.push(course._id);
               await user.save();
               res.json({message:"course is purchased successfully"})
            }
            else{
                res.status(403).json({message:'no such use is present!'});
            }
        }
        else{
            res.status(404).send({message:'no such course is presnet!'});
        }
    });

    userRoute.get("/purchasedCourses",authenticateJwt,async(req,res)=>{
        const user=await User.findOne({username:req.headers["user"]});
        if(user){
            const courses=user.purchasedCourse;
            res.send({purchsedCourses:courses||[]});
        }
        else{
            res.status(403).send({message:'you are not authorized to access this data!'});
        }
    });


export default userRoute;