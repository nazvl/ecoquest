import React, { useRef, useEffect, useState } from "react";

// Описание параметров компонента
interface ScrollVelocityComponentProps {
  text: string;                // Текст, который будет прокручиваться
  speedMultiplier?: number;    // Множитель скорости движения текста
}

const ScrollVelocityComponent = ({
  text,
  speedMultiplier = 1,   // Значение по умолчанию - 1
}: ScrollVelocityComponentProps) => {
  // Состояния компонента
  const [offset, setOffset] = useState(0);                // Смещение текста по горизонтали
  const [singleElementWidth, setSingleElementWidth] = useState(0); // Ширина одного элемента текста
  
  // Ссылки на DOM элементы и другие значения, которые нужно сохранять между рендерами
  const containerRef = useRef<HTMLDivElement>(null);      // Ссылка на контейнер
  const textContainerRef = useRef<HTMLDivElement>(null);  // Ссылка на контейнер с текстом
  const lastScrollY = useRef(0);                          // Последняя позиция скролла по Y
  const lastScrollTime = useRef(Date.now());              // Время последнего события скролла
  const scrollSpeed = useRef(0);                          // Скорость прокрутки
  const animationFrameId = useRef<number | null>(null);   // ID запроса анимации

  // Создаем несколько копий текста для бесшовной прокрутки
  const numCopies = 8;  // Количество копий текста
  const textCopies = Array(numCopies).fill(text);

  // Измеряем ширину одного элемента текста после монтирования и при изменении текста
  useEffect(() => {
    // Ждем, когда DOM будет готов
    if (textContainerRef.current) {
      // Находим первый элемент span с текстом
      const firstElement = textContainerRef.current.querySelector("span");
      if (firstElement) {
        // Получаем ширину элемента + отступ
        const elementWidth = firstElement.getBoundingClientRect().width + 32; // Ширина + margin
        setSingleElementWidth(elementWidth);
      }
    }
  }, [text]); // Пересчитываем при изменении текста

  // Функция для плавной анимации движения текста
  const animateScroll = () => {
    // Если есть какая-либо скорость движения
    if (scrollSpeed.current !== 0) {
      // Обновляем позицию текста
      setOffset((previousOffset) => {
        // Вычисляем новое смещение с учетом скорости
        let newOffset = previousOffset - scrollSpeed.current * 2; // Замедляем движение в 2 раза для плавности

        // Реализуем бесконечную прокрутку
        if (singleElementWidth > 0) {
          // Если текст ушел слишком далеко вправо, перемещаем его в начальное положение
          if (newOffset < -singleElementWidth) {
            newOffset = 0;
          }

          // Если текст ушел слишком далеко влево, перемещаем его назад
          if (newOffset > 0) {
            newOffset = -singleElementWidth;
          }
        }

        return newOffset;
      });

      // Постепенно уменьшаем скорость для эффекта затухания
      scrollSpeed.current = scrollSpeed.current * 0.95;

      // Если скорость стала очень маленькой, останавливаем движение
      if (Math.abs(scrollSpeed.current) < 0.01) {
        scrollSpeed.current = 0;
      }
    }

    // Запрашиваем следующий кадр анимации
    animationFrameId.current = requestAnimationFrame(animateScroll);
  };

  // Запускаем анимацию при монтировании компонента и останавливаем при размонтировании
  useEffect(() => {
    // Запускаем анимационный цикл
    animationFrameId.current = requestAnimationFrame(animateScroll);

    // Очистка при размонтировании компонента
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [singleElementWidth]); // Зависимость от ширины элемента

  // Следим за событием прокрутки страницы
  useEffect(() => {
    // Обработчик события прокрутки
    const handleScroll = () => {
      const currentTime = Date.now();
      const timeSinceLastScroll = currentTime - lastScrollTime.current;

      // Если прошло какое-то время с последней прокрутки
      if (timeSinceLastScroll > 0) {
        const currentScrollY = window.scrollY;
        const scrollDifference = currentScrollY - lastScrollY.current;

        // Рассчитываем скорость прокрутки в пикселях за миллисекунду, умноженную на множитель
        scrollSpeed.current = (scrollDifference / timeSinceLastScroll) * speedMultiplier;

        // Обновляем данные для следующего расчета
        lastScrollY.current = currentScrollY;
        lastScrollTime.current = currentTime;
      }
    };

    // Добавляем обработчик события
    window.addEventListener("scroll", handleScroll);
    
    // Удаляем обработчик при размонтировании компонента
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speedMultiplier]); // Зависимость от множителя скорости

  // Рендерим компонент
  return (
    <div
      ref={containerRef}
      className="overflow-hidden w-full py-4 bg-transparent relative"
    >
      <div
        ref={textContainerRef}
        className="whitespace-nowrap text-2xl font-semibold text-primary flex"
        style={{ transform: `translateX(${offset}px)` }} // Применяем смещение к тексту
      >
        {/* Отображаем несколько копий текста для непрерывной прокрутки */}
        {textCopies.map((textCopy, index) => (
          <span key={index} className="inline-block mr-8">
            {textCopy}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ScrollVelocityComponent;
