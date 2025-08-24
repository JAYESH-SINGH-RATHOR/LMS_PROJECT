import React from 'react'
import { useSelector } from 'react-redux'

function profile() {
  const {userdata} = useSelector(state =>state.user)
  return ( 
    <div className='min-h-screen bg-gray-100 px-4 py-10 flex items0center justify-center'>
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full relative">
        
      </div>
      </div>
  )
}

export default profile