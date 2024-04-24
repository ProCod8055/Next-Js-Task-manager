// ===>> /api/users/[userId]/usersTask
import { connectDb } from "../../../../database/db";
import { TaskModel } from "@/app/models/task";
import { NextResponse } from "next/server";



export async function GET(request,{params}){

const {userId} = params;
await connectDb();
const tasks = await TaskModel.find({
    userId:userId //schema's userId : this userId is from params
})
return NextResponse.json(tasks)
}

