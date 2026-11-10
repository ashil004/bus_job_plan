// src/data/exams.ts
import { ExamData } from '@/types/bus';

export const upcomingExamsData: ExamData[] = [
  {
    id: 'senior-officer-2026',
    title: 'সিনিয়র অফিসার (সাধারণ) – প্রিলিমিনারি (MCQ)',
    organization: 'সিকিউরিটি প্রিন্টিং কর্পোরেশন / বাংলাদেশ ব্যাংক',
    date: '১৩ নভেম্বর ২০২৬, শুক্রবার',
    time: 'বিকাল ৩:০০ - ৪:০০ (১০০ নম্বর, ১ ঘণ্টা)',
    reportingTime: 'দুপুর ২:০০ টার মধ্যে কেন্দ্রে থাকতে হবে',
    centers: [
      {
        rollStart: 100000,
        rollEnd: 150000,
        centerName: 'কদমতলা পূর্ব বাসাবো স্কুল অ্যান্ড কলেজ',
        centerAddress: '28/3, Kadamtala, Basabo, Dhaka',
        nearestStop: 'বাসাবো',
        distanceKm: 14.5,
        googleMapUrl: 'https://maps.google.com/?q=Kadamtala+Purba+Basabo+School'
      },
      {
        rollStart: 150001,
        rollEnd: 200000,
        centerName: 'গভ. তিতুমীর কলেজ',
        centerAddress: 'AK Khandaker Road, Mohakhali, Dhaka',
        nearestStop: 'মহাখালী',
        distanceKm: 10.2,
        googleMapUrl: 'https://maps.google.com/?q=Titumir+College'
      }
    ]
  }
];