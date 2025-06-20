import React from 'react'
import { TEMPLATE } from './TemplateList'
import Image from 'next/image'
import Link from 'next/link'

const TemplateCard = (item:TEMPLATE) => {
  return (
    <Link href={'/dashboard/content/'+ item.slug}>
    <div className='flex flex-col p-5 shadow-md rounded-md border bg-white gap-3 cursor-pointer hover:scale-105 transition-all'>
        <Image src={item.icon} alt='icon' width={50} height={50} />
        <h2 className='font-medium text-lg'>{item.name}</h2>
        <p className='text-gray line-clamp-3'>{item.desc}</p>
    </div>
    </Link>
  )
}

export default TemplateCard