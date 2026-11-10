'use client';

import React, { useState, useEffect } from 'react';
import SearchForm from '../component/SearchForm';
import ExamSearchSection from '../component/ExamSearchSection';
import UserAnalytics from '../component/UserAnalytics';
import AdBanner from '../component/AdBanner';
import { busesData } from '@/data/buses';
import { Bus } from '@/types/bus';
import { calculateTripFare } from '@/utils/calculateFare';
import { 
  Bus as BusIcon, 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Calculator, 
  Flame, 
  PhoneCall, 
  ShieldAlert,
  GraduationCap,
  Search
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'bus' | 'exam'>('exam'); // জব পরীক্ষার্থীদের জন্য ডিফল্ট 'exam' ট্যাব রাখা হলো
  const [filteredBuses, setFilteredBuses] = useState<Bus[]>([]);
  const [searchParams, setSearchParams] = useState<{ start: string; end: string } | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchTriggerCount, setSearchTriggerCount] = useState<number>(0);
  
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
      setCurrentDate(now.toLocaleDateString());
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const allLocations = Array.from(
    new Set(busesData.flatMap((bus) => bus.stoppings))
  );

  const handleSearch = (start: string, end: string) => {
    setHasSearched(true);
    setSearchParams({ start, end });
    setSearchTriggerCount((prev) => prev + 1);

    const results = busesData.filter((bus) => {
      const startIndex = bus.stoppings.indexOf(start);
      const endIndex = bus.stoppings.indexOf(end);
      return startIndex !== -1 && endIndex !== -1 && startIndex < endIndex;
    });

    setFilteredBuses(results);
  };

  const quickSearch = (start: string, end: string) => {
    setActiveTab('bus');
    handleSearch(start, end);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center space-y-2 mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Dhaka Job Exam Route & Bus Fare Finder
        </h1>
        <p className="text-gray-600">
          পরীক্ষার রোল দিয়ে আপনার সেন্টার, যাতায়াত খরচ এবং সঠিক বাস রুট জেনে নিন এক ক্লিকে।
        </p>
        
        <div className="flex justify-center items-center gap-4 text-sm text-gray-500 pt-2" suppressHydrationWarning>
          <span className="flex items-center gap-1 font-medium text-blue-600">
            <Clock className="w-4 h-4" /> {currentTime || 'Loading...'}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" /> {currentDate || 'Loading...'}
          </span>
        </div>

        {/* Navigation Tabs (Exam vs Bus Route) */}
        <div className="flex justify-center gap-2 pt-4">
          <button
            onClick={() => setActiveTab('exam')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 ${
              activeTab === 'exam' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-gray-700 hover:bg-gray-100 border'
            }`}
          >
            <GraduationCap className="w-4 h-4" /> জব এক্সাম সেন্টার ও রুট ফাইন্ডার
          </button>
          <button
            onClick={() => setActiveTab('bus')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 ${
              activeTab === 'bus' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-gray-700 hover:bg-gray-100 border'
            }`}
          >
            <Search className="w-4 h-4" /> সাধারণ বাস ও ভাড়া ক্যালকুলেটর
          </button>
        </div>
      </div>

      {/* Main 3-Column Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ================= LEFT SIDEBAR (3 Cols) ================= */}
        <aside className="lg:col-span-3 space-y-6 order-2 lg:order-1">
          {/* Popular Routes */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2 border-b pb-3">
              <Flame className="w-4 h-4 text-orange-500" /> জনপ্রিয় রুটসমূহ (Quick Search)
            </h3>
            <div className="space-y-2 text-xs">
              <button 
                onClick={() => quickSearch('Uttara', 'Motijheel')}
                className="w-full text-left p-2.5 rounded-xl bg-gray-50 hover:bg-blue-50 hover:text-blue-600 transition flex items-center justify-between border font-medium text-gray-700"
              >
                <span>Uttara ➔ Motijheel</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => quickSearch('Gabtoli', 'Kazipara')}
                className="w-full text-left p-2.5 rounded-xl bg-gray-50 hover:bg-blue-50 hover:text-blue-600 transition flex items-center justify-between border font-medium text-gray-700"
              >
                <span>Gabtoli ➔ Kazipara</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => quickSearch('Savar', 'Notun Bazar')}
                className="w-full text-left p-2.5 rounded-xl bg-gray-50 hover:bg-blue-50 hover:text-blue-600 transition flex items-center justify-between border font-medium text-gray-700"
              >
                <span>Savar ➔ Notun Bazar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => quickSearch('Mirpur 10', 'Jatrabari')}
                className="w-full text-left p-2.5 rounded-xl bg-gray-50 hover:bg-blue-50 hover:text-blue-600 transition flex items-center justify-between border font-medium text-gray-700"
              >
                <span>Mirpur 10 ➔ Jatrabari</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Emergency Helpline Box */}
          <div className="bg-gradient-to-br from-red-50 to-rose-50 p-5 rounded-2xl border border-red-100 shadow-sm space-y-3">
            <h3 className="font-bold text-red-900 text-sm flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-600" /> জরুরি সেবা হেল্পলাইন
            </h3>
            <div className="space-y-2 text-xs text-red-800">
              <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-red-100">
                <span>জাতীয় জরুরি সেবা</span>
                <span className="font-bold text-red-600 flex items-center gap-1">
                  <PhoneCall className="w-3 h-3" /> ৯৯৯
                </span>
              </div>
              <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-red-100">
                <span>বিআরটিএ কমপ্লেন নম্বর</span>
                <span className="font-bold text-red-600 flex items-center gap-1">
                  <PhoneCall className="w-3 h-3" /> ১৬১০৭
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* ================= CENTER CONTENT (6 Cols) ================= */}
        <section className="lg:col-span-6 space-y-6 order-1 lg:order-2">
          
          {/* ট্যাব অনুযায়ী কম্পোনেন্ট রেন্ডার হবে */}
          {activeTab === 'exam' ? (
            <ExamSearchSection />
          ) : (
            <div className="space-y-6">
              <SearchForm onSearch={handleSearch} locations={allLocations} />

              {/* Results Section */}
              {hasSearched && searchParams && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    রুট: {searchParams.start} <ArrowRight className="w-4 h-4 inline" /> {searchParams.end} 
                    <span className="text-sm font-normal text-gray-500">({filteredBuses.length}টি বাস পাওয়া গেছে)</span>
                  </h2>

                  {filteredBuses.length === 0 ? (
                    <div className="space-y-4">
                      <div className="bg-white p-6 rounded-xl text-center text-gray-500 shadow-sm border">
                        দুঃখিত! এই রুটে সরাসরি কোনো বাস পাওয়া যায়নি। অন্য স্টপেজ দিয়ে চেষ্টা করুন।
                      </div>
                      <AdBanner type="card" />
                    </div>
                  ) : (
                    <div className="grid gap-6">
                      {filteredBuses.map((bus, index) => {
                        const { fare, totalStops } = calculateTripFare(
                          bus.stoppings,
                          searchParams.start,
                          searchParams.end,
                          bus.baseFare,
                          bus.perKmFare
                        );

                        return (
                          <React.Fragment key={bus.id}>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
                              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div className="flex items-center gap-4">
                                  <img 
                                    src={bus.image} 
                                    alt={bus.name} 
                                    className="w-20 h-20 object-cover rounded-xl border shadow-sm" 
                                  />
                                  <div>
                                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                      <BusIcon className="w-5 h-5 text-blue-600" />
                                      {bus.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-0.5">
                                      মূল রুট: <span className="font-medium">{bus.startPoint} ➔ {bus.endPoint}</span>
                                    </p>
                                    {bus.isGovernmentApproved && (
                                      <span className="inline-block bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-md font-medium mt-1 border border-green-200">
                                        ✔ সরকারি অনুমোদিত ভাড়া রেট
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-100 px-5 py-3 rounded-xl text-right w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end">
                                  <div className="text-xs text-blue-600 font-semibold flex items-center gap-1">
                                    <Calculator className="w-3.5 h-3.5" /> আনুমানিক ভাড়া
                                  </div>
                                  <div className="text-2xl font-black text-blue-700">৳ {fare}</div>
                                  <div className="text-[11px] text-gray-500">মোট স্টপ: {totalStops}টি</div>
                                </div>
                              </div>

                              <div className="border-t pt-3 mt-1">
                                <p className="text-xs font-semibold text-gray-500 mb-2">বাসের পুরো স্টপেজ রুট:</p>
                                <div className="flex flex-wrap items-center gap-1 text-xs text-gray-700">
                                  {bus.stoppings.map((stop, idx) => {
                                    const isCurrentTrip = 
                                      idx >= bus.stoppings.indexOf(searchParams.start) && 
                                      idx <= bus.stoppings.indexOf(searchParams.end);

                                    return (
                                      <React.Fragment key={stop}>
                                        <span className={`px-2 py-1 rounded-md ${isCurrentTrip ? 'bg-blue-600 text-white font-bold' : 'bg-gray-100 text-gray-600'}`}>
                                          {stop}
                                        </span>
                                        {idx < bus.stoppings.length - 1 && <span className="text-gray-400">→</span>}
                                      </React.Fragment>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>

                            {(index + 1) % 2 === 0 && <AdBanner type="card" />}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Top Banner Ad */}
          <AdBanner type="banner" />

          {/* Analytics Dashboard */}
          <UserAnalytics searchCount={searchTriggerCount} />
        </section>

        {/* ================= RIGHT SIDEBAR (3 Cols) ================= */}
        <aside className="lg:col-span-3 space-y-6 order-3">
          {/* Vertical Ad Placement */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm text-center space-y-3">
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block">
              Sponsored Sidebar Ad
            </span>
            <AdBanner type="card" />
          </div>

          {/* Dhaka Bus Tips / Travel Guideline */}
          <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl space-y-3">
            <h3 className="font-bold text-white text-sm">💡 পরীক্ষার্থীদের জরুরি টিপস</h3>
            <ul className="text-xs space-y-2 list-disc list-inside text-slate-300">
              <li>পরীক্ষার দিন নির্ধারিত সময়ের অন্তত ১ ঘণ্টা আগে কেন্দ্রে উপস্থিত হন।</li>
              <li>পিক আওয়ারে জ্যাম এড়াতে মেট্রোরেল বা বিকল্প রুট বেছে নিন।</li>
              <li>ভাড়া নিয়ে বিতর্ক এড়াতে সরকারি চার্ট বা অ্যাপের হিসাব মাথায় রাখুন।</li>
            </ul>
          </div>
        </aside>

      </div>
    </main>
  );
}