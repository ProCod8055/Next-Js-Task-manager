import UserContext from '@/context/userContext'
import React, { useContext,useState } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiCheckSquare, FiEdit,FiXSquare } from "react-icons/fi";
import DeleteTaskService from '../services/deleteTaskService';
import UpdateStatusService from '../services/updateTaskStatusService';
import httpAxios  from '../database/httpAxios';


const AllTask = ({task,DeleteTaskParent}) => {
    const {user} = useContext(UserContext)  /// user is desctructured from ProviderContext
  
    const  DeleteTaskService=(taskId)=>{
        DeleteTaskParent(taskId);
   }

   //update Status,Content
   const [status,setStatus] = useState(task.status)
   const [title, setTitle] = useState(task.title);
   const [content, setContent] = useState(task.content);
   const [isEditing, setIsEditing] = useState(false);
 

  const HandleEdit = () => {
    setIsEditing(true); // Toggle editing mode on click
  };

    const HandleSubmitEdit = async (event) => {
        event.preventDefault();
      
        try {
          const updatedTask = await UpdateStatusService(task._id, { title, content }); // Pass title and content for complete update
          console.log("Task updated successfully!"); // Optional success message
        } catch (error) {
          console.error("Error updating task:", error);
        } finally {
          setIsEditing(false); // Exit editing mode
        }
      };

    const  HandleCancelEdit = () =>{
        setIsEditing(false); // Exit editing mode
        setTitle(task.title); // Reset title to original value
        setContent(task.content); // Reset content to original value
    }


   const HandelStatusChange =async (newStatus) =>{
   try {
   const updatedStatus =  await UpdateStatusService(task._id,{title, content, newStatus})
    // task.status = StatusValue; // Update task status directly
     setStatus(updatedStatus) // Update local state if needed
     console.log("Task status updated successfully!");
    
   } catch (error) {
    console.error("Error changing task status:", error);
   }
   }


  return (
    <div className={ `shadow-lg mt-3 rounded-md ${ status ===  "COMPLETED" ? " bg-green-800 " : " bg-slate-600 "}`} >
   
        <div className=' p-2 ' >
            <div className='flex justify-between '>
            {isEditing ? (
            <input style={{ backgroundColor: 'black' }} 
             type="text" value={title} onChange={(e) => setTitle(e.target.value)}  />
          ) : (
            <h1 className='text-3xl font-bold'>{title}</h1>
          )}

            <span onClick={()=>{DeleteTaskService(task._id)}} className='shadow-2xl bg-black rounded-full
             hover:bg-red-600 w-6 h-6 flex justify-center items-center cursor-pointer' 
             >
                < RiDeleteBin6Line />
            </span>
            </div>
            <div className='flex justify-between'>
            {isEditing ? (
            <textarea style={{ backgroundColor: 'black',margin:'5px' }}
             value={content} onChange={(e) => setContent(e.target.value)} />
          ) : (
            <p className='text-2xl font-medium'>{content}</p>
          )}
             <div className='flex justify-end'>
            {isEditing ? (
              <>
                <button className=' pr-5 ' type="submit" onClick={HandleSubmitEdit}>
                  
                  <FiCheckSquare/>
                  Save
                </button>
                <button type="button" onClick={HandleCancelEdit}>
                  <FiXSquare />
                  Cancel
                </button>
              </>
            ) : (
              <span
                className='shadow-2xl bg-black rounded-full hover:bg-yellow-400 w-6 h-6 flex justify-center items-center cursor-pointer'
                onClick={HandleEdit}
              >
                <FiEdit />
              </span>
            )}
          </div>
            </div>
            
            <p className=' text-right mb-1 '>
                <span className='font-bold' >
                Author : {user?.Fname}
                </span> 
            </p>

            <p className=' text-right '>
                <span className='font-bold ' >
                Status : 
                 <select className=' bg-black '
                    onChange={(event)=> HandelStatusChange(event.target.value)}
                    value={status}
                    >
                      
                        <option value='PENDING' >PENDING</option>
                        <option value='COMPLETED'  >COMPLETED</option>

                    </select>
           

                </span> 
            </p>
        </div>

    </div>
  )
}

export default AllTask