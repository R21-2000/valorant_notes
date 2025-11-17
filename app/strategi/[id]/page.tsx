//535240192 - Rakhafian Anargya Firdaus 
import { prisma } from '@/lib/prisma'; 
import Link from 'next/link';
import { notFound } from 'next/navigation'; 

interface Params {
  params: { id: string };
}

async function getStrategy(id: string) {
  const strategy = await prisma.strategy.findUnique({
    where: { id: id },
  });

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