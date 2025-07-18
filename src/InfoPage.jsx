import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Hotel, 
  MapPin, 
  Sparkles
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HotelLandingPage = () => {
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      gsap.fromTo(titleRef.current, 
        { 
          opacity: 0, 
          y: 100,
          scale: 0.9
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out"
        }
      );

      gsap.fromTo(subtitleRef.current, 
        { 
          opacity: 0, 
          y: 50 
        },
        { 
          opacity: 1, 
          y: 0,
          duration: 1.2,
          delay: 0.5,
          ease: "power3.out"
        }
      );

      // Improved cards scroll-triggered animation - faster and smoother
      gsap.fromTo(".feature-card", 
        { 
          opacity: 0, 
          y: 60,
          scale: 0.9
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 90%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Floating animation for palm trees
      gsap.to(".palm-tree", {
        y: -20,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5
      });

      // Background parallax
      gsap.to(".bg-parallax", {
        yPercent: -30,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      id: "01",
      title: "Hospitality",
      description: "Warm hospitality from the moment you arrive",
      icon: <Hotel className="w-6 h-6 sm:w-8 sm:h-8" />
    },
    {
      id: "02", 
      title: "Rooms",
      description: "Stylish rooms designed and dedicated to total comfort",
      icon: <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
    },
    {
      id: "03",
      title: "Location", 
      description: "Great access & prime location close to everything you love",
      icon: <MapPin className="w-6 h-6 sm:w-8 sm:h-8" />
    }
  ];

  return (
    <div ref={mainRef} className="min-h-screen overflow-hidden">
      {/* Extended Background Container */}
      <div 
        className="min-h-screen relative"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.2)), url("https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Hero Section */}
        <section 
          ref={heroRef} 
          className="relative min-h-screen flex items-center justify-center"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 bg-parallax">
            {/* Palm Trees - Original ones */}
            <div className="absolute top-10 sm:top-20 left-5 sm:left-10 palm-tree opacity-60">
              <div className="w-16 sm:w-24 md:w-32 h-24 sm:h-36 md:h-48 bg-gradient-to-b from-green-400 to-green-600 rounded-t-full transform rotate-12 shadow-lg"></div>
            </div>
            <div className="absolute top-16 sm:top-32 right-8 sm:right-16 palm-tree opacity-60">
              <div className="w-14 sm:w-20 md:w-28 h-20 sm:h-32 md:h-44 bg-gradient-to-b from-green-400 to-green-600 rounded-t-full transform -rotate-12 shadow-lg"></div>
            </div>
            <div className="absolute bottom-20 sm:bottom-40 left-10 sm:left-20 palm-tree opacity-60">
              <div className="w-12 sm:w-18 md:w-24 h-18 sm:h-30 md:h-40 bg-gradient-to-b from-green-400 to-green-600 rounded-t-full transform rotate-6 shadow-lg"></div>
            </div>
            <div className="absolute bottom-24 sm:bottom-48 right-12 sm:right-24 palm-tree opacity-60">
              <div className="w-15 sm:w-22 md:w-30 h-22 sm:h-35 md:h-46 bg-gradient-to-b from-green-400 to-green-600 rounded-t-full transform -rotate-8 shadow-lg"></div>
            </div>
            <div className="absolute bottom-24 sm:bottom-48 right-12 sm:right-24 palm-tree opacity-60">
              <div className="w-15 sm:w-22 md:w-30 h-22 sm:h-35 md:h-46 bg-gradient-to-b from-green-400 to-green-600 rounded-t-full transform -rotate-8 shadow-lg"></div>
            </div>  
          </div>
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20"></div>
          
          {/* Hero Content */}
          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white mb-4 sm:mb-6 leading-tight tracking-wide">
              More than just a room
            </h1>
            
            <p ref={subtitleRef} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-light text-white/95 leading-relaxed">
              It's an experience.
            </p>
          </div>

          {/* Subtle scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={cardsRef} className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  className="feature-card group relative bg-transparent backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-white/20 hover:bg-white/85 hover:border-white/50"
                  style={{
                    perspective: '1000px',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Glow Effect - Only visible on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-orange-400/20 to-red-400/20 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 scale-100 blur-xl transition-all duration-300"></div>
                  
                  {/* Animated Background Particles - Only on hover */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl">
                    <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                    <div className="absolute bottom-6 left-6 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400 animate-bounce"></div>
                    <div className="absolute top-1/2 right-8 w-1 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-350 animate-ping"></div>
                  </div>

                  {/* Shine Effect - Only on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl overflow-hidden">
                    <div className="absolute top-0 -left-4 w-6 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform rotate-12 translate-x-[-100%] group-hover:translate-x-[400%] transition-transform duration-700 ease-in-out"></div>
                  </div>
                  
                  {/* Icon Container */}
                  <div className="relative z-10 mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-400/80 via-orange-400/80 to-amber-500/80 group-hover:from-amber-400 group-hover:via-orange-400 group-hover:to-amber-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 relative overflow-hidden group-hover:scale-110 group-hover:rotate-12">
                      {/* Icon Background Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl sm:rounded-2xl"></div>
                      <div className="relative text-white z-10 group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center mb-3 sm:mb-4">
                      <span className="text-2xl sm:text-3xl font-light text-white/60 group-hover:text-amber-400 mr-3 sm:mr-4 transition-colors duration-300">
                        {feature.id}
                      </span>
                      <span className="text-lg sm:text-xl font-semibold text-white/95 group-hover:text-gray-900 transition-colors duration-300">
                        {feature.title}
                      </span>
                    </div>
                    
                    <p className="text-sm sm:text-base text-white/80 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-transparent group-hover:border-amber-400/40 transition-all duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HotelLandingPage;