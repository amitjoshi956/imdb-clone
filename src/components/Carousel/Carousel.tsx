import {
  useRef,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

type CarouselProps<T> = {
  title: string;
  items: T[];
  hasMore: boolean;
  renderItem: (item: T) => ReactNode;
  keyExtractor: (item: T) => string | number;
  onLoadMore: () => void;
};

function Carousel<T>({
  title,
  items,
  hasMore,
  renderItem,
  keyExtractor,
  onLoadMore,
}: CarouselProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateScrollState();
  }, [items, updateScrollState]);

  const handleScroll = useCallback(() => {
    updateScrollState();

    const el = scrollRef.current;
    if (!el || !hasMore) return;

    const distanceFromEnd = el.scrollWidth - el.scrollLeft - el.clientWidth;
    if (distanceFromEnd < 200) {
      onLoadMore();
    }
  }, [hasMore, onLoadMore, updateScrollState]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative group/carousel px-6 md:px-12">
      <h2 className="text-xl md:text-2xl font-bold text-gray-300 mb-4">
        {title}
      </h2>

      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-gray-950/70 text-white backdrop-blur-sm transition-opacity duration-200 opacity-0 group-hover/carousel:opacity-100 hover:bg-gray-950/90"
            aria-label="Scroll left"
            onClick={() => scroll("left")}
          >
            ‹
          </button>
        )}

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
          onScroll={handleScroll}
        >
          {items.map((item) => (
            <div
              key={keyExtractor(item)}
              className="snap-start shrink-0 w-40 md:w-48"
            >
              {renderItem(item)}
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-gray-950/70 text-white backdrop-blur-sm transition-opacity duration-200 opacity-0 group-hover/carousel:opacity-100 hover:bg-gray-950/90"
            aria-label="Scroll right"
            onClick={() => scroll("right")}
          >
            ›
          </button>
        )}
      </div>
    </section>
  );
}

export default Carousel;
