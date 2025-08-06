 import React from 'react'
import { Outlet } from 'react-router-dom'
import ShoppingHeader from './header'
 
 export default function ShoppingLayout() {
   return (
     <div className='flex flex-col bg-white overflow-hidden'>
        <main className="flex flex-col w-full">
            {/* Common Header Component */}
            <ShoppingHeader/>
            <Outlet/>
        </main>
     </div>
   )
 }
 