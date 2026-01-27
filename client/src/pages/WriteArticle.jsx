// import { Edit, Sparkles } from 'lucide-react'
// import React, { useState } from 'react'
// import axios from 'axios'
// import { useAuth } from '@clerk/clerk-react';
// import toast from 'react-hot-toast';
// import Markdown from 'react-markdown';

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// const WriteArticle = () => {

//   const articleLength = [
//     {length: 800, text: 'Short (500-800 words)'},
//     {length: 1200, text: 'Medium (800-1200 words)'},
//     {length: 1600, text: 'Long (1200+ words)'}
//   ]

//   const [selectedLength, setSelectedLength] = useState(articleLength[0])
//   const [input, setInput] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [content, setContent] = useState('')

//   const {getToken} = useAuth()

//   const onSubmitHandler = async (e)=>{
//     e.preventDefault();
//     try {
//       setLoading(true)
//       const prompt = `Write an article about ${input} in ${selectedLength.text}`

//       const {data} = await axios.post('/api/ai/generate-article', {prompt, length:selectedLength.length}, {
//         headers: {Authorization: `Bearer ${await getToken()}`}
//       })

//       if(data.success){
//         setContent(data.content)
//       }else{
//         toast.error(data.message)
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//     setLoading(false)
//   }

//   return (
//     <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
//       {/* left col */}
//       <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
//           <div className='flex items-center gap-3'>
//             <Sparkles className='w-6 text-[#4A7AFF]'/>
//             <h1 className='text-xl font-semibold'>Article Configuration</h1>
//           </div>
//           <p className='mt-6 text-sm font-medium'>Article Topic</p>

//           <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='The future of artificial intelligence is...' required/>

//           <p className='mt-4 text-sm font-medium'>Article Length</p>

//           <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
//             {articleLength.map((item, index)=>(
//               <span onClick={()=> setSelectedLength(item)} 
//               className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedLength.text === item.text ? 'bg-blue-50 text-blue-700' : 'text-gray-500 border-gray-300'}`} key={index}>{item.text}</span>
//             ) )}
//           </div>
//           <br/>
//           <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
//             {
//               loading ? <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
//               : <Edit className='w-5'/>
//             }
//             Generate article
//           </button>
//       </form>
//       {/* Right col */}
//       <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>

//             <div className='flex items-center gap-3'>
//               <Edit className='w-5 h-5 text-[#4A7AFF]' />
//               <h1 className='text-xl font-semibold'>Generated article</h1>
//             </div>

//             {!content ? (
//               <div className='flex-1 flex justify-center items-center'>
//               <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
//                 <Edit className='w-9 h-9' />
//                 <p>Enter a topic and click “Generate article ” to get started</p>
//               </div>
//             </div>
//             ) : (
//               <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600'>
//                 <div className='reset-tw'>
//                   <Markdown>{content}</Markdown>
//                 </div>
//               </div>
//             )}
            
//       </div>
//     </div>
//   )
// }

// export default WriteArticle































// import { Edit, Sparkles } from "lucide-react";
// import React, { useState } from "react";
// import axios from "axios";
// import { useAuth } from "@clerk/clerk-react";
// import toast from "react-hot-toast";
// import Markdown from "react-markdown";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// const WriteArticle = () => {
//   // ✅ Free-tier safe lengths
//   const articleLength = [
//     { length: 100, text: "Very Short (100–150 words)" },
//     { length: 250, text: "Short (150–250 words)" },
//   ];

//   const [selectedLength, setSelectedLength] = useState(articleLength[0]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [cooldown, setCooldown] = useState(false);
//   const [content, setContent] = useState("");

