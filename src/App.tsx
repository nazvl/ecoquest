import Header from "./components/Header.tsx";
import Quiz from "./pages/Quiz.tsx";
import Main from "./pages/Main.tsx";
import Map from "./components/RecycleMap.tsx";
import Recommendations from "./pages/Reccomendations.tsx";
import Footer from "./components/Footer.tsx";
import "./App.css";
// import { motion } from "framer-motion";

function App() {
  return (
    <>
      <Header />
      <Main />
      <Quiz />
      <Map />
    {/* <motion.div
      className="bg-gradient-to-b from-white via-green-200 to-white mt-5 h-48 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      whileInView={{ scale: 1, opacity: 1 }} // анимация при появлении в области видимости
      viewport={{ once: false, amount: 0.5 }} // анимация срабатывает, когда 50% элемента видно
    ></motion.div> */}
      <Recommendations />
      <Footer />
    </>
  );
}

export default App;
