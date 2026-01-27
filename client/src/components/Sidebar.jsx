// import { Protect, useClerk, useUser } from '@clerk/clerk-react'
// import { Eraser, FileText, Hash, House, Image, LogOut, Scissors, SquarePen, Users } from 'lucide-react';
// import React from 'react'
// import { NavLink } from 'react-router-dom';

// const navItems = [
//     {to: '/ai', label: 'Dashboard', Icon: House},
//     {to: '/ai/write-article', label: 'Write Article', Icon: SquarePen},
//     {to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash},
//     {to: '/ai/generate-images', label: 'Generate Images', Icon: Image},
//     {to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser},
//     {to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors},
//     {to: '/ai/review-resume', label: 'Review Resume', Icon: FileText},
//     {to: '/ai/community', label: 'Community', Icon: Users},
//     {to: '/ai/imageUpscaler', label: 'Image Enhancer', Icon: Users},

// ]

// const Sidebar = ({ sidebar, setSidebar }) => {

//     const {user} = useUser();
//     const {signOut, openUserProfile} = useClerk()

//   return (
//     <div className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} transition-all duration-300 ease-in-out`}>
//       <div className='my-7 w-full'>
//         <img src={user.imageUrl} alt="User avatar" className='w-13 rounded-full mx-auto'/>
//         <h1 className='mt-1 text-center'>{user.fullName}</h1>
//         <div className='px-6 mt-5 text-sm text-gray-600 font-medium'>
//             {navItems.map(({to, label, Icon})=>(
//                 <NavLink key={to} to={to} end={to === '/ai'} onClick={()=> setSidebar(false)} className={({isActive})=> `px-3.5 py-2.5 flex items-center gap-3 rounded ${isActive ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white' : ''}`}>
//                     {({ isActive })=>(
//                         <>
//                         <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}` } />
//                         {label}
//                         </>
//                     )}
//                 </NavLink>
//             ))}
//         </div>
//       </div>

//       <div className='w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between'>
//             <div onClick={openUserProfile} className='flex gap-2 items-center cursor-pointer'>
//                 <img src={user.imageUrl} className='w-8 rounded-full' alt="" />
//                 <div>
//                     <h1 className='text-sm font-medium'>{user.fullName}</h1>
//                     <p className='text-xs text-gray-500'>
//                         <Protect plan='premium' fallback="Free">Premium</Protect> Plan
//                     </p>
//                 </div>
//             </div>
//             <LogOut onClick={signOut} className='w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer'/>
//       </div>
//     </div>
//   )
// }

// export default Sidebar




import { Protect, useClerk, useUser } from '@clerk/clerk-react'
import { 
  Eraser, 
  FileText, 
  Hash, 
  Home, 
  Image, 
  LogOut, 
  Scissors, 
  SquarePen, 
  Users,
  Sparkles,
  Settings,
  ChevronRight,
  Crown,
  Zap,
  DollarSign,
  BarChart3,
  Cpu,
  Database,
  Palette
} from 'lucide-react';
import React from 'react'
import { NavLink } from 'react-router-dom';

const navItems = [
    {to: '/ai', label: 'Dashboard', Icon: Home},
    {to: '/ai/write-article', label: 'Write Article', Icon: SquarePen},
    {to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash},
    {to: '/ai/generate-images', label: 'Generate Images', Icon: Image},
    {to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser},
    {to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors},
    {to: '/ai/review-resume', label: 'Review Resume', Icon: FileText},
    {to: '/ai/imageUpscaler', label: 'Image Enhancer', Icon: Sparkles},
    {to: '/ai/community', label: 'Community', Icon: Users},
]

