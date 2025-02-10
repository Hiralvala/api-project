import { connectDB } from '@/lib/mongodb';
import CustomContact from '@/models/Contact';
import Contact from '@/models/Contact'
import { error } from 'console'
import { Collection } from 'mongoose';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';




export async function POST(request:NextRequest){
    // const dbName = 'userData';
    try{
        const data= await request.json();
        const{name, email, phoneNumber, dbName = 'customUserDatabase' } = data;

        if (!dbName) {
          return NextResponse.json({ message: 'Database name (dbName) is required in the request body' }, { status: 400 });
      }

      
      
      if (!name || !email || !phoneNumber) {
        return NextResponse.json(
          { message: 'Missing required fields' },
          { status: 400 }
        );
      }
      await connectDB(dbName);

        const newContact=new CustomContact({
            name, email, phoneNumber
        })
        await newContact.save();

        return NextResponse.json(
            { message: 'Contact created successfully' , database:dbName, collection: 'customContacts'},
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