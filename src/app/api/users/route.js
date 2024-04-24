import { NextResponse } from "next/server";
import { connectDb } from "../../database/db";
import {UserModel} from "../../models/user"
import bcrypt from 'bcryptjs'



//// ------------------------- GET Method
export async function GET(request){

   try {
    await connectDb();
    let getAllUsers = await UserModel.find();

    return NextResponse.json(getAllUsers);
    
   } catch (error) {
    return NextResponse.json({
        message:error.message,
        succes:false,
    })
   }
  
}

/// --------------------------- POST Method

export async function POST(request){
    //fetch user detail from request 
    const {Fname,email,password,about,profileURL} = await request.json()
    console.log({Fname,email,password,about,profileURL})

    //create user object with user model

    const user = new UserModel({
        Fname,
        email,
        password,
        about,
        profileURL,
    })

    try {

        await connectDb();
    const existingUser = await UserModel.findOne({
        email:email,
        
    })

    if(existingUser){
        return NextResponse.json({
            message:"Email already exist ,Try New one !!"
        },
        {
            status:500
        }
        )
    }

        // below line is for encryption 
        user.password = bcrypt.hashSync(user.password,parseInt(process.env.BCRYPT_SALT))
        await connectDb();
        const createdUser = await user.save()
        return NextResponse.json(createdUser)
    } catch (error) {
        console.log("Error",error)
        return NextResponse.json({
            message:error.message,
            success:false
        },
        {
            status:500
        })
    }
    
}