//   const { getToken } = useAuth();

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     if (cooldown) {
//       toast.error("Please wait 20 seconds before generating again ⏳");
//       return;
//     }

//     if (!input.trim()) {
//       toast.error("Please enter an article topic");
//       return;
//     }

//     try {
//       setLoading(true);
//       setCooldown(true);

//       const prompt = `Write a short article about ${input}. Keep it under ${
//         selectedLength.length
//       } words. Be concise and clear.`;

//       const { data } = await axios.post(
//         "/api/ai/generate-article",
//         {
//           prompt,
//           length: selectedLength.length,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${await getToken()}`,
//           },
//         }
//       );

//       if (data.success) {
//         setContent(data.content);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error("AI is busy. Please try again later.");
//     } finally {
//       setLoading(false);
//       setTimeout(() => setCooldown(false), 20000); // ⏳ 20 sec cooldown
//     }
//   };

//   return (
//     <div className="h-full overflow-y-scroll p-6 flex flex-wrap gap-4 text-slate-700">
//       {/* LEFT PANEL */}
//       <form
//         onSubmit={onSubmitHandler}
//         className="w-full max-w-lg p-5 bg-white rounded-lg border border-gray-200"
//       >
//         <div className="flex items-center gap-3">
//           <Sparkles className="w-6 text-[#4A7AFF]" />
//           <h1 className="text-xl font-semibold">Article Configuration</h1>
//         </div>

//         <p className="mt-6 text-sm font-medium">Article Topic</p>
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           type="text"
//           placeholder="The future of artificial intelligence..."
//           className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
//           required
//         />

//         <p className="mt-4 text-sm font-medium">Article Length</p>

//         <div className="mt-3 flex gap-3 flex-wrap">
//           {articleLength.map((item, index) => (
//             <span
//               key={index}
//               onClick={() => setSelectedLength(item)}
//               className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
//                 selectedLength.text === item.text
//                   ? "bg-blue-50 text-blue-700 border-blue-300"
//                   : "text-gray-500 border-gray-300"
//               }`}
//             >
//               {item.text}
//             </span>
//           ))}
//         </div>

//         <p className="mt-3 text-xs text-gray-400">
//           Free users can generate short articles only (up to 250 words)
//         </p>

//         <button
//           disabled={loading}
//           className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-6 text-sm rounded-lg disabled:opacity-70"
//         >
//           {loading ? (
//             <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
//           ) : (
//             <Edit className="w-5" />
//           )}
//           Generate article
//         </button>
//       </form>

//       {/* RIGHT PANEL */}
//       <div className="w-full max-w-lg p-5 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
//         <div className="flex items-center gap-3">
//           <Edit className="w-5 h-5 text-[#4A7AFF]" />
//           <h1 className="text-xl font-semibold">Generated Article</h1>
//         </div>

//         {!content ? (
//           <div className="flex-1 flex justify-center items-center">
//             <div className="text-sm flex flex-col items-center gap-4 text-gray-400">
//               <Edit className="w-9 h-9" />
//               <p>Enter a topic and click “Generate article”</p>
//             </div>
//           </div>
//         ) : (
//           <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-600">
//             <div className="reset-tw prose prose-sm max-w-none">
//               <Markdown>{content}</Markdown>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WriteArticle;












// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Edit, Sparkles, FileText, Moon, Sun } from "lucide-react";
// import { useAuth } from "@clerk/clerk-react";
// import toast from "react-hot-toast";
// import Markdown from "react-markdown";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// const WriteArticle = () => {
//   const { getToken } = useAuth();

//   const articleLength = [
//     { length: 100, text: "Very Short" },
//     { length: 250, text: "Short" },
//   ];

//   const [selectedLength, setSelectedLength] = useState(articleLength[0]);
//   const [input, setInput] = useState("");
//   const [content, setContent] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [cooldown, setCooldown] = useState(false);
//   const [dark, setDark] = useState(false);

//   // 🌙 Dark mode persist
//   useEffect(() => {
//     const saved = localStorage.getItem("dark-mode");
//     if (saved === "true") setDark(true);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("dark-mode", dark);
//   }, [dark]);

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     if (!input.trim()) {
//       toast.error("Please enter an article topic");
//       return;
//     }

//     if (cooldown) {
//       toast.error("Please wait 20 seconds ⏳");
//       return;
//     }

//     try {
//       setLoading(true);
//       setCooldown(true);

//       const prompt = `Write a short article about ${input}. Keep it under ${selectedLength.length} words.`;

//       const { data } = await axios.post(
//         "/api/ai/generate-article",
//         { prompt, length: selectedLength.length },
//         { headers: { Authorization: `Bearer ${await getToken()}` } }
//       );

//       if (data.success) setContent(data.content);
//       else toast.error(data.message);
//     } catch {
//       toast.error("AI is busy. Try again later.");
//     } finally {
//       setLoading(false);
//       setTimeout(() => setCooldown(false), 20000);
//     }
//   };

//   return (
//     <div className={dark ? "dark" : ""}>
//       <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-700 dark:text-slate-200 p-6">

//         {/* TOP BAR */}
//         <div className="flex justify-end mb-6">
//           <button
//             onClick={() => setDark(!dark)}
//             className={`relative w-12 h-6 rounded-full transition ${
//               dark ? "bg-black border border-slate-700" : "bg-gray-300"
//             }`}
//           >
//             <span
//               className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white flex items-center justify-center transition-transform ${
//                 dark ? "translate-x-6" : ""
//               }`}
//             >
//               {dark ? (
//                 <Moon className="w-3 h-3 text-black" />
//               ) : (
//                 <Sun className="w-3 h-3 text-yellow-500" />
//               )}
//             </span>
//           </button>
//         </div>

//         {/* MAIN GRID */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-24 ml-24 h-80 mr-20 mt-40">

//           {/* LEFT PANEL */}
//           <form
//             onSubmit={onSubmitHandler}
//             className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-zinc-900 p-6 shadow-sm "
//           >
//             <div className="flex items-center gap-3">
//               <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
//                 <Sparkles className="w-5 text-blue-600 dark:text-blue-300" />
//               </div>
//               <div>
//                 <h1 className="text-lg font-semibold">Write Article</h1>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">
//                   AI-powered article generator
//                 </p>
//               </div>
//             </div>

//             <label className="block mt-6 text-sm font-medium">
//               Article topic
//             </label>
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Future of artificial intelligence"
//               className="mt-2 w-full rounded-lg border px-3 py-2 text-sm outline-none bg-transparent dark:border-slate-700"
//             />

//             <label className="block mt-5 text-sm font-medium">
//               Length
//             </label>
//             <div className="mt-2 flex gap-3">
//               {articleLength.map((item) => (
//                 <button
//                   type="button"
//                   key={item.text}
//                   onClick={() => setSelectedLength(item)}
//                   className={`px-4 py-1.5 rounded-full text-xs border transition ${
//                     selectedLength.text === item.text
//                       ? "bg-blue-600 text-white border-blue-600"
//                       : "border-gray-300 dark:border-slate-700 text-gray-500"
//                   }`}
//                 >
//                   {item.text}
//                 </button>
//               ))}
//             </div>

//             <p className="mt-3 text-xs text-gray-400">
//               Free plan: up to 250 words
//             </p>

//             <button
//               disabled={loading}
//               className="mt-6 w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm text-white disabled:opacity-60"
//             >
//               {loading ? (
//                 <span className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin" />
//               ) : (
//                 <Edit className="w-4" />
//               )}
//               Generate Article
//             </button>
//           </form>

//           {/* RIGHT PANEL */}
//           <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-zinc-900 p-6 shadow-sm flex flex-col max-h-[650px]">
//             <div className="flex items-center gap-3">
//               <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900">
//                 <FileText className="w-5 text-indigo-600 dark:text-indigo-300" />
//               </div>
//               <div>
//                 <h1 className="text-lg font-semibold">Generated Article</h1>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">
//                   Preview
//                 </p>
//               </div>
//             </div>

//             {!content ? (
//               <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-3">
//                 <FileText className="w-10 h-10" />
//                 <p>No article generated yet</p>
//               </div>
//             ) : (
//               <div className="mt-4 flex-1 overflow-y-auto prose prose-slate dark:prose-invert max-w-none text-sm">
//                 <Markdown>{content}</Markdown>
//               </div>
//             )}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default WriteArticle;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Edit, 
  Sparkles, 
  FileText, 
  Moon, 
  Sun, 
  Zap, 
  Copy, 
  Download, 
  Clock,
  CheckCircle,
  AlertCircle,
  Hash,
  BookOpen,
  Maximize2,
  Minimize2,
  ChevronRight
} from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import Footer from "../components/Footer";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {
  const { getToken } = useAuth();

  const articleLength = [
    { length: 100, text: "Very Short", icon: <Hash className="w-3 h-3" /> },
    { length: 250, text: "Short", icon: <FileText className="w-3 h-3" /> },
    { length: 500, text: "Medium", icon: <BookOpen className="w-3 h-3" /> },
    { length: 1000, text: "Long", icon: <Maximize2 className="w-3 h-3" /> },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [copied, setCopied] = useState(false);

  // Initialize dark mode from localStorage
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

  // Handle escape key for fullscreen
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && fullscreen) {
        setFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [fullscreen]);

  // Word count calculation
  useEffect(() => {
    if (content) {
      const words = content.trim().split(/\s+/).length;
      setWordCount(words);
    }
  }, [content]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!input.trim()) {
      toast.error("Please enter an article topic");
      return;
    }

    if (cooldown) {
      toast.error("Please wait 20 seconds ⏳");
      return;
    }

    try {
      setLoading(true);
      setCooldown(true);

      const prompt = `Write a professional article about "${input}". Make it ${selectedLength.text.toLowerCase()} (${selectedLength.length} words). Format with proper headings, paragraphs, and bullet points if needed.`;

      const { data } = await axios.post(
        "/api/ai/generate-article",
        { prompt, length: selectedLength.length },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        setContent(data.content);
        toast.success("Article generated successfully! ✨");
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("AI is busy. Try again later.");
    } finally {
      setLoading(false);
      setTimeout(() => setCooldown(false), 20000);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([content], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${input.replace(/\s+/g, '-').toLowerCase()}-article.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Article downloaded!");
    } catch (err) {
      toast.error("Failed to download");
    }
  };

  return (
    <div className={`min-h-screen ${fullscreen ? 'fixed inset-0 z-50 overflow-auto' : ''} bg-black`}>
      <div className={`p-4 sm:p-6 lg:p-8 min-h-screen ${fullscreen ? 'max-w-7xl mx-auto' : ''}`}>
        
        {/* TOP BAR - BLACK THEME */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">
              AI Article Writer
            </h1>
            <p className="text-sm text-gray-400">
              Generate professional articles with AI
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-gray-900 hover:bg-gray-800 border border-gray-800 transition-colors duration-200"
              title={fullscreen ? "Exit fullscreen" : "Fullscreen"}
            >
              {fullscreen ? 
                <Minimize2 className="w-4 h-4 text-gray-300" /> : 
                <Maximize2 className="w-4 h-4 text-gray-300" />
              }
            </button>
            
            {/* Dark Mode Toggle - BLACK THEME */}
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

        {/* MAIN GRID - BLACK THEME */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${fullscreen ? 'max-w-7xl mx-auto' : ''}`}>

          {/* LEFT PANEL - INPUT */}
          <div className="rounded-2xl bg-gray-900 border border-gray-800 p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl bg-gray-800">
                <Edit className="w-5 h-5 text-gray-300" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  Write Article
                </h1>
                <p className="text-sm text-gray-400">
                  AI-powered article generator
                </p>
              </div>
            </div>

            <form onSubmit={onSubmitHandler} className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-300">
                    Article Topic
                  </label>
                  <span className="text-xs text-gray-500">
                    {input.length}/100 chars
                  </span>
                </div>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value.slice(0, 100))}
                  placeholder="Future of artificial intelligence in healthcare..."
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all"
                  maxLength={100}
                />
              </div>

              {/* Length Selection */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-3 block">
                  Article Length
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {articleLength.map((item) => (
                    <button
                      type="button"
                      key={item.text}
                      onClick={() => setSelectedLength(item)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-300 ${
                        selectedLength.text === item.text
                          ? "bg-gray-800 border-gray-600 text-white"
                          : "border-gray-800 bg-gray-900 hover:border-gray-700 hover:bg-gray-800 text-gray-400"
                      }`}
                    >
                      <div className={`${selectedLength.text === item.text ? 'text-gray-300' : 'text-gray-500'}`}>
                        {item.icon}
                      </div>
                      <span className={`text-xs font-medium ${
                        selectedLength.text === item.text ? 'text-white' : 'text-gray-400'
                      }`}>
                        {item.text}
                      </span>
                      <span className="text-xs text-gray-500">
                        {item.length} words
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats and Info */}
              <div className="p-4 rounded-xl bg-gray-800 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-xs text-gray-400">
                      Cooldown:
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-300">
                    {cooldown ? "20s" : "Ready"}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-gray-500" />
                    <span className="text-xs text-gray-400">
                      Credits used:
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-300">
                    5 / 100
                  </span>
                </div>
              </div>

              {/* Generate Button */}
              <button
                type="submit"
                disabled={loading || cooldown}
                className={`w-full flex items-center justify-center gap-3 rounded-xl py-3.5 text-sm font-medium transition-all duration-300 ${
                  loading || cooldown
                    ? 'bg-gray-800 border border-gray-700 cursor-not-allowed opacity-70'
                    : 'bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 active:scale-[0.98]'
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-gray-500 border-t-gray-300 animate-spin" />
                    <span className="text-gray-300">
                      Generating...
                    </span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span className="text-white">Generate Article</span>
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-500">
                Premium users get unlimited generations • {selectedLength.length} words max
              </p>
            </form>
          </div>

          {/* RIGHT PANEL - OUTPUT */}
          <div className={`rounded-2xl bg-gray-900 border border-gray-800 p-6 flex flex-col ${fullscreen ? 'h-[80vh]' : 'h-[600px]'}`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gray-800">
                  <FileText className="w-5 h-5 text-gray-300" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">
                    Generated Article
                  </h1>
                  <p className="text-sm text-gray-400">
                    Preview & Export
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
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 hover:border-gray-600 hover:text-gray-200 transition-all duration-300"
                  >
                    <Download className="w-4 h-4" />
                    <span className="text-sm">Download</span>
                  </button>
                </div>
              )}
            </div>

            {/* Word Count Stats */}
            {content && (
              <div className="mb-4 p-3 rounded-xl bg-gray-800 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-400">
                        Words:
                      </span>
                      <span className="text-sm font-medium text-gray-300">
                        {wordCount}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-400">
                        Read time:
                      </span>
                      <span className="text-sm font-medium text-gray-300">
                        {Math.ceil(wordCount / 200)} min
                      </span>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    wordCount <= selectedLength.length 
                      ? 'bg-gray-800 text-gray-300 border border-gray-700'
                      : 'bg-gray-800 text-gray-300 border border-gray-700'
                  }`}>
                    {wordCount <= selectedLength.length ? 'Within limit' : 'Over limit'}
                  </div>
                </div>
              </div>
            )}

            {/* Content Display */}
            <div className="flex-1 overflow-y-auto">
              {!content ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-600 gap-4">
                  <div className="p-4 rounded-full bg-gray-800">
                    <FileText className="w-12 h-12 text-gray-700" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-500">
                      No article generated yet
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Enter a topic and click generate
                    </p>
                  </div>
                </div>
              ) : (
                <div className="prose prose-invert max-w-none">
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <Markdown 
                      components={{
                        h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-white mb-4 pb-2 border-b border-gray-700" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-xl font-semibold text-gray-300 mb-3 mt-6" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-lg font-medium text-gray-300 mb-2 mt-4" {...props} />,
                        p: ({node, ...props}) => <p className="text-gray-400 mb-4 leading-relaxed" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc list-inside text-gray-400 mb-4 space-y-1" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal list-inside text-gray-400 mb-4 space-y-1" {...props} />,
                        li: ({node, ...props}) => (
                          <li className="ml-4 text-gray-400">
                            <ChevronRight className="w-3 h-3 inline mr-2 text-gray-600" />
                            <span {...props} />
                          </li>
                        ),
                        strong: ({node, ...props}) => <strong className="font-semibold text-gray-300" {...props} />,
                        blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-700 pl-4 italic text-gray-400 my-4" {...props} />
                      }}
                    >
                      {content}
                    </Markdown>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-3 h-3" />
                  <span>AI-generated content • Review before use</span>
                </div>
                <span>Algo.ai • Premium</span>
               
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    
  );
};

export default WriteArticle;