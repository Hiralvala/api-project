import { connectDB } from "@/lib/mongodb";
import CustomContact from "@/models/Contact";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        await connectDB('customUserDatabase');
        const contacts = await CustomContact.find({}).sort({createdAt:-1});
        return NextResponse.json(contacts);
    }catch(error:any){
        return NextResponse.json(
            {error:'Failed to fetch contacts'},
            {status:500}
        )
    }
}