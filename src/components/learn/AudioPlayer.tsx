import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Repeat, RotateCcw, Gauge } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AudioPlayerProps {
  audioUrl: string;
  title?: string;
  className?: string;
}

const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2];

export default function AudioPlayer({ audioUrl, title, className }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLoop, setIsLoop] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [waveformData] = useState(() =>
    Array.from({ length: 60 }, () => 0.2 + Math.random() * 0.8)
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoaded(true);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      if (!isLoop) {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isLoop]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleLoop = () => {
    setIsLoop(!isLoop);
    if (audioRef.current) {
      audioRef.current.loop = !isLoop;
    }
  };

  const reset = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    if (isPlaying) {
      setIsPlaying(false);
      audioRef.current.pause();
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={cn(
        'bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg shadow-purple-500/5',
        className
      )}
    >
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {title && (
        <h3 className="text-white font-semibold text-lg mb-4 font-display">
          {title}
        </h3>
      )}

      <div
        className="relative h-16 flex items-center justify-between gap-1 mb-4 cursor-pointer px-2"
        onClick={handleProgressClick}
      >
        {waveformData.map((height, index) => {
          const barPercent = (index / waveformData.length) * 100;
          const isActive = barPercent <= progressPercent;
          return (
            <div
              key={index}
              className={cn(
                'w-1 rounded-full transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-t from-purple-500 to-pink-500'
                  : 'bg-white/20'
              )}
              style={{
                height: `${height * 100}%`,
                opacity: isPlaying ? 0.6 + Math.random() * 0.4 : 1,
              }}
            />
          );
        })}
      </div>

      <div className="flex items-center justify-between text-white/60 text-sm mb-4">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={reset}
            className="p-2 text-white/60 hover:text-white transition-colors"
            title="重置"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={toggleLoop}
            className={cn(
              'p-2 rounded-full transition-all',
              isLoop
                ? 'text-purple-400 bg-purple-500/20'
                : 'text-white/60 hover:text-white'
            )}
            title="循环播放"
          >
            <Repeat className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={togglePlay}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 hover:scale-105 active:scale-95 transition-transform"
          disabled={!isLoaded}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-1" />
          )}
        </button>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <button
              onClick={toggleMute}
              className="p-2 text-white/60 hover:text-white transition-colors"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
            <div className="absolute bottom-full right-0 mb-2 w-24 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-full accent-purple-500"
              />
            </div>
          </div>

          <div className="relative group">
            <button className="p-2 text-white/60 hover:text-white transition-colors flex items-center gap-1">
              <Gauge className="w-5 h-5" />
              <span className="text-xs">{playbackRate}x</span>
            </button>
            <div className="absolute bottom-full right-0 mb-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto flex flex-col gap-1 min-w-[80px]">
              {playbackRates.map((rate) => (
                <button
                  key={rate}
                  onClick={() => setPlaybackRate(rate)}
                  className={cn(
                    'px-3 py-1.5 text-sm rounded-md transition-colors text-left',
                    playbackRate === rate
                      ? 'bg-purple-500/30 text-purple-200'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  )}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
