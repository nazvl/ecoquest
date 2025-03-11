import Header from "./components/Header.tsx";
import Quiz from "./pages/Quiz.tsx";
import Main from "./pages/Main.tsx";
import Map from "./components/RecycleMap.tsx";
import Recommendations from "./pages/Reccomendations.tsx";
import Footer from "./components/Footer.tsx";
import InfoSection from "./pages/InfoSection.tsx";
import ScrollVelocityComponent from "./components/ScrollVelocityComponent.tsx";
import Calculator from "./pages/Calculator.tsx";
import "./App.css";
// import { motion } from "framer-motion";

function App() {
  return (
    <>
      <Header />
      <Main />
      <ScrollVelocityComponent
        text="🌍 Проверь свои знания • Пройди эко-квиз • Начни с себя 🌱"
        speedMultiplier={1.6}
      />
      <Quiz />
      <InfoSection />
      <Map />
      <ScrollVelocityComponent
        text="🗺️ Найди пункты приема • Сдай раздельно • Спаси планету ♻️"
        speedMultiplier={1.2}
      />
      <Recommendations />
      <Calculator />
      <Footer />
    </>
  );
}

export default App;
