// import React, { useEffect, useState } from 'react'
// import { dummyCreationData } from '../assets/assets'
// import { Gem, Sparkles } from 'lucide-react'
// import { Protect, useAuth } from '@clerk/clerk-react'
// import CreationItem from '../components/CreationItem'
// import axios from 'axios'
// import toast from 'react-hot-toast'

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

// const Dashboard = () => {
 
//   const [creations, setCreations] = useState([])
//   const [loading, setLoading] = useState(true)
//   const { getToken } = useAuth()

//   const getDashboardData = async ()=>{
//     try {
//       const { data } = await axios.get('/api/user/get-user-creations', {
//         headers : {Authorization: `Bearer ${await getToken()}`}
//       })

//       if (data.success) {
//         setCreations(data.creations)
//       }else{
//         toast.error(data.message)
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//     setLoading(false)
//   }

//   useEffect(()=>{
//     getDashboardData()
//   }, [])

//   return (
//     <div className='h-full overflow-y-scroll p-6'>
//       <div className='flex justify-start gap-4 flex-wrap'>
//         {/* Total Creations Card  */}
//         <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'>
//             <div className='text-slate-600'>
//               <p className='text-sm'>Total Creations</p>
//               <h2 className='text-xl font-semibold'>{creations.length}</h2>
//             </div>
//             <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center'>
//               <Sparkles className='w-5 text-white' />
//             </div>
//         </div>

//         {/* Active Plan Card  */}
//         <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'>
//             <div className='text-slate-600'>
//               <p className='text-sm'>Active Plan</p>
//               <h2 className='text-xl font-semibold'>
//                 <Protect plan='premium' fallback="Free">Premium</Protect>
//               </h2>
//             </div>
//             <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center'>
//               <Gem className='w-5 text-white' />
//             </div>
//         </div>

//       </div>

//     {
//       loading ? 
//       (
//         <div className='flex justify-center items-center h-3/4'>
//           <div className='animate-spin rounded-full h-11 w-11 border-3 border-purple-500 border-t-transparent'></div>
//         </div>
//       )
//       :
//       (
//         <div className='space-y-3'>
//           <p className='mt-6 mb-4'>Recent Creations</p>
//           {
//             creations.map((item)=> <CreationItem key={item.id} item={item}/>)
//           }
//         </div>
//       )
//     }
    

//     </div>
//   )
// }

// export default Dashboard









import React, { useEffect, useState } from "react";
import { Gem, Sparkles } from "lucide-react";
import { Protect, useAuth } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get(
        "/api/user/get-user-creations",
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-slate-200 p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">
          Dashboard
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Overview of your activity
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">

        {/* TOTAL CREATIONS */}
        <div className="rounded-xl border border-slate-800 bg-[#141414] p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">
              Total Creations
            </p>
            <h2 className="text-3xl font-semibold mt-1 text-white">
              {creations.length}
            </h2>
          </div>
          <div className="w-11 h-11 rounded-lg bg-slate-800 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-slate-300" />
          </div>
        </div>

        {/* ACTIVE PLAN */}
        <div className="rounded-xl border border-slate-800 bg-[#141414] p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">
              Active Plan
            </p>
            <h2 className="text-xl font-semibold mt-1 text-white">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
            </h2>
          </div>
          <div className="w-11 h-11 rounded-lg bg-slate-800 flex items-center justify-center">
            <Gem className="w-5 h-5 text-slate-300" />
          </div>
        </div>

      </div>

      {/* RECENT CREATIONS */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <span className="w-10 h-10 rounded-full border-2 border-slate-600 border-t-transparent animate-spin"></span>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-medium text-white mb-4">
            Recent Creations
          </h3>

          {creations.length > 0 ? (
            <div className="border border-slate-800 rounded-xl overflow-hidden bg-[#141414] divide-y divide-slate-800">
              {creations.map((item) => (
                <div
                  key={item.id}
                  className="px-4 py-3 hover:bg-[#1a1a1a] transition text-black ml-15"
                >
                  <CreationItem item={item}  />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-16 text-center text-slate-400">
              <Sparkles className="w-8 h-8 mx-auto mb-3 opacity-60" />
              <p className="text-sm">
                No creations yet. Start creating ✨
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
