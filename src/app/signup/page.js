'use client'
import Image from 'next/image'
import React,{useState} from 'react'
import SignUp from '../../../public/signup.svg'
import { toast } from 'react-toastify'
import userSignupService from '../services/userService'
import { useRouter } from 'next/navigation';

const Signup = () => {
    const router = useRouter();
    const [user,setUser] = useState({
        Fname:"",
        email:"",
        password:"",
        about:"",
        profileURL:"https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.shareicon.net%2Fdata%2F512x512%2F2016%2F07%2F26%2F802043_man_512x512.png&tbnid=VBmf97FIESNqhM&vet=12ahUKEwim6fzqs9qEAxVkpGMGHVjBBPYQMygGegUIARCCAQ..i&imgrefurl=https%3A%2F%2Fwww.shareicon.net%2Fman-user-profile-avatar-social-802043&docid=q_eu3yMzNxIQCM&w=512&h=512&q=profile%20avatar&hl=en&ved=2ahUKEwim6fzqs9qEAxVkpGMGHVjBBPYQMygGegUIARCCAQ"
    })


    const DoSignUp=async (event)=>{
        event.preventDefault()
        console.log("UserData===>>",event)
        
        //validations 
        if(user.Fname.trim() === "" || user.Fname === null){
            toast.warning("Name is required",{
                position : 'top-center'
            });
            return;
        }

        if(user.email.trim() === "" || user.email === null){
            toast.warning("Email is required",{
                position : 'top-center'
            });
            return;
        }
        try {
           const result = await userSignupService(user)
        //    console.log("Result ==>>==>>",result)
           toast.success("user Registered Successfully :) ",{
            position:'top-center'
            
           })
           router.push('/login')
       
        } catch (error) {
            console.log("Error",error)
            toast.error(error.response.data.message,{
                position:'top-center'
               })
               
        }
    }

  return (
    <div className='grid grid-cols-12'>
        <div className='flex col-span-4 col-start-2 mt-10 mr-2 '>
                <Image src={SignUp} priority={true} alt='SignUpImage' style={{width:'100%'}} />
            </div>
        <div className='col-span-4 col-start-6 '>
            
            <div>
                <h1 className='text-5xl text-center m-3 font-bold '>SignUp Here</h1>
                <form action='#!' onSubmit={DoSignUp} >
                    {/* UserName */}
                    <div className=' mt-5 '>
                        <label htmlFor='user_name' className='block text-sm font-medium mb-2 p-2 ' >UserName</label>
                        <input type='text' className='
                            text-sm rounded-lg block w-full p-3 dark:bg-gray-700 
                          dark:placeholder-gray-400 ' id='user_name'  placeholder='Enter Your Name'

                          name="user_name"
                          onChange={(event) => setUser({...user,Fname:event.target.value})}
                          value={user.Fname}
                        />
                    </div>
                    {/* Email */}
                    <div className=' mt-5 '>
                        <label htmlFor='user_email' className='block text-sm font-medium mb-2 p-2 ' >Email</label>
                        <input type='email' className='
                            text-sm rounded-lg block w-full p-3 dark:bg-gray-700 
                          dark:placeholder-gray-400 ' id='user_email' placeholder='Enter Your Email'

                          name="user_email"
                          onChange={(event) => setUser({...user,email:event.target.value})}
                          value={user.email}
                        />
                    </div>
                    {/* Password */}
                    <div className=' mt-5 '>
                        <label htmlFor='user_password' className='block text-sm font-medium mb-2 p-2 ' >Password</label>
                        <input type='password' className='
                            text-sm rounded-lg block w-full p-3 dark:bg-gray-700 
                          dark:placeholder-gray-400 ' id='user_password' placeholder='Enter Your Password'

                          name="user_password"
                          onChange={(event) => setUser({...user,password:event.target.value})}
                          value={user.password}
                        />
                    </div>
                    {/* About */}
                    <div className=' mt-5 '>
                        <label htmlFor='user_about' className='block text-sm font-medium mb-2 p-2 ' >About</label>
                        <textarea  className='
                            text-sm rounded-lg block w-full p-3 dark:bg-gray-700 
                          dark:placeholder-gray-400 ' id='user_about'  rows={6} placeholder='Tell us about Yourself !!'

                          name="user_about"
                          onChange={(event) => setUser({...user,about:event.target.value})}
                          value={user.about}
                          >
                         
                          </textarea>
                    </div>

                     <div className=' text-center p-5 '>
                        <button type='submit' className=' bg-green-600 py-2 px-3 rounded-lg hover:bg-green-800 ' >SignUp</button>
                        <button className=' bg-orange-600 py-2 px-3 rounded-lg hover:bg-orange-800 ms-5  '>Reset</button>

                     </div>

                </form>
            </div>
        </div>
    </div>
  )
}

export default Signup