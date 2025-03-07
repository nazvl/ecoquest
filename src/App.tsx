import Header from "./components/Header.tsx";
import Quiz from "./pages/Quiz.tsx";
import Main from "./pages/Main.tsx";
import Map from "./components/RecycleMap.tsx";
import Recommendations from "./pages/Reccomendations.tsx";
import "./App.css";
import { motion } from "framer-motion";

function App() {
  return (
    <>
      <Header />
      <Main />
      <Quiz />
      <Map />
      <motion.div
        className="bg-gradient-to-b from-white via-green-100 to-white mt-5 h-96"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1 }} // анимация при появлении в области видимости
        viewport={{ once: true, amount: 0.5 }} // анимация срабатывает, когда 50% элемента видно
      ></motion.div>
      <Recommendations />
    </>
  );
}

export default App;
