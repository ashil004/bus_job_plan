'use client';

import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchFormProps {
  onSearch: (start: string, end: string) => void;
  locations: string[];
}

export default function SearchForm({ onSearch, locations }: SearchFormProps) {
  const [startPoint, setStartPoint] = useState('');
  const [endPoint, setEndPoint] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startPoint || !endPoint) {
      alert('দয়া করে শুরুর স্থান এবং গন্তব্য উভয়ই সিলেক্ট করুন!');
      return;
    }
    onSearch(startPoint, endPoint);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Search className="w-5 h-5 text-blue-600" />
        বাস রুট এবং ভাড়া খুঁজুন
      </h2>

      <div className="space-y-4">
        {/* Start Point */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <MapPin className="w-4 h-4 text-green-600" /> শুরুর স্থান (Start Point)
          </label>
          <select
            value={startPoint}
            onChange={(e) => setStartPoint(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 text-gray-800"
          >
            <option value="">শুরুর স্থান সিলেক্ট করুন</option>
            {locations.map((loc) => (
              <option key={`start-${loc}`} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* End Point */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <MapPin className="w-4 h-4 text-red-600" /> গন্তব্য (End Point)
          </label>
          <select
            value={endPoint}
            onChange={(e) => setEndPoint(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 text-gray-800"
          >
            <option value="">গন্তব্য সিলেক্ট করুন</option>
            {locations.map((loc) => (
              <option key={`end-${loc}`} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-md flex items-center justify-center gap-2"
        >
          <Search className="w-5 h-5" /> বাস খুঁজুন (Search Bus)
        </button>
      </div>
    </form>
  );
}