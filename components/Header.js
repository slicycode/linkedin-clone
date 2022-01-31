import Image from 'next/image'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import HeaderLink from './HeaderLink'
import GroupIcon from '@mui/icons-material/Group'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import ChatIcon from '@mui/icons-material/Chat'
import NotificationsIcon from '@mui/icons-material/Notifications'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined'
import { Avatar } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
}

function Header() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme: currentTheme, theme } = useTheme()

  // access to the theme after mounting
  useEffect(() => setMounted(true), [])
  console.log('The current theme is ', theme)

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-[#1d2226] flex items-center justify-around py-1 px-3 focus-within:shadow-lg">
      {/* Left */}
      <div className="flex items-center space-x-2 w-full max-w-xs">
        {mounted && (
          <>
            {currentTheme === 'dark' ? (
              <Image
                src="https://rb.gy/bizvqj"
                priority
                width={45}
                height={45}
              />
            ) : (
              <Image
                src="https://rb.gy/dpmd9s"
                priority
                width={55}
                height={55}
              />
            )}
          </>
        )}
        <div className="flex items-center space-x-1 dark:md:bg-gray-700 py-2.5 px-4 rounderd w-full">
          <SearchRoundedIcon />
          <input
            type="text"
            placeholder="search"
            className="hidden md:inline-flex bg-transparent text-sm focus:outline-none placeholder-black/70 dark:placeholder-white/75 flex-grow"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center space-x-6">
        <HeaderLink Icon={HomeRoundedIcon} text="Home" feed active />
        <HeaderLink Icon={GroupIcon} text="My Network" feed />
        <HeaderLink Icon={BusinessCenterIcon} text="Jobs" feed hidden />
        <HeaderLink Icon={ChatIcon} text="Messaging" feed />
        <HeaderLink Icon={NotificationsIcon} text="Notifications" feed />
        <HeaderLink Icon={Avatar} text="Me" feed avatar hidden />
        <HeaderLink Icon={AppsOutlinedIcon} text="Work" feed hidden />

        {/* Dark Mode Toggle Button */}
        {mounted && (
          <div
            className={`bg-gray-600 flex items-center px-0.5 rounded-full h-6 w-12 cursor-pointer flex-shrink-0 relative ${
              currentTheme === 'dark' ? 'justify-start' : 'justify-end'
            }`}
            onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
          >
            {' '}
            <span className="absolute left-0">☀️</span>
            <motion.div
              className="w-5 h-5 bg-white rounded-full z-40"
              layout
              transition={spring}
            />
            <span className="absolute right-0.5">🌙</span>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
