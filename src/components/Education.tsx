import phdpng from '../assets/phd.png';
import mscpng from '../assets/msc.png';
import bscpng from '../assets/bsc.png';


export function Education() {
  const degrees = [
    {
      degree: "PhD (BC4ECO)",
      institution: "Tallinn University",
      location: "Estonia",
      description: "I studied my PhD at Tallinn University, Estonia.",
      image: phdpng
    },
    {
      degree: "MSc",
      institution: "University of the Western Cape",
      location: "South Africa", 
      description: "I studied my master degree at the University of the Western Cape south Africa.",
      image: mscpng
    },
    {
      degree: "BSc",
      institution: "Kabul University",
      location: "Afghanistan",
      description: "I studied BSc at Kabul University.",
      image: bscpng
    }
  ];



  return (
    <section id="education" className="py-20 px-4 bg-background min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">Education Background</h1>
          <p className="text-muted-foreground">Computer Science Education.</p>
        </div>

        <div className="space-y-12">
          {degrees.map((degree) => (
            <div key={degree.degree + degree.institution} className="space-y-4">
              <div className="border-b border-primary/30 pb-2 flex items-center gap-4">
                <img src={degree.image} alt={degree.degree + ' image'} className="w-16 h-16 rounded-full object-cover border" />
                <h2 className="text-2xl">{degree.degree}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {degree.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}