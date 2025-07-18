import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, Star } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const HotelLandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBookingButton, setShowBookingButton] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  
  const secondPageRef = useRef(null);
  const logoRef = useRef(null);
  const mainTextRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const bookingButtonRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    // Set initial states
    gsap.set([logoRef.current, mainTextRef.current, subtitleRef.current, buttonRef.current], {
      opacity: 0,
      y: 100,
      scale: 0.8,
    });

    // Background animation
    gsap.set(backgroundRef.current, {
      opacity: 0,
      scale: 1.2,
    });

    // Create timeline for second page animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: secondPageRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: false,
        toggleActions: "play none none reverse",
      }
    });

    // Background animation
    tl.to(backgroundRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "power2.out",
    })
    
    // Logo animation - slides in from back with rotation
    .to(logoRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotation: 360,
      duration: 1.2,
      ease: "back.out(1.7)",
    }, "-=1.2")
    
    // Main text animation - slides in from different directions
    .to(mainTextRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.5,
      ease: "power3.out",
      stagger: 0.1,
    }, "-=0.8")
    
    // Subtitle animation - slides in with bounce
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.3,
      ease: "bounce.out",
    }, "-=0.5")
    
    // Button animation - pops in with elastic effect
    .to(buttonRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.4,
      ease: "elastic.out(1, 0.3)",
    }, "-=0.3");

    // Individual word animations for main text
    const words = mainTextRef.current?.querySelectorAll('.word');
    if (words) {
      gsap.set(words, { opacity: 0, y: 50, rotationX: -90 });
      
      ScrollTrigger.create({
        trigger: secondPageRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.to(words, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(words, {
            opacity: 0,
            y: 50,
            rotationX: -90,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.in",
          });
        }
      });
    }

    // Floating elements animation
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
      gsap.to(element, {
        y: -20,
        duration: 2 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: index * 0.3,
      });
    });

    // Parallax effect for background patterns
    gsap.to(".bg-pattern-1", {
      y: -100,
      scrollTrigger: {
        trigger: secondPageRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    gsap.to(".bg-pattern-2", {
      y: -150,
      rotation: 45,
      scrollTrigger: {
        trigger: secondPageRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    gsap.to(".bg-pattern-3", {
      y: -80,
      rotation: -30,
      scrollTrigger: {
        trigger: secondPageRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    // Scroll handler for other elements
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      setScrolled(scrollY > 50);
      
      // Control navigation visibility and booking button
      if (scrollY > windowHeight * 0.5) {
        setNavVisible(false);
        setShowBookingButton(true);
      } else {
        setNavVisible(true);
        setShowBookingButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Clean up GSAP
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const navItems = [
    { name: 'ROOMS', href: '#rooms' },
    { name: 'WELLNESS', href: '#wellness' },
    { name: 'GASTRO', href: '#gastro' },
    { name: 'HOTEL', href: '#hotel' },
    { name: 'EVENTS', href: '#events' },
    { name: 'CONTACT', href: '#contact' }
  ];

  return (
    <div className="relative">
      {/* First Page - Landing */}
      <div className="min-h-screen relative overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/video.webm"
          autoPlay
          loop
          muted
          playsInline
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            filter: 'brightness(0.85) saturate(1.1)',
          }}
        />
        
        {/* Overlay for subtle color tint */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `linear-gradient(135deg, #F8FDFFcc 0%, #E8F4FDbb 100%)`,
            mixBlendMode: 'multiply',
            pointerEvents: 'none',
          }}
        />

        {/* Enhanced Header */}
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
            navVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          }`}
          style={{
            background: 'transparent',
            backdropFilter: 'none',
            borderBottom: 'none',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
            <div className="flex items-center justify-between">
              {/* Enhanced Logo */}
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-transparent border-2 border-white/30 flex items-center justify-center shadow-lg hover:scale-110 hover:rotate-12 transform transition-all duration-500">
                  <span className="font-bold text-xl md:text-2xl text-white">S</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <span className="text-white font-bold text-xl md:text-2xl tracking-wide group-hover:text-sky-200 transition-colors duration-300">
                  Stayava
                </span>
              </div>
              
              {/* Enhanced Navigation */}
              <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
                {navItems.map((item, index) => (
                  <div key={item.name} className="relative group">
                    <a
                      href={item.href}
                      className="relative px-4 py-2 text-white text-sm font-medium tracking-wide transition-all duration-300 rounded-lg hover:bg-white/5 hover:text-sky-200 hover:scale-105 transform"
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-sky-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                    </a>
                  </div>
                ))}
              </nav>
              
              {/* Enhanced Right Section */}
              <div className="flex items-center space-x-2 md:space-x-4">
                <div className="hidden lg:flex items-center space-x-2 text-white text-sm group hover:text-sky-200 transition-colors duration-300">
                  <Phone className="w-4 h-4 group-hover:animate-pulse" />
                  <span className="font-medium">+01 0000000000</span>
                </div>
                
                <button 
                  className={`lg:hidden p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                    isMenuOpen ? 'bg-white/10 text-white rotate-90' : 'text-white hover:bg-white/5'
                  }`}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Enhanced Mobile Menu */}
        <div className={`lg:hidden fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-xl z-40 transition-all duration-500 ease-out ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}>
          <div className="pt-20 pb-8">
            <nav className="flex flex-col px-6 space-y-2">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group relative py-4 text-white text-lg font-medium tracking-wide transition-all duration-300 hover:text-sky-200 hover:translate-x-2 transform"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute left-0 top-0 w-0 h-full bg-gradient-to-r from-sky-400/20 to-blue-500/20 transition-all duration-300 group-hover:w-full"></div>
                  <div className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-sky-400 to-blue-500 transition-all duration-300 group-hover:w-full"></div>
                </a>
              ))}
              <div className="pt-6 mt-6 border-t border-white/20">
                <div className="flex items-center space-x-2 text-white group hover:text-sky-200 transition-colors duration-300">
                  <Phone className="w-4 h-4 group-hover:animate-pulse" />
                  <span className="font-medium">+01 0000000000</span>
                </div>
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <main className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 md:px-6 pt-20">
          <div className="mb-6 md:mb-8">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 md:mb-6 mx-auto backdrop-blur-sm border border-white/30 hover:scale-110 transition-transform duration-300 hover:rotate-12">
              <span className="text-white font-bold text-2xl md:text-3xl">S</span>
            </div>
            <p className="text-white text-base md:text-lg mb-2 font-light opacity-90">Wellness & Spa Hotel Stayava</p>
          </div>
          
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-6 md:mb-8 leading-tight max-w-4xl">
            Celebrate our 20th<br />
            <span className="font-normal bg-gradient-to-r from-sky-200 to-blue-200 bg-clip-text text-transparent">anniversary with us</span>
          </h1>
          
          <p className="text-white text-lg md:text-xl mb-8 md:mb-12 max-w-2xl font-light px-4 opacity-90">
            Welcome to one of the top 10% of hotels in the world.
          </p>
          
          <button className="relative overflow-hidden bg-gradient-to-r from-white/90 to-white/80 backdrop-blur-sm text-sky-600 px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold hover:from-white hover:to-white transition-all duration-300 transform hover:scale-105 shadow-lg group">
            <span className="relative z-10">Book your stay</span>
            <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="absolute top-0 left-0 w-0 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:w-full transition-all duration-500"></div>
          </button>
          
          {/* Rating Section */}
          <div className="mt-12 md:mt-16 flex flex-col items-center">
            <div className="flex items-center space-x-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current hover:scale-125 transition-transform duration-200" 
                />
              ))}
            </div>
            <div className="text-white text-sm">
              <div className="font-semibold">TripAdvisor</div>
              <div className="opacity-80">Choice Award</div>
            </div>
          </div>
          
          {/* Info Button */}
          <button className="absolute bottom-6 md:bottom-10 left-4 md:left-10 text-white border border-white/50 rounded-full px-4 md:px-6 py-2 md:py-3 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm text-sm group hover:border-white/80 hover:scale-105 transform">
            <div className="font-semibold group-hover:text-sky-200 transition-colors duration-300">IMPORTANT</div>
            <div className="opacity-80 group-hover:opacity-100 transition-opacity duration-300">INFO</div>
          </button>
        </main>
        
        {/* Enhanced Floating Elements */}
        <div className="absolute top-1/4 right-10 w-2 h-2 bg-white rounded-full opacity-60 floating-element"></div>
        <div className="absolute top-1/3 left-16 w-1 h-1 bg-white rounded-full opacity-40 floating-element"></div>
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-white rounded-full opacity-30 floating-element"></div>
        <div className="absolute top-1/2 left-10 w-1.5 h-1.5 bg-sky-200 rounded-full opacity-50 floating-element"></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-blue-200 rounded-full opacity-40 floating-element"></div>
      </div>

      {/* Second Page - Hotel Information with Enhanced Animations */}
      <div 
        ref={secondPageRef}
        className="min-h-screen bg-gradient-to-br from-gray-50 to-white relative flex items-center justify-center px-4 md:px-6 overflow-hidden"
      >
        {/* Animated Background Pattern */}
        <div 
          ref={backgroundRef}
          className="absolute inset-0 opacity-5"
        >
          <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-sky-200 rounded-full blur-3xl bg-pattern-1"></div>
          <div className="absolute bottom-1/4 right-1/4 w-56 h-56 md:w-72 md:h-72 bg-blue-200 rounded-full blur-2xl bg-pattern-2"></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 md:w-56 md:h-56 bg-purple-200 rounded-full blur-xl transform -translate-x-1/2 -translate-y-1/2 bg-pattern-3"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-sky-300 rounded-full opacity-30 floating-element"></div>
        <div className="absolute top-32 right-32 w-2 h-2 bg-blue-400 rounded-full opacity-40 floating-element"></div>
        <div className="absolute bottom-32 left-32 w-3 h-3 bg-purple-300 rounded-full opacity-35 floating-element"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-sky-400 rounded-full opacity-30 floating-element"></div>

        {/* Content Container */}
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Logo with Enhanced Animation */}
          <div 
            ref={logoRef}
            className="mb-8 md:mb-12"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl relative overflow-hidden group">
              <span className="text-white font-bold text-2xl md:text-3xl relative z-10">S</span>
              <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 w-0 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:w-full transition-all duration-500"></div>
            </div>
          </div>

          {/* Main Text with Word Animation */}
          <div 
            ref={mainTextRef}
            className="mb-8 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-gray-800 leading-tight mb-4 md:mb-6">
              <span className="word inline-block">The</span>{' '}
              <span className="word inline-block">stay</span>{' '}
              <span className="word inline-block">at</span>{' '}
              <span className="word inline-block bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent font-medium">
                Wellness
              </span>{' '}
              <span className="word inline-block bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent font-medium">
                &
              </span>{' '}
              <span className="word inline-block bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent font-medium">
                Spa
              </span>{' '}
              <span className="word inline-block bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent font-medium">
                Hotel
              </span>
              <br />
              <span className="word inline-block">means</span>{' '}
              <span className="word inline-block">enjoying</span>{' '}
              <span className="word inline-block">every</span>{' '}
              <span className="word inline-block">moment.</span>
            </h2>
          </div>

          {/* Subtitle with Enhanced Animation */}
          <div 
            ref={subtitleRef}
            className="mb-12 md:mb-16"
          >
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 font-light leading-relaxed relative">
              <span className="relative z-10">Relax. Find inspiration. Be fascinated.</span>
               <div className="absolute inset-0 bg-gradient-to-r from-sky-100 to-blue-100 opacity-0 hover:opacity-50 transition-opacity duration-300 rounded-lg"></div>
            </div>
            {/* <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 font-light leading-relaxed relative">
              <span className="relative z-10">Relax. Find inspiration. Be fascinated.</span>
              <div className="absolute inset-0 bg-gradient-to-r from-sky-100 to-blue-100 opacity-0 hover:opacity-50 transition-opacity duration-300 rounded-lg"></div>
            </p> */}
          </div>
          {/* Button with Enhanced Animation */}
          <div 
            ref={buttonRef}
          >
            <button className="relative overflow-hidden bg-gray-800 text-white px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 rounded-full text-base sm:text-lg md:text-xl font-medium hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-2xl group">
              <span className="relative z-10">Hotel</span>
              <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 w-0 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:w-full transition-all duration-500"></div>
              <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-sky-400/30 transition-all duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Booking Button */}
      <div 
        ref={bookingButtonRef}
        className={`fixed top-4 right-4 md:top-6 md:right-6 z-50 transition-all duration-500 ${
          showBookingButton ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-4 opacity-0 scale-95'
        }`}
      >
        <button className="relative overflow-hidden bg-gray-800 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full font-semibold hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm md:text-base group">
          <span className="relative z-10">Booking</span>
          <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <div className="absolute top-0 left-0 w-0 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:w-full transition-all duration-500"></div>
        </button>
      </div>

      {/* Custom Styles */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #0ea5e9, #3b82f6);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #0284c7, #2563eb);
        }
        
        /* Ensure words don't break awkwardly */
        .word {
          white-space: nowrap;
        }
        
        /* Perspective for 3D transforms */
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default HotelLandingPage;