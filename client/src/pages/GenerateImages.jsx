// import { Image, Sparkles } from 'lucide-react'
// import React, { useState } from 'react'
// import axios from 'axios'
// import { useAuth } from '@clerk/clerk-react';
// import toast from 'react-hot-toast';

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// const GenerateImages = () => {

//   const imageStyle = ['Realistic', 'Ghibli style', 'Anime style', 'Cartoon style', 'Fantasy style', 'Realistic style', '3D style', 'Portrait style']
    
//       const [selectedStyle, setSelectedStyle] = useState('Realistic')
//       const [input, setInput] = useState('')
//       const [publish, setPublish] = useState(false)
//       const [loading, setLoading] = useState(false)
//       const [content, setContent] = useState('')

//       const {getToken} = useAuth()
    
//       const onSubmitHandler = async (e)=>{
//         e.preventDefault();
//         try {
//           setLoading(true)

//           const prompt = `Generate an image of ${input} in the style ${selectedStyle}`

//           const { data } = await axios.post('/api/ai/generate-image', {prompt, publish}, {headers: {Authorization: `Bearer ${await getToken()}`}})

//          if (data.success) {
//           setContent(data.content)
//          }else{
//           toast.error(data.message)
//          }
//         } catch (error) {
//           toast.error(error.message)
//         }
//         setLoading(false)
//       }

//   return (
//     <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
//       {/* left col */}
//       <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
//           <div className='flex items-center gap-3'>
//             <Sparkles className='w-6 text-[#00AD25]'/>
//             <h1 className='text-xl font-semibold'>AI Image Generator</h1>
//           </div>
//           <p className='mt-6 text-sm font-medium'>Describe Your Image</p>

//           <textarea onChange={(e)=>setInput(e.target.value)} value={input} rows={4} className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='Describe what you want to see in the image..' required/>

//           <p className='mt-4 text-sm font-medium'>Style</p>

//           <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
//             {imageStyle.map((item)=>(
//               <span onClick={()=> setSelectedStyle(item)} 
//               className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedStyle === item ? 'bg-green-50 text-green-700' : 'text-gray-500 border-gray-300'}`} key={item}>{item}</span>
//             ) )}
//           </div>

//             <div className='my-6 flex items-center gap-2'>
//               <label className='relative cursor-pointer'>
//                 <input type="checkbox" onChange={(e)=>setPublish(e.target.checked)} checked={publish} className='sr-only peer' />

//                 <div className='w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition'></div>

//                 <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4'></span>
//               </label>
//               <p className='text-sm'>Make this image Public</p>
//             </div>

//           <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
//             {
//             loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
//             : <Image className='w-5'/>
//             }
            
//             Generate Image
//           </button>
//       </form>
//       {/* Right col */}
//       <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96'>

//             <div className='flex items-center gap-3'>
//               <Image className='w-5 h-5 text-[#00AD25]' />
//               <h1 className='text-xl font-semibold'>Generated image</h1>
//             </div>
//             {
//               !content ? (
//                 <div className='flex-1 flex justify-center items-center'>
//                   <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
//                     <Image className='w-9 h-9' />
//                     <p>Enter a topic and click “Generate image ” to get started</p>
//                   </div>
//                 </div>
//               ) : (
//                 <div className='mt-3 h-full'>
//                   <img src={content} alt="image" className='w-full h-full'/>
//                 </div>
//               )
//             }
            
//       </div>
//     </div>
//   )
// }

