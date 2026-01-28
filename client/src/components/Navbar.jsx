
import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Sparkles, 
  Home, 
  Compass, 
  Music2, 
  Users, 
  Mic2,
  User,
  Menu,
  X,
  Brain,
  Zap,
  Cpu
} from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("/");
  const [logoHover, setLogoHover] = useState(false);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "/", label: "Home", icon: <Home size={20} /> },
    { id: "/contact", label: "ContactUs", icon: <Compass size={20}  /> },
    { id: "/about", label: "AboutUs", icon: <Cpu size={20}  /> },
    { id: "/pricing", label: "Pricing", icon: <Users size={20} /> },
    { id: "/show", label: "Creativity", icon: <Mic2 size={20} /> },
  ];

  return (
    <>
      <div className="fixed top-0 z-50 w-full transition-all duration-300">
        {/* Animated Top Border */}
        <div className="h-[2px] w-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 animate-gradient-x" />
        
        {/* Main Navbar */}
        <div className={`backdrop-blur-xl transition-all duration-300 ${
          scrolled 
            ? "bg-black/90 border-b border-white/10 shadow-2xl shadow-blue-900/20" 
            : "bg-gradient-to-b from-black/95 to-black/80 border-b border-white/5"
        }`}>
          <div className="flex justify-between items-center py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            
            {/* Left: Logo and Navigation */}
            <div className="flex items-center gap-6">
              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Animated Logo */}
              <div 
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => navigate("/")}
                onMouseEnter={() => setLogoHover(true)}
                onMouseLeave={() => setLogoHover(false)}
              >
                {/* Animated Icon */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-full">
                    <Brain size={28} className="text-white" />
                  </div>
                  {/* Floating particles */}
                  <div className={`absolute -top-1 -right-1 ${logoHover ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                    <Sparkles size={12} className="text-cyan-400 animate-pulse" />
                  </div>
                </div>

                {/* Logo Text */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      Algo.ai
                    </span>
                    {/* <div className={`px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-xs font-medium text-cyan-300 transition-all duration-300 ${logoHover ? 'scale-105' : ''}`}>
                      BETA
                    </div> */}
                  </div>
                  <div className="text-xs text-slate-400 font-medium tracking-wider">
                    SaaS
                  </div>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1 ml-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      navigate(item.id);
                      setActiveTab(item.id);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      activeTab === item.id
                        ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30 shadow-lg shadow-blue-500/10"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className={`transition-transform duration-300 ${
                      activeTab === item.id ? 'scale-110' : ''
                    }`}>
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: User Actions */}
            <div className="flex items-center gap-4">
              {/* Quick Actions */}
              <div className="hidden md:flex items-center gap-3">
                {/* <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30">
                  <Zap size={18} />
                  <span>Run AI</span>
                </button> */}
              </div>

              {user ? (
                <div className="flex items-center gap-4">
                  {/* User Info */}
                  <div className="hidden lg:flex flex-col items-end leading-tight">
                    <span className="text-sm font-semibold text-white">
                      {user.firstName || user.username || "Explorer"}
                    </span>
                    <span className="text-xs text-slate-400">
                      {user.primaryEmailAddress?.emailAddress}
                    </span>
                  </div>

                  {/* Avatar with Glow Effect */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative rounded-full bg-black p-0.5">
                      <UserButton
                        appearance={{
                          elements: {
                            avatarBox: "w-10 h-5",
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={openSignIn}
                  className="group relative overflow-hidden flex items-center gap-3 rounded-full text-sm font-medium cursor-pointer 
                  bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 
                  text-white px-6 py-3 shadow-xl shadow-blue-600/30 
                  hover:shadow-blue-600/50 transition-all duration-300 hover:-translate-y-0.5"
                >
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  
                  <Sparkles className="w-4 h-4" />
                  <span className="relative z-10 font-semibold">Start Journey</span>
                  <div className="relative overflow-hidden rounded-full bg-white/20 p-1">
                    <Sparkles className="w-3 h-3 animate-spin-slow" />
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 animate-slideDown">
              <div className="py-4 px-4">
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        navigate(item.id);
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        activeTab === item.id
                          ? "bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-white"
                          : "text-slate-300 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                      {activeTab === item.id && (
                        <div className="ml-auto w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      )}
                    </button>
                  ))}
                  
                  {/* Quick Action Mobile */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium">
                      <Zap size={18} />
                      <span>Launch AI Studio</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add CSS Animations */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;