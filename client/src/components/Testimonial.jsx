import { assets } from "../assets/assets"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useState } from "react"

const Testimonial = () => {
    const dummyTestimonialData = [
        {
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
            name: 'John Doe',
            title: 'Marketing Director, TechCorp',
            content: 'ContentAI has revolutionized our content workflow. The quality of the articles is outstanding, and it saves us hours of work every week.',
            rating: 5,
        },
        {
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
            name: 'Jane Smith',
            title: 'Content Creator, TechCorp',
            content: 'ContentAI has made our content creation process effortless. The AI tools have helped us produce high-quality content faster than ever before.',
            rating: 5,
        },
        {
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
            name: 'David Lee',
            title: 'Content Writer, TechCorp',
            content: 'ContentAI has transformed our content creation process. The AI tools have helped us produce high-quality content faster than ever before.',
            rating: 4,
        },
        {
            image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
            name: 'Sarah Johnson',
            title: 'CEO, Digital Solutions',
            content: 'The AI-powered content generation is a game-changer. Our team productivity has increased by 300% since implementing ContentAI.',
            rating: 5,
        },
        {
            image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
            name: 'Michael Chen',
            title: 'Product Manager, InnovateTech',
            content: 'Outstanding platform! The quality of AI-generated content rivals that of human writers. Highly recommended for any content team.',
            rating: 5,
        },
        {
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&auto=format&fit=crop&q=60",
            name: 'Emma Wilson',
            title: 'Content Strategist, GrowthLab',
            content: 'ContentAI has simplified our entire content pipeline. From ideation to publication, everything is seamless and efficient.',
            rating: 4,
        },
    ]

    const marqueeRef1 = useRef(null)
    const marqueeRef2 = useRef(null)
    const [isPaused, setIsPaused] = useState(false)

    // Marquee animation style
    const marqueeStyle = `
        @keyframes marqueeScroll {
            0% {
                transform: translateX(0%);
            }
            100% {
                transform: translateX(-50%);
            }
        }
        
        .marquee-inner {
            animation: marqueeScroll 30s linear infinite;
            animation-play-state: ${isPaused ? 'paused' : 'running'};
        }
        
        .marquee-reverse {
            animation-direction: reverse;
        }
        
        .marquee-inner:hover {
            animation-play-state: paused;
        }
    `

    return (
        <div className='px-4 sm:px-20 xl:px-32 py-24 bg-gradient-to-b from-white to-gray-50'>
            {/* Inject marquee styles */}
            <style>{marqueeStyle}</style>
            
            <div className='text-center mb-16'>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-blue-700">
                        Trusted by 10,000+ Creators
                    </span>
                </div>
                <h2 className='text-slate-800 text-4xl sm:text-5xl font-bold mb-4'>Loved by Creators Worldwide</h2>
                <p className='text-gray-600 max-w-2xl mx-auto text-lg'>
                    Don't just take our word for it. Here's what our amazing community has to say about their experience.
                </p>
            </div>

            {/* Marquee Section - Row 1 */}
            <div className="mb-10">
                <div className="marquee-row w-full mx-auto max-w-7xl overflow-hidden relative">
                    <div className="absolute left-0 top-0 h-full w-32 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
                    
                    <div 
                        ref={marqueeRef1}
                        className="marquee-inner flex transform-gpu min-w-[200%] py-8"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        {[...dummyTestimonialData, ...dummyTestimonialData].map((testimonial, index) => (
                            <div 
                                key={`row1-${index}`} 
                                className='p-6 mx-4 rounded-2xl bg-white shadow-lg hover:shadow-2xl border border-gray-100 hover:-translate-y-2 transition-all duration-300 cursor-pointer min-w-[380px] shrink-0'
                            >
                                <div className="flex items-center gap-1 mb-4">
                                    {Array(5).fill(0).map((_, i) => (
                                        <Star 
                                            key={i} 
                                            className={`w-5 h-5 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                                <p className='text-gray-700 text-base mb-6 leading-relaxed'>"{testimonial.content}"</p>
                                
                                <div className='flex items-center gap-4 pt-4 border-t border-gray-100'>
                                    <img 
                                        src={testimonial.image} 
                                        className='w-14 h-14 object-cover rounded-full border-2 border-blue-100' 
                                        alt={testimonial.name}
                                    />
                                    <div className='flex-1'>
                                        <h3 className='font-semibold text-gray-900'>{testimonial.name}</h3>
                                        <p className='text-sm text-gray-500'>{testimonial.title}</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-blue-50">
                                        <svg width="20" height="20" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z" fill="#3B82F6" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="absolute right-0 top-0 h-full w-32 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
                </div>
            </div>

            {/* Marquee Section - Row 2 (Reverse) */}
            <div className="mt-4">
                <div className="marquee-row w-full mx-auto max-w-7xl overflow-hidden relative">
                    <div className="absolute left-0 top-0 h-full w-32 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
                    
                    <div 
                        ref={marqueeRef2}
                        className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] py-8"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        {[...dummyTestimonialData.slice().reverse(), ...dummyTestimonialData.slice().reverse()].map((testimonial, index) => (
                            <div 
                                key={`row2-${index}`} 
                                className='p-6 mx-4 rounded-2xl bg-gradient-to-br from-blue-50 to-white shadow-lg hover:shadow-2xl border border-blue-100 hover:-translate-y-2 transition-all duration-300 cursor-pointer min-w-[380px] shrink-0'
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-1">
                                        {Array(5).fill(0).map((_, i) => (
                                            <Star 
                                                key={i} 
                                                className={`w-5 h-5 ${i < testimonial.rating ? 'fill-blue-400 text-blue-400' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                    <div className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                                        Verified User
                                    </div>
                                </div>
                                
                                <p className='text-gray-700 text-base mb-6 leading-relaxed'>"{testimonial.content}"</p>
                                
                                <div className='flex items-center gap-4 pt-4 border-t border-blue-100'>
                                    <div className="relative">
                                        <img 
                                            src={testimonial.image} 
                                            className='w-12 h-12 object-cover rounded-full' 
                                            alt={testimonial.name}
                                        />
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                                                <path d="M4.5 9L2 6.5L2.7 5.8L4.5 7.6L9.3 2.8L10 3.5L4.5 9Z" fill="white"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className='flex-1'>
                                        <h3 className='font-semibold text-gray-900'>{testimonial.name}</h3>
                                        <p className='text-sm text-gray-500'>{testimonial.title}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="absolute right-0 top-0 h-full w-32 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
                </div>
            </div>

           

            {/* Controls */}
            <div className="flex justify-center items-center gap-4 mt-12">
                <button 
                    className="p-3 rounded-full bg-white border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all"
                    onClick={() => setIsPaused(!isPaused)}
                >
                    {isPaused ? (
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    ) : (
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                        </svg>
                    )}
                </button>
                <div className="text-sm text-gray-500">
                    {isPaused ? "Paused" : "Auto-scrolling"}
                </div>
            </div>
        </div>
    )
}

export default Testimonial