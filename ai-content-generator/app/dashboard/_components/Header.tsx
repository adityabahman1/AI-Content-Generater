import { Search } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <div className='p-5 shadow-md border-b-2 bg-white flex justify-between items-center'>
      <div className='flex gap-8 border rounded-md max-w-lg p-2'>
        <Search/>
        <input type="text" placeholder='Search...' className='outline-none' />
      </div>
      <div>
        <h2 className='bg-primary p-1 rounded-full text-md text-white px-2'>🔥 Join membership just for $5.25/Month</h2>
      </div>
    </div>
  )
}

export default Header