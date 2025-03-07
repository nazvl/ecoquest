import React from "react";
import { motion } from "framer-motion";
const Recommendations: React.FC = () => {
  const tips = [
    {
      category: "Энергосбережение",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-yellow-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      items: [
        "Выключайте свет, когда выходите из комнаты",
        "Используйте энергоэффективные светодиодные лампы",
        "Не оставляйте электроприборы в режиме ожидания",
        "Установите термостаты для оптимизации отопления и охлаждения",
      ],
    },
    {
      category: "Экономия воды",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
      items: [
        "Закрывайте кран во время чистки зубов",
        "Принимайте короткий душ вместо ванны",
        "Устраните протечки в кранах и трубах",
        "Используйте экономичные насадки на душ и краны",
      ],
    },
    {
      category: "Переработка отходов",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      ),
      items: [
        "Сортируйте мусор (пластик, бумага, стекло)",
        "Сдавайте батарейки и электронику в специальные пункты",
        "Компостируйте органические отходы",
        "Используйте товары из переработанных материалов",
      ],
    },
    {
      category: "Разумное потребление",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-purple-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      ),
      items: [
        "Покупайте только необходимые вещи",
        "Выбирайте товары с минимумом упаковки",
        "Используйте многоразовые сумки для покупок",
        "Предпочитайте качественные товары длительного пользования",
      ],
    },
    {
      category: "Транспорт",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      ),
      items: [
        "Используйте общественный транспорт",
        "Ходите пешком или ездите на велосипеде на короткие расстояния",
        "Объединяйтесь с соседями для совместных поездок",
        "При возможности, выбирайте гибридные или электрические автомобили",
      ],
    },
    {
      category: "Озеленение",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
      items: [
        "Выращивайте растения дома и на участке",
        "Сажайте деревья для улучшения экологии",
        "Создавайте вертикальные сады на балконах",
        "Участвуйте в городских акциях по озеленению",
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      
      className="w-full bg-gradient-to-b from-white via-green-50 to-green-100 py-8 pb- px-4"
      id="reccomendations"
    >
      <div className="bg-white p-6 rounded-lg w-full max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Советы по экологии
        </h1>
        <p className="text-xl text-center text-gray-600 mb-8">
          Маленькие шаги, которые помогают планете каждый день
        </p>
        <hr className="mb-8 border-gray-200" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tips.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-lg transition-transform duration-200 hover:scale-[1.02]"
            >
              <div className="p-5">
                <div className="flex items-center mb-4">
                  {section.icon}
                  <h2 className="text-xl font-medium ml-2">
                    {section.category}
                  </h2>
                </div>
                <hr className="mb-4 border-gray-200" />
                <ul className="list-disc pl-5 space-y-2">
                  {section.items.map((tip, tipIndex) => (
                    <li key={tipIndex} className="text-gray-700">
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-5 bg-green-50 rounded-lg">
          <h3 className="text-lg font-bold text-center mb-2">Помните!</h3>
          <p className="text-center text-gray-700">
            Даже самые маленькие действия важны. Начните с малого, и вместе мы
            сможем сделать нашу планету чище и здоровее!
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Recommendations;
