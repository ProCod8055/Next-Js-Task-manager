import { TaskModel } from "@/app/models/task";
import { NextResponse } from "next/server";
import { connectDb } from "@/app/database/db";


//GET task by Id

export async function GET(request,{params}){
    const {taskId} = params;
    try {
        await connectDb();
        const getTaskById =await TaskModel.findById(taskId)
        return NextResponse.json(getTaskById)
    } catch (error) {
        console.log(ERROR,"Error in getting the task")
    }
   
}

//PUT Method to change the existing Task

export async function PUT(request,{params}){
const {taskId} = params;

const {title,content,status} = await request.json();

let task =await TaskModel.findById(taskId);

if (title) {
    task.title = title;
  }
  if (content) {
    task.content = content;
  }
  if(status){
    task.status= status;
  }

await connectDb();
const updateTask = await task.save()
return NextResponse.json(updateTask);
}

//Delete Method TO delete task by ID

export async function DELETE(request,{params}){
const {taskId} = params;
await connectDb();
const taskDelete = await TaskModel.deleteOne({
    _id:taskId
});

return NextResponse.json(taskDelete,{message:"task deleted successfully"});
                      

}