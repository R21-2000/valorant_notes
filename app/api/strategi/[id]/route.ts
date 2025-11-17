//535240192 - Rakhafian Anargya Firdaus 
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const strategy = await prisma.strategy.findUnique({
      where: { id: params.id },
    });
    if (!strategy) {
      return NextResponse.json({ error: 'Strategi tidak ditemukan' }, { status: 404 });
    }
    return NextResponse.json(strategy);
  } catch (error) {
    console.error("GET [id] Error:", error); 
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Params) { 
  try {
    const body = await request.json();
    const updatedStrategy = await prisma.strategy.update({
      where: { id: params.id }, 
      data: {
        map: body.map,
        title: body.title,
        description: body.description,
      },
    });
    return NextResponse.json(updatedStrategy);
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: 'Gagal memperbarui data' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) { 
  try {
    await prisma.strategy.delete({
      where: { id: params.id }, 
    });
    return NextResponse.json({ message: 'Data berhasil dihapus' });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: 'Gagal menghapus data' }, { status: 500 });
  }
}