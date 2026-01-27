

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
              src="/3205624-hd_1920_1080_25fps.mp4"
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
              src="/3205624-hd_1920_1080_25fps.mp4"
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

