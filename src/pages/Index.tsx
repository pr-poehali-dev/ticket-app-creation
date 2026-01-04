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
    question: 'Что такое MikroTik?',
    options: [
      'Производитель сетевого оборудования из Латвии',
      'Тип антенны',
      'Протокол шифрования',
      'Операционная система для смартфонов'
    ],
    correctAnswer: 0
  },
  {
    id: 2,
    question: 'Что такое криптомаршрутизатор?',
    options: [
      'Обычный роутер для майнинга криптовалюты',
      'Маршрутизатор с встроенным аппаратным шифрованием трафика',
      'Устройство для хранения криптовалюты',
      'Маршрутизатор с защитой от вирусов'
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    question: 'Что такое управляемый коммутатор?',
    options: [
      'Коммутатор с пультом дистанционного управления',
      'Сетевой коммутатор с возможностью настройки через веб-интерфейс или CLI',
      'Коммутатор, который работает автоматически',
      'Обычный свитч с кнопкой включения'
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    question: 'Что такое закрытый свитч (Secure Switch)?',
    options: [
      'Коммутатор в закрытом корпусе',
      'Коммутатор с функциями безопасности (VLAN, ACL, port security)',
      'Свитч без портов управления',
      'Коммутатор для домашнего использования'
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    question: 'Какая операционная система используется в оборудовании MikroTik?',
    options: [
      'Windows Server',
      'RouterOS',
      'Linux Ubuntu',
      'Cisco IOS'
    ],
    correctAnswer: 1
  },
  {
    id: 6,
    question: 'Что входит в состав мобильного комплекта связи?',
    options: [
      'Только роутер',
      'Маршрутизатор, коммутатор, точка доступа, кабели, источник питания',
      'Телефон и планшет',
      'Только антенна'
    ],
    correctAnswer: 1
  },
  {
    id: 7,
    question: 'Для чего используется VLAN в управляемых коммутаторах?',
    options: [
      'Увеличения скорости интернета',
      'Логического разделения сети на изолированные сегменты',
      'Подключения принтеров',
      'Защиты от вирусов'
    ],
    correctAnswer: 1
  },
  {
    id: 8,
    question: 'Что такое PoE (Power over Ethernet)?',
    options: [
      'Протокол передачи данных',
      'Технология передачи электропитания по сетевому кабелю',
      'Тип разъема',
      'Защита от перегрузки'
    ],
    correctAnswer: 1
  },
  {
    id: 9,
    question: 'Какой порт используется для первоначальной настройки MikroTik?',
    options: [
      'WAN',
      'ether1 или console',
      'USB',
      'HDMI'
    ],
    correctAnswer: 1
  },
  {
    id: 10,
    question: 'Что такое Winbox в контексте MikroTik?',
    options: [
      'Операционная система Windows',
      'Утилита для настройки и управления RouterOS',
      'Игровая консоль',
      'Антивирусная программа'
    ],
    correctAnswer: 1
  },
  {
    id: 11,
    question: 'Чем отличается управляемый коммутатор от неуправляемого?',
    options: [
      'Цветом корпуса',
      'Возможностью настройки параметров портов, VLAN, QoS',
      'Количеством портов',
      'Скоростью передачи данных'
    ],
    correctAnswer: 1
  },
  {
    id: 12,
    question: 'Что такое VPN в криптомаршрутизаторе?',
    options: [
      'Виртуальная частная сеть для защищенной передачи данных',
      'Тип процессора',
      'Операционная система',
      'Способ охлаждения устройства'
    ],
    correctAnswer: 0
  },
  {
    id: 13,
    question: 'Для чего нужен консольный порт на сетевом оборудовании?',
    options: [
      'Для подключения к интернету',
      'Для прямого подключения и настройки через терминал',
      'Для подключения монитора',
      'Для зарядки устройства'
    ],
    correctAnswer: 1
  },
  {
    id: 14,
    question: 'Что такое SFP порт на коммутаторе?',
    options: [
      'Обычный Ethernet порт',
      'Слот для установки модулей оптоволоконной связи',
      'USB разъем',
      'Порт питания'
    ],
    correctAnswer: 1
  },
  {
    id: 15,
    question: 'Какой стандарт шифрования чаще всего используется в криптомаршрутизаторах?',
    options: [
      'DES',
      'AES-256',
      'MD5',
      'Base64'
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