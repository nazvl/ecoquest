import greenEarth from "../assets/eco-earth.png";
import { motion } from "framer-motion";

import { scrollToSection } from "../utils/scrollHelper";

export default function Main() {

  return (
    <>
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 2 }}
        id="main"
        className="quiz-main w-full min-h-[90vh] bg-gradient-to-b from-green-100 to-green-50 flex flex-col md:flex-row gap-6 md:gap-10 items-center justify-center py-12 px-4 md:px-8"
      >
        <div className="text-center md:text-left max-w-lg">
          <motion.h1
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold text-green-800 mb-4"
          >
            Спасем природу вместе
          </motion.h1>
          <motion.p
            initial={{ x: -30 }}
            animate={{ x: 0 }}
            transition={{ duration: 1 }}
            className="text-lg text-green-700 mb-6"
          >
            Пройдите наш экологический квест и узнайте, как вы можете помочь
            планете уже сегодня
          </motion.p>
          <button
            onClick={() => scrollToSection("quiz")}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 shadow-md"
          >
            Начать квест
          </button>
        </div>

        <div className="w-full md:w-[40%] max-w-md overflow-hidden">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: 20 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1 }} // анимация при появлении в области видимости
            viewport={{ once: false, amount: 0.5 }} // анимация срабатывает, когда 50% элемента видно
            src={greenEarth}
            alt="Зеленая планета"
            className="w-full max-w-full object-contain animate-pulse-slow drop-shadow-xl"
          />
        </div>
      </motion.div>
    </>
  );
}
