// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import { assets } from '../assets/assets'

// const Hero = () => {

//     const navigate = useNavigate()

//   return (
//     <div className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen'>

//         <div className='text-center mb-6'>
//             <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]'>Create amazing content <br/> with <span className='text-primary'>AI tools</span></h1>
//             <p className='mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600'>Transform your content creation with our suite of premium AI tools. Write articles, generate images, and enhance your workflow.</p>
//         </div>

//         <div className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs'>
//             <button onClick={()=> navigate('/ai')} className='bg-primary text-white px-10 py-3 rounded-lg hover:scale-102 active:scale-95 transition cursor-pointer'>Start creating now</button>
//             <button className='bg-white px-10 py-3 rounded-lg border border-gray-300 hover:scale-102 active:scale-95 transition cursor-pointer'>Watch demo</button>
//         </div>
//         <div className='flex items-center gap-4 mt-8 mx-auto text-gray-600'>
//             <img src={assets.user_group} alt="" className='h-8'/> Trusted by 10k+ people
//         </div>
      
//     </div>
//   )
// }

// export default Hero


// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { assets } from "../assets/assets";

// const Hero = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="relative min-h-screen w-full overflow-hidden bg-[#0f0f0f] flex items-center justify-center px-6 sm:px-20 xl:px-32">

//       {/* 🌌 Cinematic glow background */}
//       <div className="absolute inset-0">
//         <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[160px]" />
//         <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[160px]" />
//       </div>

//       {/* CONTENT */}
//       <div className="relative z-10 max-w-4xl text-center">

//         {/* Heading */}
//         <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.1]">
//           Create cinematic content <br />
//           <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//             powered by AI
//           </span>
//         </h1>

//         {/* Subtitle */}
//         <p className="mt-6 text-sm sm:text-base xl:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
//           Generate articles, images, and creative assets using powerful AI tools.
//           Designed for creators who want speed, quality, and elegance.
//         </p>

//         {/* CTA Buttons */}
//         <div className="mt-10 flex flex-wrap justify-center gap-5">
//           <button
//             onClick={() => navigate("/ai")}
//             className="group relative px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 transition-all duration-300 hover:-translate-y-0.5"
//           >
//             <span className="relative z-10">Start creating</span>
//             <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition" />
//           </button>

//           <button className="px-10 py-4 rounded-xl border border-slate-700 text-slate-300 hover:bg-white/5 transition">
//             Watch demo
//           </button>
//         </div>

//         {/* Social proof */}
//         <div className="mt-10 flex items-center justify-center gap-3 text-slate-400 text-sm">
//           <img
//             src={assets.user_group}
//             alt="users"
//             className="h-8 opacity-80"
//           />
//           Trusted by <span className="text-white font-medium">10,000+</span> creators worldwide
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;
// import React, { useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { 
//   ArrowRight, 
//   Sparkles, 
//   Zap, 
//   Shield, 
//   Globe, 
//   BarChart, 
//   Cloud, 
//   Brain, 
//   Database, 
//   Cpu,
//   Rocket, 
//   Target, 
//   Users, 
//   Clock,
//   Cpu as CpuChip // CpuChip doesn't exist, using Cpu instead
// } from "lucide-react";

// const Hero = () => {
//   const navigate = useNavigate();
//   const videoRef = useRef(null);

//   return (
//     <div className="relative min-h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      
//       {/* Video Background */}
//       <div className="absolute inset-0">
//         <video
//           ref={videoRef}
//           autoPlay
//           muted
//           loop
//           playsInline
//           className="w-full h-full object-cover opacity-20"
//           poster="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=2070"
//         >
//           <source
//             src="../../public/3205624-hd_1920_1080_25fps.mp4"
//             type="video/mp4"
//           />
//           {/* Fallback if video doesn't load */}
//           <img
//             src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=2070"
//             alt="AI Network Background"
//             className="w-full h-full object-cover"
//           />
//         </video>
        
//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black" />
        
//         {/* Animated Grid Pattern */}
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]" 
//              style={{animation: 'grid 20s linear infinite'}} />
//       </div>

//       {/* Floating AI Particles */}
//       <div className="absolute inset-0">
//         {[...Array(25)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-[1px] h-[1px] bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
//               animationDelay: `${Math.random() * 2}s`,
//               boxShadow: '0 0 20px 2px rgba(59, 130, 246, 0.5)'
//             }}
//           />
//         ))}
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-20">
        
