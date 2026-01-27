// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Image, Sparkles } from "lucide-react";
// import { useAuth } from "@clerk/clerk-react";
// import toast from "react-hot-toast";

// // ✅ baseURL ONLY ONCE (same as GenerateImages)
// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// const ImageUpscalePage = () => {
//   const { getToken } = useAuth();

//   const [file, setFile] = useState(null);
//   const [taskId, setTaskId] = useState(null);
//   const [status, setStatus] = useState(null);
//   const [downloadUrl, setDownloadUrl] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // 🔁 Poll async task status
//   useEffect(() => {
//     if (!taskId) return;

//     const interval = setInterval(async () => {
//       try {
//         const { data } = await axios.get(
//           `/api/ai/async-upscale/status/${taskId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${await getToken()}`,
//             },
//           }
//         );

//         setStatus(data.status);

//         if (data.status === "completed") {
//           clearInterval(interval);

//           const result = await axios.get(
//             `/api/ai/async-upscale/result/${taskId}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${await getToken()}`,
//               },
//             }
//           );

//           setDownloadUrl(result.data.downloadUrl);
//           setLoading(false);
//           toast.success("Image upscaled successfully 🚀");
//         }

//         if (data.status === "failed") {
//           clearInterval(interval);
//           setLoading(false);
//           toast.error("Upscaling failed");
//         }
//       } catch (err) {
//         clearInterval(interval);
//         setLoading(false);
//         toast.error("Server error");
//       }
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [taskId, getToken]);

//   // 🚀 Start async upscale
//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     if (!file) return toast.error("Please select an image");

//     try {
//       setLoading(true);
//       setStatus(null);
//       setDownloadUrl(null);

//       const formData = new FormData();
//       formData.append("image", file);

//       const { data } = await axios.post(
//         "/api/ai/async-upscale",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${await getToken()}`,
//           },
//         }
//       );

//       if (!data.success) {
//         throw new Error(data.message);
//       }

//       // ✅ IMPORTANT: taskId.value
//       setTaskId(data.taskId.value);
//       toast.success("Upscaling started ⏳");
//     } catch (error) {
//       setLoading(false);
//       toast.error(error.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      
//       {/* LEFT */}
//       <form
//         onSubmit={onSubmitHandler}
//         className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
//       >
//         <div className="flex items-center gap-3">
//           <Sparkles className="w-6 text-[#00AD25]" />
//           <h1 className="text-xl font-semibold">
//             AI Image Upscaler
//           </h1>
//         </div>

//         <p className="mt-6 text-sm font-medium">
//           Upload Image
//         </p>

//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setFile(e.target.files[0])}
//           className="w-full mt-2 p-2 border rounded-md text-sm"
//           required
//         />

//         <button
//           disabled={loading}
//           className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
//         >
//           {loading ? (
//             <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
//           ) : (
//             <Image className="w-5" />
//           )}
//           Upscale Image
//         </button>

//         {status && (
//           <p className="mt-4 text-sm text-center">
//             Status: <b>{status}</b>
//           </p>
//         )}
//       </form>

//       {/* RIGHT */}
//       <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96">
//         <div className="flex items-center gap-3">
//           <Image className="w-5 h-5 text-[#00AD25]" />
//           <h1 className="text-xl font-semibold">
//             Upscaled Image
//           </h1>
//         </div>

//         {!downloadUrl ? (
//           <div className="flex-1 flex justify-center items-center">
//             <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
//               <Image className="w-9 h-9" />
//               <p>
//                 Upload an image and click “Upscale Image”
//               </p>
//             </div>
//           </div>
//         ) : (
//           <div className="mt-3 h-full">
//             <a
//               href={downloadUrl}
//               target="_blank"
//               rel="noreferrer"
//             >
//               <img
//                 src={downloadUrl}
//                 alt="upscaled"
//                 className="w-full h-full rounded-md"
//               />
//             </a>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ImageUpscalePage;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Image, Sparkles } from "lucide-react";
// import { useAuth } from "@clerk/clerk-react";
// import toast from "react-hot-toast";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// const ImageUpscalePage = () => {
//   const { getToken } = useAuth();

//   const [file, setFile] = useState(null);
//   const [taskId, setTaskId] = useState(null);
//   const [status, setStatus] = useState(null);
//   const [downloadUrl, setDownloadUrl] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // 🔁 Poll async task status
//   useEffect(() => {
//     if (!taskId) return;

//     const interval = setInterval(async () => {
//       try {
//         const { data } = await axios.get(
//           `/api/ai/async-upscale/status/${taskId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${await getToken()}`,
//             },
//           }
//         );

//         setStatus(data.status);

//         if (data.status === "completed") {
//           clearInterval(interval);

//           const result = await axios.get(
//             `/api/ai/async-upscale/result/${taskId}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${await getToken()}`,
//               },
//             }
//           );

//           setDownloadUrl(result.data.downloadUrl);
//           setLoading(false);
//           toast.success("Image upscaled successfully 🚀");
//         }

