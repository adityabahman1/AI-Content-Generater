"use client"
import React, { useState } from 'react'
import SearchSection from './_components/SearchSection'
import TemplateList from './_components/TemplateList'

const Dashboard = () => {
  const [userSearchInput, setuserSearchInput] = useState<string>()
  return (
    <div className='bg-slate-100'>
      <SearchSection onSearchInput={(value:string)=>setuserSearchInput(value)}/>
      <TemplateList userSearchInput={userSearchInput}/>
    </div>
  )
}

export default Dashboard