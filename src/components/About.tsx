import { Card, CardContent } from "./ui/card";
import { Code, Lightbulb, Users, Zap } from "lucide-react";

export function About() {
  const qualities = [
    {
      icon: Code, 
      title: "Research & Teaching",
      description: "Teaching Software enigineering and conducting cutting-edge research in computer science and developing innovative solutions."
    },
    {
      icon: Lightbulb,
      title: "Academic Excellence",
      description: "PhD holder with extensive experience in theoretical and applied computer science and have experiance in industry."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Working with international teams and contributing to global research initiatives."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Pushing the boundaries of technology through research and practical applications."
    }
  ];

  return (
    <section id="about" className="py-20 px-4 bg-background min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-6">About</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I am Salim Saay, a dedicated researcher and developer with a PhD in Computer Science. 
            My academic journey has taken me across three continents, from Afghanistan to South Africa 
            to Estonia, enriching my perspective on technology and its global impact.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {qualities.map((quality) => {
            const Icon = quality.icon;
            return (
              <Card key={quality.title} className="text-center group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="mb-2">{quality.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {quality.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="bg-muted/50 rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl mb-4">My Journey</h3>
              <p className="text-muted-foreground mb-4">
                My academic journey began at Kabul University in Afghanistan, where I earned my BSc in Computer Science. 
                I then pursued my MSc at the University of the Western Cape in South Africa, broadening my international 
                perspective on technology and research.
              </p>
              <p className="text-muted-foreground">
                I completed my PhD at Tallinn University in Estonia, focusing on cutting-edge research 
                in Software Engineering. This diverse educational background has given me a unique global perspective 
                on technology and its applications across different cultures and contexts.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Research & Analysis</span>
                <span className="text-sm text-muted-foreground">98%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-[98%]"></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Academic Writing</span>
                <span className="text-sm text-muted-foreground">95%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-[95%]"></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Software Development</span>
                <span className="text-sm text-muted-foreground">92%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-[92%]"></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Project Management</span>
                <span className="text-sm text-muted-foreground">88%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-[88%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}