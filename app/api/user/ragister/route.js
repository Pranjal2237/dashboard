import connectionToDatabase from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectionToDatabase();
        const {email,password}=await request.json();
        const user=new User({email,password});
        await user.save();
        return NextResponse.json(user,{status:201});
    } catch (error) {
        console.log(error)
    }
}