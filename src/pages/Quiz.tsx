import { useState } from 'react';
import { motion } from 'framer-motion';
import RecyclingIcon from '@mui/icons-material/Recycling';
import { scrollToSection } from "../utils/scrollHelper";

function Quiz() {
    const [score, setScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    
    const questions = [
        {
            question: "Какой вид транспорта экологичнее?",
            answers: [
                { text: "Самолет", isCorrect: false },
                { text: "Автобус", isCorrect: false },
                { text: "Автомобиль", isCorrect: false },
                { text: "Поезд", isCorrect: true },
            ],
        },
        {
            question: "Какая энергия считается возобновляемой?",
            answers: [
                { text: "Ядерная", isCorrect: false },
                { text: "Солнечная", isCorrect: true },
                { text: "Газовая", isCorrect: false },
                { text: "Угольная", isCorrect: false },
            ],
        },
        {
            question: "Что такое углеродный след?",
            answers: [
                { text: "Сумма всех выбросов CO2 и других парниковых газов, вызванных деятельностью человека", isCorrect: true },
                { text: "Печать на климатической карте", isCorrect: false },
                { text: "Образование озоновых дыр", isCorrect: false },
                { text: "Энергетическая мощность заводов", isCorrect: false },
            ],
        },
        {
            question: "Какой из этих продуктов оказывает наименьшее воздействие на окружающую среду?",
            answers: [
                { text: "Говядина", isCorrect: false },
                { text: "Курица", isCorrect: true },
                { text: "Свиное мясо", isCorrect: false },
                { text: "Молоко", isCorrect: false },
            ],
        },
        {
            question: "Что такое переработка отходов?",
            answers: [
                { text: "Процесс превращения отходов в новые продукты или материалы", isCorrect: true },
                { text: "Сжигание отходов для получения энергии", isCorrect: false },
                { text: "Захоронение отходов в земле", isCorrect: false },
                { text: "Утилизация отходов на свалке", isCorrect: false },
            ],
        },
        {
            question: "Какой из этих видов энергии является наиболее экологически чистым?",
            answers: [
                { text: "Тепловая энергия", isCorrect: false },
                { text: "Ветроэнергия", isCorrect: true },
                { text: "Гидроэнергия", isCorrect: false },
                { text: "Биогаз", isCorrect: false },
            ],
        },
        {
            question: "Что такое «зелёный» сертификат?",
            answers: [
                { text: "Документ, подтверждающий использование экологически чистых технологий", isCorrect: true },
                { text: "Подарочный сертификат для экологичных товаров", isCorrect: false },
                { text: "Сертификат, подтверждающий продукцию из органических материалов", isCorrect: false },
                { text: "Сертификат на скидку в магазине", isCorrect: false },
            ],
        },
        {
            question: "Какой из этих материалов можно переработать?",
            answers: [
                { text: "Пластиковая упаковка", isCorrect: true },
                { text: "Молочная упаковка", isCorrect: false },
                { text: "Мел", isCorrect: false },
                { text: "Фольга от шоколадки", isCorrect: false },
            ],
        },
        {
            question: "Какую роль в экологии играет лес?",
            answers: [
                { text: "Производит кислород и поглощает углекислый газ", isCorrect: true },
                { text: "Только защищает почву от эрозии", isCorrect: false },
                { text: "Создает тень для животных", isCorrect: false },
                { text: "Поддерживает баланс в природе", isCorrect: false },
            ],
        },
        {
            question: "Какой из этих газов является парниковым?",
            answers: [
                { text: "Азот", isCorrect: false },
                { text: "Кислород", isCorrect: false },
                { text: "Метан", isCorrect: true },
                { text: "Аргон", isCorrect: false },
            ],
        },
        {
            question: "Что влияет на увеличение глобального потепления?",
            answers: [
                { text: "Выбросы парниковых газов", isCorrect: true },
                { text: "Увлажнение почвы", isCorrect: false },
                { text: "Снижение солнечной активности", isCorrect: false },
                { text: "Падение уровня воды в океанах", isCorrect: false },
            ],
        },
        {
            question: "Какой продукт лучше всего подходит для устойчивого питания?",
            answers: [
                { text: "Местные сезонные овощи", isCorrect: true },
                { text: "Мясо импортированное с другого континента", isCorrect: false },
                { text: "Продукты с высокой упаковкой", isCorrect: false },
                { text: "Готовые замороженные блюда", isCorrect: false },
            ],
        },
        {
            question: "Что можно сделать для уменьшения количества отходов?",
            answers: [
                { text: "Использовать одноразовую пластиковую посуду", isCorrect: false },
                { text: "Переработать и повторно использовать вещи", isCorrect: true },
                { text: "Выбрасывать все без сортировки", isCorrect: false },
                { text: "Использовать только новые продукты", isCorrect: false },
            ],
        },
        {
            question: "Какой способ сокращения углеродного следа является наиболее эффективным?",
            answers: [
                { text: "Использование электрического транспорта", isCorrect: true },
                { text: "Сжигание угля вместо газа", isCorrect: false },
                { text: "Использование пластиковых пакетов", isCorrect: false },
                { text: "Снижение потребления пищи", isCorrect: false },
            ],
        },
        {
            question: "Что такое устойчивое развитие?",
            answers: [
                { text: "Развитие, которое удовлетворяет потребности текущего поколения, не ущемляя возможности будущих поколений", isCorrect: true },
                { text: "Рост экономики без учета экологии", isCorrect: false },
                { text: "Использование новых технологий, независимо от их воздействия на природу", isCorrect: false },
                { text: "Полный отказ от использования природных ресурсов", isCorrect: false },
            ],
        },
    ];
    

    function checkAnswer(answer: number) {
        setSelectedAnswer(answer);
        setIsAnimating(true);
        
        //задержка для отображения обратной связи
        setTimeout(() => {
            if (questions[currentQuestionIndex].answers[answer].isCorrect) {
                setScore(score + 1);
            }
            
            const nextQuestionIndex = currentQuestionIndex + 1;
            
            if (nextQuestionIndex >= questions.length) {
                setQuizCompleted(true);
            } else {
                setCurrentQuestionIndex(nextQuestionIndex);
                setSelectedAnswer(null);
            }
            setIsAnimating(false);
        }, 600);
    }
    
    //анимации
    const simpleVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { duration: 0.3 }
        }
    };

    return (
        <>
            <div id='quiz' className="quiz-main w-full min-h-[80vh] bg-gradient-to-b from-green-50 to-green-100 flex flex-col items-center justify-center p-20 px-4">
                <motion.div 
                    className="max-w-3xl w-full bg-white rounded-2xl shadow-lg overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="bg-green-600 py-4 px-6">
                        <h1 className="text-2xl font-bold text-white text-center">
                            Экологический квиз <RecyclingIcon className="inline-block w-6 h-6" />
                        </h1>
                    </div>
                
                    {quizCompleted ? (
                        <div className="results-container flex flex-col items-center p-8 gap-6">
                            <div className="w-32 h-32 rounded-full bg-green-100 flex items-center justify-center border-4 border-green-500">
                                <span className="text-3xl font-bold text-green-700">{score}/{questions.length}</span>
                            </div>
                            
                            <h2 className="text-2xl font-bold text-green-800">
                                Квиз завершен!
                            </h2>
                            
                            {score < questions.length / 2 ? (
                                <div className="text-center">
                                    <p className="text-lg text-red-600 mb-3">Узнайте больше о защите окружающей среды и попробуйте снова!</p>
                                    <p><a href="#" onClick={() => scrollToSection('reccomendations')} className='text-blue-500 underline hover:text-blue-700 transition-colors'>Ознакомиться с советами</a></p>
                                </div>
                            ) : (
                                <p className="text-lg text-green-600 text-center">
                                    Отличный результат! Продолжайте в том же духе!
                                </p>
                            )}
                            
                            <motion.button 
                                className="mt-6 bg-green-500 hover:bg-green-600 text-white py-3 px-8 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                                onClick={() => {
                                    setCurrentQuestionIndex(0);
                                    setScore(0);
                                    setQuizCompleted(false);
                                }}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                Пройти еще раз
                            </motion.button>
                        </div>
                    ) : (
                        <motion.div 
                            className="question-container flex flex-col items-center p-8"
                            key={currentQuestionIndex}
                            variants={simpleVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="w-full mb-6 flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-500">Вопрос {currentQuestionIndex + 1} из {questions.length}</span>
                                <div className="w-24 h-2 bg-gray-200 rounded-full">
                                    <div 
                                        className="h-full bg-green-500 rounded-full transition-all duration-300"
                                        style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                            
                            <p className="question text-xl font-bold text-gray-800 mb-8 text-center">
                                {questions[currentQuestionIndex].question}
                            </p>
                            
                            <div className="answers flex flex-col items-center gap-3 w-full max-w-lg">
                                {questions[currentQuestionIndex].answers.map((answer, index) => (
                                    <button
                                        key={index}
                                        disabled={isAnimating}
                                        className={`answer-btn text-lg p-4 m-1 rounded-xl w-full transition-all duration-200 border-2 flex justify-between items-center ${
                                            selectedAnswer === index
                                                ? answer.isCorrect
                                                    ? 'bg-green-100 border-green-500 text-green-700'
                                                    : 'bg-red-100 border-red-500 text-red-700'
                                                : 'bg-white border-gray-200 text-gray-700 hover:border-green-500 hover:bg-green-50'
                                        }`}
                                        onClick={() => !isAnimating && checkAnswer(index)}
                                    >
                                        <span>{answer.text}</span>
                                        {selectedAnswer === index && (
                                            <span className={`text-xl ${answer.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                                {answer.isCorrect ? '✓' : '✗'}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </>
    );
}

export default Quiz;
