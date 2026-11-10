import { NextResponse } from 'next/server';
import { busesData } from '@/data/buses';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: busesData,
  });
}