//         {/* Animated Logo/Brand */}
//         {/* <div className="flex items-center justify-center gap-3 mb-12">
//           <div className="relative">
//             <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
//             <div className="relative px-4 py-2 bg-black rounded-full ring-1 ring-white/10">
//               <div className="flex items-center gap-2">
//                 <Brain className="w-5 h-5 text-blue-400" />
//                 <span className="text-lg font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent">
//                   QuickAI SaaS
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div> */}

//         {/* Main Headline with SaaS Focus */}
//         <div className="mb-10">
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6">
            
//             <span className="text-sm font-medium text-blue-300">
//               AI-Powered SaaS Platform
//             </span>
//             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
//           </div>

//           <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
//             <span className="block">Enterprise-Grade</span>
//             <span className="block mt-3 bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
//               AI SaaS Solutions
//             </span>
//             <span className="block mt-3 text-2xl sm:text-3xl md:text-4xl text-gray-300">
//               For Modern Businesses
//             </span>
//           </h1>

//           {/* Animated Typing Text */}
//           <div className="inline-block mt-6 px-6 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
//             <div className="flex items-center gap-3">
//               <div className="flex space-x-1">
//                 <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
//                 <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
//                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
//               </div>
//               <span className="text-lg font-medium text-gray-300">
//                 Transforming Businesses with AI
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Subheading */}
//         <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed tracking-wide">
//           No creative challenge too big, no timeline too tight. Get to production with 
//           <span className="text-white font-semibold mx-2">AlgoAI SaaS</span>
//           — your enterprise-ready AI creative partner.
//         </p>

//         {/* SaaS Features Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto">
//           {[
//             { 
//               icon: <Cloud className="w-7 h-7" />, 
//               title: "Cloud Native", 
//               desc: "Scalable cloud infrastructure",
//               gradient: "from-blue-500/20 to-cyan-500/20"
//             },
//             { 
//               icon: <Database className="w-7 h-7" />, 
//               title: "Real-time AI", 
//               desc: "Instant AI processing",
//               gradient: "from-purple-500/20 to-pink-500/20"
//             },
//             { 
//               icon: <Rocket className="w-7 h-7" />, 
//               title: "Fast Deployment", 
//               desc: "Deploy in minutes, not months",
//               gradient: "from-orange-500/20 to-red-500/20"
//             },
//             { 
//               icon: <Target className="w-7 h-7" />, 
//               title: "Enterprise Ready", 
//               desc: "Built for scale & security",
//               gradient: "from-emerald-500/20 to-green-500/20"
//             }
//           ].map((feature, idx) => (
//             <div
//               key={idx}
//               className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10"
//             >
//               {/* Animated Border */}
//               <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
              
//               {/* Icon Container */}
//               <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.gradient} mb-5 group-hover:scale-110 transition-transform duration-300`}>
//                 <div className="text-white">
//                   {feature.icon}
//                 </div>
//               </div>
              
//               <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
//                 {feature.title}
//               </h3>
//               <p className="text-sm text-gray-400">
//                 {feature.desc}
//               </p>
              
//               {/* Hover Indicator */}
//               <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
//                 <ArrowRight className="w-5 h-5 text-blue-400" />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* CTA Buttons */}
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
//           <button
//             onClick={() => navigate("/ai")}
//             className="group relative px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg shadow-2xl shadow-blue-600/40 hover:shadow-blue-600/60 transition-all duration-300 hover:-translate-y-1 flex items-center gap-3"
//           >
//             <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
//             <span>Start Free Trial</span>
//             <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            
//             {/* Button Effects */}
//             <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
//             <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-20" 
//                  style={{animation: 'gradient 3s ease infinite', backgroundSize: '200% 200%'}} />
//           </button>
          
//           <button className="group px-10 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white hover:border-white/30 font-semibold transition-all duration-300 flex items-center gap-3">
//             <Users className="w-5 h-5" />
//             <span>Book Enterprise Demo</span>
//             <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:bg-cyan-400 transition-colors"></div>
//           </button>
//         </div>

