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
      "coordinates": [50.591095, 36.592466],
      "name": "ЭкоПункт",
      "address": "ул. Попова, 39А",
      "items": ["Пластик", "Стекло", "Бумага", "Металл"],
      "phone": "+7 908 782-01-77"
    },
    {
      "coordinates": [50.599081, 36.588087],
      "name": "Экотерминал №1",
      "address": "ул. Щорса, 45К (Сити-молл Белгородский)",
      "items": ["Пластик", "Батарейки", "Бумага"],
      "phone": "+7 472 223-93-39"
    },
    {
      "coordinates": [50.627220, 36.572377],
      "name": "Приемный пункт «Титан»",
      "address": "ул. Производственная, 4",
      "items": ["Металлолом", "Макулатура"],
      "phone": "+7 472 222-41-41"
    },
    {
      "coordinates": [50.595544, 36.594254],
      "name": "Экотерминал №2",
      "address": "пр. Славы, 65 (ТРЦ «Сити Молл»)", 
      "items": ["Пластик", "Батарейки", "Бумага"],
      "phone": "+7 472 223-93-39"
    },
    {
      "coordinates": [50.583373, 36.498546],
      "name": "Металл Резерв",
      "address": "Михайловское шоссе, 14",
      "items": ["Металлолом"],
      "phone": "+7 472 221-73-11"
    },
    {
      "coordinates": [50.596789, 36.577966],
      "name": "Вторпласт",
      "address": "ул. Дзгоева, 6",
      "items": ["Пластик", "ПЭТ-бутылки"],
      "phone": "+7 472 239-92-77"
    },
    {
      "coordinates": [50.612836, 36.570928],
      "name": "Калидон",
      "address": "Мирная ул., 21",
      "items": ["Макулатура", "Картон"],
      "phone": "+7 920 566-08-78"
    },
    {
      "coordinates": [50.594404, 36.566205],
      "name": "Технология",
      "address": "ул. Волчанская, 159",
      "items": ["Пластик", "Макулатура"],
      "phone": "+7 472 273-21-30"
    },
    {
      "coordinates": [50.623087, 36.578322],
      "name": "Втормет-Экология",
      "address": "ул. Производственная, 8",
      "items": ["Металлолом", "Черные металлы"],
      "phone": "+7 472 277-08-24"
    },
    {
      "coordinates": [50.601773, 36.560026],
      "name": "Вторсырьё",
      "address": "Новая ул., 1В",
      "items": ["Макулатура", "Пластик", "Картон"],
      "phone": "+7 952 432-81-55"
    },
    {
      "coordinates": [50.591201, 36.558523],
      "name": "Белполихим",
      "address": "ул. Восточная, 71",
      "items": ["Пластик", "Полиэтилен"],
      "phone": "+7 472 224-04-10"
    },
    {
      "coordinates": [50.598645, 36.577112],
      "name": "Makulaturoff",
      "address": "ул. Дзгоева, 4, оф. 276",
      "items": ["Макулатура", "Архивы", "Документы"],
      "phone": "+7 472 278-31-21"
    },
    {
      "coordinates": [50.593058, 36.561357],
      "name": "Прием отработанных аккумуляторов",
      "address": "ул. Волчанская, 84а",
      "items": ["Отработанные аккумуляторы", "Батареи"],
      "phone": "+7 472 237-24-37"
    },
    {
      "coordinates": [50.623900, 36.587300],
      "name": "Втормет",
      "address": "ул. Ватутина, 83А",
      "items": ["Металлолом", "Цветные металлы"],
      "phone": "+7 472 221-34-85"
    },
    {
      "coordinates": [50.607450, 36.595364],
      "name": "ЭкоБокс",
      "address": "Гражданский проспект, 18 (Центральный парк)",
      "items": ["Батарейки", "Лампочки", "Мелкая электроника"],
      "phone": "+7 472 232-16-90"
    },
    {
      "coordinates": [50.603499, 36.573672],
      "name": "Центр по переработке электроники",
      "address": "Проспект Богдана Хмельницкого, 133М",
      "items": ["Электронная техника", "Компьютеры", "Мобильные телефоны"],
      "phone": "+7 910 320-54-65"
    },
    {
      "coordinates": [50.585765, 36.513184],
      "name": "ЭкоЦентр",
      "address": "ул. Корочанская, 132А",
      "items": ["Стекло", "Пластик", "Текстиль", "Бумага"],
      "phone": "+7 472 240-02-34"
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
            <div className="map-overlay absolute bg-opacity-70 backdrop-blur-sm flex items-center justify-center text-black text-lg font-bold cursor-pointer z-[1000]">
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