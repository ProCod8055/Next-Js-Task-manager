// import Image from "next/image";

// //to change the Title of the page 
// export const metadata={
//   title:"Home : Work Manager"
// }


// export default function Home() {
//   return (
//   <div>
//     <h1 className="text-5xl">Welcome to Work Manager</h1>
//   </div>
//   );
// }

import React from "react";
import Link from 'next/link'

const Home = () => {
  return (
    <div className="welcome-page ">
      <h1 className="welcome-title  flex justify-center text-5xl ">Welcome to Work Manager App!</h1>
      <p className="welcome-message flex justify-center text-3xl font-semibold mt-5">
       Click here on  &nbsp;  
       <Link href={'/login'} className=" text-green-500 underline "> Login </Link>&nbsp;
        to Start 
      </p>
     
    </div>
  );
};

export default Home;