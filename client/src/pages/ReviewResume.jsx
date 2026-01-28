import { 
  FileText, 
  Sparkles, 
  Moon, 
  Sun, 
  Upload, 
  Download, 
  Zap, 
  CheckCircle, 
  AlertCircle,
  X,
  File,
  Star,
  TrendingUp,
  Briefcase,
  Award,
  MessageSquare,
  Maximize2,
  ChevronRight
} from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [fileInfo, setFileInfo] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [analysisScore, setAnalysisScore] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

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

    // Check file type (PDF only)
    if (selectedFile.type !== 'application/pdf') {
      toast.error("Please select a PDF file only");
      return;
    }

    // Check file size (max 5MB for resume)
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    setFile(selectedFile);
    setFileInfo({
      name: selectedFile.name.length > 25 ? selectedFile.name.substring(0, 25) + '...' : selectedFile.name,
      size: (selectedFile.size / (1024 * 1024)).toFixed(2) + ' MB',
      type: 'PDF',
      pages: 'Analyzing...'
    });

    // Reset previous analysis
    setContent("");
    setAnalysisScore(null);
    setSuggestions([]);
  };

  // Clear file
  const handleClearFile = (e) => {
    e.stopPropagation();
    setFile(null);
    setFileInfo(null);
    setContent("");
    setAnalysisScore(null);
    setSuggestions([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Submit handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (!file) {
      toast.error("Please select a resume PDF first");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", file);

      const { data } = await axios.post(
        "/api/ai/resume-review",
        formData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setContent(data.content);
        
        // Parse analysis score and suggestions from content
        const scoreMatch = data.content.match(/(\d+(\.\d+)?)\/10/i) || data.content.match(/Score:\s*(\d+(\.\d+)?)/i);
        if (scoreMatch) {
          setAnalysisScore(parseFloat(scoreMatch[1]));
        }
        
        // Extract key suggestions
        const suggestionLines = data.content.split('\n').filter(line => 
          line.includes('✓') || line.includes('✅') || line.includes('•') || 
          line.toLowerCase().includes('suggestion') || line.toLowerCase().includes('improve')
        );
        setSuggestions(suggestionLines.slice(0, 5));
        
        toast.success("Resume analyzed successfully! 📄");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "AI is busy. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Download analysis as text file
  const handleDownloadAnalysis = () => {
    if (!content) return;
    
    try {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume-analysis-${fileInfo?.name?.replace('.pdf', '') || 'report'}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Analysis downloaded!");
    } catch (err) {
      toast.error("Failed to download analysis");
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
      // Escape to clear file
      if (e.key === 'Escape' && file) {
        handleClearFile({ stopPropagation: () => {} });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [file]);

  // Score color based on value
  const getScoreColor = (score) => {
    if (score >= 8) return 'text-[#00DA83]';
    if (score >= 6) return 'text-[#FFB74D]';
    return 'text-[#FF4938]';
  };

  // Score badge color
  const getScoreBadgeColor = (score) => {
    if (score >= 8) return 'from-[#00DA83]/20 to-[#009BB3]/20 border-[#00DA83]/30';
    if (score >= 6) return 'from-[#FFB74D]/20 to-[#FF9800]/20 border-[#FFB74D]/30';
    return 'from-[#FF4938]/20 to-[#F44336]/20 border-[#FF4938]/30';
  };

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 lg:p-8">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">
            AI Resume Reviewer
          </h1>
          <p className="text-sm text-gray-400">
            Get professional feedback and improvements for your resume
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Stats */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-gray-500" />
              <span className="text-xs text-gray-400">Credits: 35/100</span>
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
            <div className="p-3 rounded-xl bg-gradient-to-r from-[#00DA83]/20 to-[#009BB3]/20">
              <Sparkles className="w-6 h-6 text-[#00DA83]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                Resume Review
              </h2>
              <p className="text-sm text-gray-400">
                Upload your resume for AI analysis
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
                  ? 'border-[#00DA83] bg-[#00DA83]/10 scale-[1.02]' 
                  : file 
                    ? 'border-[#00DA83]/30 bg-[#00DA83]/5 hover:border-[#00DA83]/50' 
                    : 'border-gray-800 hover:border-gray-700 hover:bg-gray-800/50'
              }`}
            >
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="absolute opacity-0 w-0 h-0"
              />

              {fileInfo ? (
                <div className="relative">
                  <div className="relative w-full max-w-md mx-auto">
                    <div className="p-6 rounded-lg bg-gray-800 border border-gray-700">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <File className="w-8 h-8 text-[#00DA83]" />
                          <div>
                            <p className="text-sm font-medium text-white">{fileInfo.name}</p>
                            <p className="text-xs text-gray-400">PDF Resume</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleClearFile}
                          className="p-2 rounded-full bg-gray-900 border border-gray-800 hover:bg-gray-800 transition-colors"
                          title="Remove file"
                        >
                          <X className="w-4 h-4 text-gray-300" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 rounded-lg bg-gray-900">
                          <p className="text-xs text-gray-500 mb-1">File Size</p>
                          <p className="text-sm text-gray-300">{fileInfo.size}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-gray-900">
                          <p className="text-xs text-gray-500 mb-1">File Type</p>
                          <p className="text-sm text-gray-300">{fileInfo.type}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-400">
                      Click anywhere to change file • Press Esc to remove
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className={`p-6 rounded-full transition-all duration-300 inline-block mb-4 group-hover:scale-110 ${
                    isDragging ? 'bg-[#00DA83]/20' : 'bg-gray-800'
                  }`}>
                    {isDragging ? (
                      <Upload className="w-10 h-10 text-[#00DA83] animate-bounce" />
                    ) : (
                      <Upload className="w-10 h-10 text-gray-400 group-hover:text-gray-300" />
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mb-2">
                    {isDragging ? "Drop your resume here" : "Drag & drop your resume here"}
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    or click anywhere in this area
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 text-sm">
                    <span>Supports: PDF only</span>
                    <span className="text-gray-600">•</span>
                    <span>Max: 5MB</span>
                  </div>
                </>
              )}
            </div>

            {/* Info Card */}
            <div className="p-4 rounded-xl bg-gray-800 border border-gray-700">
              <div className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-[#00DA83] mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-300">
                    What we analyze
                  </p>
                  <ul className="text-xs text-gray-500 mt-2 space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-[#00DA83]" />
                      Content structure and formatting
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-[#00DA83]" />
                      Keywords and ATS optimization
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-[#00DA83]" />
                      Action verbs and achievements
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-[#00DA83]" />
                      Overall impact and readability
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Review Resume Button - TEAL/BLUE GRADIENT */}
            <button
              type="submit"
              disabled={loading || !file}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#00DA83] to-[#009BB3] hover:from-[#00C976] hover:to-[#0088A3] text-white px-6 py-3.5 rounded-xl font-medium text-sm shadow-lg shadow-teal-900/30 hover:shadow-teal-900/50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>Analyzing resume...</span>
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5" />
                  <span>{file ? "Review Resume" : "Select a Resume First"}</span>
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-500">
              Professional resume analysis • ATS optimization • Career advice
            </p>
          </form>
        </div>

        {/* RIGHT PANEL - ANALYSIS */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 flex flex-col h-[600px]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-r from-[#00DA83]/20 to-[#009BB3]/20">
                <FileText className="w-6 h-6 text-[#00DA83]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Analysis Results
                </h2>
                <p className="text-sm text-gray-400">
                  Detailed feedback & suggestions
                </p>
              </div>
            </div>
            
            {/* Action Buttons */}
            {content && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadAnalysis}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-[#00DA83] to-[#009BB3] hover:from-[#00C976] hover:to-[#0088A3] text-white text-sm font-medium transition-all duration-300"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            )}
          </div>

          {/* Score Card */}
          {analysisScore !== null && (
            <div className="mb-4 p-4 rounded-xl bg-gray-800 border border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-[#00DA83]/10 to-[#009BB3]/10">
                      <TrendingUp className="w-5 h-5 text-[#00DA83]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Overall Score</p>
                      <p className={`text-2xl font-bold ${getScoreColor(analysisScore)}`}>
                        {analysisScore}/10
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-400">Quality:</span>
                    <span className={`text-sm font-medium ${getScoreColor(analysisScore)}`}>
                      {analysisScore >= 8 ? 'Excellent' : analysisScore >= 6 ? 'Good' : 'Needs Improvement'}
                    </span>
                  </div>
                </div>
                <div className={`px-3 py-1.5 rounded-full text-xs bg-gradient-to-r ${getScoreBadgeColor(analysisScore)} text-white`}>
                  {analysisScore >= 8 ? '🏆 Professional' : analysisScore >= 6 ? '👍 Good' : '🛠️ Improve'}
                </div>
              </div>
              <div className="mt-3">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[#00DA83] to-[#009BB3] h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${analysisScore * 10}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Key Suggestions */}
          {suggestions.length > 0 && (
            <div className="mb-4 p-4 rounded-xl bg-gray-800 border border-gray-700">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="w-4 h-4 text-[#00DA83]" />
                <p className="text-sm font-medium text-gray-300">Key Suggestions</p>
              </div>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start gap-2 text-xs text-gray-400">
                    <ChevronRight className="w-3 h-3 text-[#00DA83] mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">{suggestion.replace(/[✓✅•]/g, '').trim()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analysis Content */}
          <div className="flex-1 overflow-y-auto">
            {!content ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-600 gap-4">
                <div className="p-4 rounded-full bg-gradient-to-r from-[#00DA83]/10 to-[#009BB3]/10">
                  <FileText className="w-12 h-12 text-gray-700" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-gray-500">
                    No analysis yet
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Upload a resume to get professional feedback
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                  <Markdown 
                    components={{
                      h1: ({node, ...props}) => <h1 className="text-lg font-bold text-white mb-3 pb-2 border-b border-gray-700" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-md font-semibold text-gray-300 mb-2 mt-4" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-sm font-medium text-gray-300 mb-2 mt-3" {...props} />,
                      p: ({node, ...props}) => <p className="text-gray-400 mb-3 leading-relaxed text-sm" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc list-inside text-gray-400 mb-3 space-y-1 text-sm" {...props} />,
                      li: ({node, ...props}) => (
                        <li className="ml-4 mb-1 text-gray-400 text-sm flex items-start">
                          <span className="text-[#00DA83] mr-2">•</span>
                          <span {...props} />
                        </li>
                      ),
                      strong: ({node, ...props}) => <strong className="font-semibold text-gray-300" {...props} />,
                      blockquote: ({node, ...props}) => <blockquote className="border-l-3 border-[#00DA83] pl-3 italic text-gray-400 my-3 text-sm" {...props} />
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
            <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-3 h-3" />
                <span>AI-powered analysis • Career optimization</span>
              </div>
              <span>Algo.ai • Resume Reviewer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewResume;