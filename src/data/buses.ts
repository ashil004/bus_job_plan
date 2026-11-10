import { Bus } from '@/types/bus';

export const busesData: Bus[] = [
  {
    id: '1',
    name: 'Victor Paribahan',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&auto=format&fit=crop&q=60',
    startPoint: 'Savar',
    endPoint: 'Notun Bazar',
    // এখানে সাধারণ স্টপেজের পাশাপাশি পরীক্ষার্থীদের সুবিধার জন্য গুরুত্বপূর্ণ স্টপ/সেন্টার জোন রাখা হয়েছে
    stoppings: [
      'Savar', 
      'Gabtoli', 
      'Asadgate', 
      'Farmgate', 
      'Karwan Bazar', 
      'Shahbagh', // ঢাকা বিশ্ববিদ্যালয় (DU) বা বুয়েট সেন্টারের নিকটবর্তী
      'Gulshan 1', 
      'Notun Bazar'
    ],
    baseFare: 10,
    perKmFare: 2.45,
    isGovernmentApproved: true,
  },
  {
    id: '2',
    name: 'Bihanga Paribahan',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=500&auto=format&fit=crop&q=60',
    startPoint: 'Mirpur 14',
    endPoint: 'Motijheel',
    stoppings: [
      'Mirpur 14', 
      'Mirpur 10', 
      'Kazipara', 
      'Agargaon', 
      'Farmgate', 
      'Shahbagh', 
      'Pressclub', 
      'Motijheel'
    ],
    baseFare: 10,
    perKmFare: 2.45,
    isGovernmentApproved: true,
  }
];