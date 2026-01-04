import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Что входит в состав базового мобильного комплекта связи?',
    options: [
      'Только радиостанция',
      'Радиостанция, антенна, аккумулятор, зарядное устройство',
      'Телефон и наушники',
      'Роутер и модем'
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    question: 'Какой диапазон частот используется в УКВ радиостанциях?',
    options: [
      '27 МГц',
      '136-174 МГц',
      '433 МГц',
      '900 МГц'
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    question: 'Что означает аббревиатура PMR в радиосвязи?',
    options: [
      'Профессиональная мобильная радиосвязь',
      'Персональная мобильная радиосвязь',
      'Портативная морская радиосвязь',
      'Передовая военная радиосвязь'
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    question: 'Какая мощность передатчика разрешена для PMR радиостанций без лицензии?',
    options: [
      '0.1 Вт',
      '0.5 Вт',
      '1 Вт',
      '5 Вт'
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    question: 'Что такое кодек в системах цифровой радиосвязи?',
    options: [
      'Тип антенны',
      'Устройство кодирования и декодирования сигнала',
      'Разъем для подключения',
      'Частотный фильтр'
    ],
    correctAnswer: 1
  },
  {
    id: 6,
    question: 'Какой тип модуляции чаще всего используется в аналоговых радиостанциях?',
    options: [
      'AM - амплитудная модуляция',
      'FM - частотная модуляция',
      'PM - фазовая модуляция',
      'QAM - квадратурная модуляция'
    ],
    correctAnswer: 1
  },
  {
    id: 7,
    question: 'Что такое ретранслятор в системах радиосвязи?',
    options: [
      'Усилитель звука',
      'Промежуточная станция для увеличения дальности связи',
      'Зарядное устройство',
      'Тип антенны'
    ],
    correctAnswer: 1
  },
  {
    id: 8,
    question: 'Какой стандарт цифровой радиосвязи используется в профессиональных системах?',
    options: [
      'GSM',
      'DMR (Digital Mobile Radio)',
      'Wi-Fi',
      'Bluetooth'
    ],
    correctAnswer: 1
  },
  {
    id: 9,
    question: 'Что означает функция VOX в радиостанции?',
    options: [
      'Голосовая активация передачи',
      'Система подавления шумов',
      'Режим экономии энергии',
      'Цифровое шифрование'
    ],
    correctAnswer: 0
  },
  {
    id: 10,
    question: 'Какой разъем чаще всего используется для подключения гарнитуры к радиостанции?',
    options: [
      'USB Type-C',
      'Kenwood 2-pin',
      'HDMI',
      'Lightning'
    ],
    correctAnswer: 1
  },
  {
    id: 11,
    question: 'Что такое CTCSS в радиосвязи?',
    options: [
      'Тип антенны',
      'Система субтонового шумоподавления',
      'Цифровой протокол',
      'Тип батареи'
    ],
    correctAnswer: 1
  },
  {
    id: 12,
    question: 'Какое напряжение питания обычно используется в портативных радиостанциях?',
    options: [
      '3.7 В',
      '7.4 В',
      '12 В',
      '220 В'
    ],
    correctAnswer: 1
  },
  {
    id: 13,
    question: 'Что означает IP67 в характеристиках радиостанции?',
    options: [
      'Мощность передатчика',
      'Класс защиты от пыли и влаги',
      'Частотный диапазон',
      'Емкость аккумулятора'
    ],
    correctAnswer: 1
  },
  {
    id: 14,
    question: 'Какой тип антенны обеспечивает максимальную дальность связи?',
    options: [
      'Штатная короткая антенна',
      'Внешняя направленная антенна',
      'Гибкая антенна',
      'Встроенная антенна'
    ],
    correctAnswer: 1
  },
  {
    id: 15,
    question: 'Что такое симплексная связь?',
    options: [
      'Связь только в одну сторону',
      'Передача и прием на одной частоте (по очереди)',
      'Одновременная передача и прием',
      'Зашифрованная связь'
    ],
    correctAnswer: 1
  }
];

const initialLeaderboard: LeaderboardEntry[] = [
  { name: 'Алексей М.', score: 100, date: '01.01.2024' },
  { name: 'Мария К.', score: 100, date: '02.01.2024' },
  { name: 'Иван П.', score: 80, date: '03.01.2024' },
  { name: 'Елена С.', score: 80, date: '04.01.2024' },
  { name: 'Дмитрий Н.', score: 60, date: '05.01.2024' }
];

export default function Index() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(initialLeaderboard);
  const [userName, setUserName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowNameInput(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    const correct = selectedAnswers.reduce((acc, answer, index) => {
      return answer === questions[index].correctAnswer ? acc + 1 : acc;
    }, 0);
    return Math.round((correct / questions.length) * 100);
  };

  const handleFinish = () => {
    if (!userName.trim()) return;
    
    const score = calculateScore();
    const newEntry: LeaderboardEntry = {
      name: userName,
      score,
      date: new Date().toLocaleDateString('ru-RU')
    };
    
    const updatedLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score || new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 10);
    
    setLeaderboard(updatedLeaderboard);
    setShowResults(true);
    setShowNameInput(false);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(questions.length).fill(null));
    setShowResults(false);
    setUserName('');
  };

  const score = calculateScore();
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showNameInput) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Введите ваше имя</CardTitle>
            <p className="text-sm text-muted-foreground text-center">
              Для сохранения результата в таблице лидеров
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Ваше имя"
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-accent focus:border-accent outline-none transition"
              onKeyPress={(e) => e.key === 'Enter' && handleFinish()}
            />
            <div className="flex gap-3">
              <Button
                onClick={() => setShowNameInput(false)}
                variant="outline"
                className="flex-1"
              >
                Назад
              </Button>
              <Button
                onClick={handleFinish}
                disabled={!userName.trim()}
                className="flex-1"
              >
                Завершить тест
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="text-center space-y-2">
              <div className="flex justify-center mb-4">
                <div className={`w-32 h-32 rounded-full flex items-center justify-center text-4xl font-bold ${
                  score >= 80 ? 'bg-green-100 text-green-700' :
                  score >= 60 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {score}%
                </div>
              </div>
              <CardTitle className="text-3xl font-bold">Тест завершен!</CardTitle>
              <p className="text-muted-foreground">
                {score >= 80 ? 'Отличный результат!' :
                 score >= 60 ? 'Хороший результат, но есть над чем работать' :
                 'Рекомендуем повторить материал'}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-secondary rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {selectedAnswers.filter((a, i) => a === questions[i].correctAnswer).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Правильных ответов</div>
                </div>
                <div className="p-4 bg-secondary rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {questions.length - selectedAnswers.filter((a, i) => a === questions[i].correctAnswer).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Ошибок</div>
                </div>
              </div>
              <Button onClick={handleRestart} className="w-full" size="lg">
                <Icon name="RotateCcw" className="mr-2" size={20} />
                Пройти тест заново
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Icon name="Trophy" className="text-accent" size={28} />
                Таблица лидеров
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {leaderboard.map((entry, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-lg transition ${
                      entry.name === userName && entry.score === score
                        ? 'bg-accent/10 border-2 border-accent'
                        : 'bg-secondary hover:bg-secondary/80'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        index === 0 ? 'bg-yellow-400 text-yellow-900' :
                        index === 1 ? 'bg-slate-300 text-slate-700' :
                        index === 2 ? 'bg-orange-400 text-orange-900' :
                        'bg-slate-200 text-slate-600'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold">{entry.name}</div>
                        <div className="text-sm text-muted-foreground">{entry.date}</div>
                      </div>
                    </div>
                    <Badge variant={entry.score === 100 ? 'default' : 'secondary'} className="text-lg px-4 py-1">
                      {entry.score}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Тест по мобильным комплектам связи</CardTitle>
            <Badge variant="outline" className="text-base px-4 py-1">
              {currentQuestion + 1} / {questions.length}
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Прогресс</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary">
            <h3 className="text-lg font-semibold mb-4">
              {questions[currentQuestion].question}
            </h3>
          </div>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-accent bg-accent/10 shadow-md'
                    : 'border-border hover:border-accent/50 hover:bg-accent/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-accent bg-accent'
                      : 'border-border'
                  }`}>
                    {selectedAnswers[currentQuestion] === index && (
                      <Icon name="Check" size={16} className="text-white" />
                    )}
                  </div>
                  <span className="flex-1">{option}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              variant="outline"
              size="lg"
              className="flex-1"
            >
              <Icon name="ChevronLeft" className="mr-2" size={20} />
              Назад
            </Button>
            <Button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion] === null}
              size="lg"
              className="flex-1"
            >
              {currentQuestion === questions.length - 1 ? 'Завершить' : 'Далее'}
              <Icon name="ChevronRight" className="ml-2" size={20} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}