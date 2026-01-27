// import { Scissors, Sparkles } from 'lucide-react'
// import React, { useState } from 'react'
// import axios from 'axios'
// import { useAuth } from '@clerk/clerk-react';
// import toast from 'react-hot-toast';

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// const RemoveObject = () => {

//   const [input, setInput] = useState('')
//   const [object, setObject] = useState('')

//   const [loading, setLoading] = useState(false)
//   const [content, setContent] = useState('')

//   const {getToken} = useAuth()
      
//     const onSubmitHandler = async (e)=>{
//           e.preventDefault();
//           try {
//             setLoading(true)

//             if(object.split(' ').length > 1){
//               return toast('Please enter only one object name')
//             }

//               const formData = new FormData()
//               formData.append('image', input)
//               formData.append('object', object)

//               const { data } = await axios.post('/api/ai/remove-image-object',formData, {headers: {Authorization: `Bearer ${await getToken()}`}})

//             if (data.success) {
//               setContent(data.content)
//             }else{
//               toast.error(data.message)
//             }
//           } catch (error) {
//             toast.error(error.message)
//           }
//           setLoading(false)
//         }

//   return (
//     <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
//       {/* left col */}
//       <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>

//           <div className='flex items-center gap-3'>
//             <Sparkles className='w-6 text-[#4A7AFF]'/>
//             <h1 className='text-xl font-semibold'>Object Removal</h1>
//           </div>

//           <p className='mt-6 text-sm font-medium'>Upload image</p>

//           <input onChange={(e)=>setInput(e.target.files[0])} type="file" accept='image/*' className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600' required/>

//           <p className='mt-6 text-sm font-medium'>Describe object name to remove</p>

//           <textarea onChange={(e)=>setObject(e.target.value)} value={object} rows={4} className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='e.g., watch or spoon , Only single object name' required/>
          
//           <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#417DF6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
//             {
//               loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
//               : <Scissors className='w-5'/>
//             }
            
//             Remove object
//           </button>
//       </form>
//       {/* Right col */}
//       <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96'>

//             <div className='flex items-center gap-3'>
//               <Scissors className='w-5 h-5 text-[#4A7AFF]' />
//               <h1 className='text-xl font-semibold'>Processed Image</h1>
//             </div>

//             {
//               !content ? 
//               (
//               <div className='flex-1 flex justify-center items-center'>
//               <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
//                 <Scissors className='w-9 h-9' />
//                 <p>Upload an image and click "Remove Object" to get started</p>
//               </div>
//             </div>
//             )
//               :
//               (
//                 <img src={content} alt="image" className='mt-3 w-full h-full '/>
//               )
//             }
            
//       </div>
//     </div>
   
//   )
// }

// export default RemoveObject



// import { Scissors, Sparkles, Moon, Sun } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "@clerk/clerk-react";
// import toast from "react-hot-toast";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// const RemoveObject = () => {
//   const [input, setInput] = useState(null);
//   const [object, setObject] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [content, setContent] = useState("");
//   const [dark, setDark] = useState(false);

//   const { getToken } = useAuth();

