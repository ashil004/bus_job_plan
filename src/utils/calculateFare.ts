// দুটি স্টপেজের মধ্যকার দূরত্ব বা স্টপ কাউন্ট হিসাব করে ভাড়া বের করার ফাংশন
export function calculateTripFare(
  stoppings: string[],
  start: string,
  end: string,
  baseFare: number,
  perKmFare: number
): { fare: number; totalStops: number } {
  const startIndex = stoppings.indexOf(start);
  const endIndex = stoppings.indexOf(end);

  if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
    return { fare: baseFare, totalStops: 0 };
  }

  // স্টপ সংখ্যার ওপর ভিত্তি করে আনুমানিক দূরত্ব বা ভাড়া হিসাব (প্রতি স্টপ ১.৫ কিমি ধরে)
  const totalStops = endIndex - startIndex;
  const estimatedKm = totalStops * 2.5; // প্রতি স্টপ গড়ে ২.৫ কিমি ধরে ধরা হলো
  
  let calculatedFare = baseFare + estimatedKm * perKmFare;
  
  // সরকারি সর্বনিম্ন ভাড়া বা বেস ফেয়ার নিশ্চিত করা
  if (calculatedFare < baseFare) {
    calculatedFare = baseFare;
  }

  return {
    fare: Math.round(calculatedFare),
    totalStops,
  };
}