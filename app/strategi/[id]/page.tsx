//535240192 - Rakhafian Anargya Firdaus
"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Strategy {
  id: string;
  map: string;
  title: string;
  description: string;
}

export default function StrategiDetailPage() {
  const params = useParams(); 
  const id = params.id as string; 

  const [strategy, setStrategy] = useState<Strategy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Load data dari localStorage
      const storedData = localStorage.getItem('valorantStrategies');
      if (storedData) {
        const strategiList: Strategy[] = JSON.parse(storedData);
        // Cari strategi yang ID-nya cocok
        const foundStrategy = strategiList.find(item => item.id === id);
        
        if (foundStrategy) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
          setStrategy(foundStrategy);
        }
      }
      setLoading(false);
    }
  }, [id]); // Jalan setiap kali id nya berubah

  if (loading) {
    return <div className="container mt-5"><p>Loading...</p></div>;
  }

  if (!strategy) {
    return (
      <div className="container mt-5">
        <p>Strategi tidak ditemukan.</p>
        <Link href="/strategi" className="btn btn-secondary">
          Kembali ke List
        </Link>
      </div>
    );
  }

  // --- Nampilin isi strateginya ---
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
          
          {/* --- Tombol back ke page utama --- */}
          <Link href="/strategi" className="btn btn-secondary">
            Kembali ke List
          </Link>
        </div>
      </div>
    </div>
  );
}