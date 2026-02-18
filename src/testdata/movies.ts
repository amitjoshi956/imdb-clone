export interface Movie {
  id: number;
  title: string;
  rating: number;
  posterUrl: string;
}

export const movies: Movie[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    rating: 9.3,
    posterUrl: "https://picsum.photos/seed/shawshank/400/600",
  },
  {
    id: 2,
    title: "The Dark Knight",
    rating: 9.0,
    posterUrl: "https://picsum.photos/seed/darkknight/400/600",
  },
  {
    id: 3,
    title: "Inception",
    rating: 8.8,
    posterUrl: "https://picsum.photos/seed/inception/400/600",
  },
  {
    id: 4,
    title: "The Godfather",
    rating: 9.2,
    posterUrl: "https://picsum.photos/seed/godfather/400/600",
  },
  {
    id: 5,
    title: "Interstellar",
    rating: 8.7,
    posterUrl: "https://picsum.photos/seed/interstellar/400/600",
  },
  {
    id: 6,
    title: "Pulp Fiction",
    rating: 8.9,
    posterUrl: "https://picsum.photos/seed/pulpfiction/400/600",
  },
  {
    id: 7,
    title: "The Matrix",
    rating: 8.7,
    posterUrl: "https://picsum.photos/seed/matrix/400/600",
  },
  {
    id: 8,
    title: "Forrest Gump",
    rating: 8.8,
    posterUrl: "https://picsum.photos/seed/forrestgump/400/600",
  },
  {
    id: 9,
    title: "Parasite",
    rating: 8.5,
    posterUrl: "https://picsum.photos/seed/parasite/400/600",
  },
  {
    id: 10,
    title: "Fight Club",
    rating: 8.8,
    posterUrl: "https://picsum.photos/seed/fightclub/400/600",
  },
];
