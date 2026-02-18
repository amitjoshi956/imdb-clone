const MOVIE_QUOTES = [
  '"Life is like a box of chocolates, you never know what you\'re gonna get." — Forrest Gump',
  '"Here\'s looking at you, kid." — Casablanca',
  '"May the Force be with you." — Star Wars',
  '"After all, tomorrow is another day!" — Gone with the Wind',
  '"To infinity and beyond!" — Toy Story',
  '"Why do we fall? So we can learn to pick ourselves up." — Batman Begins',
  '"It\'s not who I am underneath, but what I do that defines me." — Batman Begins',
  '"Just keep swimming." — Finding Nemo',
  '"Oh yes, the past can hurt. But you can either run from it, or learn from it." — The Lion King',
  '"Every passing minute is another chance to turn it all around." — Vanilla Sky',
];

function getRandomQuote() {
  return MOVIE_QUOTES[Math.floor(Math.random() * MOVIE_QUOTES.length)];
}

function PageLoader() {
  return (
    <div className="relative flex flex-col items-center flex-grow justify-center h-[100vh] w-full gap-6 bg-gray-950 overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 h-1/5 w-1/5 rounded-full bg-amber-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 h-64 w-64 rounded-full bg-blue-500/8 blur-3xl animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 right-1/4 h-48 w-48 rounded-full bg-amber-400/5 blur-2xl animate-pulse [animation-delay:2s]" />
      </div>

      {/* Spinner */}
      <div className="relative h-12 w-12 z-10">
        <div className="absolute inset-0 rounded-full border-4 border-gray-800" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-400 animate-spin" />
      </div>

      {/* Movie Quote */}
      <p className="text-lg text-gray-400 italic text-center max-w-md px-4 z-10">
        {getRandomQuote()}
      </p>
    </div>
  );
}

export default PageLoader;
