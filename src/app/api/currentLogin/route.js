import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { UserModel } from "@/app/models/user";
import { connectDb } from "@/app/database/db";

export async function GET(request){
    const LoginToken = request.cookies.get("LoginToken")?.value;
    console.log(LoginToken)
    if(!LoginToken){
        return NextResponse.json({
            message:"user is not logged In"
        })
    }
    const data = jwt.verify(LoginToken,process.env.JWT_KEY)
    // console.log("DATA",data)
    await connectDb()
    const user = await UserModel.findById(data._id).select('-password')
    return NextResponse.json(user);
}