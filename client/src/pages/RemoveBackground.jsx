import { 
  Eraser, 
  Sparkles, 
  Moon, 
  Sun, 
  Upload, 
  Download, 
  Image as ImageIcon,
  Zap, 
  CheckCircle, 
  AlertCircle,
  X,
  FileImage,
  Eye,
  EyeOff,
  Maximize2,
  Layers
} from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [fileInfo, setFileInfo] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fullscreenPreview, setFullscreenPreview] = useState(false);
  const [publish, setPublish] = useState(true); // New state for publish toggle

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

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", file);
      formData.append("publish", publish); // Add publish status to form data

      const { data } = await axios.post(
        "/api/ai/remove-image-background",
        formData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setContent(data.content);
        toast.success("Background removed successfully! 🎉");
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
      link.download = `no-background-${fileInfo?.name || 'image'}.png`;
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
            AI Background Remover
          </h1>
          <p className="text-sm text-gray-400">
            Remove backgrounds from images with one click
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Stats */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-gray-500" />
              <span className="text-xs text-gray-400">Credits: 55/100</span>
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
        
        {/* LEFT PANEL - UPLOAD */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-xl bg-gradient-to-r from-[#F6AB41]/20 to-[#FF4938]/20">
              <Sparkles className="w-6 h-6 text-[#FF4938]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                Background Removal
              </h2>
              <p className="text-sm text-gray-400">
                Upload an image to remove background
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
                  ? 'border-[#FF4938] bg-[#FF4938]/10 scale-[1.02]' 
                  : file 
                    ? 'border-[#FF4938]/30 bg-[#FF4938]/5 hover:border-[#FF4938]/50' 
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
                    isDragging ? 'bg-[#FF4938]/20' : 'bg-gray-800'
                  }`}>
                    {isDragging ? (
                      <Upload className="w-10 h-10 text-[#FF4938] animate-bounce" />
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

            {/* Publish Toggle */}
            <div className="p-4 rounded-xl bg-gray-800 border border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {publish ? (
                    <Eye className="w-5 h-5 text-[#FF4938]" />
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
                  <div className="w-11 h-6 bg-gray-700 rounded-full peer-checked:bg-gradient-to-r from-[#F6AB41] to-[#FF4938] transition-colors"></div>
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
                    How it works
                  </p>
                  <ul className="text-xs text-gray-500 mt-2 space-y-1">
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-[#FF4938]"></div>
                      AI automatically detects and removes background
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-[#FF4938]"></div>
                      Preserves all details of the main subject
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-[#FF4938]"></div>
                      Transparent PNG output for easy editing
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Remove Background Button - ORANGE/RED GRADIENT */}
            <button
              type="submit"
              disabled={loading || !file}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#F6AB41] to-[#FF4938] hover:from-[#E59A37] hover:to-[#E63A32] text-white px-6 py-3.5 rounded-xl font-medium text-sm shadow-lg shadow-orange-900/30 hover:shadow-orange-900/50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>Removing background...</span>
                </>
              ) : (
                <>
                  <Eraser className="w-5 h-5" />
                  <span>{file ? "Remove Background" : "Select an Image First"}</span>
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-500">
              One-click background removal • Transparent PNG output • Professional quality
            </p>
          </form>
        </div>

        {/* RIGHT PANEL - RESULT */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 flex flex-col h-[600px]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-r from-[#F6AB41]/20 to-[#FF4938]/20">
                <Eraser className="w-6 h-6 text-[#FF4938]" />
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
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-[#F6AB41] to-[#FF4938] hover:from-[#E59A37] hover:to-[#E63A32] text-white text-sm font-medium transition-all duration-300"
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
                    content ? 'bg-[#FF4938] animate-pulse' : 'bg-gray-500'
                  }`}></div>
                  <span className="text-sm text-gray-400">Status:</span>
                  <span className="text-sm font-bold text-white">
                    {content ? 'Background Removed' : 'No Image'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-400">Output:</span>
                  <span className="text-sm font-bold text-white">Transparent PNG</span>
                </div>
                <div className="flex items-center gap-2">
                  {publish ? (
                    <Eye className="w-4 h-4 text-[#FF4938]" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-gray-500" />
                  )}
                  <span className="text-sm text-gray-400">Visibility:</span>
                  <span className="text-sm font-bold text-white">
                    {publish ? 'Public' : 'Private'}
                  </span>
                </div>
              </div>
              {content && (
                <div className="px-2 py-1 rounded-full text-xs bg-gradient-to-r from-[#F6AB41]/20 to-[#FF4938]/20 border border-[#FF4938]/30 text-[#FF4938]">
                  Background Removed
                </div>
              )}
            </div>
          </div>

          {/* Result Display */}
          <div className="flex-1 overflow-y-auto">
            {!content ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-600 gap-4">
                <div className="p-4 rounded-full bg-gradient-to-r from-[#F6AB41]/10 to-[#FF4938]/10">
                  <Eraser className="w-12 h-12 text-gray-700" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-gray-500">
                    No processed image yet
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Upload an image and remove background
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative group">
                  <img
                    src={content}
                    alt="Background removed"
                    className="w-full h-auto max-h-80 rounded-xl border border-gray-800 shadow-lg group-hover:border-[#FF4938]/30 transition-colors"
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
                
                {/* Info Card */}
                <div className="p-4 rounded-xl bg-gray-800 border border-gray-700">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#FF4938] mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-300">
                        Background Successfully Removed
                      </p>
                      <ul className="text-xs text-gray-500 mt-2 space-y-1">
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-[#FF4938]"></span>
                          Transparent background ready for use
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-[#FF4938]"></span>
                          High-quality PNG with alpha channel
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-[#FF4938]"></span>
                          Perfect for graphic design and editing
                        </li>
                      </ul>
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
                <span>AI-powered background removal • Transparent output</span>
              </div>
              <span>Algo.ai • Background Remover</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveBackground;