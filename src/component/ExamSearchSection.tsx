'use client';

import React, { useState } from 'react';
import { upcomingExamsData } from '@/data/exam';
import { busesData } from '@/data/buses';
import { ExamData, ExamCenterInfo } from '@/types/bus';
import { calculateTripFare } from '@/utils/calculateFare';
import { Search, MapPin, Bus as BusIcon, Navigation, ExternalLink, Calendar, Clock, AlertCircle } from 'lucide-react';

export default function ExamSearchSection() {
  const [selectedExam] = useState<ExamData>(upcomingExamsData[0]);
  const [userRoll, setUserRoll] = useState<string>('');
  const [userOrigin, setUserOrigin] = useState<string>('Gabtoli');
  const [matchedCenter, setMatchedCenter] = useState<ExamCenterInfo | null>(null);
  const [searched, setSearched] = useState<boolean>(false);

  const handleRollSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const rollNum = parseInt(userRoll, 10);
    
    if (isNaN(rollNum)) {
      setMatchedCenter(null);
      return;
    }

    const found = selectedExam.centers.find(
      (c) => rollNum >= c.rollStart && rollNum <= c.rollEnd
    );
    setMatchedCenter(found || null);
  };

  const availableBuses = matchedCenter
    ? busesData.filter((b) => {
        const startIdx = b.stoppings.indexOf(userOrigin);
        const endIdx = b.stoppings.indexOf(matchedCenter.nearestStop);
        return startIdx !== -1 && endIdx !== -1 && startIdx < endIdx;
      })
    : [];

  return (
    <div className="space-y-6">
      {/* 1. Exam Details Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <span className="bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs px-3 py-1 rounded-md font-bold flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {selectedExam.date}
          </span>
        </div>

        <h2 className="text-xl font-extrabold text-gray-900 tracking-tight leading-snug">
          {selectedExam.title}
        </h2>
        <p className="text-xs font-semibold text-gray-600">{selectedExam.organization}</p>
        
        {/* Info Grid - High Contrast Color Fix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-100 p-4 rounded-xl border border-slate-200">
          <div className="text-gray-900">
            <span className="font-bold text-slate-800">তারিখ ও সময়: </span>
            <span className="font-medium text-slate-900">{selectedExam.date} ({selectedExam.time})</span>
          </div>
          <div className="text-gray-900">
            <span className="font-bold text-slate-800">রিপোর্টিং: </span>
            <span className="font-medium text-slate-900">{selectedExam.reportingTime}</span>
          </div>
        </div>

        {/* 2. Roll Search Input Form */}
        <form onSubmit={handleRollSearch} className="space-y-3 pt-2">
          <label className="block text-xs font-extrabold text-gray-800 uppercase tracking-wider">
            আপনার রোল নম্বর ইনপুট দিন:
          </label>
          
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
            <input
              type="number"
              placeholder="যেমন: 125000"
              value={userRoll}
              onChange={(e) => setUserRoll(e.target.value)}
              className="sm:col-span-5 px-4 py-2.5 bg-white border-2 border-gray-300 rounded-xl text-sm font-bold text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              required
            />
            
            <select
              value={userOrigin}
              onChange={(e) => setUserOrigin(e.target.value)}
              className="sm:col-span-4 px-3 py-2.5 bg-white border-2 border-gray-300 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-600"
            >
              <option value="Gabtoli">আপনার এলাকা: গাবতলী</option>
              <option value="Savar">আপনার এলাকা: সাভার</option>
              <option value="Uttara">আপনার এলাকা: উত্তরা</option>
              <option value="Mirpur 10">আপনার এলাকা: মিরপুর ১০</option>
            </select>

            <button
              type="submit"
              className="sm:col-span-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-4 py-2.5 rounded-xl text-sm transition duration-150 flex items-center justify-center gap-1 shadow-sm"
            >
              <Search className="w-4 h-4 stroke-[3]" /> খুঁজুন
            </button>
          </div>
        </form>
      </div>

      {/* 3. Search Result & Seat Details */}
      {searched && (
        <>
          {!matchedCenter ? (
            <div className="bg-red-50 text-red-900 p-4 rounded-xl border border-red-300 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              দুঃখিত! এই রোল নম্বরের জন্য কোনো সিট প্ল্যান পাওয়া যায়নি। সঠিক রোল নম্বর দিন (যেমন: ১২৫০২০)।
            </div>
          ) : (
            <div className="space-y-6">
              {/* Exam Center Details Card */}
              <div className="bg-slate-950 text-white p-6 rounded-2xl space-y-3 shadow-md border border-slate-800">
                <div className="text-amber-400 text-xs font-black uppercase tracking-widest">
                  রোল {userRoll} — আপনার সিট পড়েছে
                </div>
                <h3 className="text-xl font-black text-white">{matchedCenter.centerName}</h3>
                <p className="text-xs text-slate-300 flex items-center gap-1.5 font-medium">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0" /> {matchedCenter.centerAddress}
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                    href={matchedCenter.googleMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl inline-flex items-center gap-1.5 transition shadow-sm"
                  >
                    Google Maps-এ খুলুন <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <div className="bg-slate-800 text-slate-200 text-xs px-3.5 py-2.5 rounded-xl font-semibold border border-slate-700">
                    নিকটতম স্টপেজ: <span className="font-bold text-amber-400">{matchedCenter.nearestStop}</span>
                  </div>
                </div>
              </div>

              {/* Transport Options Section */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                <h4 className="font-extrabold text-gray-900 text-base border-b pb-3 flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-blue-600" /> কীভাবে যাবেন ও কত খরচ হবে?
                </h4>

                {/* Option 1: Bus Transit */}
                <div className="space-y-3">
                  <h5 className="text-xs font-black text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                    <BusIcon className="w-4 h-4 text-emerald-600" /> বাসে (সবচেয়ে কম খরচে)
                  </h5>

                  {availableBuses.length === 0 ? (
                    <p className="text-xs font-medium text-gray-600 bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                      {userOrigin} থেকে {matchedCenter.nearestStop} সরাসরি কোনো বাস পাওয়া যায়নি।
                    </p>
                  ) : (
                    <div className="grid gap-3">
                      {availableBuses.map((bus) => {
                        const { fare } = calculateTripFare(
                          bus.stoppings,
                          userOrigin,
                          matchedCenter.nearestStop,
                          bus.baseFare,
                          bus.perKmFare
                        );
                        return (
                          <div key={bus.id} className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl flex items-center justify-between">
                            <div>
                              <h6 className="font-bold text-sm text-gray-900">{bus.name}</h6>
                              <p className="text-xs font-medium text-gray-700 mt-0.5">
                                {userOrigin} থেকে উঠে <span className="font-bold text-emerald-900">{matchedCenter.nearestStop}</span> নামুন
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-black text-emerald-800">৳ {fare}</div>
                              <div className="text-[10px] font-bold text-gray-500">বাস ভাড়া</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Option 2: CNG & Bike Fare Estimates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-amber-50 border border-amber-300 p-4 rounded-xl space-y-1">
                    <div className="text-xs font-extrabold text-amber-950">🛺 সিএনজি (চুক্তিতে)</div>
                    <div className="text-2xl font-black text-amber-900">
                      ৳ {Math.round(matchedCenter.distanceKm * 22)}-{Math.round(matchedCenter.distanceKm * 26)}
                    </div>
                    <div className="text-[10px] font-bold text-amber-800">দূরত্ব আনুমানিক {matchedCenter.distanceKm} কিমি</div>
                  </div>

                  <div className="bg-rose-50 border border-rose-300 p-4 rounded-xl space-y-1">
                    <div className="text-xs font-extrabold text-rose-950">🏍️ পাঠাও / উবার বাইক</div>
                    <div className="text-2xl font-black text-rose-900">
                      ৳ {Math.round(matchedCenter.distanceKm * 16)}-{Math.round(matchedCenter.distanceKm * 20)}
                    </div>
                    <div className="text-[10px] font-bold text-rose-800">আনুমানিক অ্যাপ ভাড়া রেঞ্জ</div>
                  </div>
                </div>

              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}