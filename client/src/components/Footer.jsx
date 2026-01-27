// import React from 'react'
// import { assets } from '../assets/assets'

// const Footer = () => {
//   return (
//     <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500 mt-20">
//     <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
//         <div className="md:max-w-96">
//             <img className="h-9" src={assets.logo} alt="logo"/>
//             <p className="mt-6 text-sm">
//                 Experience the power of AI with QuickAi. <br />Transform your content creation with our suite of premium AI tools. Write articles, generate images, and enhance your workflow.
//             </p>
//         </div>
//         <div className="flex-1 flex items-start md:justify-end gap-20">
//             <div>
//                 <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
//                 <ul className="text-sm space-y-2">
//                     <li><a href="#">Home</a></li>
//                     <li><a href="#">About us</a></li>
//                     <li><a href="#">Contact us</a></li>
//                     <li><a href="#">Privacy policy</a></li>
//                 </ul>
//             </div>
//             <div>
//                 <h2 className="font-semibold text-gray-800 mb-5">Subscribe to our newsletter</h2>
//                 <div className="text-sm space-y-2">
//                     <p>The latest news, articles, and resources, sent to your inbox weekly.</p>
//                     <div className="flex items-center gap-2 pt-4">
//                         <input className="border border-gray-500/30 placeholder-gray-500 focus:ring-2 ring-indigo-600 outline-none w-full max-w-64 h-9 rounded px-2" type="email" placeholder="Enter your email" />
//                         <button className="bg-primary w-24 h-9 text-white rounded cursor-pointer">Subscribe</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//     <p className="pt-4 text-center text-xs md:text-sm pb-5">
//         Copyright 2025 © GreatStack. All Right Reserved.
//     </p>
// </footer>
//   )
// }

// export default Footer
import React, { useState } from "react";
import { 
  Brain, 
  Cpu, 
  Zap, 
  Code2, 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Sparkles,
  ChevronRight,
  Send
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 3000);
    }
  };

  const productLinks = [
    { name: "AI Studio", desc: "Build & train models" },
    { name: "Algorithm Hub", desc: "Pre-built solutions" },
    { name: "API Docs", desc: "Developer resources" },
    { name: "Pricing", desc: "Plans & features" },
  ];

  const companyLinks = [
    { name: "About", desc: "Our mission" },
    { name: "Careers", desc: "Join our team" },
    { name: "Blog", desc: "Latest insights" },
    { name: "Contact", desc: "Get in touch" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", desc: "Data protection" },
    { name: "Terms of Service", desc: "Usage terms" },
    { name: "Security", desc: "Compliance" },
    { name: "Cookies", desc: "Cookie policy" },
  ];

  const socialLinks = [
    { icon: <Github size={20} />, label: "GitHub", color: "hover:text-gray-300" },
    { icon: <Twitter size={20} />, label: "Twitter", color: "hover:text-blue-400" },
    { icon: <Linkedin size={20} />, label: "LinkedIn", color: "hover:text-blue-500" },
    { icon: <Mail size={20} />, label: "Email", color: "hover:text-red-400" },
  ];

  const stats = [
    { number: "10K+", label: "Developers", icon: <Code2 size={16} /> },
    { number: "50K+", label: "Models", icon: <Brain size={16} /> },
    { number: "99.9%", label: "Uptime", icon: <Zap size={16} /> },
    { number: "100M+", label: "Requests", icon: <Cpu size={16} /> },
  ];

  return (
    <footer className="relative w-full bg-gradient-to-b from-black to-gray-900 text-gray-400 overflow-hidden border-t border-white/5">
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Top gradient border */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500/30 via-30% via-purple-500/30 via-70% to-transparent" />
      
      {/* Main content */}
      <div className="relative z-10 px-6 py-16 md:px-12 lg:px-24 xl:px-32 max-w-7xl mx-auto">
        
        {/* Top stats section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-blue-400">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {stat.number}
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-70"></div>
                <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-full">
                  <Brain size={28} className="text-white" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Algo.ai
                </div>
                <div className="text-xs text-gray-400 font-medium tracking-wider">
                  INTELLIGENT ALGORITHMS
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 mb-6">
              Empowering developers with cutting-edge AI algorithms.
              Build, deploy, and scale intelligent applications effortlessly.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`p-2 rounded-lg bg-white/5 border border-white/10 ${social.color} hover:bg-white/10 transition-all duration-300 hover:scale-110`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Product links */}
          <div>
            <h3 className="font-semibold text-white mb-6 flex items-center gap-2">
              <ChevronRight size={16} className="text-blue-400" />
              Products
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="group flex items-start gap-2 hover:text-white transition-colors"
                  >
                    <div className="flex-1">
                      <div className="font-medium group-hover:text-blue-300 transition-colors">
                        {link.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {link.desc}
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="font-semibold text-white mb-6 flex items-center gap-2">
              <ChevronRight size={16} className="text-purple-400" />
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="group flex items-start gap-2 hover:text-white transition-colors"
                  >
                    <div className="flex-1">
                      <div className="font-medium group-hover:text-purple-300 transition-colors">
                        {link.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {link.desc}
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-white mb-6 flex items-center gap-2">
              <Sparkles size={16} className="text-cyan-400" />
              Stay Updated
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Get AI insights, tutorials, and product updates.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 
                    rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 
                    focus:border-blue-500/50 transition-all duration-300"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 
                    bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                    p-2 rounded-lg hover:from-blue-700 hover:to-purple-700 
                    transition-all duration-300 hover:scale-105"
                >
                  <Send size={18} />
                </button>
              </div>
              {subscribed && (
                <div className="text-sm text-green-400 animate-fadeIn">
                  🎉 Subscribed successfully! Check your email.
                </div>
              )}
              <p className="text-xs text-gray-500">
                Join 10,000+ developers. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-gray-300">All systems operational</span>
              </div>
              <div className="text-sm text-gray-500 hidden md:block">
                Last updated: {new Date().toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex gap-6">
                {legalLinks.map((link, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              <div className="text-sm text-gray-500">
                © {new Date().getFullYear()} Algo.ai. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </footer>
  );
};

export default Footer;