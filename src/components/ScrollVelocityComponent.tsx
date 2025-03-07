import React, { useRef, useEffect, useState } from "react";

interface ScrollVelocityComponentProps {
  text: string;
  speedMultiplier?: number;
}

const ScrollVelocityComponent: React.FC<ScrollVelocityComponentProps> = ({
  text,
  speedMultiplier = 1,
}) => {
  const [offset, setOffset] = useState(0);
  const [totalWidth, setTotalWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const velocity = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  // Количество копий текста для обеспечения плавности
  const numCopies = 8;
  const textCopies = Array(numCopies).fill(text);

  // Измеряем ширину содержимого для корректного зацикливания
  useEffect(() => {
    if (textContainerRef.current) {
      const firstElement = textContainerRef.current.querySelector("span");
      if (firstElement) {
        const singleWidth = firstElement.getBoundingClientRect().width + 32; // Ширина + margin
        setTotalWidth(singleWidth);
      }
    }
  }, [text]);

  // Функция анимации для плавного движения
  const animateScroll = () => {
    if (velocity.current !== 0) {
      setOffset((prev) => {
        let newOffset = prev - velocity.current * 2; // Замедлим движение

        // Плавное зацикливание
        if (totalWidth > 0) {
          // При движении вправо (отрицательная скорость)
          if (newOffset < -totalWidth) {
            newOffset = 0;
          }

          // При движении влево (положительная скорость)
          if (newOffset > 0) {
            newOffset = -totalWidth;
          }
        }

        return newOffset;
      });

      // Постепенное затухание движения
      velocity.current *= 0.95;

      // Остановка анимации при очень малой скорости
      if (Math.abs(velocity.current) < 0.01) {
        velocity.current = 0;
      }
    }

    animationFrameId.current = requestAnimationFrame(animateScroll);
  };

  // Запускаем анимацию
  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(animateScroll);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [totalWidth]);

  // Устанавливаем обработчик события прокрутки
  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      const deltaTime = now - lastScrollTime.current;

      if (deltaTime > 0) {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY.current;

        // Рассчитываем скорость (пиксели в миллисекунду)
        velocity.current = (delta / deltaTime) * speedMultiplier;

        lastScrollY.current = currentScrollY;
        lastScrollTime.current = now;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speedMultiplier]);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden w-full py-4 bg-transparent relative"
    >
      <div
        ref={textContainerRef}
        className="whitespace-nowrap text-2xl font-semibold text-primary flex"
        style={{ transform: `translateX(${offset}px)` }}
      >
        {textCopies.map((t, i) => (
          <span key={i} className="inline-block mr-8">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ScrollVelocityComponent;
