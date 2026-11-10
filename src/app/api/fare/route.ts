import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const start = searchParams.get('start');
  const end = searchParams.get('end');

  return NextResponse.json({
    success: true,
    message: 'Fare calculation API endpoint',
    start,
    end,
  });
}