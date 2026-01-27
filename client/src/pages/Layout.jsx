import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { 
  Menu, 
  X, 
  Bell, 
  Search, 
  Sun,
  Moon,
  Zap,
  User,
  Sparkles
} from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { SignIn, useUser } from '@clerk/clerk-react'
import { UserButton } from "@clerk/clerk-react"

const Layout = () => {
  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const { user } = useUser()

  return user ? (
    <div className='flex flex-col items-start justify-start h-screen bg-white dark:bg-slate-900'>
      
      {/* Top Navigation Bar - Design Improved */}
      <nav className='w-full px-4 sm:px-8 min-h-14 flex items-center justify-between border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900'>
        
        {/* Left: Logo and Menu */}
        <div className='flex items-center gap-4'>
          <button 
            onClick={() => setSidebar(!sidebar)} 
            className='sm:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800'
          >
            {sidebar ? 
              <X className='w-5 h-5 text-gray-600 dark:text-gray-400'/> 
              : 
              <Menu className='w-5 h-5 text-gray-600 dark:text-gray-400'/>
            }
          </button>
          
          <div 
            className='flex items-center gap-3 cursor-pointer group'
            onClick={() => navigate('/')}
          >
            <div className='bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg'>
              <div className='w-6 h-6 flex items-center justify-center text-white font-bold'><Sparkles/></div>
            </div>
            <div className='hidden sm:block'>
              <div className='text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                Algo.ai
              </div>
              <div className='text-xs text-gray-500 dark:text-gray-400 font-medium'>
                AI Studio
              </div>
            </div>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className='hidden md:flex flex-1 max-w-md mx-8'>
          <div className='relative w-full'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
            <input
              type="text"
              placeholder="Search tools..."
              className='w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm'
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className='flex items-center gap-3'>
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800'
          >
            {darkMode ? 
              <Sun className='w-5 h-5 text-amber-500' /> 
              : 
              <Moon className='w-5 h-5 text-gray-600' />
            }
          </button>

          

          {/* User Profile */}
          <div className='flex items-center gap-2 p-1 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800'>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 border-2 border-white dark:border-slate-900",
                },
              }}
            />
            <div className='hidden lg:block'>
              <div className='text-sm font-medium text-gray-800 dark:text-white'>
                {user.firstName || user.username}
              </div>
              <div className='text-xs text-gray-500 dark:text-gray-400'>
                {user.primaryEmailAddress?.emailAddress.split('@')[0]}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className='flex-1 w-full flex h-[calc(100vh-56px)]'>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        
        {/* Mobile Overlay */}
        {sidebar && (
          <div 
            className='sm:hidden fixed inset-0 bg-black/50 z-20'
            onClick={() => setSidebar(false)}
          />
        )}

        <div className='flex-1 bg-gray-50 dark:bg-slate-950 overflow-auto'>
          <Outlet />
        </div>
      </div>
      
    </div>
  ) : (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-black'>
      <div className='w-full max-w-md p-6'>
        <div className='text-center mb-8'>
          <div className='bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl inline-block mb-4'>
            <div className='text-2xl font-bold text-white'>A</div>
          </div>
          <h1 className='text-3xl font-bold text-white mb-2'>Welcome to Algo.ai</h1>
          <p className='text-gray-400'>Sign in to access your AI tools</p>
        </div>
        <SignIn />
      </div>
    </div>
    
  )
}

export default Layout



