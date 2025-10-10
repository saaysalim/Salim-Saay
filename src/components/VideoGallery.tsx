import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Play, Pause, Volume2, Maximize } from "lucide-react";

interface VideoItem {
  title: string;
  description: string;
  duration: string;
  youtubeId?: string; // optional: if present render an embedded YouTube iframe
  thumbnailUrl?: string;
}

export function VideoGallery() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const videos: VideoItem[] = [
    {
      title: "Project Demo - React Dashboard",
      description: "A comprehensive dashboard built with React and TypeScript",
      duration: "5:30",
      thumbnailUrl: undefined,
    },
    {
      title: "Machine Learning Implementation",
      description: "Implementing ML algorithms in Python",
      duration: "8:45",
    },
    {
      title: "Mobile App Development",
      description: "Building cross-platform mobile apps with React Native",
      duration: "12:20",
    },
    {
      title: "Web Performance Optimization",
      description: "Techniques for optimizing web application performance",
      duration: "6:15",
    },
    {
      title: "Visualizing Paradigms for UML",
      description: "A recorded walkthrough available on YouTube",
      duration: "10:42",
      youtubeId: "BLG8l3f7B_k",
      thumbnailUrl: "https://img.youtube.com/vi/BLG8l3f7B_k/maxresdefault.jpg",
    },
  ];

  useEffect(() => {
    // Stop playback when changing videos
    setIsPlaying(false);
  }, [currentVideo]);

  const handlePrevious = () => {
    setCurrentVideo((prev) => (prev > 0 ? prev - 1 : videos.length - 1));
  };

  const handleNext = () => {
    setCurrentVideo((prev) => (prev < videos.length - 1 ? prev + 1 : 0));
  };

  const current = videos[currentVideo];

  // build iframe src (autoplay only when isPlaying)
  const youtubeSrc = (id?: string) => {
    if (!id) return undefined;
    const params = new URLSearchParams({ rel: '0' });
    if (isPlaying) params.set('autoplay', '1');
    // modestbranding=1 hides the YouTube logo, controls=1 shows controls
    params.set('modestbranding', '1');
    params.set('controls', '1');
    return `https://www.youtube.com/embed/${id}?${params.toString()}`;
  };

  return (
    <section id="video-gallery" className="py-20 px-4 bg-background min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">Video Gallery</h1>
          <p className="text-muted-foreground">
            Explore our collection of videos showcasing various topics and projects.
          </p>
        </div>

        {/* Video Player Container */}
        <div className="bg-card rounded-lg shadow-lg overflow-hidden mb-8">
          {/* Video Display Area */}
          <div className="relative bg-gray-900 aspect-video flex items-center justify-center">
            {current.youtubeId ? (
              // Render YouTube iframe when a youtubeId is present
              <iframe
                className="absolute inset-0 w-full h-full"
                src={youtubeSrc(current.youtubeId)}
                title={current.title}
                frameBorder="0"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <>
                {current.thumbnailUrl ? (
                  <img
                    src={current.thumbnailUrl}
                    alt={current.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Play className="w-8 h-8 ml-1" />
                      </div>
                      <h3 className="text-lg mb-2">{current.title}</h3>
                      <p className="text-sm text-white/80">{current.description}</p>
                    </div>
                  </div>
                )}

                {/* Play overlay for non-iframe videos */}
                {!current.youtubeId && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                      <Play className="w-10 h-10 text-white ml-1" />
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsPlaying((p) => !p)}
                    className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </button>
                  <span className="text-sm">0:00</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Volume2 className="w-5 h-5" />
                  <Maximize className="w-5 h-5" />
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-2">
                <div className="w-full h-1 bg-white/20 rounded-full">
                  <div className="w-0 h-full bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Video Info */}
          <div className="p-6">
            <h3 className="text-xl mb-2">{current.title}</h3>
            <p className="text-muted-foreground mb-4">{current.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Duration: {current.duration}</span>
              <span className="text-sm text-muted-foreground">Video {currentVideo + 1} of {videos.length}</span>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center space-x-4 mb-8">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            className="px-8"
          >
            Previous
          </Button>
          <Button 
            onClick={handleNext}
            className="px-8"
          >
            Next
          </Button>
        </div>

        {/* Video List */}
        <div className="grid gap-4">
          <h3 className="text-xl mb-4">All Videos</h3>
          {videos.map((video, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                index === currentVideo 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => setCurrentVideo(index)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{video.title}</h4>
                  <p className="text-sm text-muted-foreground">{video.description}</p>
                </div>
                <div className="text-sm text-muted-foreground">{video.duration}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}