//         {/* SaaS Stats */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
//           {[
//             { 
//               value: "10K+", 
//               label: "Active Users", 
//               icon: <Users className="w-5 h-5" />,
//               desc: "Growing daily"
//             },
//             { 
//               value: "99.9%", 
//               label: "Uptime SLA", 
//               icon: <Shield className="w-5 h-5" />,
//               desc: "Enterprise reliability"
//             },
//             { 
//               value: "< 2s", 
//               label: "Response Time", 
//               icon: <Clock className="w-5 h-5" />,
//               desc: "Lightning fast"
//             },
//             { 
//               value: "24/7", 
//               label: "AI Processing", 
//               icon: <Cpu className="w-5 h-5" />,
//               desc: "Always available"
//             }
//           ].map((stat, idx) => (
//             <div 
//               key={idx} 
//               className="group text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
//             >
//               <div className="inline-flex p-3 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 mb-4 group-hover:rotate-12 transition-transform duration-300">
//                 <div className="text-blue-300">
//                   {stat.icon}
//                 </div>
//               </div>
//               <div className="text-4xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
//                 {stat.value}
//               </div>
//               <div className="text-sm font-semibold text-gray-300 mb-1">
//                 {stat.label}
//               </div>
//               <div className="text-xs text-gray-500">
//                 {stat.desc}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Navigation Menu */}
//       <div className="absolute top-0 left-0 right-0 z-50">
//         <div className="max-w-7xl mx-auto px-6 py-6">
//           <div className="flex items-center justify-between">
//             {/* Logo */}
//             <div className="flex items-center gap-3">
//               <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
//                 <Cpu className="w-6 h-6 text-blue-400" />
//               </div>
//               <div>
//                 <div className="text-xl font-bold text-white">QuickAI</div>
//                 <div className="text-xs text-blue-400 font-medium">SaaS Platform</div>
//               </div>
//             </div>
            
//             {/* Navigation */}
//             <nav className="hidden md:flex items-center gap-8">
//               {[
//                 { name: "AI Features", icon: <Brain className="w-4 h-4" /> },
//                 { name: "Solutions", icon: <Target className="w-4 h-4" /> },
//                 { name: "Pricing", icon: <BarChart className="w-4 h-4" /> },
//                 { name: "Resources", icon: <Database className="w-4 h-4" /> },
//                 { name: "Company", icon: <Users className="w-4 h-4" /> }
//               ].map((item) => (
//                 <a
//                   key={item.name}
//                   href="#"
//                   className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
//                 >
//                   <span className="opacity-0 group-hover:opacity-100 transition-opacity">
//                     {item.icon}
//                   </span>
//                   {item.name}
//                 </a>
//               ))}
//             </nav>
            
           
//              <div className="flex items-center gap-4">
              
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
//         <div className="flex flex-col items-center gap-2">
//           <span className="text-xs text-gray-500">Scroll to explore</span>
//           <div className="w-6 h-10 rounded-full border border-white/20 flex justify-center">
//             <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full mt-2 animate-bounce"></div>
//           </div>
//         </div>
//       </div>

//       {/* CSS Animations - Add to your global CSS or style tag */}
//       <style jsx>{`
//         @keyframes gradient {
//           0%, 100% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//         }
//         @keyframes float {
//           0%, 100% { transform: translateY(0) rotate(0deg); }
//           50% { transform: translateY(-20px) rotate(180deg); }
//         }
//         @keyframes grid {
//           from { transform: translateY(0); }
//           to { transform: translateY(60px); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Hero;



// import React, { useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { 
//   ArrowRight, 
//   Sparkles, 
//   Zap, 
//   Shield, 
//   Globe, 
//   BarChart, 
//   Cloud, 
//   Brain, 
//   Database, 
//   Cpu,
//   Rocket, 
//   Target, 
//   Users, 
//   Clock
// } from "lucide-react";

// const Hero = () => {
//   const navigate = useNavigate();
//   const videoRef = useRef(null);

//   return (
//     <div className="relative min-h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      
//       {/* Video Background */}
//       <div className="absolute inset-0">
//         <video
//           ref={videoRef}
//           autoPlay
//           muted
//           loop
//           playsInline
//           className="w-full h-full object-cover opacity-20"
//           poster="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=2070"
//         >
//           <source
//             src="../../public/3205624-hd_1920_1080_25fps.mp4"
//             type="video/mp4"
//           />
//           <img
//             src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=2070"
//             alt="AI Network Background"
//             className="w-full h-full object-cover"
//           />
//         </video>
        
