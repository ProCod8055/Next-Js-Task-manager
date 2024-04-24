import { UserModel } from "@/app/models/user"
import { NextResponse } from "next/server"
import { connectDb } from "../../../database/db"


export async function GET(request,{params}){

        const {userId} = params;
        await connectDb();
       const getuser = await UserModel.findById (userId)
            return NextResponse.json(getuser);
}

//===================== get user by Name is not working =================================




export async function DELETE(request,{params}){

const {userId} = params
try {
    await connectDb();
    const deleteUser = await UserModel.deleteOne({
        _id:userId
      })
      return NextResponse.json( deleteUser,{ message: "User deleted successfully" })
} catch (error) {
    console.log("Error",error)
}
}

///-------------- PUT Method

export async function PUT(request,{params}){
const {userId} = params;

const {Fname,password,about,profileURL} = await request.json();

    const user = await UserModel.findById(userId);
    user.Fname=Fname;
    user.passsword= password;
    user.about=about;
    user.profileURL=profileURL;
    await connectDb();
    const updateUser = await user.save()
    return NextResponse.json(updateUser)

}