//   // 🌙 remember dark mode
//   useEffect(() => {
//     const saved = localStorage.getItem("dark-mode");
//     if (saved === "true") setDark(true);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("dark-mode", dark);
//   }, [dark]);

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       if (object.trim().split(" ").length > 1) {
//         return toast("Please enter only one object name");
//       }

//       setLoading(true);

//       const formData = new FormData();
//       formData.append("image", input);
//       formData.append("object", object);

//       const { data } = await axios.post(
//         "/api/ai/remove-image-object",
//         formData,
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
//       toast.error(error.message);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className={dark ? "dark" : ""}>
//       <div className="min-h-screen p-6 bg-slate-50 dark:bg-black text-slate-700 dark:text-slate-200">

//         {/* TOGGLE – less gap */}
//         <div className="flex justify-end mb-1">
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

//         {/* MAIN GRID – equal boxes */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-24 ml-24">

//           {/* LEFT BOX */}
//           <form
//             onSubmit={onSubmitHandler}
//             className="h-[460px] w-full max-w-lg p-4 bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-slate-800 flex flex-col"
//           >
//             <div className="flex items-center gap-3">
//               <Sparkles className="w-6 text-[#4A7AFF]" />
//               <h1 className="text-xl font-semibold">
//                 Object Removal
//               </h1>
//             </div>

//             <p className="mt-6 text-sm font-medium">
//               Upload image
//             </p>

//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setInput(e.target.files[0])}
//               className="w-full p-2 px-3 mt-2 text-sm rounded-md border border-gray-300 dark:border-slate-700 bg-transparent"
//               required
//             />

//             <p className="mt-6 text-sm font-medium">
//               Object name to remove
//             </p>

//             <textarea
//               rows={3}
//               value={object}
//               onChange={(e) => setObject(e.target.value)}
//               placeholder="e.g. watch (single word only)"
//               className="w-full p-2 px-3 mt-2 text-sm rounded-md border border-gray-300 dark:border-slate-700 bg-transparent"
//               required
//             />

//             <button
//               disabled={loading}
//               className="mt-auto w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#417DF6] to-[#8E37EB] text-white px-4 py-2 text-sm rounded-lg disabled:opacity-70"
//             >
//               {loading ? (
//                 <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
//               ) : (
//                 <Scissors className="w-5" />
//               )}
//               Remove object
//             </button>
//           </form>

//           {/* RIGHT BOX */}
//           <div className="h-[460px] w-full max-w-lg p-4 bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-slate-800 flex flex-col">
//             <div className="flex items-center gap-3">
//               <Scissors className="w-5 h-5 text-[#4A7AFF]" />
//               <h1 className="text-xl font-semibold">
//                 Processed Image
//               </h1>
//             </div>

//             {!content ? (
//               <div className="flex-1 flex justify-center items-center">
//                 <div className="text-sm flex flex-col items-center gap-4 text-gray-400">
//                   <Scissors className="w-9 h-9" />
//                   <p className="text-center">
//                     Upload an image and click “Remove object”
//                   </p>
//                 </div>
//               </div>
//             ) : (
//               <div className="mt-3 flex-1 flex items-center justify-center">
//                 <img
//                   src={content}
//                   alt="processed"
//                   className="max-h-full max-w-full rounded-md"
//                 />
//               </div>
//             )}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default RemoveObject;





import { 
  Scissors, 
  Sparkles, 
  Moon, 
  Sun, 
  Upload, 
  Download, 
  Zap, 
  CheckCircle, 
  AlertCircle,
  X,
  FileImage,
  Eye,
  Maximize2,
  Target,
  ArrowRight,
  Info
} from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [object, setObject] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [fileInfo, setFileInfo] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fullscreenPreview, setFullscreenPreview] = useState(false);

  const fileInputRef = useRef(null);
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

  // Handle click on upload area
  const handleUploadAreaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFileChange({ target: { files: droppedFiles } });
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files ? e.target.files[0] : e;
    if (!selectedFile) return;

    // Check file type
    if (!selectedFile.type.startsWith('image/')) {
      toast.error("Please select an image file (JPG, PNG, WEBP)");
      return;
    }

    // Check file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error("File size should be less than 10MB");
      return;
    }

    setFile(selectedFile);
    setFileInfo({
      name: selectedFile.name.length > 20 ? selectedFile.name.substring(0, 20) + '...' : selectedFile.name,
      size: (selectedFile.size / (1024 * 1024)).toFixed(2) + ' MB',
      type: selectedFile.type.split('/')[1].toUpperCase(),
      dimensions: 'Checking...'
    });

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new window.Image();
      img.onload = () => {
        setFileInfo(prev => ({
          ...prev,
          dimensions: `${img.width} × ${img.height}`
        }));
      };
      img.src = reader.result;
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  // Clear file
  const handleClearFile = (e) => {
    e.stopPropagation();
    setFile(null);
    setPreview(null);
    setFileInfo(null);
    setContent("");
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Submit handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (!file) {
      toast.error("Please select an image first");
      return;
    }

    if (!object.trim()) {
      toast.error("Please enter the object name to remove");
      return;
    }

    if (object.trim().split(" ").length > 1) {
      toast.error("Please enter only one object name");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", file);
      formData.append("object", object.trim().toLowerCase());

      const { data } = await axios.post(
        "/api/ai/remove-image-object",
        formData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setContent(data.content);
        toast.success(`"${object}" removed successfully! 🎯`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "AI is busy. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Download processed image
  const handleDownload = () => {
    if (!content) return;
    
    try {
      const link = document.createElement('a');
      link.href = content;
      link.download = `object-removed-${fileInfo?.name || 'image'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Image downloaded!");
    } catch (err) {
      toast.error("Failed to download image");
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + O to open file dialog
      if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
        e.preventDefault();
        handleUploadAreaClick();
      }
      // Escape to clear file or exit fullscreen
      if (e.key === 'Escape') {
        if (fullscreenPreview) {
          setFullscreenPreview(false);
        } else if (file) {
          handleClearFile({ stopPropagation: () => {} });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [file, fullscreenPreview]);

  // Suggested objects
  const suggestedObjects = ['person', 'car', 'tree', 'text', 'logo', 'watermark', 'object', 'sign'];

  return (
    <div className={`min-h-screen bg-black p-4 sm:p-6 lg:p-8 ${fullscreenPreview ? 'overflow-hidden' : ''}`}>
      
      {/* Fullscreen Preview Modal */}
      {fullscreenPreview && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4">
          <button
            onClick={() => setFullscreenPreview(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-900/80 hover:bg-gray-800 border border-gray-800 text-white z-10"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={fullscreenPreview}
            alt="Fullscreen preview"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      )}
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">
            AI Object Remover
          </h1>
          <p className="text-sm text-gray-400">
            Remove unwanted objects from images with precision
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Stats */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-gray-500" />
              <span className="text-xs text-gray-400">Credits: 45/100</span>
            </div>
          </div>
          
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
        
        {/* LEFT PANEL - UPLOAD & SETTINGS */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-xl bg-gradient-to-r from-[#417DF6]/20 to-[#8E37EB]/20">
              <Sparkles className="w-6 h-6 text-[#4A7AFF]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                Object Removal
              </h2>
              <p className="text-sm text-gray-400">
                Remove specific objects from images
              </p>
            </div>
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-6">
            {/* Upload Area */}
            <div
              onClick={handleUploadAreaClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 cursor-pointer group ${
                isDragging 
                  ? 'border-[#4A7AFF] bg-[#4A7AFF]/10 scale-[1.02]' 
                  : file 
                    ? 'border-[#4A7AFF]/30 bg-[#4A7AFF]/5 hover:border-[#4A7AFF]/50' 
                    : 'border-gray-800 hover:border-gray-700 hover:bg-gray-800/50'
              }`}
            >
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute opacity-0 w-0 h-0"
              />

              {preview ? (
                <div className="relative">
                  <div className="relative w-full max-w-md mx-auto">
                    <div className="relative group/preview">
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-auto max-h-48 rounded-lg object-cover border border-gray-800 shadow-lg"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/preview:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFullscreenPreview(preview);
                          }}
                          className="p-2 rounded-full bg-gray-900 border border-gray-800 hover:bg-gray-800 transition-colors"
                          title="View fullscreen"
                        >
                          <Maximize2 className="w-4 h-4 text-gray-300" />
                        </button>
                        <button
                          type="button"
                          onClick={handleClearFile}
                          className="p-2 rounded-full bg-gray-900 border border-gray-800 hover:bg-gray-800 transition-colors"
                          title="Remove image"
                        >
                          <X className="w-4 h-4 text-gray-300" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-400">
                      Click anywhere to change image
                    </div>
                  </div>
                  {fileInfo && (
                    <div className="mt-4 p-3 rounded-lg bg-gray-800 border border-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileImage className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-300">{fileInfo.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-500">{fileInfo.size}</span>
                          <span className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300">{fileInfo.type}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className={`p-6 rounded-full transition-all duration-300 inline-block mb-4 group-hover:scale-110 ${
                    isDragging ? 'bg-[#4A7AFF]/20' : 'bg-gray-800'
                  }`}>
                    {isDragging ? (
                      <Upload className="w-10 h-10 text-[#4A7AFF] animate-bounce" />
                    ) : (
                      <Upload className="w-10 h-10 text-gray-400 group-hover:text-gray-300" />
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mb-2">
                    {isDragging ? "Drop your image here" : "Drag & drop your image here"}
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    or click anywhere in this area
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 text-sm">
                    <span>Supports: JPG, PNG, WEBP</span>
                    <span className="text-gray-600">•</span>
                    <span>Max: 10MB</span>
                  </div>
                </>
              )}
            </div>

            {/* Object Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-300">
                  Object to Remove
                </label>
                <span className="text-xs text-gray-500">
                  Single word only
                </span>
              </div>
              <div className="relative">
                <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={object}
                  onChange={(e) => setObject(e.target.value)}
                  placeholder="Enter object name (e.g., person, car, text)"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4A7AFF] focus:border-transparent transition-all"
                />
              </div>
              
              {/* Suggested Objects */}
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2">Suggested objects:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedObjects.map((obj) => (
                    <button
                      type="button"
                      key={obj}
                      onClick={() => setObject(obj)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                        object === obj
                          ? "bg-gradient-to-r from-[#417DF6] to-[#8E37EB] text-white"
                          : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-300"
                      }`}
                    >
                      {obj}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="p-4 rounded-xl bg-gray-800 border border-gray-700">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-[#4A7AFF] mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-300">
                    How it works
                  </p>
                  <ul className="text-xs text-gray-500 mt-2 space-y-2">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="w-3 h-3 text-[#4A7AFF]" />
                      AI identifies and removes the specified object
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="w-3 h-3 text-[#4A7AFF]" />
                      Intelligently fills the removed area
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="w-3 h-3 text-[#4A7AFF]" />
                      Preserves the rest of the image perfectly
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Remove Object Button - BLUE/PURPLE GRADIENT */}
            <button
              type="submit"
              disabled={loading || !file || !object.trim()}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#417DF6] to-[#8E37EB] hover:from-[#366CE0] hover:to-[#7D2AD4] text-white px-6 py-3.5 rounded-xl font-medium text-sm shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>Removing object...</span>
                </>
              ) : (
                <>
                  <Scissors className="w-5 h-5" />
                  <span>{file && object ? `Remove "${object}"` : "Select Image & Object"}</span>
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-500">
              Precision object removal • AI-powered editing • Professional results
            </p>
          </form>
        </div>

        {/* RIGHT PANEL - RESULT */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 flex flex-col h-[600px]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-r from-[#417DF6]/20 to-[#8E37EB]/20">
                <Scissors className="w-6 h-6 text-[#4A7AFF]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Processed Image
                </h2>
                <p className="text-sm text-gray-400">
                  Preview & Download
                </p>
              </div>
            </div>
            
            {/* Action Buttons */}
            {content && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-[#417DF6] to-[#8E37EB] hover:from-[#366CE0] hover:to-[#7D2AD4] text-white text-sm font-medium transition-all duration-300"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            )}
          </div>

          {/* Stats Card */}
          <div className="mb-4 p-3 rounded-xl bg-gray-800 border border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    content ? 'bg-[#4A7AFF] animate-pulse' : 'bg-gray-500'
                  }`}></div>
                  <span className="text-sm text-gray-400">Status:</span>
                  <span className="text-sm font-bold text-white">
                    {content ? 'Object Removed' : 'No Image'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-400">Object:</span>
                  <span className="text-sm font-bold text-white">
                    {object || 'None'}
                  </span>
                </div>
              </div>
              {content && (
                <div className="px-2 py-1 rounded-full text-xs bg-gradient-to-r from-[#417DF6]/20 to-[#8E37EB]/20 border border-[#4A7AFF]/30 text-[#4A7AFF]">
                  Clean Result
                </div>
              )}
            </div>
          </div>

          {/* Result Display */}
          <div className="flex-1 overflow-y-auto">
            {!content ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-600 gap-4">
                <div className="p-4 rounded-full bg-gradient-to-r from-[#417DF6]/10 to-[#8E37EB]/10">
                  <Scissors className="w-12 h-12 text-gray-700" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-gray-500">
                    No processed image yet
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Upload an image and specify object to remove
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative group">
                  <img
                    src={content}
                    alt="Object removed"
                    className="w-full h-auto max-h-80 rounded-xl border border-gray-800 shadow-lg group-hover:border-[#4A7AFF]/30 transition-colors"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-end justify-center p-4">
                    <button
                      onClick={() => setFullscreenPreview(content)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900/90 border border-gray-800 text-gray-300 hover:text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Eye className="w-4 h-4" />
                      View Full Size
                    </button>
                  </div>
                </div>
                
                {/* Comparison Info */}
                <div className="p-4 rounded-xl bg-gray-800 border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-gray-300">Object Removal Complete</p>
                    <div className="flex items-center gap-2 text-xs text-[#4A7AFF]">
                      <CheckCircle className="w-3 h-3" />
                      <span>Successfully Removed</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Object targeted:</span>
                      <span className="text-[#4A7AFF] font-medium">{object}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Result quality:</span>
                      <span className="text-gray-300">Seamless</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Processing time:</span>
                      <span className="text-gray-300">~10 seconds</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-3 h-3" />
                <span>AI-powered object removal • Professional editing</span>
              </div>
              <span>Algo.ai • Object Remover</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveObject;