import { connectDB } from "@/lib/mongodb";
import CustomContact from "@/models/Contact";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request:NextRequest, {params}:{params:{id:string}}){
    try{
        await connectDB('user_data');
        const {id}=params;
        const body=await request.json();

        const updateData={
            name:body.name,
            email:body.email,
            phoneNumber:body.phoneNumber,
        }

        const contact= await CustomContact.findByIdAndUpdate(
            id, updateData, {new:true}
        )

        if(!contact){
            return NextResponse.json(
                {error:'Contact not found'},
                {status:404}
            )
        }
        return NextResponse.json(contact);
    }catch(error){
        console.log("Error updating contact: ", error);
        return NextResponse.json(
            {error:'Failed to update contact'},
            {status:500}
        )
    }
}
