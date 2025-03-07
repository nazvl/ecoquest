import { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Фикс для отображения маркеров
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41], // Размер иконки
  iconAnchor: [12, 41], // Точка привязки иконки
});

L.Marker.prototype.options.icon = DefaultIcon;

const RecycleMap = () => {
  const [isMapInteractive, setIsMapInteractive] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  // Эффект для правильного позиционирования наложения
  useEffect(() => {
    // Убедимся, что наложение применяется только к внутреннему контейнеру карты
    const adjustOverlay = () => {
      const mapElement = document.querySelector('.leaflet-container');
      const overlay = mapContainerRef.current?.querySelector('.map-overlay');
      
      if (mapElement && overlay) {
        const rect = mapElement.getBoundingClientRect();
        Object.assign((overlay as HTMLElement).style, {
          width: `${rect.width}px`,
          height: `${rect.height}px`,
          top: `${rect.top - (mapContainerRef.current?.getBoundingClientRect().top || 0)}px`,
          left: `${rect.left - (mapContainerRef.current?.getBoundingClientRect().left || 0)}px`,
        });
      }
    };
    
    if (!isMapInteractive) {
      // Небольшая задержка для уверенности, что карта отрендерилась
      setTimeout(adjustOverlay, 100);
      window.addEventListener('resize', adjustOverlay);
    }
    
    return () => window.removeEventListener('resize', adjustOverlay);
  }, [isMapInteractive]);

  // Точки переработки с телефонами
  const recyclePoints = [
    {
      "coordinates": [50.5954, 36.5872],
      "name": "Титан",
      "address": "ул. Механизаторов, 7",
      "items": ["Металлолом", "Макулатура"],
      "phone": "+7 472 222-41-41"
    },
    {
      "coordinates": [50.6100, 36.5800],
      "name": "Фирма по утилизации автомобильных аккумуляторов",
      "address": "ул. Чехова, 1",
      "items": ["Автомобильные аккумуляторы"],
      "phone": "+7 910 741-84-11"
    },
    {
      "coordinates": [50.5950, 36.6100],
      "name": "Металл Резерв",
      "address": "Михайловское шоссе, 14",
      "items": ["Металлолом"],
      "phone": "+7 472 221-73-11"
    },
    {
      "coordinates": [50.6000, 36.6000],
      "name": "Вторпласт",
      "address": "ул. Дзгоева, 6",
      "items": ["Пластик"],
      "phone": "+7 472 239-92-77"
    },
    {
      "coordinates": [50.6100, 36.5900],
      "name": "Калидон",
      "address": "Мирная ул., 21",
      "items": ["Макулатура"],
      "phone": "+7 920 566-08-78"
    },
    {
      "coordinates": [50.6000, 36.5800],
      "name": "Технология",
      "address": "ул. Волчанская, 159",
      "items": ["Пластик", "Макулатура"],
      "phone": "+7 472 273-21-30"
    },
    {
      "coordinates": [50.6200, 36.5700],
      "name": "Втормет-Экология",
      "address": "ул. Производственная, 8",
      "items": ["Металлолом"],
      "phone": "+7 472 277-08-24"
    },
    {
      "coordinates": [50.5954, 36.5872],
      "name": "Титан",
      "address": "ул. Рабочая, 14",
      "items": ["Металлолом", "Макулатура"],
      "phone": "+7 472 222-41-41"
    },
    {
      "coordinates": [50.6000, 36.6000],
      "name": "Вторсырьё",
      "address": "Новая ул., 1В",
      "items": ["Макулатура", "Пластик"],
      "phone": "+7 952 432-81-55"
    },
    {
      "coordinates": [50.6000, 36.6000],
      "name": "Вторсырьё, офис",
      "address": "Новая ул., 1В",
      "items": ["Макулатура", "Пластик"],
      "phone": "+7 472 237-51-78"
    },
    {
      "coordinates": [50.6000, 36.6000],
      "name": "Белполихим",
      "address": "ул. Восточная, 71",
      "items": ["Пластик"],
      "phone": "+7 472 224-04-10"
    },
    {
      "coordinates": [50.6000, 36.6000],
      "name": "Makulaturoff",
      "address": "ул. Дзгоева, 4, оф. 276",
      "items": ["Макулатура"],
      "phone": "+7 472 278-31-21"
    },
    {
      "coordinates": [50.6000, 36.6000],
      "name": "Прием отработанных аккумуляторов",
      "address": "ул. Волчанская, 84а",
      "items": ["Отработанные аккумуляторы"],
      "phone": "+7 472 237-24-37"
    },
    {
      "coordinates": [50.6239, 36.5873],
      "name": "Втормет",
      "address": "ул. Ватутина, 83А",
      "items": ["Металлолом"],
      "phone": "+7 472 221-34-85"
    },
    {
      "coordinates": [50.6000, 36.6000],
      "name": "Калидон",
      "address": "ул. Дзгоева, 4, оф. 280",
      "items": ["Макулатура"],
      "phone": "+7 910 324-14-24"
    }
  ];

  return (
    <section id="map" className="w-full bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl text-center mb-10 text-green-700 font-bold">
          Карта переработки отходов
        </h1>
        
        <div 
          ref={mapContainerRef}
          className="relative h-[450px] rounded-lg overflow-hidden shadow-lg"
          onClick={() => setIsMapInteractive(true)}
        >
          <MapContainer
            center={[50.5955, 36.5895]}
            zoom={13}
            className="h-full w-full"
            attributionControl={false}
            dragging={!isMapInteractive}
            touchZoom={isMapInteractive}
            scrollWheelZoom={isMapInteractive}
            doubleClickZoom={isMapInteractive}
            zoomControl={isMapInteractive}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            
            {recyclePoints.map((point, index) => (
              <Marker key={index} position={point.coordinates as [number, number]}>
                <Popup>
                  <strong>{point.name}</strong>
                  <br />
                  {point.address}
                  <br />
                  {point.items.join(", ")}
                  <br />
                  Телефон: <a href={`tel:${point.phone}`}>{point.phone}</a>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          
          {!isMapInteractive && (
            <div className="map-overlay absolute bg-opacity-70 backdrop-blur-sm flex items-center justify-center text-black text-lg font-bold cursor-pointer z-[500] p-5 text-center">
              Кликните, чтобы взаимодействовать с картой
            </div>
          )}
        </div>
        
        <p className="text-center mt-4 text-gray-600">
          Выберите пункт на карте, чтобы узнать подробности о принимаемых материалах.
        </p>
      </div>
    </section>
  );
};

export default RecycleMap;