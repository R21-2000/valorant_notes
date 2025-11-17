// /app/strategi/edit/[id]/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditStrategiPage() {
  const [mapInput, setMapInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [descInput, setDescInput] = useState('');
  const [loading, setLoading] = useState(true);

  const params = useParams(); // Ambil [id] dari URL
  const router = useRouter(); // Untuk navigasi
  const id = params.id as string;

  // 1. Ambil data lama untuk ditampilkan di form
  useEffect(() => {
    if (id) {
      fetch(`/api/strategi/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setMapInput(data.map);
          setTitleInput(data.title);
          setDescInput(data.description || ''); // Handle jika null
          setLoading(false);
        })
        .catch(() => alert('Gagal ambil data'));
    }
  }, [id]);

  // 2. Kirim data yang sudah diubah (PUT)
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mapInput || !titleInput) {
      alert('Map dan Judul tidak boleh kosong');
      return;
    }

    try {
      const res = await fetch(`/api/strategi/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          map: mapInput,
          title: titleInput,
          description: descInput,
        }),
      });
      if (!res.ok) throw new Error('Gagal update');

      alert('Strategi berhasil di-update!');
      router.push('/strategi'); // Balik ke halaman list
    } catch (error) {
      alert('Gagal update strategi');
    }
  };

  if (loading) return <p className="container mt-5">Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Edit Strategi</h5>
              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label htmlFor="map" className="form-label">Nama Map</label>
                  <input type="text" className="form-control" id="map" value={mapInput} onChange={(e) => setMapInput(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Judul Strategi</label>
                  <input type="text" className="form-control" id="title" value={titleInput} onChange={(e) => setTitleInput(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="desc" className="form-label">Deskripsi</label>
                  <textarea className="form-control" id="desc" rows={3} value={descInput} onChange={(e) => setDescInput(e.target.value)}></textarea>
                </div>
                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-primary">
                    Simpan Perubahan
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => router.back()}>
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}