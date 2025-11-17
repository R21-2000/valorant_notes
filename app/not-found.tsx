//535240192 - Rakhafian Anargya Firdaus 

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mt-5 text-center">
      <div className="card p-5 shadow-sm border-0">
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <h2>Halaman Tidak Ditemukan</h2>
        <p className="lead">
          Maaf, halaman yang kamu cari sepertinya tidak ada.
        </p>
        <div className="mt-4">
          <Link href="/" className="btn btn-primary btn-lg">
            Kembali ke Home
          </Link>
        </div>
      </div>
    </div>
  );
}