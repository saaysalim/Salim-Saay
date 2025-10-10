import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ExternalLink, Github } from "lucide-react";
import bc4ecogpg from '../assets/BC4ECO.jpg';

export function Projects() {
  const projects = [
    {
      title: "BC4ECO Research Results and MOOC",
      description: " A MOOC developed based on this project. The MOOCs are meant to facilitate self-learning and a forum for students to interact with each other. The content created for the MOOCs were based on the offline courses but extended with extra references and examples. Additionally videos were recorded by the BC4ECO partners to introduce and contextualise the available material. the perfect environment to test and iterate the syllabi, the course design and the evaluation methods.",
      image: bc4ecogpg,
      technologies: ["Python", "Machine Learning", "Data Analysis", "Research", "Academic Writing"],
      liveUrl: "https://bc4eco.eu/",
      githubUrl: "https://github.com/saaysalim/BC4ECO/actions"
     },
    {
      title: "Cross-Continental Collaboration Tool",
      description: "A platform designed to facilitate research collaboration between institutions across Afghanistan, South Africa, and Estonia, supporting my international academic work.",
      image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzU4ODQxMzQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["Web Development", "Cloud Computing", "International Standards", "Multi-language Support"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com"
    },
    {
      title: "Academic Research Dashboard",
      description: "An analytical dashboard for tracking and visualizing research progress, publication metrics, and collaboration networks across my academic career.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NTg4NDEzNDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["Data Visualization", "Research Analytics", "Statistical Analysis", "Academic Metrics"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com"
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-background min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">Project</h1>
          <p className="text-muted-foreground">
            A showcase of my academic and research projects spanning my educational journey 
            across Afghanistan, South Africa, and Estonia.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-3 pt-2">
                  <Button size="sm" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              View All Projects on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}