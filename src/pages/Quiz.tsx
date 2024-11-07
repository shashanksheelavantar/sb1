import { useState } from 'react';
import { CheckCircle, Circle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Question {
  id: number;
  text: string;
  options: string[];
  selectedOption?: number;
}

const Quiz = () => {
  const navigate = useNavigate();
  const [questions] = useState<Question[]>([
    {
      id: 1,
      text: 'Sample question 1?',
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    },
    {
      id: 2,
      text: 'Sample question 2?',
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    },
  ]);

  const [currentQuestion, setCurrentQuestion] = useState<Question>(questions[0]);

  const handleOptionSelect = (questionId: number, optionIndex: number) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      selectedOption: optionIndex,
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="group mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
      >
        <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" />
        <span className="text-sm font-medium">Back to Home</span>
      </button>

      <div className="grid grid-cols-12 gap-6">
        {/* Question Panel */}
        <div className="col-span-12 md:col-span-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Question {currentQuestion.id}
            </h2>
            <p className="text-gray-700 mb-6">{currentQuestion.text}</p>
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleOptionSelect(currentQuestion.id, index)}
                  className={`flex items-center p-4 rounded-lg cursor-pointer transition-all ${
                    currentQuestion.selectedOption === index
                      ? 'bg-blue-50 border-blue-200 border'
                      : 'hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {currentQuestion.selectedOption === index ? (
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-3" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400 mr-3" />
                  )}
                  <span className="text-gray-700">{option}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Question Navigation */}
        <div className="col-span-12 md:col-span-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Questions</h3>
            <div className="grid grid-cols-4 gap-2">
              {questions.map((question) => (
                <div
                  key={question.id}
                  onClick={() => setCurrentQuestion(question)}
                  className={`h-10 w-10 rounded-full flex items-center justify-center cursor-pointer ${
                    currentQuestion.id === question.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {question.id}
                </div>
              ))}
            </div>
            <Button className="w-full mt-6">Submit Test</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Quiz;