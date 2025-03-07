import leafImage from "../assets/leaf-svgrepo-com.svg";
import { motion } from "framer-motion";
import { scrollToSection } from "../utils/scrollHelper";

function Header() {
  return (
    <>
      <div className="z-1001 flex flex-row items-center justify-between bg-gradient-to-r from-white to-green-50 backdrop-blur-sm w-full p-6 sticky top-0 shadow-sm">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-row gap-5"
        >
          <div
            className="flex items-center gap-3 hover: cursor-pointer"
            onClick={() => scrollToSection("main")}
          >
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-500 font-sans">
              EcoQuest
            </h1>
            <motion.img
              src={leafImage}
              alt="Eco Logo"
              className="w-10 h-10"
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
        <nav className="hidden md:flex">
          <motion.ul
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-row gap-6 list-none text-lg font-medium font-sans"
          >
            <motion.li className="cursor-pointer text-gray-700 hover:text-green-600 transition-all duration-200 relative">
              <span onClick={() => scrollToSection("quiz")}>Quiz</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></span>
            </motion.li>
            <motion.li className="cursor-pointer text-gray-700 hover:text-green-600 transition-all duration-200 relative">
              <span onClick={() => scrollToSection("map")}>
                Карта переработки
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></span>
            </motion.li>
            <motion.li className="cursor-pointer text-gray-700 hover:text-green-600 transition-all duration-200 relative">
              <span onClick={() => scrollToSection("reccomendations")}>
                Полезные советы
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></span>
            </motion.li>
          </motion.ul>
        </nav>
      </div>
    </>
  );
}

export default Header;
