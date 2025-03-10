import { motion } from "framer-motion";
import { useState } from "react";
import { scrollToSection } from "../utils/scrollHelper";


const Calculator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);

  // вопросы с выделением количества углеродного следа в кг в месяц
  const questions = [
    {
      id: 1,
      question: "Как вы обычно добираетесь до работы/учебы?",
      answers: [
        { text: "На машине (в одиночку)", co2PerMonth: 250 },
        { text: "На машине с попутчиками", co2PerMonth: 125 },
        { text: "На общественном транспорте", co2PerMonth: 60 },
        { text: "На велосипеде/пешком", co2PerMonth: 0 },
      ],
    },
    {
      id: 2,
      question: "Как часто вы летаете на самолете?",
      answers: [
        { text: "Каждый месяц", co2PerMonth: 300 },
        { text: "Раз в полгода", co2PerMonth: 150 },
        { text: "Раз в год", co2PerMonth: 75 },
        { text: "Очень редко или никогда", co2PerMonth: 0 },
      ],
    },
    {
      id: 3,
      question: "Какой у вас тип питания?",
      answers: [
        { text: "Мясо каждый день", co2PerMonth: 200 },
        { text: "Мясо несколько раз в неделю", co2PerMonth: 150 },
        { text: "Вегетарианство", co2PerMonth: 100 },
        { text: "Веганство", co2PerMonth: 50 },
      ],
    },
    {
      id: 4,
      question: "Как вы отапливаете свое жилье?",
      answers: [
        { text: "Газ", co2PerMonth: 180 },
        { text: "Электричество", co2PerMonth: 120 },
        { text: "Дрова/уголь", co2PerMonth: 250 },
        { text: "Возобновляемая энергия", co2PerMonth: 20 },
      ],
    },
    {
      id: 5,
      question: "Какой у вас средний счет за электричество в месяц?",
      answers: [
        { text: "Более 200 кВтч", co2PerMonth: 180 },
        { text: "100-200 кВтч", co2PerMonth: 90 },
        { text: "Меньше 100 кВтч", co2PerMonth: 45 },
        {
          text: "Использую солнечные панели / альтернативные источники",
          co2PerMonth: 10,
        },
      ],
    },
    {
      id: 6,
      question: "Какой у вас тип жилья?",
      answers: [
        { text: "Частный дом", co2PerMonth: 200 },
        { text: "Квартира в многоэтажке", co2PerMonth: 100 },
        { text: "Эко-дом", co2PerMonth: 50 },
      ],
    },
    {
      id: 7,
      question: "Как вы утилизируете отходы?",
      answers: [
        { text: "Выбрасываю все в общий мусор", co2PerMonth: 150 },
        { text: "Сортирую частично", co2PerMonth: 100 },
        { text: "Сортирую полностью и компостирую", co2PerMonth: 50 },
      ],
    },
    {
      id: 8,
      question: "Как часто вы покупаете новую одежду?",
      answers: [
        { text: "Каждый месяц", co2PerMonth: 100 },
        { text: "Раз в полгода", co2PerMonth: 50 },
        { text: "Раз в год или реже", co2PerMonth: 25 },
      ],
    },
    {
      id: 9,
      question:
        "Как часто вы используете одноразовый пластик (бутылки, пакеты, посуда)?",
      answers: [
        { text: "Каждый день", co2PerMonth: 150 },
        { text: "Несколько раз в неделю", co2PerMonth: 100 },
        { text: "Очень редко или никогда", co2PerMonth: 25 },
      ],
    },
    {
      id: 10,
      question: "Как часто вы едите в ресторанах или заказываете еду на вынос?",
      answers: [
        { text: "Каждый день", co2PerMonth: 120 },
        { text: "Несколько раз в неделю", co2PerMonth: 80 },
        { text: "Раз в неделю или реже", co2PerMonth: 40 },
      ],
    },
  ];

  function handleAnswer(answer: number) {
    setScore(score + answer);
    if (currentStep >= questions.length - 1) {
      setTestCompleted(true);
      console.log("test completed");
    } else {
      setCurrentStep(currentStep + 1);
      console.log("CS: ", currentStep, "| answer: ", answer);
    }
  }

  function calculateResult(score: number): string {
    let result: string = "";

    if (score < 500) {
      result =
        "Ваш уровень выбросов низкий. Отличная экологическая осознанность!";
    } else if (score < 1000) {
      result =
        "У вас средний уровень выбросов. Есть возможности для улучшения!";
    } else {
      result =
        "Ваш уровень выбросов высокий. Подумайте о способах уменьшения углеродного следа.";
    }

    return result;
  }

  return (
    <>
      <motion.div
        className="w-full min-h-[80vh] bg-gradient-to-b from-green-100 to-white flex flex-col py-12 text-center items-center px-4"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl text-green-700 font-bold mb-10">
          Калькулятор углеродного следа
        </h1>
        {!testCompleted ? (
          <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-10 max-w-2xl w-full border border-green-100">
            <h2 className="text-2xl text-green-800 font-bold mb-8">
              {questions[currentStep].question}
            </h2>
            
            <div className="mb-4 flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">
                Вопрос {currentStep + 1} из {questions.length}
              </span>
              <div className="w-48 h-2 bg-gray-100 rounded-full ml-2">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentStep + 1) / questions.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="answers flex flex-col gap-4 mt-6">
              {questions[currentStep].answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(answer.co2PerMonth)}
                  className="bg-green-600 text-white py-4 px-6 rounded-xl shadow-md font-semibold transition duration-300 hover:bg-green-700 active:scale-95 hover:shadow-lg"
                >
                  {answer.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full border border-green-100"
          >
            <div className="flex justify-center mb-6">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 ${score > 1000 ? "bg-red-100 border-red-500" : "bg-green-100 border-green-500"}`}>
                <span className={`text-2xl font-bold ${score > 1000 ? "text-red-700" : "text-green-700"}`}>{score}</span>
              </div>
            </div>
            
            <h2 className="text-3xl text-white bg-emerald-700 p-6 rounded-xl shadow-md mb-6 w-full text-center">
              Ваш углеродный след составляет:{" "}
              <span className="font-bold">{score} кг CO₂/месяц</span>
            </h2>
            
            <p className={`text-lg py-4 ${score > 1000 ? "text-red-500" : "text-green-700"}`}>
              {calculateResult(score)}
            </p>
            <p onClick={() => scrollToSection('reccomendations')} className="text-blue-300 cursor-pointer">Ознакомиться с рекомендациями по снижению</p>

            <button
              onClick={() => {
                setCurrentStep(0);
                setScore(0);
                setTestCompleted(false);
              }}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg font-semibold shadow-md transition duration-300 hover:shadow-lg"
            >
              Пройти заново
            </button>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default Calculator;
