'use client';

import React, { useEffect } from 'react';
import { ExternalLink, Tag } from 'lucide-react';

interface AdBannerProps {
  type?: 'banner' | 'card';
  adClient?: string; // Google AdSense Publisher ID (e.g., 'ca-pub-XXXXXXXXXXXXXXXX')
  adSlot?: string;   // Google AdSense Slot ID
}

export default function AdBanner({
  type = 'banner',
  adClient = '',
  adSlot = '',
}: AdBannerProps) {
  useEffect(() => {
    // Google AdSense Script Push
    if (adClient && adSlot) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense Error:', err);
      }
    }
  }, [adClient, adSlot]);

  // গুগল এডসেন্স স্লট ও ক্লায়েন্ট আইডি থাকলে সরাসরি Google Ad রেন্ডার হবে
  if (adClient && adSlot) {
    return (
      <div className="w-full text-center overflow-hidden my-4 bg-gray-50 rounded-xl p-2 border">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    );
  }

  // এডসেন্স আইডি না দেওয়া পর্যন্ত কাস্টম স্পন্সরড ব্যানার (Fallback Banner)
  if (type === 'card') {
    return (
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <img
            src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500&auto=format&fit=crop&q=60"
            alt="Sponsored Ad"
            className="w-16 h-16 object-cover rounded-xl border border-amber-200"
          />
          <div>
            <span className="inline-flex items-center gap-1 bg-amber-200 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-1">
              <Tag className="w-3 h-3" /> Sponsored Ad
            </span>
            <h4 className="text-sm font-bold text-gray-900">জরুরি ভ্রমণের জন্য প্রাইভেট কার / মাইক্রোবাস চাই?</h4>
            <p className="text-xs text-gray-600 line-clamp-1 mt-0.5">বিশ্বস্ত ড্রাইভার ও কম ভাড়ায় ঢাকা এবং সারা বাংলাদেশে বুকিং করুন।</p>
          </div>
        </div>

        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto text-center bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition duration-200 flex items-center justify-center gap-1 shadow-sm whitespace-nowrap"
        >
          অফার দেখুন <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-900 text-white p-4 rounded-2xl shadow-md border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="bg-amber-400 text-slate-900 font-extrabold text-[10px] px-2 py-1 rounded tracking-widest uppercase">
          AD
        </span>
        <div>
          <h3 className="text-sm font-bold text-slate-100">ঢাকার অভ্যন্তরীণ যেকোনো পার্সেল বা বাইক রাইড বুক করুন সহজে</h3>
          <p className="text-xs text-slate-400">দ্রুত ও নিরাপদ ডেলিভারির জন্য আজই অ্যাপ টি ডাউনলোড করুন।</p>
        </div>
      </div>

      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition duration-200 flex items-center justify-center gap-1 shrink-0"
      >
        ডাউনলোড <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
}