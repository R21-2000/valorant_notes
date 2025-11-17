//535240192 - Rakhafian Anargya Firdaus
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid'; 

// Nentuin tipe data dari si entitas strategi ini
interface Strategy {
  id: string;
  map: string;
  title: string;
  description: string;
}

export default function StrategiPage() {
  const [strategiList, setStrategiList] = useState<Strategy[]>([]);
  const [mapInput, setMapInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [descInput, setDescInput] = useState('');

  // --- (Load) ---
  // Pake useEffect buat load data dari localStorage pas komponen render
  useEffect(() => {
    const storedData = localStorage.getItem('valorantStrategies');
    if (storedData) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
      setStrategiList(JSON.parse(storedData));
    }
  }, []); // Array dependensi kosong, cuman jalan pas pertama kali di load

  // --- (Save) ---
  // pake useEffect lagi buat nyimpen data ke localStorage tiap kalo si entitas strategi update
  useEffect(() => {
    if (strategiList.length > 0) {
      localStorage.setItem('valorantStrategies', JSON.stringify(strategiList));
    }
  }, [strategiList]); // Refresh tiap kali si strategi di update

  // --- Tambah Strategi ---
  const handleAddStrategy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mapInput || !titleInput) {
      alert('Map sama Judul harus ada, yakali kosong :I');
      return;
    }
    
    const newStrategy: Strategy = {
      id: uuidv4(), // generate id unik buat tiap strategi
      map: mapInput,
      title: titleInput,
      description: descInput,
    };

    setStrategiList([...strategiList, newStrategy]);

    // Reset form buat input lagi
    setMapInput('');
    setTitleInput('');
    setDescInput('');
  };

  // --- Delete Strategi ---
  const handleDelete = (id: string) => {
    // Filter list buat nyisain item yang id nya beda dengan id yang mau diapus
    const updatedList = strategiList.filter(item => item.id !== id);
    setStrategiList(updatedList);
    
    // Habis apus di list, hapus juga di localStoragenya 
    if (updatedList.length === 0) {
        localStorage.removeItem('valorantStrategies');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Bootstrap Form */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Tambah Strategi Baru</h5>
              <form onSubmit={handleAddStrategy}>
                <div className="mb-3">
                  <label htmlFor="map" className="form-label">Nama Map</label>
                  <input
                    type="text"
                    className="form-control"
                    id="map"
                    value={mapInput}
                    onChange={(e) => setMapInput(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Judul Strategi</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="desc" className="form-label">Deskripsi Strategi, kalo bisa rinci banget</label>
                  <textarea
                    className="form-control"
                    id="desc"
                    rows={3}
                    value={descInput}
                    onChange={(e) => setDescInput(e.target.value)}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Tambah
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Nampilin List */}
        <div className="col-md-8">
          <h2>Daftar Strategi</h2>
          {strategiList.length === 0 ? (
            <p>Masih kosong sih.</p>
          ) : (
            <div className="list-group">
              {strategiList.map((item) => (
                <div key={item.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                  <Link href={`/strategi/${item.id}`} className="text-decoration-none text-dark w-100">
                    <div className="flex-fill">
                      <h6 className="mb-1">{item.title}</h6>
                      <small className="text-muted">{item.map}</small>
                    </div>
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}