import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const SECRET="SEC@ret";

export const authenticateJwt=(req:Request,res:Response,next:NextFunction)=>{
    const authheader=req.headers.authorization;

    if(authheader){
        const token = authheader.split(' ')[1];
        jwt.verify(token,SECRET,(err,user)=>{
            if (err) return res.status(403).send(err);
            if(!user){
                return res.status(404).send({message:"User not found"});
            }
            if(typeof user === "string" ){
                return res.status(403);
            }
            
            req.headers["user"]= user.username;
            next();
            
        })     
    }
        else{
            res.status(403).send({"error":"No Token Provided!"})
        }
}