//         if (data.status === "failed") {
//           clearInterval(interval);
//           setLoading(false);
//           toast.error("Upscaling failed");
//         }
//       } catch {
//         clearInterval(interval);
//         setLoading(false);
//         toast.error("Server error");
//       }
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [taskId, getToken]);

//   // 🚀 Start upscale
//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     if (!file) return toast.error("Please select an image");

//     try {
//       setLoading(true);
//       setStatus(null);
//       setDownloadUrl(null);

//       const formData = new FormData();
//       formData.append("image", file);

//       const { data } = await axios.post(
//         "/api/ai/async-upscale",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${await getToken()}`,
//           },
//         }
//       );

//       if (!data.success) throw new Error(data.message);

//       setTaskId(data.taskId.value);
//       toast.success("Upscaling started ⏳");
//     } catch (error) {
//       setLoading(false);
//       toast.error(error.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0f0f0f] text-slate-200 p-6">

//       {/* HEADER */}
//       <div className="mb-8">
//         <h1 className="text-2xl font-semibold text-white">
//           Image Upscaler
//         </h1>
//         <p className="text-sm text-slate-400 mt-1">
//           Enhance image quality using AI upscaling
//         </p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//         {/* LEFT PANEL */}
//         <form
//           onSubmit={onSubmitHandler}
//           className="rounded-xl border border-slate-800 bg-[#141414] p-6"
//         >
//           <div className="flex items-center gap-3 mb-6">
//             <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
//               <Sparkles className="w-5 h-5 text-slate-300" />
//             </div>
//             <h2 className="text-lg font-medium text-white">
//               Upload Image
//             </h2>
//           </div>

//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setFile(e.target.files[0])}
//             className="w-full text-sm text-slate-300
//               file:mr-4 file:py-2 file:px-4
//               file:rounded-lg file:border-0
//               file:bg-slate-800 file:text-slate-200
//               hover:file:bg-slate-700 transition"
//           />

//           <button
//             disabled={loading}
//             className="mt-6 w-full flex justify-center items-center gap-2
//               rounded-lg bg-slate-800 hover:bg-slate-700
//               text-slate-200 py-3 text-sm font-medium transition"
//           >
//             {loading ? (
//               <span className="w-4 h-4 rounded-full border-2 border-slate-400 border-t-transparent animate-spin"></span>
//             ) : (
//               <Image className="w-5" />
//             )}
//             Upscale Image
//           </button>

//           {status && (
//             <p className="mt-4 text-sm text-center text-slate-400">
//               Status: <span className="text-slate-200 font-medium">{status}</span>
//             </p>
//           )}
//         </form>

//         {/* RIGHT PANEL */}
//         <div className="rounded-xl border border-slate-800 bg-[#141414] p-6 flex flex-col min-h-[360px]">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
//               <Image className="w-5 h-5 text-slate-300" />
//             </div>
//             <h2 className="text-lg font-medium text-white">
//               Upscaled Result
//             </h2>
//           </div>

//           {!downloadUrl ? (
//             <div className="flex-1 flex items-center justify-center text-slate-500 text-sm text-center">
//               Upload an image and start upscaling
//             </div>
//           ) : (
//             <a
//               href={downloadUrl}
//               target="_blank"
//               rel="noreferrer"
//               className="mt-2"
//             >
//               <img
//                 src={downloadUrl}
//                 alt="upscaled"
//                 className="w-full rounded-lg border border-slate-700"
//               />
//             </a>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImageUpscalePage;

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { 
//   Image, 
//   Sparkles, 
//   Upload, 
//   Download, 
//   Clock, 
//   Zap, 
//   CheckCircle, 
//   AlertCircle,
//   ArrowUpRight,
//   Eye,
//   X,
//   FileImage,
//   Maximize2
// } from "lucide-react";
// import { useAuth } from "@clerk/clerk-react";
// import toast from "react-hot-toast";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// const ImageUpscalePage = () => {
//   const { getToken } = useAuth();

//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [taskId, setTaskId] = useState(null);
//   const [status, setStatus] = useState(null);
//   const [downloadUrl, setDownloadUrl] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [fileInfo, setFileInfo] = useState(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [fullscreenPreview, setFullscreenPreview] = useState(false);

//   const fileInputRef = useRef(null);
//   const dropAreaRef = useRef(null);

//   // Handle click on upload area
//   const handleUploadAreaClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   // Handle drag and drop
//   const handleDragOver = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
    
//     const droppedFiles = e.dataTransfer.files;
//     if (droppedFiles.length > 0) {
//       handleFileChange({ target: { files: droppedFiles } });
//     }
//   };

//   // Handle file selection and preview
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files ? e.target.files[0] : e;
//     if (!selectedFile) return;

//     // Check file type
//     if (!selectedFile.type.startsWith('image/')) {
//       toast.error("Please select an image file (JPG, PNG, WEBP)");
//       return;
//     }

//     // Check file size (max 10MB)
//     if (selectedFile.size > 10 * 1024 * 1024) {
//       toast.error("File size should be less than 10MB");
//       return;
//     }

//     setFile(selectedFile);
//     setFileInfo({
//       name: selectedFile.name.length > 20 ? selectedFile.name.substring(0, 20) + '...' : selectedFile.name,
//       size: (selectedFile.size / (1024 * 1024)).toFixed(2) + ' MB',
//       type: selectedFile.type.split('/')[1].toUpperCase(),
//       dimensions: 'Checking...'
//     });

//     // Create preview
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const img = new window.Image();
//       img.onload = () => {
//         setFileInfo(prev => ({
//           ...prev,
//           dimensions: `${img.width} × ${img.height}`
//         }));
//       };
//       img.src = reader.result;
//       setPreview(reader.result);
//     };
//     reader.readAsDataURL(selectedFile);
//   };

//   // Clear file
//   const handleClearFile = (e) => {
//     e.stopPropagation(); // Prevent triggering upload area click
//     setFile(null);
//     setPreview(null);
//     setFileInfo(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   // 🔁 Poll async task status
//   useEffect(() => {
//     if (!taskId) return;

//     const interval = setInterval(async () => {
//       try {
//         const { data } = await axios.get(
//           `/api/ai/async-upscale/status/${taskId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${await getToken()}`,
//             },
//           }
//         );

//         setStatus(data.status);

//         if (data.status === "completed") {
//           clearInterval(interval);

//           const result = await axios.get(
//             `/api/ai/async-upscale/result/${taskId}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${await getToken()}`,
//               },
//             }
//           );

//           setDownloadUrl(result.data.downloadUrl);
//           setLoading(false);
//           toast.success("Image upscaled successfully! 🎉");
//         }

//         if (data.status === "failed") {
//           clearInterval(interval);
//           setLoading(false);
//           toast.error("Upscaling failed. Please try again.");
//         }
//       } catch {
//         clearInterval(interval);
//         setLoading(false);
//         toast.error("Server error. Please try again.");
//       }
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [taskId, getToken]);

//   // 🚀 Start upscale
//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     if (!file) return toast.error("Please select an image first");

//     try {
//       setLoading(true);
//       setStatus("uploading");
//       setDownloadUrl(null);

//       const formData = new FormData();
//       formData.append("image", file);

//       const { data } = await axios.post(
//         "/api/ai/async-upscale",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${await getToken()}`,
//           },
//         }
//       );

//       if (!data.success) throw new Error(data.message);

//       setTaskId(data.taskId.value);
//       setStatus("processing");
//       toast.success("Upscaling started! This may take a moment... ⏳");
//     } catch (error) {
//       setLoading(false);
//       setStatus(null);
//       toast.error(error.message || "Something went wrong. Please try again.");
//     }
//   };

//   // Status message mapping
//   const getStatusMessage = () => {
//     switch(status) {
//       case 'uploading': return 'Uploading image...';
//       case 'processing': return 'Processing image with AI...';
//       case 'completed': return 'Upscaling complete!';
//       case 'failed': return 'Upscaling failed';
//       default: return 'Ready to upscale';
//     }
//   };

//   // Status color mapping
//   const getStatusColor = () => {
//     switch(status) {
//       case 'uploading': return 'text-amber-400';
//       case 'processing': return 'text-blue-400';
//       case 'completed': return 'text-[#04FF50]';
//       case 'failed': return 'text-red-400';
//       default: return 'text-gray-400';
//     }
//   };

//   // Download upscaled image
//   const handleDownload = () => {
//     if (!downloadUrl) return;
    
//     try {
//       const link = document.createElement('a');
//       link.href = downloadUrl;
//       link.download = `upscaled-${fileInfo?.name || 'image'}.png`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       toast.success("Image downloaded!");
//     } catch (err) {
//       toast.error("Failed to download image");
//     }
//   };

//   // Handle keyboard shortcuts
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       // Ctrl/Cmd + O to open file dialog
//       if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
//         e.preventDefault();
//         handleUploadAreaClick();
//       }
//       // Escape to clear file or exit fullscreen
//       if (e.key === 'Escape') {
//         if (fullscreenPreview) {
//           setFullscreenPreview(false);
//         } else if (file) {
//           handleClearFile({ stopPropagation: () => {} });
//         }
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [file, fullscreenPreview]);

//   return (
//     <div className={`min-h-screen bg-black p-4 sm:p-6 lg:p-8 ${fullscreenPreview ? 'overflow-hidden' : ''}`}>
      
//       {/* Fullscreen Preview Modal */}
//       {fullscreenPreview && preview && (
//         <div className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4">
//           <button
//             onClick={() => setFullscreenPreview(false)}
//             className="absolute top-4 right-4 p-2 rounded-full bg-gray-900/80 hover:bg-gray-800 border border-gray-800 text-white z-10"
//           >
//             <X className="w-6 h-6" />
//           </button>
//           <img
//             src={preview}
//             alt="Fullscreen preview"
//             className="max-w-full max-h-full object-contain rounded-lg"
//           />
//         </div>
//       )}
      
//       {/* HEADER */}
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-white">
//           AI Image Upscaler
//         </h1>
//         <p className="text-sm text-gray-400 mt-1">
//           Enhance image quality with AI-powered upscaling • Drag & drop or click anywhere to upload
//         </p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        
//         {/* LEFT PANEL - UPLOAD */}
//         <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
//           <div className="flex items-center gap-3 mb-8">
//             <div className="p-3 rounded-xl bg-gradient-to-r from-[#00AD25]/20 to-[#04FF50]/20">
//               <Sparkles className="w-6 h-6 text-[#04FF50]" />
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-white">
//                 Upload Image
//               </h2>
//               <p className="text-sm text-gray-400">
//                 Click anywhere in the area below or drag & drop
//               </p>
//             </div>
//           </div>

//           <form onSubmit={onSubmitHandler} className="space-y-6">
//             {/* Upload Area - NOW CLICKABLE ANYWHERE */}
//             <div
//               ref={dropAreaRef}
//               onClick={handleUploadAreaClick}
//               onDragOver={handleDragOver}
//               onDragLeave={handleDragLeave}
//               onDrop={handleDrop}
//               className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 cursor-pointer group ${
//                 isDragging 
//                   ? 'border-[#04FF50] bg-[#04FF50]/10 scale-[1.02]' 
//                   : file 
//                     ? 'border-[#04FF50]/30 bg-[#04FF50]/5 hover:border-[#04FF50]/50' 
//                     : 'border-gray-800 hover:border-gray-700 hover:bg-gray-800/50'
//               }`}
//             >
//               {/* Hidden file input */}
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="absolute opacity-0 w-0 h-0"
//               />

//               {preview ? (
//                 <div className="relative">
//                   <div className="relative w-full max-w-md mx-auto">
//                     <div className="relative group/preview">
//                       <img
//                         src={preview}
//                         alt="Preview"
//                         className="w-full h-auto max-h-64 rounded-lg object-cover border border-gray-800 shadow-lg"
//                       />
//                       <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/preview:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
//                         <button
//                           type="button"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setFullscreenPreview(true);
//                           }}
//                           className="p-2 rounded-full bg-gray-900 border border-gray-800 hover:bg-gray-800 transition-colors"
//                           title="View fullscreen"
//                         >
//                           <Maximize2 className="w-4 h-4 text-gray-300" />
//                         </button>
//                         <button
//                           type="button"
//                           onClick={handleClearFile}
//                           className="p-2 rounded-full bg-gray-900 border border-gray-800 hover:bg-gray-800 transition-colors"
//                           title="Remove image"
//                         >
//                           <X className="w-4 h-4 text-gray-300" />
//                         </button>
//                       </div>
//                     </div>
//                     <div className="mt-4 text-sm text-gray-400">
//                       Click anywhere to change image • Press Esc to remove
//                     </div>
//                   </div>
//                   {fileInfo && (
//                     <div className="mt-4 p-4 rounded-lg bg-gray-800 border border-gray-700">
//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <p className="text-xs text-gray-500 mb-1">File Name</p>
//                           <div className="flex items-center gap-2">
//                             <FileImage className="w-4 h-4 text-gray-400" />
//                             <p className="text-sm text-gray-300 truncate">{fileInfo.name}</p>
//                           </div>
//                         </div>
//                         <div>
//                           <p className="text-xs text-gray-500 mb-1">Size</p>
//                           <p className="text-sm text-gray-300">{fileInfo.size}</p>
//                         </div>
//                         <div>
//                           <p className="text-xs text-gray-500 mb-1">Type</p>
//                           <span className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300">{fileInfo.type}</span>
//                         </div>
//                         <div>
//                           <p className="text-xs text-gray-500 mb-1">Dimensions</p>
//                           <p className="text-sm text-gray-300">{fileInfo.dimensions}</p>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <>
//                   <div className={`p-6 rounded-full transition-all duration-300 inline-block mb-4 group-hover:scale-110 ${
//                     isDragging ? 'bg-[#04FF50]/20' : 'bg-gray-800'
//                   }`}>
//                     {isDragging ? (
//                       <Upload className="w-10 h-10 text-[#04FF50] animate-bounce" />
//                     ) : (
//                       <Upload className="w-10 h-10 text-gray-400 group-hover:text-gray-300" />
//                     )}
//                   </div>
//                   <p className="text-sm text-gray-400 mb-2">
//                     {isDragging ? "Drop your image here" : "Drag & drop your image here"}
//                   </p>
//                   <p className="text-xs text-gray-500 mb-4">
//                     or click anywhere in this area
//                   </p>
//                   <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 text-sm">
//                     <span>Supports: JPG, PNG, WEBP</span>
//                     <span className="text-gray-600">•</span>
//                     <span>Max: 10MB</span>
//                   </div>
//                   <p className="text-xs text-gray-600 mt-4">
//                     Keyboard shortcut: <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-400">Ctrl/Cmd + O</kbd>
//                   </p>
//                 </>
//               )}
//             </div>

//             {/* Status Display */}
//             <div className="p-4 rounded-xl bg-gray-800 border border-gray-700">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <Clock className={`w-4 h-4 ${getStatusColor()}`} />
//                   <span className="text-sm text-gray-300">Status:</span>
//                 </div>
//                 <span className={`text-sm font-medium ${getStatusColor()}`}>
//                   {getStatusMessage()}
//                 </span>
//               </div>
//               {status === 'processing' && (
//                 <div className="mt-3">
//                   <div className="w-full bg-gray-700 rounded-full h-1.5">
//                     <div className="bg-gradient-to-r from-[#00AD25] to-[#04FF50] h-1.5 rounded-full animate-pulse w-3/4"></div>
//                   </div>
//                   <p className="text-xs text-gray-500 mt-2 text-center">
//                     AI is enhancing your image. This may take 30-60 seconds...
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Info Card */}
//             <div className="p-4 rounded-xl bg-gray-800 border border-gray-700">
//               <div className="flex items-start gap-3">
//                 <AlertCircle className="w-5 h-5 text-gray-500 mt-0.5" />
//                 <div>
//                   <p className="text-sm font-medium text-gray-300">
//                     Upscaling Features
//                   </p>
//                   <ul className="text-xs text-gray-500 mt-2 space-y-1">
//                     <li className="flex items-center gap-2">
//                       <CheckCircle className="w-3 h-3 text-[#04FF50]" />
//                       4x resolution enhancement
//                     </li>
//                     <li className="flex items-center gap-2">
//                       <CheckCircle className="w-3 h-3 text-[#04FF50]" />
//                       Noise reduction & sharpening
//                     </li>
//                     <li className="flex items-center gap-2">
//                       <CheckCircle className="w-3 h-3 text-[#04FF50]" />
//                       Preserves original details
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>

//             {/* Upload Button - GREEN */}
//             <button
//               type="submit"
//               disabled={loading || !file}
//               className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#00AD25] to-[#04FF50] hover:from-[#009920] hover:to-[#03E046] text-white px-6 py-3.5 rounded-xl font-medium text-sm shadow-lg shadow-green-900/30 hover:shadow-green-900/50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
//             >
//               {loading ? (
//                 <>
//                   <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
//                   <span>Upscaling...</span>
//                 </>
//               ) : (
//                 <>
//                   <Image className="w-5 h-5" />
//                   <span>{file ? "Start Upscaling" : "Select an Image First"}</span>
//                 </>
//               )}
//             </button>

//             <p className="text-center text-xs text-gray-500">
//               Click anywhere in upload area to select image • Drag & drop supported
//             </p>
//           </form>
//         </div>

//         {/* RIGHT PANEL - RESULT */}
//         <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 flex flex-col min-h-[600px]">
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center gap-3">
//               <div className="p-3 rounded-xl bg-gradient-to-r from-[#00AD25]/20 to-[#04FF50]/20">
//                 <Image className="w-6 h-6 text-[#04FF50]" />
//               </div>
//               <div>
//                 <h2 className="text-xl font-semibold text-white">
//                   Upscaled Result
//                 </h2>
//                 <p className="text-sm text-gray-400">
//                   Preview & Download
//                 </p>
//               </div>
//             </div>
            
//             {/* Stats */}
//             <div className="hidden sm:flex items-center gap-2">
//               <div className="flex items-center gap-2">
//                 <Zap className="w-4 h-4 text-gray-500" />
//                 <span className="text-xs text-gray-400">Credits: 65/100</span>
//               </div>
//             </div>
//           </div>

//           {/* Stats Card */}
//           <div className="mb-4 p-3 rounded-xl bg-gray-800 border border-gray-700">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <div className="flex items-center gap-2">
//                   <div className={`w-2 h-2 rounded-full ${
//                     downloadUrl ? 'bg-[#04FF50] animate-pulse' : 'bg-gray-500'
//                   }`}></div>
//                   <span className="text-sm text-gray-400">Result:</span>
//                   <span className="text-sm font-bold text-white">
//                     {downloadUrl ? 'Ready' : 'Pending'}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Eye className="w-4 h-4 text-gray-500" />
//                   <span className="text-sm text-gray-400">Quality:</span>
//                   <span className="text-sm font-bold text-white">4x</span>
//                 </div>
//               </div>
//               {downloadUrl && (
//                 <div className="px-2 py-1 rounded-full text-xs bg-gradient-to-r from-[#00AD25]/20 to-[#04FF50]/20 border border-[#04FF50]/30 text-[#04FF50]">
//                   Enhanced
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Result Display */}
//           <div className="flex-1 overflow-y-auto">
//             {!downloadUrl ? (
//               <div className="h-full flex flex-col items-center justify-center text-gray-600 gap-4">
//                 <div className="p-4 rounded-full bg-gradient-to-r from-[#00AD25]/10 to-[#04FF50]/10">
//                   <Image className="w-12 h-12 text-gray-700" />
//                 </div>
//                 <div className="text-center">
//                   <p className="font-medium text-gray-500">
//                     No upscaled image yet
//                   </p>
//                   <p className="text-sm text-gray-600 mt-1">
//                     Upload an image and start upscaling
//                   </p>
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 <div className="relative group">
//                   <img
//                     src={downloadUrl}
//                     alt="Upscaled"
//                     className="w-full h-auto rounded-xl border border-gray-800 shadow-lg group-hover:border-[#04FF50]/30 transition-colors cursor-pointer"
//                     onClick={() => window.open(downloadUrl, '_blank')}
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-end justify-center p-4">
//                     <button
//                       onClick={handleDownload}
//                       className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#00AD25] to-[#04FF50] hover:from-[#009920] hover:to-[#03E046] text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
//                     >
//                       <Download className="w-4 h-4" />
//                       Download
//                     </button>
//                   </div>
//                 </div>
                
