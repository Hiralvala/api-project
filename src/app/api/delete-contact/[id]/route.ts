import { connectDB } from "@/lib/mongodb";
import CustomContact from "@/models/Contact";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(request:NextRequest, {params}:{params:{id:string}}){
    try{
        await connectDB('user_data');
        const id=params.id;

        const deleteContact=await CustomContact.findByIdAndDelete(id);

        if(!deleteContact){
            return NextResponse.json(
                {error:'Contact not found'},
                {status:404}
            )
        }
        return NextResponse.json({message:'Contact deleted successfully'})
    }catch(error){
        console.log("Error in delete contact : ",error);
        return NextResponse.json(
            {error:' Failed to delete contact'},
            {status:500}
        )
    }
}