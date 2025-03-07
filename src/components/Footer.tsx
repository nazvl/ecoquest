import { FaGithub } from 'react-icons/fa';
import { scrollToSection } from '../utils/scrollHelper';


function Footer() {
  return (
    <footer className="bg-emerald-900 text-white py-8">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between px-4">
        <div className="flex-1 min-w-[250px] mb-6">
          <h3 className="text-2xl mb-4 text-emerald-300">EcoQuest</h3>
          <p className="text-gray-200 leading-relaxed">Задумайтесь о будущем планеты</p>
        </div>
        
        <div className="flex-1 min-w-[250px] mb-6">
          <h4 className="text-xl mb-4 text-emerald-300">Быстрые ссылки</h4>
          <ul className="list-none p-0">
            <li className="mb-2"><span onClick={() => scrollToSection('main')} className="text-gray-200 no-underline hover:text-emerald-300 transition-colors cursor-pointer">Начало</span></li>
            <li className="mb-2"><span onClick={() => scrollToSection('quiz')} className="text-gray-200 no-underline hover:text-emerald-300 transition-colors cursor-pointer">Квиз</span></li>
            <li className="mb-2"><span onClick={() => scrollToSection('map')} className="text-gray-200 no-underline hover:text-emerald-300 transition-colors cursor-pointer">Карта переработки</span></li>
            <li className="mb-2"><span onClick={() => scrollToSection('reccomendations')} className="text-gray-200 no-underline hover:text-emerald-300 transition-colors cursor-pointer">Рекомендации</span></li>
          </ul>
        </div>
        
        <div className="flex-1 min-w-[250px] mb-6">
          <h4 className="text-xl mb-4 text-emerald-300">Контакты</h4>
          <div className="flex gap-4">
            <a href="https://github.com/nazvl" aria-label="GitHub" className="text-gray-200 text-2xl hover:text-emerald-300 transition-colors"><FaGithub /></a>
          </div>
        </div>
      </div>
      
      <div className="text-center pt-6 mt-6 border-t border-emerald-800">
        <p>&copy; {new Date().getFullYear()} EcoQuest. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
