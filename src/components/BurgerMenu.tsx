import { scrollToSection } from "../utils/scrollHelper";

const BurgerMenu = () => {
  return (
    <div className="py-2">
      <div className="flex flex-col">
        <button
          onClick={() => scrollToSection('main')}
          className="px-4 py-2 text-left hover:bg-green-50 text-gray-700 hover:text-green-600 transition-all"
        >
          Главная
        </button>
        <button
          onClick={() => scrollToSection('quiz')}
          className="px-4 py-2 text-left hover:bg-green-50 text-gray-700 hover:text-green-600 transition-all"
        >
          Quiz
        </button>
        <button
          onClick={() => scrollToSection('map')}
          className="px-4 py-2 text-left hover:bg-green-50 text-gray-700 hover:text-green-600 transition-all"
        >
          Карта переработки
        </button>
        <button
          onClick={() => scrollToSection('reccomendations')}
          className="px-4 py-2 text-left hover:bg-green-50 text-gray-700 hover:text-green-600 transition-all"
        >
          Полезные советы
        </button>
      </div>
    </div>
  );
};

export default BurgerMenu;