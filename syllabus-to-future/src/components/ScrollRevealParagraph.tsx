import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollRevealParagraphProps {
  lines: string[];
  className?: string;
  style?: React.CSSProperties;
}

const ScrollRevealParagraph = ({
  lines,
  className = "",
  style,
}: ScrollRevealParagraphProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.25"],
  });

  // Calculate total characters for smooth progression
  const totalChars = lines.reduce((sum, line) => sum + line.length, 0);
  let charIndex = 0;

  return (
    <div ref={containerRef} className={className} style={style}>
      {lines.map((line, lineIndex) => {
        const lineChars = line.split("");
        const lineElements = lineChars.map((char, index) => {
          const globalIndex = charIndex + index;
          const start = globalIndex / totalChars;
          const end = start + 1 / totalChars;

          return (
            <Character
              key={`line${lineIndex}-${char}-${index}`}
              char={char}
              scrollYProgress={scrollYProgress}
              start={start}
              end={end}
            />
          );
        });

        charIndex += lineChars.length;

        return (
          <div key={`line-${lineIndex}`} className="mb-2">
            {lineElements}
          </div>
        );
      })}
    </div>
  );
};

interface CharacterProps {
  char: string;
  scrollYProgress: any;
  start: number;
  end: number;
}

const Character = ({ char, scrollYProgress, start, end }: CharacterProps) => {
  // Transform scroll progress to character opacity
  const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
};

export default ScrollRevealParagraph;
