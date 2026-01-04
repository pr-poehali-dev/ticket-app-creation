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
    question: 'Разрешается ли Вам остановка в указанном месте?',
    options: [
      'Разрешается',
      'Разрешается только для посадки или высадки пассажиров',
      'Запрещается',
      'Разрешается, если не создается помех другим участникам движения'
    ],
    correctAnswer: 2
  },
  {
    id: 2,
    question: 'Какие транспортные средства по Правилам относятся к маршрутным транспортным средствам?',
    options: [
      'Все автобусы',
      'Автобусы, троллейбусы и трамваи, предназначенные для перевозки людей и движущиеся по установленному маршруту',
      'Любые транспортные средства, перевозящие пассажиров',
      'Автобусы и маршрутные такси'
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    question: 'Вы намерены повернуть направо. Можете ли Вы приступить к повороту?',
    options: [
      'Можете',
      'Можете, уступив дорогу пешеходам',
      'Не можете',
      'Можете одновременно с пешеходами'
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    question: 'Разрешено ли Вам выполнить обгон в данной ситуации?',
    options: [
      'Разрешено',
      'Разрешено, если обгон будет завершен до перекрестка',
      'Запрещено',
      'Разрешено только на нерегулируемом перекрестке'
    ],
    correctAnswer: 2
  },
  {
    id: 5,
    question: 'Какое значение имеет термин "Недостаточная видимость"?',
    options: [
      'Видимость дороги менее 100 м',
      'Видимость дороги менее 150 м',
      'Видимость дороги менее 300 м в условиях тумана, дождя, снегопада',
      'Видимость дороги менее 300 м'
    ],
    correctAnswer: 2
  },
  {
    id: 6,
    question: 'В каких случаях водителю запрещается движение со скоростью более 50 км/ч?',
    options: [
      'При управлении мопедом',
      'При буксировке механического транспортного средства',
      'Если соответствующий запрет установлен дорожным знаком',
      'Во всех перечисленных случаях'
    ],
    correctAnswer: 3
  },
  {
    id: 7,
    question: 'Разрешается ли Вам въехать на мост одновременно с мотоциклистом?',
    options: [
      'Разрешается',
      'Разрешается, если Вы не затрудните ему движение',
      'Запрещается',
      'Разрешается только на большой скорости'
    ],
    correctAnswer: 2
  },
  {
    id: 8,
    question: 'Обязаны ли Вы в данной ситуации подать сигнал правого поворота?',
    options: [
      'Обязаны',
      'Обязаны только в темное время суток',
      'Не обязаны',
      'Обязаны при наличии других участников движения'
    ],
    correctAnswer: 0
  },
  {
    id: 9,
    question: 'По какой траектории Вам разрешено выполнить разворот?',
    options: [
      'Только по А',
      'Только по Б',
      'По любой',
      'Ни по одной из предложенных'
    ],
    correctAnswer: 0
  },
  {
    id: 10,
    question: 'Что означает мигание зеленого сигнала светофора?',
    options: [
      'Предупреждает о неисправности светофора',
      'Разрешает движение и информирует о том, что вскоре будет включен запрещающий сигнал',
      'Запрещает дальнейшее движение',
      'Требует снизить скорость'
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
            <CardTitle className="text-2xl font-bold">Экзаменационный тест</CardTitle>
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