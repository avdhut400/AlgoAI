import { useAuth } from "@clerk/clerk-react";
import { Hash, Sparkles, Moon, Sun, Copy, Download, Zap, CheckCircle, AlertCircle, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitles = () => {
  const blogCategories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food",
  ];

  const [selectedCategory, setSelectedCategory] = useState("General");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [dark, setDark] = useState(true);
  const [copied, setCopied] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const { getToken } = useAuth();

  // Initialize dark mode
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    if (dark) {
      setDark(false);
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      setDark(true);
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

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
      toast.error("Please enter a keyword");
      return;
    }

    try {
      setLoading(true);

      const prompt = `Generate 10 creative and SEO-friendly blog titles for the keyword "${input}" in the "${selectedCategory}" category. Format each title on a new line with bullet points.`;

      const { data } = await axios.post(
        "/api/ai/generate-blog-title",
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setContent(data.content);
        toast.success("Blog titles generated successfully! ✨");
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
      a.download = `${input.replace(/\s+/g, '-').toLowerCase()}-blog-titles.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Blog titles downloaded!");
    } catch (err) {
      toast.error("Failed to download");
    }
  };

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 lg:p-8">
      
      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">
            AI Blog Title Generator
          </h1>
          <p className="text-sm text-gray-400">
            Create catchy and SEO-friendly blog titles
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Stats */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-gray-500" />
              <span className="text-xs text-gray-400">Credits: 85/100</span>
            </div>
          </div>
          
          {/* Dark Mode Toggle - BLACK THEME */}
          <button
            onClick={toggleDarkMode}
            className="relative w-12 h-6 rounded-full focus:outline-none"
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <div className={`absolute inset-0 rounded-full transition-colors duration-300 ${
              dark ? 'bg-gray-800' : 'bg-gray-700'
            }`} />
            
            <div className={`absolute top-0.5 w-5 h-5 rounded-full shadow-lg transform transition-transform duration-300 flex items-center justify-center ${
              dark 
                ? 'left-0.5 bg-gray-300' 
                : 'left-6 bg-gray-200'
            }`}>
              {dark ? (
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
            <div className="p-3 rounded-xl bg-gray-800">
              <Sparkles className='w-6 text-[#8E37EB]'/>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">
                Generate Blog Titles
              </h1>
              <p className="text-sm text-gray-400">
                AI-powered title generator
              </p>
            </div>
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-6">
            {/* Keyword Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Keyword / Topic
              </label>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all"
                placeholder="The future of artificial intelligence..."
                required
              />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-500">
                  Be specific for better results
                </span>
                <span className="text-xs text-gray-500">
                  {input.length}/100
                </span>
              </div>
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {blogCategories.map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setSelectedCategory(item)}
                    className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                      selectedCategory === item
                        ? "bg-purple-800 text-white border-purple-600"
                        : "border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-300 bg-gray-900"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Info Card */}
            <div className="p-4 rounded-xl bg-gray-800 border border-gray-700">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-300">
                    Tips for better results
                  </p>
                  <ul className="text-xs text-gray-500 mt-2 space-y-1">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3 h-3" />
                      Use specific, descriptive keywords
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3 h-3" />
                      Select the most relevant category
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3 h-3" />
                      Titles will be SEO-optimized
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-purple-800 hover:bg-gray-700 text-white px-6 py-3.5 rounded-xl font-medium text-sm border border-gray-700 hover:border-gray-600 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-gray-500 border-t-gray-300 animate-spin" />
                  <span>Generating titles...</span>
                </>
              ) : (
                <>
                  <Hash className="w-5 h-5" />
                  <span>Generate Blog Titles</span>
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-500">
              Free plan: Up to 10 titles per generation
            </p>
          </form>
        </div>

        {/* RIGHT PANEL - OUTPUT */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 flex flex-col h-[600px]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gray-800">
                <Hash className="w-6 h-6 text-purple-300" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">
                  Generated Titles
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
                    <span className="text-sm text-gray-400">Titles generated:</span>
                    <span className="text-sm font-bold text-white">
                      {content.split('\n').filter(line => line.trim()).length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-400">Credits used:</span>
                    <span className="text-sm font-bold text-white">5</span>
                  </div>
                </div>
                <div className="px-2 py-1 rounded-full text-xs bg-gray-800 text-gray-300 border border-gray-700">
                  Ready to use
                </div>
              </div>
            </div>
          )}

          {/* Content Display */}
          <div className="flex-1 overflow-y-auto">
            {!content ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-600 gap-4">
                <div className="p-4 rounded-full bg-gray-800">
                  <Hash className="w-12 h-12 text-gray-700" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-gray-500">
                    No titles generated yet
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Enter a keyword and click generate
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                  <Markdown 
                    components={{
                      p: ({node, ...props}) => <div className="space-y-2" {...props} />,
                      ul: ({node, ...props}) => <ul className="space-y-2" {...props} />,
                      li: ({node, ...props}) => (
                        <li className="flex items-start gap-3 p-3 rounded-lg bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors">
                          <div className="p-1 rounded-full bg-gray-800 mt-1">
                            <ChevronRight className="w-3 h-3 text-gray-400" />
                          </div>
                          <span className="text-gray-300 font-medium flex-1" {...props} />
                        </li>
                      ),
                      strong: ({node, ...props}) => <span className="font-bold text-gray-300" {...props} />
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
              <span>Algo.ai • Blog Titles</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogTitles;