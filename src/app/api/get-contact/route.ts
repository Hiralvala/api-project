import { connectDB } from "@/lib/mongodb";
import CustomContact from "@/models/Contact";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        console.log("attempting to connect database")
        await connectDB('user_data');
        console.log("Database connection successful."); 
        const contacts = await CustomContact.find({}).sort({createdAt:-1}).lean();
        console.log("contact data: ", contacts)
        return NextResponse.json(contacts);
    }catch(error:any){
        console.error("Database or query error:", error); 
        return NextResponse.json(
            {error:'Failed to fetch contacts'},
            {status:500}
        )
    }
}