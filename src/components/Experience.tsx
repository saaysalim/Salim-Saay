import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, MapPin } from "lucide-react";

export function Experience() {
  const experiences = [
    {
      title: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      period: "2022 - Present",
      description: "Lead development of scalable web applications serving 100k+ users. Mentor junior developers and collaborate with product teams to deliver high-quality features.",
      achievements: [
        "Reduced application load time by 40% through optimization",
        "Led migration to microservices architecture",
        "Mentored 3 junior developers"
      ],
      technologies: ["React", "Node.js", "AWS", "TypeScript", "PostgreSQL"]
    },
    {
      title: "Full Stack Developer",
      company: "StartupX",
      location: "Austin, TX",
      period: "2021 - 2022",
      description: "Developed and maintained multiple client projects from conception to deployment. Worked closely with designers to implement pixel-perfect user interfaces.",
      achievements: [
        "Built 5 full-stack applications from scratch",
        "Implemented CI/CD pipelines reducing deployment time by 60%",
        "Increased client satisfaction score to 4.8/5"
      ],
      technologies: ["Vue.js", "Express", "MongoDB", "Docker", "GraphQL"]
    },
    {
      title: "Frontend Developer",
      company: "WebStudio",
      location: "Remote",
      period: "2020 - 2021",
      description: "Focused on creating responsive, accessible user interfaces for various client projects. Collaborated with UX designers to improve user experience.",
      achievements: [
        "Improved accessibility compliance to WCAG 2.1 AA standards",
        "Reduced bundle size by 35% through optimization",
        "Delivered 15+ responsive websites"
      ],
      technologies: ["JavaScript", "React", "SCSS", "Webpack", "Figma"]
    }
  ];

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      location: "California, USA",
      period: "2016 - 2020",
      description: "Relevant coursework: Data Structures, Algorithms, Database Systems, Software Engineering, Web Development"
    }
  ];

  return (
    <section id="experience" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-4xl mb-6">Experience & Education</h2>
          <p className="text-lg text-muted-foreground">
            My professional journey and the experiences that have shaped my career in software development.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h3 className="text-2xl mb-8">Professional Experience</h3>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <Card key={index} className="relative">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <CardTitle className="text-xl">{exp.title}</CardTitle>
                        <p className="text-lg text-primary">{exp.company}</p>
                      </div>
                      <div className="flex flex-col md:items-end gap-1">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1" />
                          {exp.period}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-1" />
                          {exp.location}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
                    
                    <div>
                      <h4 className="mb-2">Key Achievements:</h4>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="text-sm text-muted-foreground flex items-start">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  
                  {/* Timeline connector */}
                  {index !== experiences.length - 1 && (
                    <div className="absolute left-6 -bottom-3 w-px h-6 bg-border"></div>
                  )}
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl mb-8">Education</h3>
            {education.map((edu, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl">{edu.degree}</CardTitle>
                      <p className="text-lg text-primary">{edu.institution}</p>
                    </div>
                    <div className="flex flex-col md:items-end gap-1">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        {edu.period}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-1" />
                        {edu.location}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {edu.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}