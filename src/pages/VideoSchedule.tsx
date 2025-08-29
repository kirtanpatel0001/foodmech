
import { useEffect, useRef, useState } from 'react';

const VideoSchedule = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Try to play unmuted first; if blocked, play muted and show unmute button
  const tryPlay = async (withUnmute = true) => {
    const v = videoRef.current;
    if (!v) return;

    try {
      if (withUnmute) v.muted = false;
      await v.play();
      setIsPlaying(true);
      setAutoplayBlocked(false);
    } catch {
      // Autoplay with sound likely blocked by browser; fallback to muted autoplay
      try {
        v.muted = true;
        await v.play();
        setIsPlaying(true);
        setAutoplayBlocked(true);
      } catch {
        setIsPlaying(false);
        setAutoplayBlocked(true);
      }
    }
  };

  useEffect(() => {
    const v = videoRef.current;
    const container = containerRef.current;
    if (!container || !v) return;

    // Observe visibility: only play when at least half visible
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            // section is visible -> try to play with audio
            tryPlay(true);
          } else {
            // pause when not visible
            if (!v.paused) {
              v.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      { threshold: [0, 0.5, 1] }
    );

    obs.observe(container);

    return () => {
      obs.disconnect();
      if (!v.paused) v.pause();
    };
  }, []);

  const handleUnmuteClick = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      v.muted = false;
      await v.play();
      setAutoplayBlocked(false);
      setIsPlaying(true);
    } catch {
      // still blocked
      setAutoplayBlocked(true);
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen w-full flex items-center justify-center bg-black overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="public\images\intro_video.mp4"
        loop
        playsInline
        aria-label="Intro video"
      >
        Sorry, your browser does not support embedded videos.
      </video>

      

        {/* Unmute CTA when autoplay with audio is blocked */}
        {autoplayBlocked && (
          <div className="mt-4">
            <button
              onClick={handleUnmuteClick}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Unmute
            </button>
          </div>
        )}

        {/* Small state indicator (optional) */}
        <div className="absolute bottom-6 left-6 text-xs text-transparent/80">
          {isPlaying ? 'Playing' : 'Paused'}
        </div>
      </div>

  );
};

export default VideoSchedule;

