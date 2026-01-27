// import { useAuth, useUser } from '@clerk/clerk-react'
// import React, { useEffect, useState } from 'react'
// // import { dummyPublishedCreationData } from '../assets/assets'
// import { Heart } from 'lucide-react'
// import axios from 'axios'
// import toast from 'react-hot-toast'


// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

// const Community = () => {

//   const [creations, setCreations] = useState([])
//   const {user} = useUser()
//   const [loading, setLoading] = useState(true)
//   const { getToken } = useAuth()

//   const fetchCreations = async ()=>{
//     try {
//       const {data} = await axios.get('/api/user/get-published-creations', {
//         headers : {Authorization: `Bearer ${await getToken()}`}
//       })
//       if (data.success){
//         setCreations(data.creations)
//       }else{
//         toast.error(data.message)
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//     setLoading(false)
//   }

//   const imageLikeToggle = async (id)=>{
//     try {
//       const {data} = await axios.post('/api/user/toggle-like-creation', {id}, {
//         headers : {Authorization: `Bearer ${await getToken()}`}
//       })

//       if (data.success){
//         toast.success(data.message)
//         await fetchCreations()
//       }else{
//         toast.error(data.message)
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   useEffect(()=>{
//     if(user){
//       fetchCreations()
//     }
//   },[user])

//   return !loading ? (
//     <div className='flex-1 h-full flex flex-col gap-4 p-6'>
//       Creations
//       <div className='bg-white h-full w-full rounded-xl overflow-y-scroll'>
//         {creations.map((creation, index)=> (
//           <div key={index} className='relative group inline-block pl-3 pt-3 w-full sm:max-w-1/2 lg:max-w-1/3'>
//             <img src={creation.content} alt="" className='w-full h-full object-cover rounded-lg'/>

//             <div className='absolute bottom-0 top-0 right-0 left-3 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg'>
//               <p className='text-sm hidden group-hover:block'>{creation.prompt}</p>
//               <div className='flex gap-1 items-center'>
//                 <p>{creation.likes.length}</p>
//                 <Heart onClick={()=> imageLikeToggle(creation.id)} className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${creation.likes.includes(user.id) ? 'fill-red-500 text-red-600' : 'text-white'}`}/>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   ) : (
//     <div className='flex justify-center items-center h-full'>
//       <span className='w-10 h-10 my-1 rounded-full border-3 border-primary border-t-transparent animate-spin'></span>
//     </div>
//   )
// }

// export default Community


// import { useAuth, useUser } from "@clerk/clerk-react";
// import { Heart } from "lucide-react";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";


// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

// const Community = () => {
//   const { user, isLoaded } = useUser();
//   const { getToken } = useAuth();

//   const [creations, setCreations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   //Clerk guard
//   if (!isLoaded) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <p>Loading user...</p>
//       </div>
//     );
//   }

//   //Not logged in
//   if (!user) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <p>Please login to view community</p>
//       </div>
//     );
//   }

//   // Fetch creations
//   const fetchCreations = async () => {
//     try {
//       setLoading(true);
//       const token = await getToken();

//       const res = await axios.get(
//         "/api/user/get-published-creations",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (res.data?.success) {
//         setCreations(res.data.creations || []);
//       } else {
//         throw new Error(res.data?.message || "Failed to load");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load community data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   //  Like toggle
//   const toggleLike = async (id) => {
//     try {
//       const token = await getToken();

//       const res = await axios.post(
//         "/api/user/toggle-like-creation",
//         { id },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!res.data?.success) {
//         throw new Error(res.data?.message);
//       }

//       //Optimistic refresh
//       fetchCreations();
//     } catch (err) {
//       toast.error("Like failed");
//     }
//   };

//   useEffect(() => {
//     fetchCreations();
//   }, []);

//   //  Loading UI
//   if (loading) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <span className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></span>
//       </div>
//     );
//   }

//   //  Error UI
//   if (error) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <p className="text-red-500">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="mb-6 text-xl font-semibold">Community Creations</h1>

//       {creations.length === 0 && (
//         <p className="text-center text-gray-500">
//           No public creations found
//         </p>
//       )}

//       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {creations.map((creation) => (
//           <div
//             key={creation.id}
//             className="relative overflow-hidden rounded-xl bg-white shadow"
//           >
//             <img
//               src={creation.content}
//               alt="creation"
//               className="h-64 w-full object-cover"
//               onError={(e) => {
//                 e.target.src =
//                   "https://via.placeholder.com/400x300?text=Image+Not+Found";
//               }}
//             />

//             <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-3 text-white">
//               <p className="mb-2 text-xs line-clamp-2">
//                 {creation.prompt || "No prompt"}
//               </p>

//               <div className="flex items-center justify-between">
//                 <span className="text-sm">
//                   {creation.likes?.length || 0} likes
//                 </span>

//                 <Heart
//                   onClick={() => toggleLike(creation.id)}
//                   className={`h-5 w-5 cursor-pointer ${
//                     creation.likes?.includes(user.id)
//                       ? "fill-red-500 text-red-500"
//                       : "text-white"
//                   }`}
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Community;


import { 
  useAuth, 
  useUser 
} from "@clerk/clerk-react";
import { 
  Heart, 
  Download, 
  Share2, 
  Eye, 
  MoreVertical, 
  Filter, 
  Search, 
  TrendingUp,
  Users,
  Sparkles,
  Image as ImageIcon,
  FileText,
  Scissors,
  Eraser,
  Maximize2,
  Clock,
  User,
  Zap
} from "lucide-react";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const Community = () => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();

  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewMode, setViewMode] = useState("grid");


  //Clerk guard
  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-blue-400 animate-pulse" />
          </div>
          <p className="mt-4 text-gray-400">Loading community...</p>
        </div>
      </div>
    );
  }

  //Not logged in
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <div className="text-center p-8 bg-gray-900 rounded-2xl border border-gray-800 max-w-md">
          <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Access Required</h2>
          <p className="text-gray-400">Please login to view the community</p>
        </div>
      </div>
    );
  }

  // Fetch creations
  const fetchCreations = async () => {
    try {
      setLoading(true);
      const token = await getToken();

      const res = await axios.get(
        "/api/user/get-published-creations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data?.success) {
        setCreations(res.data.creations || []);
      } else {
        throw new Error(res.data?.message || "Failed to load");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load community data");
      toast.error("Failed to load community");
    } finally {
      setLoading(false);
    }
  };

  // Toggle like
  const toggleLike = async (id) => {
    try {
      const token = await getToken();

      const res = await axios.post(
        "/api/user/toggle-like-creation",
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.data?.success) {
        throw new Error(res.data?.message);
      }

      // Optimistic update
      setCreations(prev => prev.map(creation => {
        if (creation.id === id) {
          const isLiked = creation.likes?.includes(user.id);
          return {
            ...creation,
            likes: isLiked 
              ? creation.likes.filter(uid => uid !== user.id)
              : [...(creation.likes || []), user.id]
          };
        }
        return creation;
      }));

      toast.success(isLiked ? "Unliked" : "Liked!");
    } catch (err) {
      toast.error("Like failed");
    }
  };

  // Download image
  const downloadImage = (url, filename) => {
    try {
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || 'community-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Image downloaded!");
    } catch (err) {
      toast.error("Failed to download image");
    }
  };

  // Share image
  const shareImage = async (url, prompt) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this AI creation!',
          text: prompt || 'AI generated image',
          url: url,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  };

  // Get creation type icon
  const getCreationIcon = (type) => {
    switch(type) {
      case 'image': return <ImageIcon className="w-4 h-4" />;
      case 'article': return <FileText className="w-4 h-4" />;
      case 'object_removal': return <Scissors className="w-4 h-4" />;
      case 'background_removal': return <Eraser className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  // Get creation type label
  const getCreationLabel = (type) => {
    switch(type) {
      case 'image': return 'AI Image';
      case 'article': return 'Article';
      case 'object_removal': return 'Object Removal';
      case 'background_removal': return 'BG Removal';
      default: return 'Creation';
    }
  };

  // Filter creations
  const filteredCreations = creations.filter(creation => {
    const matchesSearch = searchQuery === "" || 
      (creation.prompt?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (creation.user?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = filter === "all" || creation.type === filter;
    
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    fetchCreations();
  }, []);

  // Loading UI
  if (loading) {
    return (
      <div className="min-h-screen bg-black p-6">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
              <Users className="absolute inset-0 m-auto w-8 h-8 text-blue-400 animate-pulse" />
            </div>
            <p className="mt-4 text-gray-400">Loading community creations...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error UI
  if (error) {
    return (
      <div className="min-h-screen bg-black p-6">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center p-8 bg-gray-900 rounded-2xl border border-gray-800 max-w-md">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Failed to Load</h2>
            <p className="text-gray-400 mb-4">{error}</p>
            <button
              onClick={fetchCreations}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 lg:p-8">
      
      {/* HEADER */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Community Creations
            </h1>
            <p className="text-sm text-gray-400">
              Explore AI creations from the community
            </p>
          </div>
          
          {/* Stats */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-xs text-gray-400">{creations.length} creations</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-gray-500" />
                <span className="text-xs text-gray-400">{creations.reduce((acc, curr) => acc + (curr.likes?.length || 0), 0)} total likes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Search */}
          <div className="lg:col-span-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search creations or users..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${filter === "all" ? "bg-blue-600 text-white border-blue-600" : "bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700"}`}
              >
                All Creations
              </button>
              <button
                onClick={() => setFilter("image")}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${filter === "image" ? "bg-blue-600 text-white border-blue-600" : "bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700"}`}
              >
                AI Images
              </button>
              <button
                onClick={() => setFilter("article")}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${filter === "article" ? "bg-blue-600 text-white border-blue-600" : "bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700"}`}
              >
                Articles
              </button>
              <button
                onClick={() => setFilter("object_removal")}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${filter === "object_removal" ? "bg-blue-600 text-white border-blue-600" : "bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700"}`}
              >
                Object Removal
              </button>
              <button
                onClick={() => setFilter("background_removal")}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${filter === "background_removal" ? "bg-blue-600 text-white border-blue-600" : "bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700"}`}
              >
                BG Removal
              </button>
            </div>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Zap className="w-4 h-4" />
            <span>Showing {filteredCreations.length} of {creations.length} creations</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"}`}
            >
              <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
                <div className={`${viewMode === "grid" ? "bg-blue-500" : "bg-gray-600"}`}></div>
                <div className={`${viewMode === "grid" ? "bg-blue-500" : "bg-gray-600"}`}></div>
                <div className={`${viewMode === "grid" ? "bg-blue-500" : "bg-gray-600"}`}></div>
                <div className={`${viewMode === "grid" ? "bg-blue-500" : "bg-gray-600"}`}></div>
              </div>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg ${viewMode === "list" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"}`}
            >
              <div className="w-5 h-5 flex flex-col gap-0.5">
                <div className={`h-1 ${viewMode === "list" ? "bg-blue-500" : "bg-gray-600"}`}></div>
                <div className={`h-1 ${viewMode === "list" ? "bg-blue-500" : "bg-gray-600"}`}></div>
                <div className={`h-1 ${viewMode === "list" ? "bg-blue-500" : "bg-gray-600"}`}></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* No Creations Message */}
      {filteredCreations.length === 0 && (
        <div className="text-center py-16 bg-gray-900/50 rounded-2xl border border-gray-800">
          <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-10 h-10 text-gray-600" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No creations found</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            {searchQuery 
              ? `No results for "${searchQuery}"`
              : filter !== "all"
                ? `No ${getCreationLabel(filter)} creations yet`
                : "Be the first to share your creation!"
            }
          </p>
        </div>
      )}

      {/* CREATIONS GRID */}
      <div className={viewMode === "grid" 
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        : "grid grid-cols-1 gap-6"
      }>
        {filteredCreations.map((creation) => (
          <div
            key={creation.id}
            className={`group bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-all duration-300 hover:shadow-xl hover:shadow-black/30 ${viewMode === "list" ? "flex" : ""}`}
          >
            {/* Image Container */}
            <div className={`relative ${viewMode === "list" ? "w-1/3" : "w-full"}`}>
              <div className="aspect-square overflow-hidden">
                <img
                  src={creation.content}
                  alt="AI creation"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                  onClick={() => setSelectedImage(creation.content)}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x400/1a1a1a/666666?text=AI+Creation";
                  }}
                />
              </div>
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                {/* Top Actions */}
                <div className="flex justify-end">
                  <button
                    onClick={() => setSelectedImage(creation.content)}
                    className="p-2 rounded-full bg-black/60 hover:bg-black/80 border border-gray-700 text-white transition-colors"
                    title="View fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Bottom Actions */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => downloadImage(creation.content, `ai-creation-${creation.id}.png`)}
                    className="p-2 rounded-full bg-black/60 hover:bg-black/80 border border-gray-700 text-white transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => shareImage(creation.content, creation.prompt)}
                    className="p-2 rounded-full bg-black/60 hover:bg-black/80 border border-gray-700 text-white transition-colors"
                    title="Share"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Type Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm border border-gray-700">
                <span className="text-blue-400">
                  {getCreationIcon(creation.type)}
                </span>
                <span className="text-xs text-gray-300">
                  {getCreationLabel(creation.type)}
                </span>
              </div>
            </div>

            {/* Info Container */}
            <div className={`p-4 ${viewMode === "list" ? "w-2/3 flex flex-col" : ""}`}>
              {/* User Info */}
              <div className="flex items-center gap-3 mb-3">
                {creation.user?.imageUrl ? (
                  <img
                    src={creation.user.imageUrl}
                    alt={creation.user.fullName}
                    className="w-8 h-8 rounded-full border border-gray-700"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-400" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-white">
                    {creation.user?.fullName || "Anonymous"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(creation.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Prompt */}
              <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                {creation.prompt || "No description provided"}
              </p>

              {/* Stats & Actions */}
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-4">
                  {/* Likes */}
                  <button
                    onClick={() => toggleLike(creation.id)}
                    className="flex items-center gap-1.5 group/like"
                  >
                    <Heart
                      className={`w-5 h-5 transition-all duration-300 ${creation.likes?.includes(user.id)
                        ? "fill-red-500 text-red-500 group-hover/like:scale-110"
                        : "text-gray-500 hover:text-red-500 group-hover/like:scale-110"
                      }`}
                    />
                    <span className="text-sm text-gray-400">
                      {creation.likes?.length || 0}
                    </span>
                  </button>

                  {/* Views */}
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-400">
                      {creation.views || 0}
                    </span>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>
                    {new Date(creation.createdAt).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-900/80 hover:bg-gray-800 border border-gray-800 text-white z-10"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-4xl max-h-[80vh]">
            <img
              src={selectedImage}
              alt="Fullscreen preview"
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
              <button
                onClick={() => {
                  const creation = filteredCreations.find(c => c.content === selectedImage);
                  if (creation) downloadImage(selectedImage, `ai-creation-${creation.id}.png`);
                }}
                className="px-4 py-2 rounded-lg bg-gray-900/80 hover:bg-gray-800 border border-gray-700 text-white transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
              <button
                onClick={() => {
                  const creation = filteredCreations.find(c => c.content === selectedImage);
                  if (creation) shareImage(selectedImage, creation.prompt);
                }}
                className="px-4 py-2 rounded-lg bg-gray-900/80 hover:bg-gray-800 border border-gray-700 text-white transition-colors flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;