import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import bc4ecoGif from '../assets/BC4ECO.gif';
import uxdjpg from '../assets/UXD.jpg';
import bc4ecojpg from '../assets/BC4ECO.jpg';
import ircpng from '../assets/IRC.png';
import msc1png from '../assets/msc1.png';
import mscpng from '../assets/msc.png';
import isola24png from '../assets/isola24.png';
import afgrenjpg from '../assets/afgren.jpg';
import wavejpg from '../assets/wave.jpg';
export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const categories = ["All", "Web Development", "Mobile Apps", "UI/UX Design", "Photography"];

  const galleryItems = [
    {
      id: 1,
      title: "BC4ECO",
      category: "BC4ECO project",
      description: "Blockchain for education and sustainability",
      image: bc4ecoGif
    },
    {
      id: 2,
      title: "BC4ECO",
      category: "Research Ireland",
      description: "exile jornalism and media",
      image: ircpng
    },
    {
      id: 3,
      title: "Teaching",
      category: "UI/UX Design",
      description: "Final day of teaching UX Design course at University of Limerick,2024",
      image: uxdjpg
    },
    {
      id: 4,
      title: "BC4ECO",
      category: "Blockchain",
      description: "Collaborative task management platform",
      image: bc4ecojpg
    },
    {
      id: 5,
      title: "Bridging Applications and Networks Gaps",
      category: "MSc Project team",
      description: "Msc project team work in the university of the western cape",
      image:msc1png    
    },
    {
      id: 6,
      title: "Kabul University",
      category: "BSc student",
      description: "BSc student at Kabul University",
      image: mscpng
    },
    {
      id: 7,
      title: "ISOLA Confrence 2024",
      category: "Confrence",
      description: "Confrence on software engineering at Greece",
      image: isola24png
    },
    {
      id: 8,
      title: "AfgREN",
      category: "NATO for peace and security program",
      description: "Presentation of AfgREN project to the NATO leaders 2014",
      image: afgrenjpg
    },
    {
      id: 9,
      title: "WAVE the Research Irelan Project",
      category: "Project",
      description: "Pannal discussion of WAVE conference at University of Limerick, 2024",
      image: wavejpg
    }
  ];

  const filteredItems = selectedCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const handlePrevImage = () => {
    if (selectedImage === null) return;
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
    setSelectedImage(filteredItems[prevIndex].id);
  };

  const handleNextImage = () => {
    if (selectedImage === null) return;
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage);
    const nextIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
    setSelectedImage(filteredItems[nextIndex].id);
  };

  const selectedImageData = filteredItems.find(item => item.id === selectedImage);

  return (
    <section id="gallery" className="py-20 px-4 bg-background min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">Gallery</h1>
          <p className="text-muted-foreground">
            A showcase of my work, projects, and creative endeavors.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="px-6"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {filteredItems.map((item) => (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="group cursor-pointer w-full text-left bg-transparent border-none p-0"
                  onClick={() => setSelectedImage(item.id)}
                  aria-label={`View details for ${item.title}`}
                >
                  <div className="relative overflow-hidden rounded-lg shadow-lg">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center text-white p-4">
                        <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                        <p className="text-sm text-white/80">{item.description}</p>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="text-xs">
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0">
                {selectedImageData && (
                  <div className="relative">
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    <ImageWithFallback
                      src={selectedImageData.image}
                      alt={selectedImageData.title}
                      className="w-full h-auto max-h-[80vh] object-contain"
                    />
                    
                    <div className="p-6 bg-background">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-medium mb-2">{selectedImageData.title}</h3>
                          <p className="text-muted-foreground">{selectedImageData.description}</p>
                        </div>
                        <Badge variant="outline">{selectedImageData.category}</Badge>
                      </div>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Images
          </Button>
        </div>
      </div>
    </section>
  );
}