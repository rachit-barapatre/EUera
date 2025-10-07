import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function Assessments() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(1800);

  const questions = [
    {
      id: 1,
      text: "What is the derivative of f(x) = x² + 3x - 5?",
      options: [
        { id: "a", text: "2x + 3" },
        { id: "b", text: "x + 3" },
        { id: "c", text: "2x - 3" },
        { id: "d", text: "x² + 3" },
      ],
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
    },
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const cognitiveState = "green";
  const stateColors = {
    green: "bg-success",
    yellow: "bg-warning",
    red: "bg-error",
  };

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
            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center space-x-3 p-4 rounded-md border border-border hover-elevate cursor-pointer"
                    onClick={() => setSelectedAnswer(option.id)}
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
                Auto-saved at {new Date().toLocaleTimeString()}
              </div>
              <Button
                onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                disabled={currentQuestion === questions.length - 1}
                data-testid="button-next"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {currentQuestion === questions.length - 1 && (
              <Button className="w-full" size="lg" data-testid="button-submit">
                Submit Assessment
              </Button>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
