import { motion } from "framer-motion";

interface Fact {
  stat: string;
  description: string;
}

const InfoSection = () => {
  const facts: Fact[] = [
    {
      stat: "8 млн тонн",
      description: "пластика попадает в океаны ежегодно",
    },
    {
      stat: "1 тонна",
      description: "переработанной макулатуры спасает 17 деревьев",
    },
    {
      stat: "34%",
      description: "всех отходов в России можно переработать",
    },
    {
      stat: "450 лет",
      description: "срок разложения пластиковой бутылки в природе",
    },
  ];

  return (
    <div className="w-full bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center text-green-700 mb-10"
        >
          Почему переработка важна
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facts.map((fact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-green-50 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-3xl font-bold text-green-600 mb-2">
                {fact.stat}
              </h3>
              <p className="text-gray-700">{fact.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 text-center text-gray-600 max-w-3xl mx-auto"
        >
          Каждый из нас может внести свой вклад в сохранение окружающей среды.
          Начните с малого — найдите ближайший пункт переработки на нашей карте.
        </motion.p>
      </div>
    </div>
  );
};

export default InfoSection;
