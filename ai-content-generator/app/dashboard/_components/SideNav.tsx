"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { FileClock, Home, Settings, Wallet } from 'lucide-react'
import { usePathname } from 'next/navigation'
import UsageTrack from './UsageTrack'

const SideNav = () => {
  const menuList = [
    { name: 'Home', icon: Home, path: '/dashboard' },
    { name: 'History', icon: FileClock, path: '/dashboard/history' },
    { name: 'Billing', icon: Wallet, path: '/dashboard/billing' }, // fixed typo
    { name: 'Setting', icon: Settings, path: '/dashboard/setting' },
  ]

  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className='h-screen relative p-5 shadow-sm border bg-white'>
      <div className='flex justify-center'>
        <Image src='/logo.svg' alt='logo' width={100} height={100} />
      </div>
      <div className='mt-8'>
        {menuList.map((menu, index) => (
          <div
            key={index}
            className={`flex gap-2 mb-2 p-3 hover:bg-primary rounded-lg cursor-pointer items-center
            ${path === menu.path ? 'bg-primary text-white' : ''}`}
          >
            <menu.icon className='h-6 w-6' />
            <h2 className='text-lg'>{menu.name}</h2>
          </div>
        ))}
      </div>
      <div className='absolute bottom-10 left-0 w-full'>
        <UsageTrack/>
      </div>
    </div>
  )
}

export default SideNav
