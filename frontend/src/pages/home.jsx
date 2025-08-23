import React from 'react'
import Nav from '../component/nav'
import background from "../assets/background.jpg"
import search from "../assets/search.png"
import { FiPlayCircle } from "react-icons/fi";
import Logos from '../component/logos';
function home() {
  return (
    <div className='w-[100%] overflow-hidden'>
       <div className='w-[100%] lg:h-[140vh] h-[70vh] relative'>
        <Nav/>
        <img src={background} alt="background image"  className='object-cover md:object-fil w-[100%] lg:h-[100%] h-[50vh]'/>
        <span className="lg:text-[70px] absolute md:text-[40px] lg:top-[10%] top-[15%] w-[100%] flex items-center justify-center text-white font-bold text-[20px]">Boost Your Siklls </span>
        <span className="lg:text-[70px] absolute md:text-[40px] lg:top-[18%] top-[20%] w-[100%] flex items-center justify-center text-white font-bold text-[20px]"> Carrear Path</span>

        <div className="absolute lg:top-[30%] top-[75%] md:top-[80%] w-[100%] flex items-center justify-center gap-3 flex-wrap ">
          <button className="px-[20px] py-[10px] border-2 lg:border-white border-black lg:text-white text-black-[10px] text-[18px] font-light flex gap-2 cursor-pointer">View All Courses <FiPlayCircle className='w-[30px] h-[30px] lg:fill-black fill-white' /></button>
          <button className="px-[20px] py-[10px] lg:bg-white bg:black lg:text-black text-white rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer">Search with Ai
            <img src={search } className='w-[30px] h-[30px] rounded-full hidden lg:block' alt="" />
          </button>
        </div>
       </div>
        <Logos/>
    </div>
  )
}

export default home