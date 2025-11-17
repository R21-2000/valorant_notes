//535240192 - Rakhafian Anargya Firdaus 
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Strategy {
  id: string;
  map: string;
  title: string;
  description: string | null; 
}

export default function StrategiPage() {
  const [strategiList, setStrategiList] = useState<Strategy[]>([]);
  const [mapInput, setMapInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [descInput, setDescInput] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchStrategi();
  }, []);

  const fetchStrategi = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/strategi'); 
      const data = await res.json();
      setStrategiList(data);
    } catch (error) {
      alert('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };
  const handleAddStrategy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mapInput || !titleInput) {
      alert('Map sama Judul harus ada, yakali kosong :I');
      return;
    }

    try {
      const res = await fetch('/api/strategi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          map: mapInput,
          title: titleInput,
          description: descInput,
        }),
      });

      if (!res.ok) throw new Error('Gagal menambah');

      const newStrategy = await res.json();
      setStrategiList([newStrategy, ...strategiList]);

      // Reset form
      setMapInput('');
      setTitleInput('');
      setDescInput('');
    } catch (error) {
      alert('Gagal menambah strategi baru');
    }
  };
  const handleDelete = async (id: string) => {
    if (!confirm('Yakin mau hapus strategi ini?')) return;

    try {
      const res = await fetch(`/api/strategi/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Gagal menghapus');

      // Filter list di UI
      setStrategiList(strategiList.filter(item => item.id !== id));
    } catch (error) {
      alert('Gagal menghapus strategi');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Tambah Strategi Baru</h5>
              <form onSubmit={handleAddStrategy}>
                <div className="mb-3">
                  <label htmlFor="map" className="form-label">Nama Map</label>
                  <input type="text" className="form-control" id="map" value={mapInput} onChange={(e) => setMapInput(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Judul Strategi</label>
                  <input type="text" className="form-control" id="title" value={titleInput} onChange={(e) => setTitleInput(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="desc" className="form-label">Deskripsi Strategi</label>
                  <textarea className="form-control" id="desc" rows={3} value={descInput} onChange={(e) => setDescInput(e.target.value)}></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">Tambah</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <h2>Daftar Strategi</h2>
          {loading ? (
            <p>Loading...</p>
          ) : strategiList.length === 0 ? (
            <p>Masih kosong sih.</p>
          ) : (
            <div className="list-group">
              {strategiList.map((item) => (
                <div key={item.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                  <Link href={`/strategi/${item.id}`} className="text-decoration-none text-dark w-100 me-3">
                    <div className="flex-fill">
                      <h6 className="mb-1">{item.title}</h6>
                      <small className="text-muted">{item.map}</small>
                    </div>
                  </Link>
                  <div className="d-flex gap-2">
                    <Link href={`/strategi/edit/${item.id}`} className="btn btn-warning btn-sm">
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}