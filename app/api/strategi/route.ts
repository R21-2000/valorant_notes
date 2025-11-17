// /app/api/strategi/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// --- GET (Read All) ---
export async function GET() {
  try {
    const strategies = await prisma.strategy.findMany({
      orderBy: { createdAt: 'desc' }, // Tampilkan yang terbaru di atas
    });
    return NextResponse.json(strategies);
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal mengambil data' },
      { status: 500 }
    );
  }
}

// --- POST (Create) ---
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validasi sederhana
    if (!body.map || !body.title) {
        return NextResponse.json({ error: 'Map dan Title wajib diisi'}, { status: 400 });
    }

    const newStrategy = await prisma.strategy.create({
      data: {
        map: body.map,
        title: body.title,
        description: body.description,
      },
    });
    return NextResponse.json(newStrategy, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal membuat data' }, { status: 500 });
  }
}