//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black" />
        
//         {/* Animated Grid Pattern */}
//         <div className="" 
//              style={{animation: 'grid 20s linear infinite'}} />
//       </div>

//       {/* Floating AI Particles */}
//       <div className="">
//         {[...Array(25)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-[1px] h-[1px] bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
//               animationDelay: `${Math.random() * 2}s`,
//               boxShadow: '0 0 20px 2px rgba(59, 130, 246, 0.5)'
//             }}
//           />
//         ))}
//       </div>

//       {/* Navigation Menu */}
     

//       {/* Main Content */}
//       <div className="relative z-10 max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-20">
        
//         {/* Main Headline */}
//         <div className="mb-10">
//           <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
//             <span className="block">Enterprise-Grade</span>
//             <span className="block mt-3 bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
//               AI SaaS Solutions
//             </span>
//             <span className="block mt-3 text-2xl sm:text-3xl md:text-4xl text-gray-300">
//               For Modern Businesses
//             </span>
//           </h1>

//           {/* Subheading - From screenshot */}
//           <div className="inline-block mt-8 px-6 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
//             <div className="flex items-center justify-center gap-3">
//               <div className="flex space-x-1">
//                 <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
//                 <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
//                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
//               </div>
//               <span className="text-lg font-medium text-gray-300">
//                 Transforming Businesses with AI
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Description - From screenshot */}
//         <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed tracking-wide">
//           No creative challenge too big, no timeline too tight. Get to production with 
//           <span className="text-white font-semibold mx-2">AI-powered solutions</span>
//           — your enterprise-ready AI creative partner.
//         </p>

//         {/* CTA Buttons */}
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
//           <button
//             onClick={() => navigate("/ai")}
//             className="group relative px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg shadow-2xl shadow-blue-600/40 hover:shadow-blue-600/60 transition-all duration-300 hover:-translate-y-1 flex items-center gap-3"
//           >
//             <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
//             <span>Start Free Trial</span>
//             <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            
//             {/* Button Effects */}
//             <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
//           </button>
          
//           <button className="group px-10 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white hover:border-white/30 font-semibold transition-all duration-300 flex items-center gap-3">
//             <Users className="w-5 h-5" />
//             <span>Book Enterprise Demo</span>
//             <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:bg-cyan-400 transition-colors"></div>
//           </button>
//         </div>

//         {/* Features Grid - Simplified */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto">
//           {[
//             { 
//               icon: <Cloud className="w-7 h-7" />, 
//               title: "Cloud Native", 
//               desc: "Scalable cloud infrastructure",
//               gradient: "from-blue-500/20 to-cyan-500/20"
//             },
//             { 
//               icon: <Zap className="w-7 h-7" />, 
//               title: "Fast Processing", 
//               desc: "Real-time AI responses",
//               gradient: "from-purple-500/20 to-pink-500/20"
//             },
//             { 
//               icon: <Shield className="w-7 h-7" />, 
//               title: "Secure", 
//               desc: "Enterprise-grade security",
//               gradient: "from-emerald-500/20 to-green-500/20"
//             },
//             { 
//               icon: <Globe className="w-7 h-7" />, 
//               title: "Global", 
//               desc: "Worldwide availability",
//               gradient: "from-orange-500/20 to-red-500/20"
//             }
//           ].map((feature, idx) => (
//             <div
//               key={idx}
//               className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10"
//             >
//               {/* Icon Container */}
//               <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.gradient} mb-5 group-hover:scale-110 transition-transform duration-300`}>
//                 <div className="text-white">
//                   {feature.icon}
//                 </div>
//               </div>
              
//               <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
//                 {feature.title}
//               </h3>
//               <p className="text-sm text-gray-400">
//                 {feature.desc}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
//         <div className="flex flex-col items-center gap-2">
//           <span className="text-xs text-gray-500">Scroll to explore</span>
//           <div className="w-6 h-10 rounded-full border border-white/20 flex justify-center">
//             <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full mt-2 animate-bounce"></div>
//           </div>
//         </div>
//       </div>

//       {/* CSS Animations */}
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0) rotate(0deg); }
//           50% { transform: translateY(-20px) rotate(180deg); }
//         }
//         @keyframes grid {
//           from { transform: translateY(0); }
//           to { transform: translateY(60px); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Hero;

