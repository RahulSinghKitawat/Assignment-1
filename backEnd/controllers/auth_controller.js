import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import Auth from "../models/auth";
import { use } from "react";


const secret_key = "Rahul";

export const Register = async(req,res)=>{
    try{
        const {name,email,password} = req.body;

        if(!name||!email||!password){
            return res.status(400).json({message:"All fields are required!"});
        }

        const existUser = await Auth.findOne({email})

        if(existUser){
            return res.status(409).json({message:"Email already exists try another!"});
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await Auth.create({
            name,
            email,
            hashedPassword,
        });

        res.status(201).json({
            message:"account created successfully!",
            user:{
                id:newUser._id,
                name: newUser.name,
                email:newUser.email
                
            },

        });
    }catch(error){
        console.error(error);
        res.status(500).json({message:"server error",error:error.message});
    }
};

export const login = async(req,res)=>{
    try{
        const{email,password} = req.body;

        if( !email || !password){
            return res.status(400).json({message:"email and password are required!"});
        }
        const User = await Auth.findOne({email});

        if(!User){
            return res.status(404).json({message:"user not found!"});
        }
        const isCorrectPass = await bcrypt.compare(password,User.password)
    }

}