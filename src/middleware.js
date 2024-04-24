import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    // console.log("middleware Executed")
//we need to check user is logged in or not by checking cookies 
   const LoginToken = await request.cookies.get("LoginToken")?.value // ? if there is no token value give undefined
   

   // to make this api public so that it can be accessible during login
   if(request.nextUrl.pathname === '/api/login' || request.nextUrl.pathname === '/api/users' ){
    return;
   }

   //loggedIn user not able to access the given path login or signup
   const LoggedInUserNotAccessPaths = request.nextUrl.pathname === "/login" || 
     request.nextUrl.pathname === '/signup'

   //if user is logged in we will send the user to our any page we want want to except login or signup
   if(LoggedInUserNotAccessPaths){
    if(LoginToken){
      return  NextResponse.redirect(new URL("/show-task",request.url))
    }
   }
   else{
    //if user is not loggedIn redirect in login page 
    if(!LoginToken){
      return NextResponse.redirect(new URL("/login",request.url))
    }
   }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // "/", // home page
    "/login",
    '/signup',
    '/add-task',
    '/show-task',
    '/profile',
    '/api/:path*' // all api paths
  ],
}