import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Shield, 
  Globe, 
  Cloud,
  Brain,
  Users,
  ChevronRight,
  Play
} from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      
      {/* Main Layout Container */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Left Side - Video Container (Half Page) */}
        <div className="lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10" />
          
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="../../public/3205624-hd_1920_1080_25fps.mp4"
              type="video/mp4"
            />
             
            {/* Fallback Image */}
            <img
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=2070"
              alt="AI Network Background"
              className="w-full h-full object-cover"
            />
          </video>
          
          {/* Video Controls Overlay */}
          <div className="absolute bottom-8 left-8 z-20 flex items-center gap-4">
            <button 
              className="p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all"
              onClick={() => videoRef.current?.paused ? videoRef.current.play() : videoRef.current?.pause()}
            >
              <Play className="w-5 h-5 text-white" />
            </button>
            <div className="text-sm text-white/80">
              Watch our AI in action
            </div>
          </div>
          
          {/* Video Info Badge */}
          <div className="absolute top-8 left-8 z-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/20">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-white font-medium">Live Demo</span>
            </div>
          </div>
        </div>
        
        {/* Right Side - Content Container (Half Page) */}
        <div className="lg:w-1/2 relative bg-gradient-to-br from-gray-900 via-black to-gray-900">
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-[120px]"></div>
          </div>
          
          {/* Main Content */}
          <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 lg:py-0">
            
            {/* Logo/Brand */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30">
                  <Brain className="w-7 h-7 text-blue-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">Algo.ai</div>
                  <div className="text-sm text-blue-400 font-medium">Enterprise AI Platform</div>
                </div>
              </div>
              
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                <span className="text-sm font-medium text-blue-300">
                  Premium AI Solutions
                </span>
              </div>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="block">Transform Your</span>
              <span className="block mt-2 bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                Business with AI
              </span>
            </h1>
            
            {/* Subtitle */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
                <span className="text-lg font-medium text-cyan-300">
                  Enterprise-Grade AI SaaS Platform
                </span>
              </div>
              
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                No creative challenge too big, no timeline too tight. Get to production with our AI-powered solutions.
              </p>
            </div>
            
            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {[
                { icon: <Zap className="w-5 h-5" />, text: "Real-time Processing" },
                { icon: <Shield className="w-5 h-5" />, text: "Enterprise Security" },
                { icon: <Cloud className="w-5 h-5" />, text: "Cloud Native" },
                { icon: <Globe className="w-5 h-5" />, text: "Global Scale" }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                    <div className="text-blue-400">{feature.icon}</div>
                  </div>
                  <span className="text-gray-300 font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={() => navigate("/ai")}
                className="group relative flex-1 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg shadow-2xl shadow-blue-600/40 hover:shadow-blue-600/60 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
              
              <button className="group flex-1 px-8 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white hover:border-white/30 font-semibold transition-all duration-300 flex items-center justify-center gap-3">
                <Users className="w-5 h-5" />
                <span>Book Demo</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            {/* Stats */}
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10">
              {[
                { value: "10K+", label: "Active Users" },
                { value: "99.9%", label: "Uptime" },
                { value: "< 2s", label: "Response Time" },
                { value: "24/7", label: "AI Processing" }
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div> */}
            
            {/* Trust Badges */}
            <div className="mt-12 pt-8 border-t border-white/10">
              {/* <p className="text-sm text-gray-500 mb-4">Trusted by leading enterprises</p> */}
              {/* <div className="flex flex-wrap gap-6 opacity-70">
                {["Enterprise", "Startups", "Agencies", "Developers"].map((name, idx) => (
                  <div key={idx} className="text-gray-400 font-medium text-sm">
                    {name}
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </div>
      
      {/* Responsive Mobile/Tablet Layout */}
      <div className="lg:hidden">
        {/* Mobile Video Banner */}
        <div className="relative h-[40vh] overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="../../public/3205624-hd_1920_1080_25fps.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent" />
        </div>
        
        {/* Mobile Content */}
        <div className="px-6 py-12 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-2xl mx-auto">
            {/* Content same as desktop but without video side */}
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator for Desktop */}
      <div className="hidden lg:block absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-black-500">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border border-white/20 flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;

