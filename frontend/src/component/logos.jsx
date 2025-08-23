import React from 'react'
import { MdOutlineCastForEducation } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { FaSackDollar } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";

function logos() {
  return (
    <div className='w-[100vw] min-h-[90px] flex items-center justify-center flex-wrap gap-4 md:mb-[50px]'>
        <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-grey-200 cursor-pointer text-[#03394b]"><MdOutlineCastForEducation className='w-[35px] h-[35px] fill[#03394b]'/> 20K + Courses </div>

        <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-grey-200 cursor-pointer text-[#03394b]"><SiOpenaccess  className='w-[35px] h-[35px] fill[#03394b]'/> LifeTime Access </div>

        <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-grey-200 cursor-pointer text-[#03394b]"><FaSackDollar className='w-[35px] h-[35px] fill[#03394b]'/> Value For Money </div>

        <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-grey-200 cursor-pointer text-[#03394b]"><BiSupport  className='w-[35px] h-[35px] fill[#03394b]'/> 24 X 7 Support </div>

        <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-grey-200 cursor-pointer text-[#03394b]"><FiUsers className='w-[35px] h-[35px] fill[#03394b]'/> community support </div>
    </div>
  )
}

export default logos