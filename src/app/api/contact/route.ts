import { connectDB } from '@/lib/mongodb';
import Contact from '@/models/Contact'
import { error } from 'console'
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';




export async function POST(request:NextRequest){
    await connectDB();
    try{
        const data= await request.json();
        const{name, email, phoneNumber} = data;

        
    if (!name || !email || !phoneNumber) {
        return NextResponse.json(
          { message: 'Missing required fields' },
          { status: 400 }
        );
      }

        const newContact=new Contact({
            name, email, phoneNumber
        })
        await newContact.save();

        return NextResponse.json(
            { message: 'Contact created successfully' },
            { status: 201 }
          );
    }catch(err:any){
        console.log('Error in creating contact', err);
        return NextResponse.json(
            { message: 'Error in creating contact', error: err.message },
            { status: 500 }
          );
    }
}