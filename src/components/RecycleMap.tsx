import React, { useEffect, useRef } from "react";

// Объявление свойства ymaps для объекта window
declare global {
  interface Window {
    ymaps: any;
  }
}

// Идентификатор контейнера для карты
const MAP_CONTAINER_ID = "map";

// Определение точек переработки за пределами компонента
// для предотвращения повторного создания при каждом рендере
const recyclePoints = [
  {
    coordinates: [50.594, 36.5865],
    name: "Экоцентр",
    address: "ул. Щорса, 8",
    items: ["Бумага", "Пластик", "Металл", "Стекло"],
  },
  {
    coordinates: [50.5749, 36.5535],
    name: "МЖК (Пункт приёма вторсырья)",
    address: "ул. Губкина, 17И",
    items: ["Пластик", "Бумага", "Картон"],
  },
  {
    coordinates: [50.6106, 36.5743],
    name: "ЭкоВторРесурс",
    address: "ул. К. Заслонова, 90",
    items: ["Металл", "Макулатура", "ПЭТ"],
  },
  {
    coordinates: [50.6059, 36.5535],
    name: "Контейнеры раздельного сбора",
    address: "ул. Костюкова, 39",
    items: ["Стекло", "Пластик"],
  },
  {
    coordinates: [50.5955, 36.5995],
    name: "ЭкоПункт",
    address: "ул. Королёва, 2А",
    items: ["Бумага", "Пластик", "Батарейки"],
  },
  {
    coordinates: [50.6100, 36.5800],
    name: "Центр Экологической Безопасности Белгородской области",
    address: "г. Белгород",
    items: ["Сбор и транспортировка отходов"],
  },
  {
    coordinates: [50.6000, 36.5900],
    name: "Пункт приёма пластика",
    address: "г. Белгород",
    items: ["ПВД", "ПНД", "Стрейч", "ПЭТ", "Ящики", "Канистры"],
  },
  {
    coordinates: [50.6200, 36.5700],
    name: "БелОткачка",
    address: "г. Белгород",
    items: ["Откачка и вывоз жидких бытовых отходов"],
    phone: "+7 (000) 000-00-00"
  }
];

// Функция загрузки API
const loadYandexMapsApi = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.ymaps) {
      resolve();
      return;
    }
    
    const script = document.createElement("script");
    script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Не удалось загрузить API Яндекс.Карт"));
    document.head.appendChild(script);
  });
};

const RecycleMap: React.FC = () => {
  const mapRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;
    
    const initMap = async () => {
      try {
        await loadYandexMapsApi();
        
        if (!isMounted) return;
        
        await window.ymaps.ready();
        
        // Создание экземпляра карты
        mapRef.current = new window.ymaps.Map(MAP_CONTAINER_ID, {
          center: [50.590313, 36.587272], // Белгород
          zoom: 12,
          controls: ["zoomControl", "geolocationControl"],
        });
        
        // Добавление точек на карту
        recyclePoints.forEach(point => {
          const balloonContent = `
            <address>${point.address}</address>
            <p><strong>Принимает:</strong> ${point.items.join(", ")}</p>
            ${point.phone ? `<p><strong>Телефон:</strong> ${point.phone}</p>` : ''}
          `;
          
          const placemark = new window.ymaps.Placemark(
            point.coordinates,
            {
              hintContent: point.name,
              balloonContentHeader: point.name,
              balloonContentBody: balloonContent,
            },
            {
              preset: "islands#greenWasteIcon",
              iconColor: "#33a02c",
            }
          );
          
          mapRef.current.geoObjects.add(placemark);
        });
      } catch (error) {
        console.error("Ошибка инициализации карты:", error);
      }
    };
    
    initMap();
    
    // Очистка
    return () => {
      isMounted = false;
      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-5">
      <h2 className="text-center text-2xl font-bold text-green-700 mb-5">
        Пункты переработки в Белгороде
      </h2>
      <div
        id={MAP_CONTAINER_ID}
        className="h-[600px] w-full rounded-lg border border-gray-200"
      ></div>
    </div>
  );
};

export default RecycleMap;
