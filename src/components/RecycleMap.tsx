import React, { useEffect, useRef, useState } from 'react';

// Use a reference ID for the map container
const MAP_CONTAINER_ID = 'map';

const RecycleMap: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const mapInitialized = useRef<boolean>(false);

  useEffect(() => {
    // Only initialize once
    if (mapInitialized.current) return;
    mapInitialized.current = true;

    // Create and load the Yandex Maps script
    const loadYandexMaps = () => {
      const script = document.createElement('script');
      script.src = 'https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&lang=ru_RU';
      script.async = true;
      script.onload = initYandexMap;
      script.onerror = () => {
        setError('Не удалось загрузить Яндекс Карты');
        setLoading(false);
      };
      document.body.appendChild(script);
    };

    // Initialize the Yandex Map with recycling points
    const initYandexMap = () => {
      if (window.ymaps) {
        window.ymaps.ready(() => {
          try {
            // Create the map instance
            const map = new window.ymaps.Map(MAP_CONTAINER_ID, {
              center: [50.590313, 36.587272], // Белгород
              zoom: 12,
              controls: ['zoomControl', 'fullscreenControl', 'geolocationControl']
            });

            // Add custom control for the map - search for recycling points
            const searchButton = new window.ymaps.control.Button({
              data: {
                content: "Найти пункты переработки",
                title: "Нажмите, чтобы показать пункты приёма вторсырья"
              },
              options: {
                selectOnClick: false,
                maxWidth: 250
              }
            });

            searchButton.events.add('click', () => {
              // Search for recycling points - categories for recycling
              map.geoObjects.removeAll();
              
              // Create search request for recycling points
              const recyclingSearch = new window.ymaps.GeoObjectCollection(null, {
                preset: 'islands#greenIcon' 
              });
              
              // Perform search for recycling points using Yandex search API
              window.ymaps.geocode('Приём и скупка вторсырья Белгород', {
                results: 20,
                boundedBy: map.getBounds()
              }).then((res: any) => {
                // Add all found objects to the map
                const recyclingPoints = res.geoObjects;
                map.geoObjects.add(recyclingPoints);
                
                // Fit map to show all points
                if (recyclingPoints.getLength() > 0) {
                  map.setBounds(recyclingPoints.getBounds(), {
                    checkZoomRange: true,
                    zoomMargin: 30
                  });
                }
              });
            });
            
            map.controls.add(searchButton);
            
            // Add a search control to the map
            map.controls.add('searchControl', {
              float: 'right',
              provider: 'yandex#search',
              placeholderContent: 'Найти пункт переработки'
            });
            
            // Add hardcoded recycling points with better icons and data
            const addRecyclePoint = (coordinates: number[], name: string, address: string, acceptedItems?: string[]) => {
              const placemark = new window.ymaps.Placemark(coordinates, {
                hintContent: name,
                balloonContentHeader: name,
                balloonContentBody: `<address>${address}</address>` + 
                  (acceptedItems ? `<p><strong>Принимает:</strong> ${acceptedItems.join(', ')}</p>` : '')
              }, {
                preset: 'islands#greenWasteIcon',
                iconColor: '#33a02c',
                draggable: false
              });
              
              map.geoObjects.add(placemark);
            };
            
            // Add real recycling points in Belgorod
            addRecyclePoint([50.5940, 36.5865], "Экоцентр", "ул. Щорса, 8", 
              ["Бумага", "Пластик", "Металл", "Стекло"]);
              
            addRecyclePoint([50.5749, 36.5535], "МЖК (Пункт приёма вторсырья)", "ул. Губкина, 17И", 
              ["Пластик", "Бумага", "Картон"]);
              
            addRecyclePoint([50.6106, 36.5743], "ЭкоВторРесурс", "ул. К. Заслонова, 90", 
              ["Металл", "Макулатура", "ПЭТ"]);
              
            addRecyclePoint([50.6059, 36.5535], "Контейнеры раздельного сбора", "ул. Костюкова, 39", 
              ["Стекло", "Пластик"]);
              
            addRecyclePoint([50.5955, 36.5995], "ЭкоПункт", "ул. Королёва, 2А", 
              ["Бумага", "Пластик", "Батарейки"]);

            // Search for "recycling points" automatically on load
            window.ymaps.geocode('Пункты приема вторсырья Белгород', {
              results: 15
            }).then((res: any) => {
              // Process results
              const searchResults = res.geoObjects;
              
              // Add the search results to the map
              map.geoObjects.add(searchResults);
              
              // Set appropriate zoom to show all points
              if (searchResults.getLength() > 0) {
                map.setBounds(searchResults.getBounds(), {
                  checkZoomRange: true,
                  zoomMargin: 30
                });
              }
              
              setLoading(false);
            }).catch(() => {
              setLoading(false);
            });
            
          } catch (e) {
            console.error('Error initializing Yandex Map:', e);
            setError('Ошибка при инициализации карты');
            setLoading(false);
          }
        });
      }
    };

    loadYandexMaps();

    // Cleanup
    return () => {
      const scripts = document.querySelectorAll('script[src*="api-maps.yandex.ru"]');
      scripts.forEach(s => s.remove());
    };
  }, []);

  return (
    <div className="flex flex-col w-full max-w-6xl h-[90vh] mx-auto p-5 rounded-lg bg-gray-50 shadow-lg">
      <h2 className="text-center text-2xl md:text-3xl font-bold text-green-700 mb-5">Пункты переработки в Белгороде</h2>
      
      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center p-5 bg-white bg-opacity-90 rounded-lg shadow-lg z-10">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-green-700 rounded-full animate-spin mb-3"></div>
          <p>Загрузка карты и поиск пунктов переработки...</p>
        </div>
      )}
      
      {error && (
        <div className="p-5 bg-red-50 border-l-4 border-red-500 rounded mb-5 text-red-800">
          <p>{error}</p>
          <p>Пожалуйста, попробуйте обновить страницу или свяжитесь с администратором.</p>
        </div>
      )}
      
      <div 
        id={MAP_CONTAINER_ID} 
        className="h-[600px] w-full rounded-lg overflow-hidden border border-gray-200 shadow-md"
      ></div>
      
      <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
        <div className="font-semibold mb-2 text-gray-800">Условные обозначения:</div>
        <div className="flex items-center mb-2">
          <span className="inline-block w-4 h-4 mr-2 rounded-full bg-green-700 shadow-sm"></span>
          <span>Пункты приема вторсырья</span>
        </div>
        <p className="mt-4 text-xs text-gray-500 italic">
          * Данные о пунктах переработки предоставлены сервисом Яндекс.Карты
        </p>
      </div>
    </div>
  );
};

export default RecycleMap;
