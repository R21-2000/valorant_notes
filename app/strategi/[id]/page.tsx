// /app/strategi/[id]/page.tsx
//535240192 - Rakhafian Anargya Firdaus (MODIFIED to Server Component)

// HAPUS "use client", useState, useEffect, useParams

import { prisma } from '@/lib/prisma'; // Ambil data langsung dari DB
import Link from 'next/link';
import { notFound } from 'next/navigation'; // Untuk 404

interface Params {
  params: { id: string };
}

// Fungsi ambil data langsung dari database
async function getStrategy(id: string) {
  const strategy = await prisma.strategy.findUnique({
    where: { id: id },
  });

  // Jika data tidak ada, lempar ke halaman 404 (Soal 5.a)
  if (!strategy) {
    notFound();
  }
  return strategy;
}

export default async function StrategiDetailPage({ params }: Params) {
  const strategy = await getStrategy(params.id);

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          Map: <strong>{strategy.map}</strong>
        </div>
        <div className="card-body">
          <h2 className="card-title">{strategy.title}</h2>
          <p className="card-text">
            {strategy.description || <em>Deskripsinya gaada.</em>}
          </p>

          {/* Tambah tombol Edit juga di sini */}
          <div className="d-flex gap-2">
            <Link href="/strategi" className="btn btn-secondary">
              Kembali ke List
            </Link>
            <Link href={`/strategi/edit/${strategy.id}`} className="btn btn-warning">
              Edit
            </Link>
          </div>
        </div>
        <div className="card-footer text-muted">
          Dibuat: {strategy.createdAt.toLocaleString()}
        </div>
      </div>
    </div>
  );
}