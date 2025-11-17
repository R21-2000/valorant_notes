//535240192 - Rakhafian Anargya Firdaus 
import Link from "next/link";
import Image from "next/image";

interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  genre: string;
  platform: string;
}

async function getShooterGames() {
  try {
    const res = await fetch('https://www.freetogame.com/api/games?category=shooter', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Gagal fetch');
    const data: Game[] = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function ExplorePage() {
  const games = await getShooterGames();

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Explore Game Shooter Gratis</h1>
      {games.length === 0 ? (
        <p>Gagal memuat data game.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {games.map((game) => (
            <div className="col" key={game.id}>
              <div className="card h-100">
                <Image
                  src={game.thumbnail}
                  alt={game.title}
                  width={400}
                  height={250}
                  className="card-img-top"
                  style={{ objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{game.title}</h5>
                  <p className="card-text">{game.short_description}</p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">{game.platform}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}