//535240192 - Rakhafian Anargya Firdaus
import Link from 'next/link';

export default function Home() {
  return (
    <main className="container mt-5">
      <div className="card p-4">
        <h1 className="card-title">Quiz Praktikum React</h1>
        <p className="card-text">
          <strong>Nama:</strong> Rakhafian Anargya Firdaus
        </p>
        <p className="card-text">
          <strong>NIM:</strong> 535240192
        </p>
        <p className="card-text">
          <strong>Topik Project:</strong> Note strat Valorant
        </p>
        <Link href="/strategi" className="btn btn-primary mt-3">
          Lanjutt
        </Link>
      </div>
    </main>
  );
}