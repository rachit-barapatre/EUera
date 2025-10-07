import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, ChevronLeft, ChevronRight, CheckCircle2, XCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  text: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
}

export default function Assessments() {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(1800);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<{
    score: number;
    totalQuestions: number;
    percentage: number;
  } | null>(null);

  const questions: Question[] = [
    {
      id: 1,
      text: "What is the derivative of f(x) = x² + 3x - 5?",
      options: [
        { id: "a", text: "2x + 3" },
        { id: "b", text: "x + 3" },
        { id: "c", text: "2x - 3" },
        { id: "d", text: "x² + 3" },
      ],
      correctAnswer: "a",
    },
    {
      id: 2,
      text: "Solve for x: 2x + 5 = 15",
      options: [
        { id: "a", text: "x = 5" },
        { id: "b", text: "x = 10" },
        { id: "c", text: "x = 7.5" },
        { id: "d", text: "x = 2.5" },
      ],
      correctAnswer: "a",
    },
    {
      id: 3,
      text: "What is the area of a circle with radius 5?",
      options: [
        { id: "a", text: "25π" },
        { id: "b", text: "10π" },
        { id: "c", text: "5π" },
        { id: "d", text: "15π" },
      ],
      correctAnswer: "a",
    },
  ];

  const submitMutation = useMutation({
    mutationFn: async () => {
      const score = questions.filter((q) => answers[q.id] === q.correctAnswer).length;
      const result = {
        assessmentId: "demo-assessment",
        studentId: "demo-student",
        answers: JSON.stringify(answers),
        score,
        totalQuestions: questions.length,
      };
      
      const response = await fetch("/api/assessment-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result),
      });

      if (!response.ok) throw new Error("Failed to submit");

      return {
        score,
        totalQuestions: questions.length,
        percentage: Math.round((score / questions.length) * 100),
      };
    },
    onSuccess: (result: { score: number; totalQuestions: number; percentage: number }) => {
      setAssessmentResult(result);
      setIsSubmitted(true);
      toast({
        title: "Assessment Submitted",
        description: `You scored ${result.score} out of ${result.totalQuestions} (${result.percentage}%)`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit assessment",
        variant: "destructive",
      });
    },
  });

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value });
  };

  const handleSubmit = () => {
    submitMutation.mutate();
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const cognitiveState = "green";
  const stateColors = {
    green: "bg-success",
    yellow: "bg-warning",
    red: "bg-error",
  };

  if (isSubmitted && assessmentResult) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 z-50">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold" data-testid="text-results-title">Assessment Results</h1>
            <p className="text-sm text-muted-foreground">Mathematics Assessment - Chapter 5: Derivatives</p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
          <Card>
            <CardHeader>
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold">Your Score</h2>
                <div className="text-6xl font-bold text-primary" data-testid="text-final-score">
                  {assessmentResult.percentage}%
                </div>
                <p className="text-muted-foreground">
                  {assessmentResult.score} out of {assessmentResult.totalQuestions} correct
                </p>
                <Badge 
                  className={assessmentResult.percentage >= 70 ? "bg-success text-white" : "bg-warning text-white"}
                  data-testid="badge-result"
                >
                  {assessmentResult.percentage >= 70 ? "Passed" : "Needs Improvement"}
                </Badge>
              </div>
            </CardHeader>
          </Card>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Answer Review</h3>
            {questions.map((question, index) => {
              const userAnswer = answers[question.id];
              const isCorrect = userAnswer === question.correctAnswer;
              const correctOption = question.options.find((opt) => opt.id === question.correctAnswer);
              const userOption = question.options.find((opt) => opt.id === userAnswer);

              return (
                <Card key={question.id} data-testid={`review-question-${question.id}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">Question {index + 1}</Badge>
                          {isCorrect ? (
                            <CheckCircle2 className="h-5 w-5 text-success" data-testid={`icon-correct-${question.id}`} />
                          ) : (
                            <XCircle className="h-5 w-5 text-error" data-testid={`icon-incorrect-${question.id}`} />
                          )}
                        </div>
                        <h3 className="text-lg font-semibold">{question.text}</h3>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Your answer:</p>
                      <div className={`p-3 rounded-md border-2 ${
                        isCorrect 
                          ? "border-success bg-success/10" 
                          : "border-error bg-error/10"
                      }`} data-testid={`user-answer-${question.id}`}>
                        {userOption ? userOption.text : "Not answered"}
                      </div>
                    </div>
                    {!isCorrect && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Correct answer:</p>
                        <div className="p-3 rounded-md border-2 border-success bg-success/10" data-testid={`correct-answer-${question.id}`}>
                          {correctOption?.text}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => window.location.reload()} data-testid="button-retake">
              Retake Assessment
            </Button>
            <Button onClick={() => window.history.back()} data-testid="button-back-dashboard">
              Back to Dashboard
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" data-testid="text-assessment-title">Mathematics Assessment</h1>
              <p className="text-sm text-muted-foreground">Chapter 5: Derivatives</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono font-medium" data-testid="text-timer">
                  {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${stateColors[cognitiveState]} animate-pulse`} data-testid="indicator-cognitive" />
                <span className="text-sm text-muted-foreground">Cognitive: Normal</span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium" data-testid="text-progress">
                {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" data-testid="progress-assessment" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <Badge variant="outline" className="mb-3">Question {currentQuestion + 1}</Badge>
                <h2 className="text-xl font-semibold" data-testid="text-question">
                  {questions[currentQuestion].text}
                </h2>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup 
              value={answers[questions[currentQuestion].id] || ""} 
              onValueChange={handleAnswerChange}
            >
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center space-x-3 p-4 rounded-md border border-border hover-elevate cursor-pointer"
                    onClick={() => handleAnswerChange(option.id)}
                    data-testid={`option-${option.id}`}
                  >
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                      {option.text}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            <div className="flex items-center justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                data-testid="button-previous"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <div className="text-sm text-muted-foreground">
                {Object.keys(answers).length} / {questions.length} answered
              </div>
              {currentQuestion < questions.length - 1 ? (
                <Button
                  onClick={() => setCurrentQuestion(currentQuestion + 1)}
                  data-testid="button-next"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit} 
                  disabled={submitMutation.isPending}
                  data-testid="button-submit"
                >
                  {submitMutation.isPending ? "Submitting..." : "Submit Assessment"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