//                 {/* Comparison Info */}
//                 <div className="p-4 rounded-xl bg-gray-800 border border-gray-700">
//                   <div className="flex items-center justify-between mb-3">
//                     <p className="text-sm font-medium text-gray-300">Image Comparison</p>
//                     <div className="flex items-center gap-2 text-xs text-[#04FF50]">
//                       <ArrowUpRight className="w-3 h-3" />
//                       <span>4x Resolution Increase</span>
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="p-3 rounded-lg bg-gray-900">
//                       <p className="text-xs text-gray-500 mb-1">Original Quality</p>
//                       <p className="text-sm text-gray-300">Standard resolution</p>
//                       {fileInfo?.dimensions && (
//                         <p className="text-xs text-gray-500 mt-1">{fileInfo.dimensions}</p>
//                       )}
//                     </div>
//                     <div className="p-3 rounded-lg bg-gray-900">
//                       <p className="text-xs text-gray-500 mb-1">Upscaled Quality</p>
//                       <p className="text-sm text-[#04FF50] font-medium">Enhanced 4x</p>
//                       <p className="text-xs text-[#04FF50]/70 mt-1">Higher resolution & details</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Action Buttons */}
//           {downloadUrl && (
//             <div className="mt-4 pt-4 border-t border-gray-800">
//               <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
//                 <button
//                   onClick={handleDownload}
//                   className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#00AD25] to-[#04FF50] hover:from-[#009920] hover:to-[#03E046] text-white text-sm font-medium transition-all duration-300"
//                 >
//                   <Download className="w-4 h-4" />
//                   Download Image
//                 </button>
//                 <a
//                   href={downloadUrl}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 hover:text-white text-sm font-medium transition-all duration-300"
//                 >
//                   <Eye className="w-4 h-4" />
//                   View Full Size
//                 </a>
//               </div>
//             </div>
//           )}

//           {/* Footer */}
//           <div className="mt-4 pt-4 border-t border-gray-800">
//             <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
//               <div className="flex items-center gap-2">
//                 <AlertCircle className="w-3 h-3" />
//                 <span>AI-enhanced image • Higher resolution</span>
//               </div>
//               <span>Algo.ai • Image Upscaler</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImageUpscalePage;




