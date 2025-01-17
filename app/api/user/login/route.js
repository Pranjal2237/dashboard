import connectionToDatabase from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";


export async function POST(request) {
    try {
        await connectionToDatabase();
        const {email,password}=await request.json();
        const user=await User.findOne({email});
        if(!user){
            return NextResponse.json({message:"Wrong Credentials"},{status:404})
        }
        if(user.password!=password){
            return NextResponse.json({message:"Wrong Credentials"},{status:404})
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})
        
        return NextResponse.json({token,message:"OK"},{status:200});
    } catch (error) {
        console.log(error)
    }
}