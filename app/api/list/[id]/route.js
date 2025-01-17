import connectionToDatabase from "@/lib/db";
import { NextResponse } from "next/server";
import List from "@/models/List";


export async function DELETE(request,{params}) {
    try {
        await connectionToDatabase();
        const {id}=params;
        let list=await List.findByIdAndDelete({_id:id});
        return NextResponse.json(list,{status:200})
    } catch (error) {
        console.log(error);
    }
}

export async function PUT(request,{params}) {
    try {
        await connectionToDatabase();
        const {id}=params;
        const {domain,sheet_id}=await request.json();
        let list=await List.findByIdAndUpdate(id,{domain,sheet_id},{ new: true, runValidators: true });
        return NextResponse.json(list,{status:201})
    } catch (error) {
        console.log(error)
    }
}