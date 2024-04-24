'use client'
import React, { useContext, useState } from 'react'
import loginImage from '../../../public/login.svg'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-toastify'
import userLogin from '../services/loginservice'
import { useRouter } from 'next/navigation'
import UserContext from '@/context/userContext'
const LoginPage = () => {
      const router = useRouter();
      const context = useContext(UserContext)
    const [loginData,setLoginData] = useState({
        email:"",
        password:""
    })

    const DoLogin=async(event)=>{
        event.preventDefault();
        console.log(loginData)
        if(loginData.email.trim()==="" || loginData.password.trim()===""){
        toast.info("Invalid Email ID or Password",{
        position:'top-center'})
        return;
        }
            try {
              const result  = await userLogin(loginData)
            //   console.log("RReessuulltt====>>>>>>",result)
              toast.success("Logged In!!")
              //below line is used to show the data (header logout etc ) for the user , if not used need refresh
              context.setUser(result.existingUser)

               router.push('/show-task')

            } catch (error) {
                console.log(error)
                toast.error(error.response.data.message,{
                    position:'top-center'
                })
            }
    }

  return (
    <div className='grid grid-cols-12'>
    <div className='flex col-span-4 col-start-2 mt-10 mr-2 '>
        <Image src={loginImage} priority={true} alt='loginImage' style={{width:'100%'}} />
    </div>
  
    <div className='col-span-3 col-start-6 '>
        
        <div>
            <h1 className='text-5xl text-center m-3 font-bold '>Login</h1>
            <form action='' onSubmit={DoLogin} >
            
                {/* Email */}
                <div className=' mt-5 '>
                    <label htmlFor='login_email' className='block text-sm font-medium mb-2 p-2 ' >Email</label>
                    <input type='email' className='
                        text-sm rounded-lg block w-full p-3 dark:bg-gray-700 
                      dark:placeholder-gray-400 ' id='login_email' placeholder='Enter Your Email'

                      name="login_email"
                      onChange={(event) => setLoginData({...loginData,email:event.target.value})}
                      value={loginData.email}
                    />
                </div>
                {/* Password */}
                <div className=' mt-5 '>
                    <label htmlFor='login_password' className='block text-sm font-medium mb-2 p-2 ' >Password</label>
                    <input type='password' className='
                        text-sm rounded-lg block w-full p-3 dark:bg-gray-700 
                      dark:placeholder-gray-400 ' id='login_password' placeholder='Enter Your Password'

                      name="login_password"
                      onChange={(event) => setLoginData({...loginData,password:event.target.value})}
                      value={loginData.password}
                    />
                </div>
               

                 <div className=' text-center p-5 '>
                    <button type='submit' className=' bg-green-600 py-2 px-3 rounded-lg hover:bg-green-800 ' >Login</button>
                    {/* <button className=' bg-orange-600 py-2 px-3 rounded-lg hover:bg-orange-800 ms-5  '>Reset</button> */}

                 </div>
                 <p>Don't have an account ? <Link href={'/signup'} className='underline text-2xl  '>SignUp</Link>  </p>

            </form>
        </div>
    </div>
</div>
  )
}

export default LoginPage