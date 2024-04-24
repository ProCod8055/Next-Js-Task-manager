import { NextResponse } from "next/server";

export async function POST(){

const response = NextResponse.json({
    message:"LogOut !!",
    success:true,
});
response.cookies.set("LoginToken","",{
    expires:new Date(0),
})
return response;
}