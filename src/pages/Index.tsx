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
  },
  {
    id: 16,
    question: 'Как определить диапазон IP-адресов по маске подсети 255.255.255.0?',
    options: [
      'Первые 3 октета фиксированы, последний октет от 0 до 255',
      'Все октеты могут меняться',
      'Только последние 2 октета могут меняться',
      'Маска не влияет на диапазон адресов'
    ],
    correctAnswer: 0
  },
  {
    id: 17,
    question: 'Что такое шлюз (Gateway) в сетевых настройках?',
    options: [
      'IP-адрес маршрутизатора для выхода в другие сети',
      'Адрес DNS-сервера',
      'MAC-адрес компьютера',
      'Имя сети Wi-Fi'
    ],
    correctAnswer: 0
  },
  {
    id: 18,
    question: 'Какой первый шаг при настройке SIP-телефона Yealink?',
    options: [
      'Установить приложение на телефон',
      'Узнать IP-адрес телефона и войти в веб-интерфейс',
      'Позвонить на тестовый номер',
      'Перезагрузить роутер'
    ],
    correctAnswer: 1
  },
  {
    id: 19,
    question: 'Какие параметры нужны для регистрации SIP-телефона?',
    options: [
      'Только IP-адрес',
      'SIP-сервер, логин, пароль, порт',
      'MAC-адрес и серийный номер',
      'Только номер телефона'
    ],
    correctAnswer: 1
  },
  {
    id: 20,
    question: 'Чем отличается закрытая аудио конференц-связь от обычного закрытого телефона?',
    options: [
      'Конференц-связь поддерживает только 2 участников',
      'Конференц-связь позволяет одновременное общение нескольких абонентов с шифрованием',
      'Закрытый телефон быстрее работает',
      'Никакой разницы нет'
    ],
    correctAnswer: 1
  },
  {
    id: 21,
    question: 'Если маска подсети 255.255.0.0, сколько хостов можно адресовать?',
    options: [
      '254 хоста',
      '65534 хоста',
      '256 хостов',
      '1024 хоста'
    ],
    correctAnswer: 1
  },
  {
    id: 22,
    question: 'Где в Yealink настраивается SIP-аккаунт?',
    options: [
      'В разделе Network',
      'В разделе Account',
      'В разделе Phone',
      'В разделе System'
    ],
    correctAnswer: 1
  },
  {
    id: 23,
    question: 'Что такое шлюз по умолчанию (Default Gateway)?',
    options: [
      'Первый доступный IP в сети',
      'IP-адрес устройства, через которое идет трафик за пределы локальной сети',
      'Последний IP-адрес в подсети',
      'Адрес DNS-сервера'
    ],
    correctAnswer: 1
  },
  {
    id: 24,
    question: 'Какой протокол используется для защищенной конференц-связи?',
    options: [
      'HTTP',
      'SRTP (Secure Real-time Transport Protocol)',
      'FTP',
      'SMTP'
    ],
    correctAnswer: 1
  },
  {
    id: 25,
    question: 'Как проверить, что SIP-телефон Yealink зарегистрирован на сервере?',
    options: [
      'Позвонить на любой номер',
      'Проверить статус регистрации в веб-интерфейсе или на дисплее телефона',
      'Перезагрузить телефон',
      'Проверить баланс счета'
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
  const [showReview, setShowReview] = useState(false);
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
    setShowReview(false);
    setUserName('');
  };

  const handleShowReview = () => {
    setShowReview(true);
  };

  const score = calculateScore();
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showReview) {
    return (
      <div className="min-h-screen relative bg-slate-900 p-4 py-8">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/6232b754-6081-4f86-8988-c38029f8384a/files/5ba7650d-5104-4a10-aa9b-c04a07794af1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/40 text-2xl font-bold tracking-widest">СВЯЗИСТ</div>
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white">Разбор ошибок</h2>
            <Button onClick={() => setShowReview(false)} variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              <Icon name="ArrowLeft" className="mr-2" size={20} />
              Назад к результатам
            </Button>
          </div>
          {questions.map((question, index) => {
            const userAnswer = selectedAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            return (
              <Card key={index} className={`shadow-lg border-2 ${
                isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
              }`}>
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCorrect ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      <Icon name={isCorrect ? 'Check' : 'X'} size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground mb-1">Вопрос {index + 1}</div>
                      <CardTitle className="text-lg">{question.question}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {question.options.map((option, optIndex) => {
                    const isUserAnswer = userAnswer === optIndex;
                    const isCorrectAnswer = question.correctAnswer === optIndex;
                    return (
                      <div
                        key={optIndex}
                        className={`p-3 rounded-lg border-2 ${
                          isCorrectAnswer ? 'border-green-500 bg-green-100' :
                          isUserAnswer ? 'border-red-500 bg-red-100' :
                          'border-slate-200 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {isCorrectAnswer && (
                            <Icon name="CheckCircle2" size={20} className="text-green-600 flex-shrink-0" />
                          )}
                          {isUserAnswer && !isCorrectAnswer && (
                            <Icon name="XCircle" size={20} className="text-red-600 flex-shrink-0" />
                          )}
                          <span className={`flex-1 ${
                            isCorrectAnswer ? 'font-semibold text-green-800' :
                            isUserAnswer ? 'font-semibold text-red-800' :
                            'text-slate-600'
                          }`}>{option}</span>
                          {isCorrectAnswer && (
                            <Badge variant="default" className="bg-green-600">Правильный ответ</Badge>
                          )}
                          {isUserAnswer && !isCorrectAnswer && (
                            <Badge variant="destructive">Ваш ответ</Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            );
          })}
          <Button onClick={handleRestart} className="w-full" size="lg">
            <Icon name="RotateCcw" className="mr-2" size={20} />
            Пройти тест заново
          </Button>
        </div>
      </div>
    );
  }

  if (showNameInput) {
    return (
      <div className="min-h-screen relative bg-slate-900 flex items-center justify-center p-4">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/6232b754-6081-4f86-8988-c38029f8384a/files/5ba7650d-5104-4a10-aa9b-c04a07794af1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/40 text-2xl font-bold tracking-widest">СВЯЗИСТ</div>
        <Card className="w-full max-w-md shadow-lg relative z-10">
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
      <div className="min-h-screen relative bg-slate-900 p-4 py-8">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/6232b754-6081-4f86-8988-c38029f8384a/files/5ba7650d-5104-4a10-aa9b-c04a07794af1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/40 text-2xl font-bold tracking-widest">СВЯЗИСТ</div>
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
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
              <div className="flex gap-3">
                <Button onClick={handleShowReview} variant="outline" className="flex-1" size="lg">
                  <Icon name="FileText" className="mr-2" size={20} />
                  Разбор ошибок
                </Button>
                <Button onClick={handleRestart} className="flex-1" size="lg">
                  <Icon name="RotateCcw" className="mr-2" size={20} />
                  Пройти заново
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg bg-white/95 backdrop-blur">
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
    <div className="min-h-screen relative bg-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/6232b754-6081-4f86-8988-c38029f8384a/files/5ba7650d-5104-4a10-aa9b-c04a07794af1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/40 text-2xl font-bold tracking-widest">СВЯЗИСТ</div>
      <Card className="w-full max-w-3xl shadow-lg relative z-10">
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