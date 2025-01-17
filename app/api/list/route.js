import connectionToDatabase from "@/lib/db";
import { NextResponse } from "next/server";
import List from "@/models/List";


export async function GET(request) {
    try {
        await connectionToDatabase();
        const lists=await List.find();
        return NextResponse.json(lists,{status:200});
    } catch (error) {
        console.log(error)
    }
}

export async function POST(request){
    try {
        await connectionToDatabase();
        const {domain,sheet_id}=await request.json();
        const list=new List({domain,sheet_id});
        await list.save();
        return NextResponse.json(list,{status:201});
    } catch (error) {
        console.log(error)
    }
}

