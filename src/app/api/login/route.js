import { UserModel } from "../../models/user"
import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import { connectDb } from "../../database/db"


export async function POST(request){
const { email,password } = await request.json();

try {
    await connectDb();
    // 1.first we will check the existing email id 
       const existingUser = await UserModel.findOne({
        email:email,
            
    })

    if(!existingUser){
        return NextResponse.json({
            message:"Email does not Exist !!"
        },
        {
            status:500
        }
        )
    }

    // 2. Match the password 
    const matchPassword = bcrypt.compareSync(password,existingUser.password)
    if(!matchPassword){
        return NextResponse.json({
            message: "password not matched"
        },
        {
            status:500
        })
    }
    
     // 3. generate JWT token 

        const token  = jwt.sign({
            _id:existingUser._id,
            Fname:existingUser.Fname,
        },process.env.JWT_KEY)

        console.log("TOKEN == >",token)

     // 4. sending token in NextResponse as a cookies

        const response = NextResponse.json({
            message:"LOGIN SUCCESS",
            success:true,
            existingUser:existingUser,
        })

        response.cookies.set("LoginToken",token,{
            expiresIn:"1d",
            httpOnly:true,
        })


        //return response of 4th step as a cookie

        return response;

        //return in all other steps 
        // return NextResponse.json({
        //     message:"success"
        // })
   
} catch (error) {
    return NextResponse.json({
        message:error.message,
        success:false
    },
    {
        status:500,
    }
    )
}
}