import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className= ' bg-blue-600 h- mt-10' >
            <div className='flex p-5 justify-between ' >
                <div className='text-center  '>
                    <h1 className='text-3xl mb-1' >welocome</h1>
                    <p> Lorem ipsum dolor sit amet consectetur adipisicing elit.
                       
                         
                    </p>
                </div>
                <div className='text-center'>
                    <h1 className=' font-bold text-2xl  '>
                     Important Links
                    </h1>
                       
                    <ul className=' font-bold mt-1 '>
                        <li><Link href={'#!'}>LinkedIn</Link></li>
                        <li><Link href={'#!'}>Facebook</Link></li>
                        <li><Link href={'#!'}>Youtube</Link></li>
                           
                    </ul>
                </div>
            </div>
    </footer>
  )
}

export default Footer