const Sidebar = ({ sidebar, setSidebar }) => {

    const {user} = useUser();
    const {signOut, openUserProfile} = useClerk()

  return (
    <div className={`w-64 bg-gradient-to-b from-slate-950 to-black border-r border-slate-800 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} transition-all duration-300 ease-in-out z-30 shadow-2xl shadow-black/50`}>
      
      {/* Top Branding */}
      {/* <div className='w-full pt-6 pb-4 px-6 border-b border-slate-800'>
        <div className='flex items-center gap-3'>
          <div className='relative'>
            <div className='absolute -inset-1 bg-gradient-to-r from-slate-600 to-slate-400 rounded-full blur opacity-50'></div>
            <div className='relative bg-gradient-to-br from-slate-700 to-slate-900 p-2.5 rounded-xl border border-slate-600'>
              <Cpu className='w-5 h-5 text-slate-300' />
            </div>
          </div>
          <div>
            <div className='text-lg font-bold bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 bg-clip-text text-transparent'>
              Algo.ai
            </div>
            <div className='text-xs text-slate-500 font-medium tracking-wider'>
              PREMIUM STUDIO
            </div>
          </div>
        </div>
      </div> */}

      {/* User Profile */}
      <div className='w-full pt-6 pb-4 px-6'>
        <div 
          onClick={openUserProfile}
          className='flex flex-col items-center gap-3 cursor-pointer group'
        >
          <div className='relative'>
            <div className='absolute -inset-1 bg-gradient-to-r from-slate-600 to-slate-400 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300'></div>
            <img 
              src={user.imageUrl} 
              alt="User avatar" 
              className='relative w-16 h-16 rounded-full border-2 border-slate-700 group-hover:border-slate-500 transition-colors shadow-lg'
            />
            <div className='absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-slate-600 to-slate-900 rounded-full flex items-center justify-center border border-slate-500'>
              <Crown className='w-3 h-3 text-amber-300' />
            </div>
          </div>
          
          <div className='text-center'>
            <h1 className='text-base font-bold text-slate-200'>{user.fullName}</h1>
            <div className='flex items-center justify-center gap-2 mt-1'>
              <div className='px-2 py-0.5 bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-full'>
                <span className='text-xs font-medium bg-gradient-to-r from-slate-300 to-slate-100 bg-clip-text text-transparent'>
                  <Protect plan='premium' fallback="FREE">PREMIUM</Protect>
                </span>
              </div>
              <span className='text-xs text-slate-500'>AI Creator</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className='flex-1 w-full px-4 py-4 overflow-y-auto'>
        <div className='space-y-1'>
            {navItems.map(({to, label, Icon})=>(
                <NavLink 
                  key={to} 
                  to={to} 
                  end={to === '/ai'} 
                  onClick={()=> setSidebar(false)} 
                  className={({isActive})=> `
                    group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
                    ${isActive 
                      ? 'bg-gradient-to-r from-slate-800 to-slate-900 text-slate-200 border-l-4 border-slate-400 shadow-lg shadow-black/30' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border-l-4 border-transparent'
                    }
                  `}
                >
                    {({ isActive })=>(
                        <>
                          <div className={`relative ${isActive ? 'text-slate-200' : 'text-slate-500 group-hover:text-slate-300'}`}>
                            <Icon className='w-4 h-4' />
                            {isActive && (
                              <div className='absolute -right-1 -top-1 w-2 h-2 bg-slate-300 rounded-full animate-pulse' />
                            )}
                          </div>
                          <span className='font-medium flex-1 text-sm'>{label}</span>
                          {isActive && (
                            <ChevronRight className='w-3 h-3 text-slate-400' />
                          )}
                        </>
                    )}
                </NavLink>
            ))}
        </div>

        {/* Divider */}
        <div className='my-6 mx-4 border-t border-slate-800'></div>

        {/* Quick Stats - Silver Black Theme */}
        <div className='mx-4 p-4 bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl border border-slate-800 shadow-inner'>
          <div className='flex items-center justify-between mb-3'>
            <div className='flex items-center gap-2'>
              <DollarSign className='w-4 h-4 text-slate-400' />
              <span className='text-sm font-medium text-slate-300'>Credits</span>
            </div>
            <div className='flex items-center gap-1'>
              <span className='text-sm font-bold text-slate-100'>1,250</span>
              <Zap className='w-3 h-3 text-amber-400' />
            </div>
          </div>
          <div className='w-full bg-slate-800 rounded-full h-1.5'>
            <div className='bg-gradient-to-r from-slate-400 to-slate-300 h-1.5 rounded-full w-3/4'></div>
          </div>
          <div className='flex items-center justify-between mt-2'>
            <span className='text-xs text-slate-500'>75% of monthly limit</span>
            <button className='text-xs bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-slate-300 px-2 py-1 rounded text-xs font-medium transition-all duration-300'>
              Upgrade
            </button>
          </div>
        </div>

        {/* System Stats */}
        <div className='mx-4 mt-4 p-3 bg-gradient-to-br from-slate-900/50 to-transparent rounded-lg border border-slate-800/50'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <BarChart3 className='w-3 h-3 text-slate-500' />
              <span className='text-xs text-slate-400'>API Usage</span>
            </div>
            <span className='text-xs font-medium text-slate-300'>84%</span>
          </div>
          <div className='w-full bg-slate-800 rounded-full h-1 mt-2'>
            <div className='bg-gradient-to-r from-slate-500 to-slate-400 h-1 rounded-full w-4/5'></div>
          </div>
        </div>
      </div>

      {/* Bottom User Info */}
      <div className='w-full border-t border-slate-800 p-4 px-6 bg-gradient-to-t from-slate-950 to-transparent'>
        <div className='flex items-center justify-between'>
          <div 
            onClick={openUserProfile} 
            className='flex gap-3 items-center cursor-pointer group flex-1'
          >
            <div className='relative'>
              <img 
                src={user.imageUrl} 
                className='w-9 h-9 rounded-full border border-slate-700 group-hover:border-slate-500 transition-colors' 
                alt="" 
              />
              <div className='absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border border-slate-900'></div>
            </div>
            <div className='flex-1 min-w-0'>
              <h1 className='text-sm font-medium text-slate-200 truncate'>{user.firstName || 'User'}</h1>
              <p className='text-xs text-slate-500 truncate'>
                Online
              </p>
            </div>
          </div>
          
          <div className='flex items-center gap-2'>
            <button
              onClick={() => {/* Settings action */}}
              className='p-1.5 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition-colors'
              title="Settings"
            >
              <Settings className='w-4 h-4' />
            </button>
            <button
              onClick={signOut}
              className='p-1.5 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-red-400 transition-colors group'
              title="Sign Out"
            >
              <LogOut className='w-4 h-4 group-hover:rotate-90 transition-transform duration-300' />
            </button>
          </div>
        </div>
      </div>

      {/* Premium Badge at Bottom */}
      <div className='w-full p-3 bg-gradient-to-r from-slate-900 to-black border-t border-slate-800'>
        <div className='flex items-center justify-center gap-2'>
          <div className='w-2 h-2 rounded-full bg-gradient-to-r from-slate-400 to-slate-300 animate-pulse'></div>
          <span className='text-xs text-slate-400 font-medium'>PREMIUM ACCESS • VIP 2026</span>
          <div className='w-2 h-2 rounded-full bg-gradient-to-r from-slate-400 to-slate-300 animate-pulse'></div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar







// import { Protect, useClerk, useUser } from '@clerk/clerk-react'
// import { Eraser, FileText, Hash, House, Image, LogOut, Scissors, SquarePen, Users, Crown, Sparkles } from 'lucide-react';
// import React from 'react'
// import { NavLink } from 'react-router-dom';

// const navItems = [
//     {to: '/ai', label: 'Dashboard', Icon: House},
//     {to: '/ai/write-article', label: 'Write Article', Icon: SquarePen},
//     {to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash},
//     {to: '/ai/generate-images', label: 'Generate Images', Icon: Image},
//     {to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser},
//     {to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors},
//     {to: '/ai/review-resume', label: 'Review Resume', Icon: FileText},
//     {to: '/ai/community', label: 'Community', Icon: Users},
// ]

// const Sidebar = ({ sidebar, setSidebar }) => {

//     const {user} = useUser();
//     const {signOut, openUserProfile} = useClerk()

//   return (
//     <div className={`w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 fixed left-0 h-screen ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} transition-all duration-300 ease-in-out shadow-2xl`}>
      
//       {/* Decorative gradient overlay */}
//       <div className='absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-purple-600/10 to-transparent pointer-events-none'></div>
      
//       {/* Top Section */}
//       <div className='my-7 w-full relative z-10'>
//         {/* User Avatar Section with glow */}
//         <div className='relative mx-auto w-fit mb-4'>
//           <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-50'></div>
//           <img 
//             src={user.imageUrl} 
//             alt="User avatar" 
//             className='w-20 h-20 rounded-full mx-auto relative z-10 border-4 border-slate-700 shadow-2xl'
//           />
//           <div className='absolute -bottom-1 -right-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-1.5 z-20 shadow-lg'>
//             <Sparkles className='w-3 h-3 text-white' />
//           </div>
//         </div>
        
//         <h1 className='mt-3 text-center text-white font-semibold text-lg'>{user.fullName}</h1>
//         <p className='text-center text-slate-400 text-xs mt-0.5'>
//           <Protect plan='premium' fallback="Free Member">
//             <span className='flex items-center justify-center gap-1'>
//               <Crown className='w-3 h-3 text-amber-400' />
//               Premium Member
//             </span>
//           </Protect>
//         </p>
        
//         {/* Navigation Items */}
//         <div className='px-4 mt-8 text-sm font-medium space-y-1.5'>
//             {navItems.map(({to, label, Icon})=>(
//                 <NavLink 
//                   key={to} 
//                   to={to} 
//                   end={to === '/ai'} 
//                   onClick={()=> setSidebar(false)} 
//                   className={({isActive})=> `group relative px-4 py-3 flex items-center gap-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/30' : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'}`}
//                 >
//                     {({ isActive })=>(
//                         <>
//                         {/* Active indicator bar */}
//                         {isActive && (
//                           <div className='absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full'></div>
//                         )}
                        
//                         {/* Icon with background */}
//                         <div className={`p-1.5 rounded-lg transition-all duration-200 ${isActive ? 'bg-white/20' : 'bg-slate-700/50 group-hover:bg-slate-600/50'}`}>
//                           <Icon className='w-4 h-4' />
//                         </div>
                        
//                         <span className='flex-1'>{label}</span>
                        
//                         {/* Arrow indicator on active */}
//                         {isActive && (
//                           <div className='w-1.5 h-1.5 rounded-full bg-white animate-pulse'></div>
//                         )}
//                         </>
//                     )}
//                 </NavLink>
//             ))}
//         </div>
//       </div>

//       {/* Bottom Section */}
//       <div className='w-full border-t border-slate-700 bg-slate-800/50 backdrop-blur-sm'>
//         <div className='p-4 flex items-center justify-between'>
//             <div 
//               onClick={openUserProfile} 
//               className='flex gap-3 items-center cursor-pointer hover:bg-slate-700/50 rounded-lg p-2 -m-2 transition-all duration-200 flex-1'
//             >
//                 <div className='relative'>
//                   <img src={user.imageUrl} className='w-10 h-10 rounded-full border-2 border-slate-600' alt="" />
//                   <div className='absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800'></div>
//                 </div>
//                 <div className='flex-1 min-w-0'>
//                     <h1 className='text-sm font-semibold text-white truncate'>{user.fullName}</h1>
//                     <p className='text-xs text-slate-400 flex items-center gap-1'>
//                         <Protect plan='premium' fallback={
//                           <span className='px-2 py-0.5 bg-slate-700 text-slate-300 rounded text-xs'>Free</span>
//                         }>
//                           <span className='px-2 py-0.5 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 rounded text-xs font-semibold flex items-center gap-1'>
//                             <Crown className='w-2.5 h-2.5' />
//                             Pro
//                           </span>
//                         </Protect>
//                     </p>
//                 </div>
//             </div>
//             <button 
//               onClick={signOut} 
//               className='ml-2 p-2 hover:bg-red-500/10 rounded-lg transition-all duration-200 group'
//               title='Sign Out'
//             >
//               <LogOut className='w-4 h-4 text-slate-400 group-hover:text-red-400 transition-colors'/>
//             </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Sidebar