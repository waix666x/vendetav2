import React, { useState, useEffect, ReactNode } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { BarChart3, Shield, Globe2, TrendingUp, ArrowRight, Phone, Mail, MapPin, Check, Bitcoin, Wallet, DollarSign, Award, Facebook, Twitter, Instagram, Linkedin as LinkedIn, ArrowUp, ArrowDown, Star, ThumbsUp, Heart, Sparkles, Trophy, Target, Zap, Globe, ArrowRightCircle } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import { Helmet } from 'react-helmet-async';
import FrameworksSection from './components/FrameworksSection';
import 'react-phone-input-2/lib/style.css';
import './phone-input.css';
import tradingAnimation from './assets/JtBZm3Getg3dqxK0zP.webp';
import lightBg from './assets/light3.png';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LanguageIcon from '@mui/icons-material/Language';
import SecurityIcon from '@mui/icons-material/Security';
import PublicIcon from '@mui/icons-material/Public';
import StarIcon from '@mui/icons-material/Star';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

// Add TradingView type declaration
declare global {
  interface Window {
    TradingView: any;
  }
}

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  honeypot: string;
}

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const LightButton: React.FC<ButtonProps> = ({ children, onClick, className = '', type = 'button' }) => (
  <button
    type={type}
    onClick={onClick}
    className={`flex items-center justify-center px-6 py-3 rounded-xl text-gray-900 bg-white/90 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-white/25 ${className}`}
  >
    {children}
  </button>
);

const DarkButton: React.FC<ButtonProps> = ({ children, onClick, className = '', type = 'button' }) => (
  <button
    type={type}
    onClick={onClick}
    className={`flex items-center justify-center px-6 py-3 rounded-xl text-white bg-gray-900/90 hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-gray-900/25 border border-gray-700/50 ${className}`}
  >
    {children}
  </button>
);

function App() {
  const { scrollYProgress } = useScroll();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    honeypot: ''
  });
  const [phoneError, setPhoneError] = useState('');
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('DE');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [email, setEmail] = useState('');
  const [showCookieConsent, setShowCookieConsent] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Load TradingView widget script
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      // Initialize widgets after script is loaded
      if (typeof window.TradingView !== 'undefined') {
        // Initialize multi-chart widget
        new window.TradingView.widget({
          "width": "100%",
          "height": 600,
          "symbolsGroups": [
            {
              "name": "Krypto & Gold",
              "symbols": [
                {
                  "name": "BINANCE:BTCUSDT"
                },
                {
                  "name": "BINANCE:ETHUSDT"
                },
                {
                  "name": "TVC:GOLD"
                }
              ]
            }
          ],
          "showSymbolLogo": true,
          "colorTheme": "dark",
          "isTransparent": false,
          "locale": "de",
          "container_id": "tradingview_multi_chart"
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const updateTrailPosition = () => {
      setTrailPosition(prev => ({
        x: prev.x + (cursorPosition.x - prev.x) * 0.2,
        y: prev.y + (cursorPosition.y - prev.y) * 0.2
      }));
    };

    window.addEventListener('mousemove', updateCursorPosition);
    const trailInterval = setInterval(updateTrailPosition, 16);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      clearInterval(trailInterval);
    };
  }, [cursorPosition]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.honeypot) {
      console.log('Spam detected - form submission blocked');
      return;
    }

    if (!formData.phone) {
      setPhoneError('Bitte geben Sie eine gültige Telefonnummer ein');
      return;
    }
    setFormSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhoneChange = (value: string) => {
    setFormData({
      ...formData,
      phone: value
    });
    setPhoneError('');
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  const changeLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    setIsLanguageMenuOpen(false);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log('Subscribing to:', selectedPlan, 'with email:', email);
    setIsModalOpen(false);
    setEmail('');
  };

  const renderMarketsSection = () => (
    <div id="markets" className="py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-100">Märkte im Überblick</h2>
          <p className="mt-4 text-lg text-gray-400">Live Marktdaten in Echtzeit</p>
        </div>
        
        {/* Single TradingView Widget */}
        <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Bitcoin className="h-6 w-6 text-yellow-500" />
              <div className="h-6 w-6 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">Ξ</span>
              </div>
              <div className="h-6 w-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-gray-900 text-sm font-bold">Au</span>
              </div>
            </div>
            {/* Market Watch Ticker */}
            <div className="bg-gray-800 rounded-xl p-2 overflow-hidden flex-1 ml-4">
              <div className="flex space-x-8 animate-scroll">
                {[
                  { symbol: 'BTC/USD', price: '43,250.00', change: '+2.5%' },
                  { symbol: 'ETH/USD', price: '2,350.00', change: '+1.8%' },
                  { symbol: 'XAU/USD', price: '1,950.00', change: '-0.3%' },
                  { symbol: 'EUR/USD', price: '1.0845', change: '+0.2%' },
                  { symbol: 'GBP/USD', price: '1.2650', change: '-0.1%' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 whitespace-nowrap">
                    <span className="text-gray-300 font-medium">{item.symbol}</span>
                    <span className="text-gray-100">{item.price}</span>
                    <span className={`${item.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {item.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="h-[600px]">
            <div className="tradingview-widget-container" style={{ height: "100%" }}>
              <div id="tradingview_multi_chart" style={{ height: "100%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Custom Cursor */}
      <div
        className="custom-cursor"
        style={{
          transform: `translate(${cursorPosition.x - 4}px, ${cursorPosition.y - 4}px)`
        }}
      />
      <div
        className="cursor-trail"
        style={{
          transform: `translate(${trailPosition.x - 4}px, ${trailPosition.y - 4}px)`
        }}
      />

      <Helmet>
        <title>Capital Ventures - Professionelle Trading Plattform</title>
        <meta name="description" content="Handeln Sie sicher mit Capital Ventures. Echtzeit-Einblicke und erstklassige Tools für Kryptowährungen und traditionelle Märkte. Jetzt starten!" />
        <meta name="keywords" content="trading, kryptowährung, bitcoin, ethereum, gold, forex, investment, kapitalanlage, finanzberatung" />
        <meta name="author" content="Capital Ventures" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="German" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://capital-ventures.com" />
        <meta property="og:title" content="Capital Ventures - Professionelle Trading Plattform" />
        <meta property="og:description" content="Handeln Sie sicher mit Capital Ventures. Echtzeit-Einblicke und erstklassige Tools für Kryptowährungen und traditionelle Märkte." />
        <meta property="og:image" content="/cover.jpg" />
        <meta property="og:locale" content="de_DE" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://capital-ventures.com" />
        <meta name="twitter:title" content="Capital Ventures - Professionelle Trading Plattform" />
        <meta name="twitter:description" content="Handeln Sie sicher mit Capital Ventures. Echtzeit-Einblicke und erstklassige Tools für Kryptowährungen und traditionelle Märkte." />
        <meta name="twitter:image" content="/cover.jpg" />
        
        {/* Additional SEO tags */}
        <link rel="canonical" href="https://capital-ventures.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        
        {/* Favicon */}
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#1F2937" />
      </Helmet>
      
      {/* Navigation */}
      <nav className="bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-800 fixed w-full z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold text-gray-100">Capital Ventures</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-300 hover:text-blue-400 transition-colors">Dienstleistungen</a>
              <a href="#about" className="text-gray-300 hover:text-blue-400 transition-colors">Über uns</a>
              <a href="#markets" className="text-gray-300 hover:text-blue-400 transition-colors">Märkte</a>
              
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={toggleLanguageMenu}
                  className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors"
                >
                  <LanguageIcon className="h-5 w-5" />
                  <span>{currentLanguage}</span>
                </button>
                
                {/* Language Dropdown */}
                {isLanguageMenuOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-1">
                    <button
                      onClick={() => changeLanguage('DE')}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 ${
                        currentLanguage === 'DE' ? 'text-blue-400' : 'text-gray-300'
                      }`}
                    >
                      Deutsch
                    </button>
                    <button
                      onClick={() => changeLanguage('EN')}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 ${
                        currentLanguage === 'EN' ? 'text-blue-400' : 'text-gray-300'
                      }`}
                    >
                      English
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Lightning Effect */}
      <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 pt-16 overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_var(--tw-gradient-stops))] from-blue-400/10 via-transparent to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-left">
              <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-tight font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
                <span className="block">Investieren Sie in</span>
                <span className="block">Ihre Zukunft</span>
              </h1>
              <p className="mt-3 text-xl text-gray-300 sm:text-2xl md:mt-5">
                Strategische Investitionslösungen, maßgeschneidert auf Ihre finanziellen Ziele. Lassen Sie uns gemeinsam eine sichere und erfolgreiche Zukunft aufbauen.
              </p>
              <LightButton onClick={scrollToForm} className="mt-8">
                <span>Jetzt Starten</span>
                <ArrowForwardIcon className="ml-2" />
              </LightButton>

              {/* Symbol Animation */}
              <div className="mt-12 bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-800/50 to-transparent z-10"></div>
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-800/50 to-transparent z-10"></div>
                <div className="flex space-x-8 animate-scroll">
                  {[
                    // Cryptocurrencies
                    { symbol: 'BTC/USD', price: '43,250.00', change: '+2.5%' },
                    { symbol: 'ETH/USD', price: '2,350.00', change: '+1.8%' },
                    { symbol: 'BNB/USD', price: '312.50', change: '+0.9%' },
                    { symbol: 'SOL/USD', price: '98.75', change: '+3.2%' },
                    { symbol: 'ADA/USD', price: '0.45', change: '-1.2%' },
                    
                    // Commodities
                    { symbol: 'XAU/USD', price: '1,950.00', change: '-0.3%' },
                    { symbol: 'XAG/USD', price: '23.45', change: '+0.5%' },
                    { symbol: 'OIL/USD', price: '78.90', change: '+1.2%' },
                    { symbol: 'NAT.GAS', price: '2.85', change: '-0.8%' },
                    
                    // Forex
                    { symbol: 'EUR/USD', price: '1.0845', change: '+0.2%' },
                    { symbol: 'GBP/USD', price: '1.2650', change: '-0.1%' },
                    { symbol: 'USD/JPY', price: '148.25', change: '+0.4%' },
                    { symbol: 'AUD/USD', price: '0.6520', change: '-0.3%' },
                    { symbol: 'USD/CAD', price: '1.3520', change: '+0.2%' },
                    
                    // Indices
                    { symbol: 'S&P 500', price: '4,850.25', change: '+0.8%' },
                    { symbol: 'NASDAQ', price: '15,250.75', change: '+1.2%' },
                    { symbol: 'DOW', price: '37,850.50', change: '+0.5%' },
                    { symbol: 'DAX', price: '16,750.25', change: '+0.7%' },
                    { symbol: 'FTSE', price: '7,650.00', change: '-0.2%' },
                    
                    // Stocks
                    { symbol: 'AAPL', price: '185.25', change: '+1.5%' },
                    { symbol: 'MSFT', price: '375.50', change: '+2.1%' },
                    { symbol: 'GOOGL', price: '142.75', change: '+0.9%' },
                    { symbol: 'AMZN', price: '155.30', change: '+1.2%' },
                    { symbol: 'TSLA', price: '245.80', change: '-0.8%' },
                    
                    // Duplicate items for seamless loop
                    { symbol: 'BTC/USD', price: '43,250.00', change: '+2.5%' },
                    { symbol: 'ETH/USD', price: '2,350.00', change: '+1.8%' },
                    { symbol: 'BNB/USD', price: '312.50', change: '+0.9%' },
                    { symbol: 'SOL/USD', price: '98.75', change: '+3.2%' },
                    { symbol: 'ADA/USD', price: '0.45', change: '-1.2%' },
                    { symbol: 'XAU/USD', price: '1,950.00', change: '-0.3%' },
                    { symbol: 'XAG/USD', price: '23.45', change: '+0.5%' },
                    { symbol: 'OIL/USD', price: '78.90', change: '+1.2%' },
                    { symbol: 'NAT.GAS', price: '2.85', change: '-0.8%' },
                    { symbol: 'EUR/USD', price: '1.0845', change: '+0.2%' },
                    { symbol: 'GBP/USD', price: '1.2650', change: '-0.1%' },
                    { symbol: 'USD/JPY', price: '148.25', change: '+0.4%' },
                    { symbol: 'AUD/USD', price: '0.6520', change: '-0.3%' },
                    { symbol: 'USD/CAD', price: '1.3520', change: '+0.2%' },
                    { symbol: 'S&P 500', price: '4,850.25', change: '+0.8%' },
                    { symbol: 'NASDAQ', price: '15,250.75', change: '+1.2%' },
                    { symbol: 'DOW', price: '37,850.50', change: '+0.5%' },
                    { symbol: 'DAX', price: '16,750.25', change: '+0.7%' },
                    { symbol: 'FTSE', price: '7,650.00', change: '-0.2%' },
                    { symbol: 'AAPL', price: '185.25', change: '+1.5%' },
                    { symbol: 'MSFT', price: '375.50', change: '+2.1%' },
                    { symbol: 'GOOGL', price: '142.75', change: '+0.9%' },
                    { symbol: 'AMZN', price: '155.30', change: '+1.2%' },
                    { symbol: 'TSLA', price: '245.80', change: '-0.8%' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 whitespace-nowrap">
                      <span className="text-gray-300 font-medium">{item.symbol}</span>
                      <span className="text-gray-100">{item.price}</span>
                      <span className={`${item.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                        {item.change}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div
              id="contact-form"
              className="bg-gray-800/50 backdrop-blur-md p-8 rounded-2xl border border-gray-700"
            >
              {!formSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-1">
                      <label htmlFor="firstName" className="block text-sm font-semibold text-gray-300 text-left">
                        Vorname
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        required
                        className="mt-1 block w-full px-4 py-3 rounded-xl bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-span-1">
                      <label htmlFor="lastName" className="block text-sm font-semibold text-gray-300 text-left">
                        Nachname
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        required
                        className="mt-1 block w-full px-4 py-3 rounded-xl bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-300 text-left mb-2">
                      Telefonnummer
                    </label>
                    <div className="phone-input-container">
                      <PhoneInput
                        country={'de'}
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        inputClass="w-full"
                        buttonClass="!bg-gray-700 !border-gray-600"
                        dropdownClass="!bg-gray-800 !border-gray-700"
                        searchClass="!bg-gray-700 !border-gray-600 !text-gray-100"
                        containerClass="!w-full"
                        buttonStyle={{
                          backgroundColor: 'rgb(55, 65, 81)',
                          border: 'none',
                          borderRadius: '0.75rem 0 0 0.75rem',
                          width: '60px'
                        }}
                        inputStyle={{
                          width: '88.5%',
                          height: '48px',
                          backgroundColor: 'rgb(55, 65, 81)',
                          border: 'none',
                          borderRadius: '0 0.75rem 0.75rem 0',
                          color: 'rgb(243, 244, 246)',
                          marginLeft: '60px'
                        }}
                        inputProps={{
                          name: 'phone',
                          required: true,
                          className: 'w-full'
                        }}
                        specialLabel=""
                        enableSearch={true}
                        searchPlaceholder="Land suchen..."
                        searchNotFound="Keine Länder gefunden"
                        preferredCountries={['de', 'at', 'ch']}
                      />
                    </div>
                    {phoneError && (
                      <p className="mt-1 text-sm text-red-400">{phoneError}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-300 text-left">
                      E-Mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="mt-1 block w-full px-4 py-3 rounded-xl bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <DarkButton type="submit" className="w-full" onClick={scrollToTop}>
                    <span>Jetzt Investieren</span>
                    <TrendingUpIcon className="ml-2" />
                  </DarkButton>
                </form>
              ) : (
                <div className="text-center py-8 animate-fade-in">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-green-400 to-blue-400 p-3">
                    <Check className="h-10 w-10 text-gray-900" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Anfrage Erfolgreich Gesendet!
                  </h3>
                  <p className="mt-4 text-lg text-gray-300">
                    Vielen Dank für Ihr Interesse. Einer unserer Anlageberater wird Sie in Kürze kontaktieren, um Ihre Anlageziele zu besprechen.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sliding Promotion Text */}
        {/* <div className="relative mt-20 overflow-hidden bg-gray-800/50 py-8">
          <div className="sliding-text text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Investieren Sie heute in Ihre Zukunft - Wachsen Sie mit uns über Ihre Grenzen hinaus
          </div>
        </div> */}

        {/* Frameworks Section */}
        <FrameworksSection />
      </div>

      {/* Services Section */}
      <div id="services" className="py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Unsere Leistungen</h2>
            <p className="mt-4 text-xl text-gray-400">Wählen Sie den Plan, der zu Ihren Anlagezielen passt</p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Basic Plan */}
            <div 
              className="relative group h-full cursor-pointer"
              onClick={() => {
                setSelectedPlan('Basic');
                setIsModalOpen(true);
              }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-gray-900 p-8 rounded-2xl border border-gray-700/50 h-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-100">Basic</h3>
                  <div className="bg-blue-500/20 rounded-full p-2">
                    <Sparkles className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    Grundlegende Marktanalysen
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    Zugang zu Hauptmärkten
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    Wöchentliche Updates
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    Basis Trading Tools
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    E-Mail Support
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    Marktübersicht
                  </li>
                </ul>
                <div className="absolute bottom-8 right-8">
                  <span className="text-blue-400 group-hover:text-blue-300 transition-colors">
                    <ArrowForwardIcon className="h-8 w-8" />
                  </span>
                </div>
              </div>
            </div>

            {/* Premium Plan */}
            <div 
              className="relative group h-full cursor-pointer"
              onClick={() => {
                setSelectedPlan('Premium');
                setIsModalOpen(true);
              }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-gray-900 p-8 rounded-2xl border border-gray-700/50 h-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-100">Premium</h3>
                  <div className="bg-purple-500/20 rounded-full p-2">
                    <Trophy className="h-6 w-6 text-purple-400" />
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    Erweiterte Marktanalysen
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    Zugang zu allen Märkten
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    Tägliche Updates
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    Premium Trading Tools
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    Prioritäts-Support
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    Detaillierte Marktanalysen
                  </li>
                </ul>
                <div className="absolute bottom-8 right-8">
                  <span className="text-purple-400 group-hover:text-purple-300 transition-colors">
                    <ArrowForwardIcon className="h-8 w-8" />
                  </span>
                </div>
              </div>
            </div>

            {/* Business Plan */}
            <div 
              className="relative group h-full cursor-pointer"
              onClick={() => {
                setSelectedPlan('Business');
                setIsModalOpen(true);
              }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-gray-900 p-8 rounded-2xl border border-gray-700/50 h-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-100">Business</h3>
                  <div className="bg-cyan-500/20 rounded-full p-2">
                    <Target className="h-6 w-6 text-cyan-400" />
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    Premium Marktanalysen
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    Exklusiver Marktzugang
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    Echtzeit-Updates
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    Enterprise Trading Tools
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    Dedizierter Berater
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    Individuelle Strategien
                  </li>
                </ul>
                <div className="absolute bottom-8 right-8">
                  <span className="text-cyan-400 group-hover:text-cyan-300 transition-colors">
                    <ArrowForwardIcon className="h-8 w-8" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Broker Software Section */}
      <div id="broker-software" className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Unser Broker Software
            </h2>
            <p className="mt-4 text-xl text-gray-400">
              Professionelle Trading-Lösungen mit höchster Genauigkeit
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Software Image */}
            <div className="relative w-full" style={{ height: '600px' }}>
              <div className="relative rounded-2xl overflow-hidden w-full h-full group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-gray-900 rounded-2xl border border-gray-700/50 h-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <img 
                    src={tradingAnimation}
                    alt="Live Trading Animation"
                    className="w-full h-full object-contain relative z-10"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Features and Stats */}
            <div className="space-y-8">
              {/* Signal Accuracy */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-100">Signal Genauigkeit</h3>
                    <p className="text-gray-400 mt-2">Hochpräzise Marktanalysen</p>
                  </div>
                  <div className="text-4xl font-bold text-green-400">98.7%</div>
                </div>
                <div className="mt-4 flex items-center space-x-2">
                  <span className="text-blue-400 group-hover:text-blue-300 transition-colors">
                    <TrendingUpIcon className="h-8 w-8" />
                  </span>
                  <span className="text-gray-300">Basierend auf 10,000+ Trades</span>
                </div>
              </div>

              {/* Safety Features */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-400/10 rounded-full p-3">
                    <SecurityIcon className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-100">Sicherheit Garantiert</h3>
                    <p className="text-gray-400 mt-1">SSL-Verschlüsselung & 2FA</p>
                  </div>
                </div>
              </div>

              {/* Profit Statistics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-400 group-hover:text-blue-300 transition-colors">
                      <TrendingUpIcon className="h-8 w-8" />
                    </span>
                    <span className="text-gray-300">Durchschnittlicher Gewinn</span>
                  </div>
                  <div className="text-2xl font-bold text-green-400 mt-2">+24.5%</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-400 group-hover:text-blue-300 transition-colors">
                      <StarIcon className="h-8 w-8" />
                    </span>
                    <span className="text-gray-300">Erfolgsrate</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-400 mt-2">92%</div>
                </div>
              </div>

              {/* CTA Button */}
              <DarkButton className="w-full" onClick={scrollToTop}>
                <span>Jetzt Trading Starten</span>
                <TrendingUpIcon className="ml-2" />
              </DarkButton>
            </div>
          </div>
        </div>
      </div>

      {/* About Section with Experience Badge */}
      <div id="about" className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-3xl font-extrabold text-gray-100">Warum uns wählen</h2>
                <div className="experience-badge">
                  <div className="relative flex items-center justify-center bg-gray-800 rounded-full p-3">
                    <span className="text-sm font-bold">20+ Jahre</span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-lg text-gray-400">
                Mit über zwei Jahrzehnten Erfahrung an den Finanzmärkten haben wir uns als vertrauenswürdiger Partner für tausende von Kunden etabliert. Unsere Expertise umfasst:
              </p>
              <div className="mt-8 space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-blue-400/10 rounded-full p-2">
                      <SecurityIcon className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-100">Sicher & Vertrauenswürdig</h4>
                    <p className="mt-2 text-gray-400">Ihre Investitionen werden durch modernste Sicherheitssysteme und strenge Compliance-Standards geschützt.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-blue-400/10 rounded-full p-2">
                      <PublicIcon className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-100">Globale Präsenz</h4>
                    <p className="mt-2 text-gray-400">Mit Niederlassungen in den wichtigsten Finanzzentren bieten wir Ihnen weltweiten Zugang zu den besten Investitionsmöglichkeiten.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-blue-400/10 rounded-full p-2">
                      <TrendingUpIcon className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-100">Nachweisliche Erfolge</h4>
                    <p className="mt-2 text-gray-400">Unsere Performance-Historie zeigt konstant überdurchschnittliche Renditen bei kontrolliertem Risiko.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <img 
                className="rounded-lg shadow-xl"
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Team Meeting"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Markets Section */}
      {renderMarketsSection()}

      {/* Testimonials Section */}
      <div className="py-24 bg-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Was unsere Kunden sagen
            </h2>
            <p className="mt-4 text-xl text-gray-400">
              Erfolgsgeschichten unserer zufriedenen Investoren
            </p>
          </div>

          <div className="testimonials-container relative">
            {/* First Row - Moving Left */}
            <div className="flex space-x-6 mb-6 animate-scroll-left">
              {[
                {
                  name: "Michael Schmidt",
                  role: "Privatier",
                  image: "https://i.pravatar.cc/150?img=1",
                  text: "Die professionelle Beratung und die transparente Kommunikation haben mich überzeugt. Meine Investitionen entwickeln sich hervorragend."
                },
                {
                  name: "Sarah Weber",
                  role: "Unternehmerin",
                  image: "https://i.pravatar.cc/150?img=2",
                  text: "Endlich ein Partner, der meine finanziellen Ziele wirklich versteht. Die maßgeschneiderten Lösungen haben meine Erwartungen übertroffen."
                },
                {
                  name: "Thomas Müller",
                  role: "Geschäftsführer",
                  image: "https://i.pravatar.cc/150?img=3",
                  text: "Die Expertise im Bereich der globalen Märkte ist beeindruckend. Meine Portfolio-Performance spricht für sich."
                },
                // Duplicate cards for seamless loop
                {
                  name: "Michael Schmidt",
                  role: "Privatier",
                  image: "https://i.pravatar.cc/150?img=1",
                  text: "Die professionelle Beratung und die transparente Kommunikation haben mich überzeugt. Meine Investitionen entwickeln sich hervorragend."
                },
                {
                  name: "Sarah Weber",
                  role: "Unternehmerin",
                  image: "https://i.pravatar.cc/150?img=2",
                  text: "Endlich ein Partner, der meine finanziellen Ziele wirklich versteht. Die maßgeschneiderten Lösungen haben meine Erwartungen übertroffen."
                },
                {
                  name: "Thomas Müller",
                  role: "Geschäftsführer",
                  image: "https://i.pravatar.cc/150?img=3",
                  text: "Die Expertise im Bereich der globalen Märkte ist beeindruckend. Meine Portfolio-Performance spricht für sich."
                }
              ].map((testimonial, index) => (
                <div key={index} className="flex-shrink-0 w-[400px] bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-100">{testimonial.name}</h4>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-300">{testimonial.text}</p>
                </div>
              ))}
            </div>

            {/* Second Row - Moving Right */}
            <div className="flex space-x-6 animate-scroll-right">
              {[
                {
                  name: "Laura Fischer",
                  role: "Finanzberaterin",
                  image: "https://i.pravatar.cc/150?img=4",
                  text: "Als Finanzexpertin schätze ich besonders die fundierte Marktanalyse und die strategische Ausrichtung."
                },
                {
                  name: "David Wagner",
                  role: "Rentner",
                  image: "https://i.pravatar.cc/150?img=5",
                  text: "Die sichere und stabile Anlagestrategie gibt mir die Sicherheit, die ich für meine Altersvorsorge benötige."
                },
                {
                  name: "Julia Becker",
                  role: "Ärztin",
                  image: "https://i.pravatar.cc/150?img=6",
                  text: "Die flexible Anpassung an meine Bedürfnisse und die regelmäßigen Updates sind genau das, was ich gesucht habe."
                },
                // Duplicate cards for seamless loop
                {
                  name: "Laura Fischer",
                  role: "Finanzberaterin",
                  image: "https://i.pravatar.cc/150?img=4",
                  text: "Als Finanzexpertin schätze ich besonders die fundierte Marktanalyse und die strategische Ausrichtung."
                },
                {
                  name: "David Wagner",
                  role: "Rentner",
                  image: "https://i.pravatar.cc/150?img=5",
                  text: "Die sichere und stabile Anlagestrategie gibt mir die Sicherheit, die ich für meine Altersvorsorge benötige."
                },
                {
                  name: "Julia Becker",
                  role: "Ärztin",
                  image: "https://i.pravatar.cc/150?img=6",
                  text: "Die flexible Anpassung an meine Bedürfnisse und die regelmäßigen Updates sind genau das, was ich gesucht habe."
                }
              ].map((testimonial, index) => (
                <div key={index} className="flex-shrink-0 w-[400px] bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-100">{testimonial.name}</h4>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-300">{testimonial.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900/95 p-8 rounded-2xl border border-gray-700/50 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {selectedPlan} Plan
              </h3>
              <p className="text-gray-400 mt-2">Geben Sie Ihre E-Mail-Adresse ein, um fortzufahren</p>
            </div>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ihre E-Mail-Adresse"
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                  required
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-colors"
                >
                  Abonnieren
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Enhanced Footer with Background Effect */}
      <footer className="relative bg-gray-900 border-t border-gray-800 overflow-hidden">
        <div className="lightning opacity-5"></div>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold text-gray-100">Capital Ventures</span>
              </div>
              <p className="mt-4 text-gray-400">Ihre vertrauenswürdige Anlagegesellschaft für eine sichere finanzielle Zukunft.</p>
              <div className="mt-6 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-400"><FacebookIcon className="h-6 w-6" /></a>
                <a href="#" className="text-gray-400 hover:text-blue-400"><TwitterIcon className="h-6 w-6" /></a>
                <a href="#" className="text-gray-400 hover:text-blue-400"><InstagramIcon className="h-6 w-6" /></a>
                <a href="#" className="text-gray-400 hover:text-blue-400"><LinkedInIcon className="h-6 w-6" /></a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-100 mb-4">Dienstleistungen</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-blue-400">Vermögensverwaltung</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400">Altersvorsorge</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400">Investmentberatung</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400">Portfolioanalyse</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-100 mb-4">Rechtliches</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-blue-400">Impressum</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400">Datenschutz</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400">AGB</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400">Risikohinweise</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-100 mb-4">Kontakt</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-400">
                  <LocationOnIcon className="h-5 w-5 mr-2" />
                  Finanzdistrikt 123, 60311 Frankfurt
                </li>
                <li className="flex items-center text-gray-400">
                  <PhoneIcon className="h-5 w-5 mr-2" />
                  +49 (555) 123-4567
                </li>
                <li className="flex items-center text-gray-400">
                  <EmailIcon className="h-5 w-5 mr-2" />
                  kontakt@capitalventures.de
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">© 2025 Capital Ventures. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>

      {/* Cookie Consent Bar */}
      {showCookieConsent && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800/95 backdrop-blur-sm border-t border-gray-700/50 p-4 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex-1 mr-4">
              <p className="text-sm text-gray-300">
                Diese Web-App verwendet nur technisch notwendige Cookies für die Funktionalität. 
                Es werden keine Nutzungsdaten gesammelt oder gespeichert.
              </p>
            </div>
            <DarkButton onClick={() => setShowCookieConsent(false)}>
              <span>Akzeptieren</span>
              <ArrowUpwardIcon className="ml-2" />
            </DarkButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;