// export default GenerateImages
import { Image, Sparkles, Moon, Sun, Copy, Download, Zap, CheckCircle, AlertCircle, Eye, EyeOff, Maximize2, Minimize2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {
  const imageStyle = [
    "Realistic",
    "Ghibli style",
    "Anime style",
    "Cartoon style",
    "Fantasy style",
    "3D style",
    "Portrait style",
    "Cyberpunk style",
  ];

  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  const { getToken } = useAuth();

  // Initialize dark mode
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    if (darkMode) {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) {
      toast.error("Please describe your image");
      return;
    }

    try {
      setLoading(true);

      const prompt = `Generate a high-quality image of "${input}" in ${selectedStyle} style. Make it professional and visually appealing.`;

      const { data } = await axios.post(
        "/api/ai/generate-image",
        { prompt, publish },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setContent(data.content);
        toast.success("Image generated successfully! 🎨");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "AI is busy. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(input);
      setCopied(true);
      toast.success("Prompt copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const handleDownload = () => {
    try {
      const link = document.createElement('a');
      link.href = content;
      link.download = `ai-generated-${input.replace(/\s+/g, '-').toLowerCase()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Image downloaded!");
    } catch (err) {
      toast.error("Failed to download image");
    }
  };

  return (
    <div className={`min-h-screen bg-black ${fullscreen ? 'fixed inset-0 z-50 overflow-auto' : ''}`}>
      <div className={`p-4 sm:p-6 lg:p-8 ${fullscreen ? 'max-w-7xl mx-auto' : ''}`}>
        
        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">
              AI Image Generator
            </h1>
            <p className="text-sm text-gray-400">
              Create stunning images with AI
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Stats */}
            <div className="hidden sm:flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-gray-500" />
                <span className="text-xs text-gray-400">Credits: 75/100</span>
              </div>
            </div>
            
            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-gray-900 hover:bg-gray-800 border border-gray-800 transition-colors"
              title={fullscreen ? "Exit fullscreen" : "Fullscreen"}
            >
              {fullscreen ? 
                <Minimize2 className="w-4 h-4 text-gray-300" /> : 
                <Maximize2 className="w-4 h-4 text-gray-300" />
              }
            </button>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="relative w-12 h-6 rounded-full focus:outline-none"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <div className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                darkMode ? 'bg-gray-800' : 'bg-gray-700'
              }`} />
              
              <div className={`absolute top-0.5 w-5 h-5 rounded-full shadow-lg transform transition-transform duration-300 flex items-center justify-center ${
                darkMode 
                  ? 'left-0.5 bg-gray-300' 
                  : 'left-6 bg-gray-200'
              }`}>
                {darkMode ? (
                  <Moon className="w-3 h-3 text-gray-800" />
                ) : (
                  <Sun className="w-3 h-3 text-gray-800" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          
          {/* LEFT PANEL - INPUT */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-[#00AD25]/20 to-[#04FF50]/20">
                <Sparkles className="w-6 h-6 text-[#04FF50]" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">
                  Generate Images
                </h1>
                <p className="text-sm text-gray-400">
                  AI-powered image generator
                </p>
              </div>
            </div>

            <form onSubmit={onSubmitHandler} className="space-y-6">
              {/* Description Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-300">
                    Describe Your Image
                  </label>
                  <span className="text-xs text-gray-500">
                    {input.length}/500 chars
                  </span>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value.slice(0, 500))}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all resize-none"
                  placeholder="A majestic dragon flying over ancient mountains during sunset, detailed scales, epic lighting..."
                  required
                  maxLength={500}
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-500">
                    Be as descriptive as possible
                  </span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="text-xs text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    {copied ? 'Copied!' : 'Copy prompt'}
                  </button>
                </div>
              </div>

              {/* Style Selection */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-3 block">
                  Style
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {imageStyle.map((item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => setSelectedStyle(item)}
                      className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                        selectedStyle === item
                          ? "bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white border-transparent"
                          : "border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-300 bg-gray-900"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Publish Toggle */}
              <div className="p-4 rounded-xl bg-gray-800 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {publish ? (
                      <Eye className="w-5 h-5 text-[#04FF50]" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-gray-500" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-300">
                        {publish ? "Public Image" : "Private Image"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {publish ? "Visible to everyone" : "Only visible to you"}
                      </p>
                    </div>
                  </div>
                  <label className="relative cursor-pointer">
                    <input
                      type="checkbox"
                      onChange={(e) => setPublish(e.target.checked)}
                      checked={publish}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 rounded-full peer-checked:bg-gradient-to-r from-[#00AD25] to-[#04FF50] transition-colors"></div>
                    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></span>
                  </label>
                </div>
              </div>

              {/* Info Card */}
              <div className="p-4 rounded-xl bg-gray-800 border border-gray-700">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-300">
                      Tips for better images
                    </p>
                    <ul className="text-xs text-gray-500 mt-2 space-y-1">
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#04FF50]"></span>
                        Be specific with details and lighting
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#04FF50]"></span>
                        Mention art style and composition
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#04FF50]"></span>
                        Include mood, colors, and perspective
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Generate Button - GREEN COLOR */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#00AD25] to-[#04FF50] hover:from-[#009920] hover:to-[#03E046] text-white px-6 py-3.5 rounded-xl font-medium text-sm shadow-lg shadow-green-900/30 hover:shadow-green-900/50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Generating image...</span>
                  </>
                ) : (
                  <>
                    <Image className="w-5 h-5" />
                    <span>Generate Image</span>
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-500">
                High-quality images • 1024x1024 resolution • Green theme
              </p>
            </form>
          </div>

          {/* RIGHT PANEL - OUTPUT */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 flex flex-col h-[600px]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-r from-[#00AD25]/20 to-[#04FF50]/20">
                  <Image className="w-6 h-6 text-[#04FF50]" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-white">
                    Generated Image
                  </h1>
                  <p className="text-sm text-gray-400">
                    Preview & Download
                  </p>
                </div>
              </div>
              
              {/* Action Buttons */}
              {content && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300 ${
                      copied
                        ? 'bg-gray-800 border-gray-700 text-gray-300'
                        : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300'
                    }`}
                  >
                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-[#00AD25] to-[#04FF50] hover:from-[#009920] hover:to-[#03E046] text-white border border-transparent hover:shadow-lg hover:shadow-green-900/30 transition-all duration-300"
                  >
                    <Download className="w-4 h-4" />
                    <span className="text-sm">Download</span>
                  </button>
                </div>
              )}
            </div>

            {/* Stats */}
            {content && (
              <div className="mb-4 p-3 rounded-xl bg-gray-800 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#04FF50] animate-pulse"></div>
                      <span className="text-sm text-gray-400">Status:</span>
                      <span className="text-sm font-bold text-white">Ready</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-400">Credits used:</span>
                      <span className="text-sm font-bold text-white">10</span>
                    </div>
                  </div>
                  <div className="px-2 py-1 rounded-full text-xs bg-gradient-to-r from-[#00AD25]/20 to-[#04FF50]/20 border border-[#04FF50]/30 text-[#04FF50]">
                    {selectedStyle}
                  </div>
                </div>
              </div>
            )}

            {/* Image Display */}
            <div className="flex-1 overflow-y-auto">
              {!content ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-600 gap-4">
                  <div className="p-4 rounded-full bg-gradient-to-r from-[#00AD25]/10 to-[#04FF50]/10">
                    <Image className="w-12 h-12 text-gray-700" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-500">
                      No image generated yet
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Describe your image and click generate
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative group">
                    <img
                      src={content}
                      alt="AI generated"
                      className="w-full h-auto rounded-xl border border-gray-800 shadow-lg group-hover:border-[#04FF50]/30 transition-colors"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                  </div>
                  
                  {/* Image Details */}
                  <div className="p-4 rounded-xl bg-gray-800 border border-gray-700">
                    <p className="text-sm font-medium text-gray-300 mb-2">Prompt Details</p>
                    <p className="text-xs text-gray-400 break-words">{input}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Style:</span>
                        <span className="text-xs text-[#04FF50]">{selectedStyle}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Visibility:</span>
                        <span className={`text-xs ${publish ? 'text-[#04FF50]' : 'text-gray-400'}`}>
                          {publish ? 'Public' : 'Private'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-3 h-3" />
                  <span>AI-generated images • Review before use</span>
                </div>
                <span>Algo.ai • Image Generator</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateImages;