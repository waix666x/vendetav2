import React, { useState, useEffect } from 'react';
import { BarChart3, Shield, Globe2, TrendingUp, ArrowRight, Phone, Mail, MapPin, Check, Bitcoin, Wallet, DollarSign, Award, Facebook, Twitter, Instagram, Linkedin as LinkedIn, ArrowUp, ArrowDown, Star, ThumbsUp, Heart, Sparkles, Trophy, Target, Zap } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './phone-input.css';
import tradingAnimation from './assets/JtBZm3Getg3dqxK0zP.webp';

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

function App() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    honeypot: ''
  });
  const [phoneError, setPhoneError] = useState('');

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
              <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transform hover:scale-105 transition-all shadow-lg hover:shadow-blue-500/25">
                Loslegen
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Lightning Effect */}
      <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 pt-16 pb-32 overflow-hidden">
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
            </div>

            {/* Right Column - Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <div className="bg-gray-800/80 backdrop-blur-xl p-8 rounded-2xl shadow-[0_20px_50px_rgba(59,_130,_246,_0.3)] border border-gray-700">
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
                            width: '84%',
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
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                    >
                      Jetzt Investieren
                      <ArrowRight className="ml-2 h-6 w-6 animate-pulse" />
                    </button>
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
        </div>

        {/* Sliding Promotion Text */}
        <div className="relative mt-20 overflow-hidden bg-gray-800/50 py-8">
          <div className="sliding-text text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Investieren Sie heute in Ihre Zukunft - Wachsen Sie mit uns über Ihre Grenzen hinaus
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div id="services" className="py-24 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-100">Unsere Dienstleistungen</h2>
            <p className="mt-4 text-lg text-gray-400">Umfassende Investitionslösungen für jeden Bedarf</p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700">
              <div className="bg-blue-400/10 rounded-full w-12 h-12 flex items-center justify-center">
                <Globe2 className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-100">Globale Investitionen</h3>
              <p className="mt-2 text-gray-400">Zugang zu weltweiten Anlagemöglichkeiten mit unseren globalen Portfoliostrategien.</p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700">
              <div className="bg-blue-400/10 rounded-full w-12 h-12 flex items-center justify-center">
                <Shield className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-100">Vermögensschutz</h3>
              <p className="mt-2 text-gray-400">Sichern Sie Ihr Vermögen mit unseren umfassenden Risikomanagement-Lösungen.</p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700">
              <div className="bg-blue-400/10 rounded-full w-12 h-12 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-100">Wachstumsstrategie</h3>
              <p className="mt-2 text-gray-400">Maximieren Sie Ihre Rendite mit unseren datengesteuerten Anlagestrategien.</p>
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
              <div className="relative rounded-2xl overflow-hidden w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-gradient-x rounded-2xl">
                  <img 
                    src={tradingAnimation}
                    alt="Live Trading Animation"
                    className="w-full h-full object-contain"
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
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Basierend auf 10,000+ Trades</span>
                </div>
              </div>

              {/* Safety Features */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-400/10 rounded-full p-3">
                    <Shield className="h-6 w-6 text-blue-400" />
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
                    <ArrowRight className="h-5 w-5 text-green-400" />
                    <span className="text-gray-300">Durchschnittlicher Gewinn</span>
                  </div>
                  <div className="text-2xl font-bold text-green-400 mt-2">+24.5%</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-blue-400" />
                    <span className="text-gray-300">Erfolgsrate</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-400 mt-2">92%</div>
                </div>
              </div>

              {/* CTA Button */}
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25">
                Jetzt Trading Starten
                <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </button>
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
                    <Award className="h-6 w-6 text-blue-400" />
                    <span className="ml-2 text-sm font-bold">20+ Jahre</span>
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
                      <Shield className="h-6 w-6 text-blue-400" />
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
                      <Globe2 className="h-6 w-6 text-blue-400" />
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
                      <TrendingUp className="h-6 w-6 text-blue-400" />
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
                <a href="#" className="text-gray-400 hover:text-blue-400"><Facebook className="h-6 w-6" /></a>
                <a href="#" className="text-gray-400 hover:text-blue-400"><Twitter className="h-6 w-6" /></a>
                <a href="#" className="text-gray-400 hover:text-blue-400"><Instagram className="h-6 w-6" /></a>
                <a href="#" className="text-gray-400 hover:text-blue-400"><LinkedIn className="h-6 w-6" /></a>
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
                  <MapPin className="h-5 w-5 mr-2" />
                  Finanzdistrikt 123, 60311 Frankfurt
                </li>
                <li className="flex items-center text-gray-400">
                  <Phone className="h-5 w-5 mr-2" />
                  +49 (555) 123-4567
                </li>
                <li className="flex items-center text-gray-400">
                  <Mail className="h-5 w-5 mr-2" />
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
    </div>
  );
}

export default App;