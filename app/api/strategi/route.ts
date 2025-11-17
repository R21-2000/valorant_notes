//535240192 - Rakhafian Anargya Firdaus 
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const strategies = await prisma.strategy.findMany({
      orderBy: { createdAt: 'desc' }, 
    });
    return NextResponse.json(strategies);
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal mengambil data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
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