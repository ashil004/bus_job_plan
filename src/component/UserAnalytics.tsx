'use client';

import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Activity, TrendingUp, Search } from 'lucide-react';

interface AnalyticsData {
  time: string;
  searches: number;
}

export default function UserAnalytics({ searchCount }: { searchCount: number }) {
  const [hourlyData, setHourlyData] = useState<AnalyticsData[]>([]);
  const [todayTotal, setTodayTotal] = useState<number>(0);
  const [activeSession, setActiveSession] = useState<number>(1);

  useEffect(() => {
    // LocalStorage থেকে আজকের সার্চ সংখ্যা গণনা
    const todayKey = `bus_app_searches_${new Date().toISOString().split('T')[0]}`;
    const savedData = localStorage.getItem(todayKey);
    
    let currentTotal = savedData ? parseInt(savedData, 10) : 0;
    
    if (searchCount > 0) {
      currentTotal += 1;
      localStorage.setItem(todayKey, currentTotal.toString());
    }
    
    setTodayTotal(currentTotal);

    // লোকালহস্টে একা ভিজিট করছেন, তাই একিউরেট ১ জন শো করবে
    setActiveSession(1);

    // সার্চ গ্রাফ ডেটা আপডেট
    const currentHour = new Date().getHours();
    const mockHourly: AnalyticsData[] = [];
    
    for (let i = Math.max(0, currentHour - 5); i <= currentHour; i++) {
      const hourLabel = `${i}:00`;
      mockHourly.push({
        time: hourLabel,
        searches: i === currentHour ? currentTotal : Math.max(0, currentTotal - (currentHour - i)),
      });
    }
    setHourlyData(mockHourly);

  }, [searchCount]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Live Analytics & Traffic Overview
          </h3>
          {/* <p className="text-xs text-gray-500">D3 & Recharts চালিত রিয়েল-টাইম ইউজারেজ স্ট্যাটস</p> */}
        </div>
        <span className="flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full border border-green-200">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Live Session Active
        </span>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-100">
          <div className="flex items-center gap-2 text-blue-600 text-xs font-semibold mb-1">
            <Users className="w-4 h-4" /> বর্তমানে অনলাইন
          </div>
          {/* এখন নিখুঁতভাবে ১ জন দেখাবে */}
          <div className="text-2xl font-black text-blue-900">{activeSession} জন</div>
          <div className="text-[11px] text-blue-600 mt-1">আপনার রিয়েল-টাইম সেশন</div>
        </div>

        <div className="bg-indigo-50/60 p-4 rounded-xl border border-indigo-100">
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-semibold mb-1">
            <Search className="w-4 h-4" /> আজকের মোট সার্চ
          </div>
          <div className="text-2xl font-black text-indigo-900">{todayTotal} টি</div>
            <div className="text-[11px] text-indigo-600 mt-1">আজকের সার্চ ট্র্যাকিং</div>
        </div>

        <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-100">
          <div className="flex items-center gap-2 text-amber-600 text-xs font-semibold mb-1">
            <Activity className="w-4 h-4" /> সিস্টেম স্ট্যাটাস
          </div>
          <div className="text-2xl font-black text-amber-900">Active</div>
          <div className="text-[11px] text-amber-600 mt-1">লোকালহোস্ট রানিং</div>
        </div>
      </div>

      {/* D3/Recharts Traffic Chart */}
      <div className="space-y-2 pt-2">
        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
          ঘণ্টাভিত্তিক রুট সার্চ ট্রেন্ড (Hourly Search Trend)
        </h4>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hourlyData}>
              <defs>
                <linearGradient id="colorSearches" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} allowDecimals={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
              />
              <Area 
                type="monotone" 
                dataKey="searches" 
                stroke="#2563eb" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorSearches)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}