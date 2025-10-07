import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Users, LineChart, Zap, Shield, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

  const features = [
    {
      icon: Brain,
      title: "Cognitive Tracking",
      description: "Real-time IoT sensors monitor student attention, engagement, and stress levels",
    },
    {
      icon: LineChart,
      title: "Advanced Analytics",
      description: "Comprehensive dashboards with interactive charts and cognitive profiles",
    },
    {
      icon: Users,
      title: "Classroom Management",
      description: "Manage multiple classrooms with live heatmaps and student insights",
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "WebSocket-powered live data streaming for instant cognitive state changes",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "GDPR-compliant data handling with role-based access control",
    },
    {
      icon: TrendingUp,
      title: "Performance Insights",
      description: "Track trends and identify patterns to improve learning outcomes",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10" />
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6" data-testid="text-hero-title">
              NuEra
              <span className="block text-3xl md:text-4xl mt-2 text-muted-foreground">A New Era of Assessments</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8" data-testid="text-hero-subtitle">
              Integrating IoT cognitive tracking with traditional learning management for enhanced educational outcomes
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" onClick={() => setLocation('/teacher')} data-testid="button-cta-teacher">
                For Teachers
              </Button>
              <Button size="lg" variant="outline" onClick={() => setLocation('/teacher')} data-testid="button-cta-institution">
                For Institutions
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Powerful Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover-elevate h-full" data-testid={`card-feature-${index}`}>
                  <CardContent className="pt-6 space-y-3">
                    <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Education?</h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of educators using NuEra to enhance learning outcomes through cognitive insights
            </p>
            <Button size="lg" onClick={() => setLocation('/teacher')} data-testid="button-get-started">
              Get Started Today
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