import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { 
  Image, 
  Sparkles, 
  Upload, 
  Download, 
  Clock, 
  Zap, 
  CheckCircle, 
  AlertCircle,
  ArrowUpRight,
  Eye,
  EyeOff,
  X,
  FileImage,
  Maximize2
} from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ImageUpscalePage = () => {
  const { getToken } = useAuth();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [taskId, setTaskId] = useState(null);
  const [status, setStatus] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fullscreenPreview, setFullscreenPreview] = useState(false);
  const [publish, setPublish] = useState(true); // New state for publish toggle

  const fileInputRef = useRef(null);
  const dropAreaRef = useRef(null);

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

  // Handle file selection and preview
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
    e.stopPropagation(); // Prevent triggering upload area click
    setFile(null);
    setPreview(null);
    setFileInfo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 🔁 Poll async task status
  useEffect(() => {
    if (!taskId) return;

    const interval = setInterval(async () => {
      try {
        const { data } = await axios.get(
          `/api/ai/async-upscale/status/${taskId}`,
          {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
            },
          }
        );

        setStatus(data.status);

        if (data.status === "completed") {
          clearInterval(interval);

          const result = await axios.get(
            `/api/ai/async-upscale/result/${taskId}`,
            {
              headers: {
                Authorization: `Bearer ${await getToken()}`,
              },
            }
          );

          setDownloadUrl(result.data.downloadUrl);
          setLoading(false);
          toast.success("Image upscaled successfully! 🎉");
        }

        if (data.status === "failed") {
          clearInterval(interval);
          setLoading(false);
          toast.error("Upscaling failed. Please try again.");
        }
      } catch {
        clearInterval(interval);
        setLoading(false);
        toast.error("Server error. Please try again.");
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [taskId, getToken]);

  // 🚀 Start upscale
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select an image first");

    try {
      setLoading(true);
      setStatus("uploading");
      setDownloadUrl(null);

      const formData = new FormData();
      formData.append("image", file);
      formData.append("publish", publish); // Add publish status to form data

      const { data } = await axios.post(
        "/api/ai/async-upscale",
        formData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (!data.success) throw new Error(data.message);

      setTaskId(data.taskId.value);
      setStatus("processing");
      toast.success("Upscaling started! This may take a moment... ⏳");
    } catch (error) {
      setLoading(false);
      setStatus(null);
      toast.error(error.message || "Something went wrong. Please try again.");
    }
  };

  // Status message mapping
  const getStatusMessage = () => {
    switch(status) {
      case 'uploading': return 'Uploading image...';
      case 'processing': return 'Processing image with AI...';
      case 'completed': return 'Upscaling complete!';
      case 'failed': return 'Upscaling failed';
      default: return 'Ready to upscale';
    }
  };

  // Status color mapping
  const getStatusColor = () => {
    switch(status) {
      case 'uploading': return 'text-amber-400';
      case 'processing': return 'text-blue-400';
      case 'completed': return 'text-[#04FF50]';
      case 'failed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  // Download upscaled image
  const handleDownload = () => {
    if (!downloadUrl) return;
    
    try {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `upscaled-${fileInfo?.name || 'image'}.png`;
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

  return (
    <div className={`min-h-screen bg-black p-4 sm:p-6 lg:p-8 ${fullscreenPreview ? 'overflow-hidden' : ''}`}>
      
      {/* Fullscreen Preview Modal */}
      {fullscreenPreview && preview && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4">
          <button
            onClick={() => setFullscreenPreview(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-900/80 hover:bg-gray-800 border border-gray-800 text-white z-10"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={preview}
            alt="Fullscreen preview"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      )}
      
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">
          AI Image Upscaler
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Enhance image quality with AI-powered upscaling • Drag & drop or click anywhere to upload
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        
        {/* LEFT PANEL - UPLOAD */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-xl bg-gradient-to-r from-[#00AD25]/20 to-[#04FF50]/20">
              <Sparkles className="w-6 h-6 text-[#04FF50]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                Upload Image
              </h2>
              <p className="text-sm text-gray-400">
                Click anywhere in the area below or drag & drop
              </p>
            </div>
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-6">
            {/* Upload Area - NOW CLICKABLE ANYWHERE */}
            <div
              ref={dropAreaRef}
              onClick={handleUploadAreaClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 cursor-pointer group ${
                isDragging 
                  ? 'border-[#04FF50] bg-[#04FF50]/10 scale-[1.02]' 
                  : file 
                    ? 'border-[#04FF50]/30 bg-[#04FF50]/5 hover:border-[#04FF50]/50' 
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
                        className="w-full h-auto max-h-64 rounded-lg object-cover border border-gray-800 shadow-lg"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/preview:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFullscreenPreview(true);
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
                    <div className="mt-4 text-sm text-gray-400">
                      Click anywhere to change image • Press Esc to remove
                    </div>
                  </div>
                  {fileInfo && (
                    <div className="mt-4 p-4 rounded-lg bg-gray-800 border border-gray-700">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">File Name</p>
                          <div className="flex items-center gap-2">
                            <FileImage className="w-4 h-4 text-gray-400" />
                            <p className="text-sm text-gray-300 truncate">{fileInfo.name}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Size</p>
                          <p className="text-sm text-gray-300">{fileInfo.size}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Type</p>
                          <span className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300">{fileInfo.type}</span>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Dimensions</p>
                          <p className="text-sm text-gray-300">{fileInfo.dimensions}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className={`p-6 rounded-full transition-all duration-300 inline-block mb-4 group-hover:scale-110 ${
                    isDragging ? 'bg-[#04FF50]/20' : 'bg-gray-800'
                  }`}>
                    {isDragging ? (
                      <Upload className="w-10 h-10 text-[#04FF50] animate-bounce" />
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
                  <p className="text-xs text-gray-600 mt-4">
                    Keyboard shortcut: <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-400">Ctrl/Cmd + O</kbd>
                  </p>
                </>
              )}
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

            {/* Status Display */}
            <div className="p-4 rounded-xl bg-gray-800 border border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className={`w-4 h-4 ${getStatusColor()}`} />
                  <span className="text-sm text-gray-300">Status:</span>
                </div>
                <span className={`text-sm font-medium ${getStatusColor()}`}>
                  {getStatusMessage()}
                </span>
              </div>
              {status === 'processing' && (
                <div className="mt-3">
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div className="bg-gradient-to-r from-[#00AD25] to-[#04FF50] h-1.5 rounded-full animate-pulse w-3/4"></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    AI is enhancing your image. This may take 30-60 seconds...
                  </p>
                </div>
              )}
            </div>

            {/* Info Card */}
            <div className="p-4 rounded-xl bg-gray-800 border border-gray-700">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-300">
                    Upscaling Features
                  </p>
                  <ul className="text-xs text-gray-500 mt-2 space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-[#04FF50]" />
                      4x resolution enhancement
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-[#04FF50]" />
                      Noise reduction & sharpening
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-[#04FF50]" />
                      Preserves original details
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Upload Button - GREEN */}
            <button
              type="submit"
              disabled={loading || !file}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#00AD25] to-[#04FF50] hover:from-[#009920] hover:to-[#03E046] text-white px-6 py-3.5 rounded-xl font-medium text-sm shadow-lg shadow-green-900/30 hover:shadow-green-900/50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>Upscaling...</span>
                </>
              ) : (
                <>
                  <Image className="w-5 h-5" />
                  <span>{file ? "Start Upscaling" : "Select an Image First"}</span>
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-500">
              Click anywhere in upload area to select image • Drag & drop supported
            </p>
          </form>
        </div>

        {/* RIGHT PANEL - RESULT */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 flex flex-col min-h-[600px]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-r from-[#00AD25]/20 to-[#04FF50]/20">
                <Image className="w-6 h-6 text-[#04FF50]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Upscaled Result
                </h2>
                <p className="text-sm text-gray-400">
                  Preview & Download
                </p>
              </div>
            </div>
            
            {/* Stats */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-gray-500" />
                <span className="text-xs text-gray-400">Credits: 65/100</span>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="mb-4 p-3 rounded-xl bg-gray-800 border border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    downloadUrl ? 'bg-[#04FF50] animate-pulse' : 'bg-gray-500'
                  }`}></div>
                  <span className="text-sm text-gray-400">Result:</span>
                  <span className="text-sm font-bold text-white">
                    {downloadUrl ? 'Ready' : 'Pending'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-400">Quality:</span>
                  <span className="text-sm font-bold text-white">4x</span>
                </div>
                <div className="flex items-center gap-2">
                  {publish ? (
                    <Eye className="w-4 h-4 text-[#04FF50]" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-gray-500" />
                  )}
                  <span className="text-sm text-gray-400">Visibility:</span>
                  <span className="text-sm font-bold text-white">
                    {publish ? 'Public' : 'Private'}
                  </span>
                </div>
              </div>
              {downloadUrl && (
                <div className="px-2 py-1 rounded-full text-xs bg-gradient-to-r from-[#00AD25]/20 to-[#04FF50]/20 border border-[#04FF50]/30 text-[#04FF50]">
                  Enhanced
                </div>
              )}
            </div>
          </div>

          {/* Result Display */}
          <div className="flex-1 overflow-y-auto">
            {!downloadUrl ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-600 gap-4">
                <div className="p-4 rounded-full bg-gradient-to-r from-[#00AD25]/10 to-[#04FF50]/10">
                  <Image className="w-12 h-12 text-gray-700" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-gray-500">
                    No upscaled image yet
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Upload an image and start upscaling
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative group">
                  <img
                    src={downloadUrl}
                    alt="Upscaled"
                    className="w-full h-auto rounded-xl border border-gray-800 shadow-lg group-hover:border-[#04FF50]/30 transition-colors cursor-pointer"
                    onClick={() => window.open(downloadUrl, '_blank')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-end justify-center p-4">
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#00AD25] to-[#04FF50] hover:from-[#009920] hover:to-[#03E046] text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
                
                {/* Comparison Info */}
                <div className="p-4 rounded-xl bg-gray-800 border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-gray-300">Image Comparison</p>
                    <div className="flex items-center gap-2 text-xs text-[#04FF50]">
                      <ArrowUpRight className="w-3 h-3" />
                      <span>4x Resolution Increase</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-gray-900">
                      <p className="text-xs text-gray-500 mb-1">Original Quality</p>
                      <p className="text-sm text-gray-300">Standard resolution</p>
                      {fileInfo?.dimensions && (
                        <p className="text-xs text-gray-500 mt-1">{fileInfo.dimensions}</p>
                      )}
                    </div>
                    <div className="p-3 rounded-lg bg-gray-900">
                      <p className="text-xs text-gray-500 mb-1">Upscaled Quality</p>
                      <p className="text-sm text-[#04FF50] font-medium">Enhanced 4x</p>
                      <p className="text-xs text-[#04FF50]/70 mt-1">Higher resolution & details</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {downloadUrl && (
            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={handleDownload}
                  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#00AD25] to-[#04FF50] hover:from-[#009920] hover:to-[#03E046] text-white text-sm font-medium transition-all duration-300"
                >
                  <Download className="w-4 h-4" />
                  Download Image
                </button>
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 hover:text-white text-sm font-medium transition-all duration-300"
                >
                  <Eye className="w-4 h-4" />
                  View Full Size
                </a>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-3 h-3" />
                <span>AI-enhanced image • Higher resolution</span>
              </div>
              <span>Algo.ai • Image Upscaler</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
  
export default ImageUpscalePage;