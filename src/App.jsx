import React, { useState, useEffect, useRef } from 'react';
import { Star, Calendar, MapPin, Phone, Mail, Menu, X, ChevronDown, Heart, Play, ChevronLeft, ChevronRight } from 'lucide-react';

// Theme colors - Tropical Beach Theme
const PRIMARY = '#2C5F7F'; // Ocean Blue
const ACCENT = '#F4A261';  // Sandy Orange
const BG = '#F8FDFF';      // Light Blue White
const LIGHT_BLUE = '#E8F4FD'; // Light Ocean Blue
const DARK_BLUE = '#1B4B66'; // Deep Ocean

// Helper for staggered animation delays
const getDelay = (base, i) => ({
  animationDelay: `${base + i * 0.12}s`
});

// Intersection Observer hook for scroll animations
function useInView(threshold = 0.2) {
  const ref = useRef();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

const TropicalHotelLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 200);
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'Rooms', 'Facilities', 'About Us', 'Contact'];
  
  const hotelPicks = [
    {
      name: "The Ritz-Carlton, Maldives",
      price: "$1,240,000",
      location: "Maldives, Indian Ocean",
      rating: 5.0,
      image: "linear-gradient(135deg, #4FC3F7 0%, #29B6F6 50%, #03A9F4 100%)"
    },
    {
      name: "The Langham, Gold Coast",
      price: "$1,240,000", 
      location: "Maldives, Australia",
      rating: 5.0,
      image: "linear-gradient(135deg, #26C6DA 0%, #00BCD4 50%, #00ACC1 100%)"
    },
    {
      name: "Longitude 131°, Uluru",
      price: "$1,240,000",
      location: "Maldives, Australia", 
      rating: 5.0,
      image: "linear-gradient(135deg, #42A5F5 0%, #2196F3 50%, #1E88E5 100%)"
    }
  ];

  // For scroll-into-view animations
  const [featuresRef, featuresInView] = useInView();
  const [statsRef, statsInView] = useInView();
  const [picksRef, picksInView] = useInView();
  const [footerRef, footerInView] = useInView();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % hotelPicks.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + hotelPicks.length) % hotelPicks.length);
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: BG,
        fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
        color: PRIMARY,
        transition: 'background 0.5s'
      }}
    >
      {/* Hero Section with Video Background */}
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          minHeight: '100vh',
        }}
      >
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
        {/* Overlay for subtle color tint and to help content visibility */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `linear-gradient(135deg, ${BG}cc 0%, ${LIGHT_BLUE}bb 100%)`,
            mixBlendMode: 'multiply',
            pointerEvents: 'none',
          }}
        />
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Floating clouds */}
          <div
            className="absolute rounded-full opacity-60"
            style={{
              width: 200,
              height: 60,
              top: '20%',
              left: '10%',
              background: 'rgba(255,255,255,0.7)',
              filter: 'blur(20px)',
              animation: 'float 20s infinite ease-in-out'
            }}
          />
          <div
            className="absolute rounded-full opacity-40"
            style={{
              width: 150,
              height: 40,
              top: '25%',
              right: '15%',
              background: 'rgba(255,255,255,0.5)',
              filter: 'blur(15px)',
              animation: 'float 25s infinite ease-in-out reverse'
            }}
          />
          <div
            className="absolute rounded-full opacity-50"
            style={{
              width: 180,
              height: 50,
              top: '35%',
              left: '60%',
              background: 'rgba(255,255,255,0.6)',
              filter: 'blur(18px)',
              animation: 'float 30s infinite ease-in-out'
            }}
          />
          
          {/* Water waves effect */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: 200,
              background: `linear-gradient(180deg, transparent 0%, ${PRIMARY}11 100%)`,
              clipPath: 'polygon(0 60%, 100% 40%, 100% 100%, 0% 100%)',
              animation: 'wave 8s ease-in-out infinite'
            }}
          />
        </div>

        {/* Navigation - submerged in video, transparent background */}
        <nav
          className={`fixed top-0 w-full z-30 transition-all duration-500`}
          style={{
            background: scrolled
              ? `rgba(255,255,255,0.85)`
              : 'rgba(255,255,255,0.25)',
            boxShadow: scrolled
              ? '0 2px 32px 0 rgba(44,95,127,0.08)'
              : 'none',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            color: PRIMARY,
            transition: 'background 0.5s, box-shadow 0.5s',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <div
                className={`flex items-center transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}
                style={getDelay(0.1, 0)}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg mr-3"
                  style={{
                    background: `linear-gradient(135deg, ${PRIMARY} 0%, ${DARK_BLUE} 100%)`,
                    boxShadow: `0 4px 16px 0 ${PRIMARY}33`
                  }}
                >
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                    <span className="text-xs font-bold" style={{ color: PRIMARY }}>S</span>
                  </div>
                </div>
                <div>
                  <span className="font-bold text-xl" style={{ color: PRIMARY }}>Stayava</span>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  {navItems.map((item, i) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className={`px-3 py-2 text-base font-medium transition-all duration-300 rounded-lg
                        ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}
                      style={{
                        ...getDelay(0.18, i),
                        color: i === 0 ? PRIMARY : PRIMARY + 'cc',
                        background: 'transparent'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = PRIMARY;
                        e.currentTarget.style.background = LIGHT_BLUE;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = i === 0 ? PRIMARY : PRIMARY + 'cc';
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact Info & Booking */}
              <div
                className={`hidden md:flex items-center space-x-6 transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}
                style={getDelay(0.18, navItems.length)}
              >
                <div className="flex items-center space-x-1" style={{ color: PRIMARY + 'cc' }}>
                  <Phone size={16} />
                  <span className="text-sm">+01 793 7562 15</span>
                </div>
                <button
                  className="px-6 py-2 rounded-full font-medium text-sm shadow-lg transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT} 0%, #E76F51 100%)`,
                    color: 'white',
                    boxShadow: `0 4px 16px 0 ${ACCENT}33`
                  }}
                >
                  Book your stay
                </button>
              </div>

              {/* Mobile menu button */}
              <div
                className={`md:hidden transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}
                style={getDelay(0.18, navItems.length + 1)}
              >
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2"
                  style={{ color: PRIMARY }}
                >
                  {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div
              className="md:hidden"
              style={{
                background: 'rgba(255,255,255,0.98)',
                boxShadow: `0 8px 32px 0 ${PRIMARY}22`,
                backdropFilter: 'blur(16px)'
              }}
            >
              <div className="px-4 pt-4 pb-6 space-y-2">
                {navItems.map((item, i) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`block px-3 py-2 text-lg font-medium rounded-lg transition-all duration-500
                      ${animate ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                    style={{
                      ...getDelay(0.1, i),
                      color: PRIMARY
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Content */}
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center w-full">
          <h1
            className={`font-light mb-8 leading-tight transition-all duration-1000`}
            style={{
              ...getDelay(0.3, 0),
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              color: PRIMARY,
              opacity: animate ? 1 : 0,
              transform: animate ? 'translateY(0)' : 'translateY(48px)',
              textShadow: '0 2px 16px rgba(255,255,255,0.7), 0 1px 0 #fff'
            }}
          >
            Exhale Now,
            <br />
            <span style={{ color: PRIMARY, fontWeight: 300 }}>Check In.</span>
          </h1>

          {/* CTA Button */}
          <div
            className={`mb-20 transition-all duration-1000`}
            style={{
              ...getDelay(0.3, 1),
              opacity: animate ? 1 : 0,
              transform: animate ? 'translateY(0)' : 'translateY(48px)'
            }}
          >
            <button
              className="px-8 py-4 rounded-full font-medium text-lg shadow-xl transition-all duration-300 transform hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #E76F51 100%)`,
                color: 'white',
                boxShadow: `0 8px 32px 0 ${ACCENT}44`
              }}
            >
              Book your stay
            </button>
          </div>

          {/* Modern Hotel Building Illustration */}
          <div
            className={`relative mx-auto transition-all duration-1000`}
            style={{
              ...getDelay(0.3, 2),
              maxWidth: '600px',
              height: '300px',
              opacity: animate ? 1 : 0,
              transform: animate ? 'translateY(0)' : 'translateY(48px)'
            }}
          >
            {/* Hotel Building */}
            <div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
              style={{
                width: '400px',
                height: '200px',
                background: `linear-gradient(135deg, #E8F4FD 0%, #FFFFFF 100%)`,
                borderRadius: '20px 20px 0 0',
                boxShadow: `0 -8px 32px 0 ${PRIMARY}22`,
                border: `2px solid ${PRIMARY}22`
              }}
            >
              {/* Building Details */}
              <div className="absolute inset-0 p-4">
                {/* Windows */}
                <div className="grid grid-cols-6 gap-2 h-full">
                  {[...Array(18)].map((_, i) => (
                    <div
                      key={i}
                      className="rounded-lg opacity-60"
                      style={{
                        background: `linear-gradient(135deg, ${PRIMARY}33 0%, ${PRIMARY}11 100%)`,
                        animation: `twinkle ${2 + Math.random() * 3}s infinite ${Math.random() * 2}s`
                      }}
                    />
                  ))}
                </div>
                
                {/* Balcony */}
                <div
                  className="absolute bottom-0 left-1/4 right-1/4 h-8 rounded-t-lg"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT}44 0%, ${ACCENT}22 100%)`,
                    border: `1px solid ${ACCENT}33`
                  }}
                />
              </div>
            </div>

            {/* Palm Tree */}
            <div
              className="absolute bottom-0 right-8"
              style={{
                width: '8px',
                height: '120px',
                background: `linear-gradient(180deg, #8D6E63 0%, #5D4037 100%)`,
                borderRadius: '4px'
              }}
            >
              {/* Palm Leaves */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-12 h-2 rounded-full"
                    style={{
                      background: `linear-gradient(90deg, #4CAF50 0%, #2E7D32 100%)`,
                      transform: `rotate(${i * 60}deg)`,
                      transformOrigin: 'left center',
                      animation: `sway ${3 + Math.random()}s ease-in-out infinite ${Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Swimming Pool */}
            <div
              className="absolute bottom-0 left-8 right-8"
              style={{
                height: '40px',
                background: `linear-gradient(135deg, ${PRIMARY}66 0%, ${PRIMARY}44 100%)`,
                borderRadius: '20px',
                boxShadow: `inset 0 2px 8px 0 ${PRIMARY}33`
              }}
            >
              {/* Pool reflection */}
              <div
                className="absolute inset-2 rounded-2xl opacity-30"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 100%)`
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Hotel Picks Section */}
      <section
        ref={picksRef}
        className="py-20"
        style={{ background: 'white' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2
                className={`text-4xl font-light mb-4 transition-all duration-700`}
                style={{
                  color: PRIMARY,
                  opacity: picksInView ? 1 : 0,
                  transform: picksInView ? 'translateY(0)' : 'translateY(32px)'
                }}
              >
                Our Hotel Picks
              </h2>
              <p
                className={`text-lg transition-all duration-700`}
                style={{
                  color: PRIMARY + '99',
                  opacity: picksInView ? 1 : 0,
                  transform: picksInView ? 'translateY(0)' : 'translateY(32px)',
                  ...getDelay(0.2, 0)
                }}
              >
                At volutpat placerat risus molam esse nulla pellentesque vestibulum. In massa,
                <br />
                eu sed neque mauris tristique lacus quis porta commodo
              </p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  background: LIGHT_BLUE,
                  color: PRIMARY,
                  boxShadow: `0 4px 16px 0 ${PRIMARY}22`
                }}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  background: PRIMARY,
                  color: 'white',
                  boxShadow: `0 4px 16px 0 ${PRIMARY}33`
                }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {hotelPicks.map((hotel, i) => (
              <div
                key={hotel.name}
                className={`group cursor-pointer transition-all duration-700`}
                style={{
                  opacity: picksInView ? 1 : 0,
                  transform: picksInView ? 'translateY(0)' : 'translateY(48px)',
                  ...getDelay(0.3, i)
                }}
              >
                <div className="relative overflow-hidden rounded-3xl mb-6 group-hover:scale-105 transition-transform duration-500">
                  <div
                    className="h-64 relative"
                    style={{
                      background: hotel.image,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    {/* Rating Badge */}
                    <div
                      className="absolute top-4 left-4 px-3 py-1 rounded-full flex items-center space-x-1"
                      style={{
                        background: 'rgba(255,255,255,0.9)',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      <Star size={14} style={{ color: ACCENT, fill: ACCENT }} />
                      <span className="text-sm font-semibold" style={{ color: PRIMARY }}>
                        {hotel.rating}
                      </span>
                    </div>

                    {/* Heart Icon */}
                    <div className="absolute top-4 right-4">
                      <Heart
                        size={24}
                        className="transition-all duration-300 hover:scale-110"
                        style={{ color: 'white', fill: 'rgba(255,255,255,0.2)' }}
                      />
                    </div>

                    {/* Modern building silhouette overlay */}
                    <div className="absolute inset-0 flex items-end justify-center pb-8">
                      <div
                        className="w-32 h-20 rounded-lg opacity-60"
                        style={{
                          background: 'rgba(255,255,255,0.2)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255,255,255,0.3)'
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="px-2">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: PRIMARY }}>
                    {hotel.name}
                  </h3>
                  <p className="text-2xl font-bold mb-2" style={{ color: PRIMARY }}>
                    {hotel.price}
                  </p>
                  <div className="flex items-center" style={{ color: PRIMARY + '99' }}>
                    <MapPin size={16} className="mr-1" />
                    <span className="text-sm">{hotel.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="py-20"
        style={{ background: LIGHT_BLUE }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <MapPin size={28} style={{ color: PRIMARY }} />,
                title: "Prime Beachfront",
                desc: "Located directly on pristine white sand beaches with crystal clear waters"
              },
              {
                icon: <Star size={28} style={{ color: PRIMARY }} />,
                title: "5-Star Luxury",
                desc: "World-class amenities and personalized service in tropical paradise"
              },
              {
                icon: <Calendar size={28} style={{ color: PRIMARY }} />,
                title: "Island Events",
                desc: "Perfect venue for beach weddings, retreats, and tropical celebrations"
              }
            ].map((feature, i) => (
              <div
                key={feature.title}
                className={`text-center group transition-all duration-700`}
                style={{
                  ...getDelay(0.4, i),
                  opacity: featuresInView ? 1 : 0,
                  transform: featuresInView ? 'translateY(0)' : 'translateY(48px)',
                  background: 'white',
                  borderRadius: 24,
                  boxShadow: '0 8px 32px 0 rgba(44,95,127,0.08)',
                  padding: '3rem 2rem'
                }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${LIGHT_BLUE} 0%, ${BG} 100%)`,
                    boxShadow: `0 4px 16px 0 ${PRIMARY}22`
                  }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: PRIMARY }}>
                  {feature.title}
                </h3>
                <p style={{ color: PRIMARY + '99', lineHeight: 1.6 }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        className="py-20"
        style={{ background: 'white' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                value: "150+",
                label: "Ocean Suites",
                desc: "Beachfront luxury"
              },
              {
                value: "3",
                label: "Restaurants",
                desc: "Fresh seafood daily"
              },
              {
                value: "24/7",
                label: "Concierge",
                desc: "Island assistance"
              },
              {
                value: "★★★★★",
                label: "TripAdvisor",
                desc: "Excellence award"
              }
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`p-8 rounded-3xl text-center transition-all duration-700`}
                style={{
                  ...getDelay(0.5, i),
                  background: `linear-gradient(135deg, ${LIGHT_BLUE} 0%, ${BG} 100%)`,
                  boxShadow: '0 8px 32px 0 rgba(44,95,127,0.08)',
                  opacity: statsInView ? 1 : 0,
                  transform: statsInView ? 'scale(1)' : 'scale(0.9)'
                }}
              >
                <div className="mb-3" style={{ color: PRIMARY, fontSize: 42, fontWeight: 700 }}>
                  {stat.value}
                </div>
                <div className="font-semibold mb-2" style={{ color: PRIMARY }}>
                  {stat.label}
                </div>
                <div className="text-sm" style={{ color: PRIMARY + '99' }}>
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        ref={footerRef}
        className={`py-16 transition-all duration-700`}
        style={{
          background: `linear-gradient(135deg, ${PRIMARY} 0%, ${DARK_BLUE} 100%)`,
          color: 'white',
          opacity: footerInView ? 1 : 0,
          transform: footerInView ? 'translateY(0)' : 'translateY(48px)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center mb-6">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mr-3"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                    <span className="text-xs font-bold" style={{ color: PRIMARY }}>S</span>
                  </div>
                </div>
                <span className="font-bold text-xl">Stayava</span>
              </div>
              <p className="text-sm opacity-80 leading-relaxed">
                Experience tropical luxury and comfort at our world-class beachfront resort.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4" style={{ color: ACCENT }}>Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Ocean Suites</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Beach Dining</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Spa & Wellness</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Island Events</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4" style={{ color: ACCENT }}>Services</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Room Service</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Water Sports</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Beach Transfers</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Diving Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4" style={{ color: ACCENT }}>Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center opacity-80">
                  <Phone size={16} className="mr-2" /> +1 (555) 123-4567
                </li>
                <li className="flex items-center opacity-80">
                  <Mail size={16} className="mr-2" /> info@stayava.com
                </li>
                <li className="flex items-center opacity-80">
                  <MapPin size={16} className="mr-2" /> 123 Beachfront Ave
                </li>
              </ul>
            </div>
          </div>
          <div
            className="border-t mt-10 pt-8 text-center text-sm opacity-80"
            style={{ borderColor: ACCENT + '33' }}
          >
            <p>&copy; 2025 Stayava. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {/* Keyframes for background pulse, float, wave, twinkle, sway */}
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.7; transform: scale(1);}
          100% { opacity: 1; transform: scale(1.08);}
        }
        @keyframes float {
          0% { transform: translateY(0);}
          50% { transform: translateY(-20px);}
          100% { transform: translateY(0);}
        }
        @keyframes wave {
          0% { transform: translateX(0);}
          50% { transform: translateX(20px);}
          100% { transform: translateX(0);}
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.7;}
          50% { opacity: 1;}
        }
        @keyframes sway {
          0% { transform: rotate(0deg);}
          50% { transform: rotate(8deg);}
          100% { transform: rotate(0deg);}
        }
      `}</style>
    </div>
  );
};

export default TropicalHotelLanding;