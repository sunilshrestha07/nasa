import MainScene from '@/components/MainScene'
import React from 'react'

export default function page() {
  return (
    <>
    <div className=" w-full h-screen relative ">
      <img className='w-full h-full object-cover' src="./images/bg.jpeg" alt="" />
      <div className="w-full h-full bg-transparent absolute top-0 left-0">
        <MainScene/>
      </div>
    </div>
    </>
  )
}
