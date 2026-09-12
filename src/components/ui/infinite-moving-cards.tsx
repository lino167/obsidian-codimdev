import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

interface InfiniteMovingCardsProps {
  items: {
    name: string;
    icon: React.ReactNode;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: InfiniteMovingCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  const getDirection = useCallback(() => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards");
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse");
      }
    }
  }, [direction]);

  const getSpeed = useCallback(() => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  }, [speed]);

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }, [getDirection, getSpeed]);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-8 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="group relative flex items-center gap-3.5 px-6 py-4 rounded-xl border border-white/10 bg-neutral-950/80 hover:border-crimson/50 hover:bg-neutral-900/90 transition-all duration-300 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_-5px_rgba(186,12,16,0.3)] hover:-translate-y-1 select-none cursor-pointer"
            key={`${item.name}-${idx}`}
          >
            <div className="text-crimson group-hover:scale-125 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(186,12,16,0.5)]">
              {item.icon}
            </div>
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-neutral-300 group-hover:text-white transition-colors">
              {item.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
