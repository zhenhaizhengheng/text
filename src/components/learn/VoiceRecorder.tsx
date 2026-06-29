import { useState, useRef, useEffect } from 'react';
import { Mic, Play, Pause, RotateCcw, Square } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoiceRecorderProps {
  onRecordingComplete?: (audioUrl: string, duration: number) => void;
  maxDuration?: number;
  className?: string;
}

export default function VoiceRecorder({
  onRecordingComplete,
  maxDuration = 60,
  className,
}: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);
  const [waveformData, setWaveformData] = useState<number[]>(
    Array.from({ length: 40 }, () => 0.2)
  );

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const animationRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hasSupport =
      typeof navigator.mediaDevices !== 'undefined' &&
      typeof MediaRecorder !== 'undefined';
    setIsSupported(hasSupport);
  }, []);

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  const cleanup = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (animationRef.current) clearInterval(animationRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const animateWaveform = () => {
    animationRef.current = setInterval(() => {
      setWaveformData(
        Array.from({ length: 40 }, () => 0.2 + Math.random() * 0.8)
      );
    }, 100);
  };

  const stopWaveformAnimation = () => {
    if (animationRef.current) {
      clearInterval(animationRef.current);
      animationRef.current = null;
    }
    setWaveformData(Array.from({ length: 40 }, () => 0.2));
  };

  const startRecording = async () => {
    if (!isSupported) {
      startSimulatedRecording();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/webm',
        });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        onRecordingComplete?.(url, duration);
        cleanup();
      };

      mediaRecorder.start();
      setIsRecording(true);
      setDuration(0);
      setAudioUrl(null);

      timerRef.current = setInterval(() => {
        setDuration((prev) => {
          if (prev >= maxDuration) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);

      animateWaveform();
    } catch (err) {
      console.error('Failed to start recording:', err);
      startSimulatedRecording();
    }
  };

  const startSimulatedRecording = () => {
    setIsSimulating(true);
    setIsRecording(true);
    setDuration(0);
    setAudioUrl(null);

    timerRef.current = setInterval(() => {
      setDuration((prev) => {
        if (prev >= maxDuration) {
          stopSimulatedRecording();
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    animateWaveform();
  };

  const stopSimulatedRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    stopWaveformAnimation();
    setIsRecording(false);
    setIsSimulating(false);

    const simulatedUrl =
      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
    setAudioUrl(simulatedUrl);
    onRecordingComplete?.(simulatedUrl, duration);
  };

  const stopRecording = () => {
    if (isSimulating) {
      stopSimulatedRecording();
      return;
    }

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== 'inactive'
    ) {
      mediaRecorderRef.current.stop();
    }

    if (timerRef.current) clearInterval(timerRef.current);
    stopWaveformAnimation();
    setIsRecording(false);
  };

  const togglePlayback = () => {
    if (!audioUrl) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const resetRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setAudioUrl(null);
    setIsPlaying(false);
    setDuration(0);
    stopWaveformAnimation();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={cn(
        'bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6',
        className
      )}
    >
      {!isSupported && (
        <div className="mb-4 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300 text-sm text-center">
          您的浏览器不支持录音功能，将使用模拟体验
        </div>
      )}

      <div className="flex items-center justify-center h-20 mb-6">
        <div className="flex items-center justify-between gap-1 w-full h-full px-4">
          {waveformData.map((height, index) => (
            <div
              key={index}
              className={cn(
                'w-1.5 rounded-full transition-all duration-100',
                isRecording
                  ? 'bg-gradient-to-t from-purple-500 to-pink-500'
                  : audioUrl
                  ? 'bg-gradient-to-t from-cyan-500 to-blue-500'
                  : 'bg-white/20'
              )}
              style={{
                height: `${height * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="text-center mb-6">
        <span
          className={cn(
            'text-4xl font-mono font-bold',
            isRecording ? 'text-red-400' : 'text-white'
          )}
        >
          {formatTime(duration)}
        </span>
        {isRecording && (
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 text-sm">正在录音</span>
          </div>
        )}
        {audioUrl && !isRecording && (
          <p className="text-white/60 text-sm mt-2">录音完成</p>
        )}
      </div>

      <div className="flex items-center justify-center gap-4">
        {!isRecording ? (
          <>
            {audioUrl && (
              <>
                <button
                  onClick={togglePlayback}
                  className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 flex items-center justify-center hover:bg-cyan-500/30 transition-all"
                  title="播放录音"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-0.5" />
                  )}
                </button>

                <button
                  onClick={resetRecording}
                  className="w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white/70 flex items-center justify-center hover:bg-white/20 hover:text-white transition-all"
                  title="重新录制"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </>
            )}

            <button
              onClick={startRecording}
              className={cn(
                'w-16 h-16 rounded-full flex items-center justify-center transition-all',
                'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/30 hover:scale-105 active:scale-95',
                audioUrl ? '' : 'animate-pulse-glow'
              )}
              title="开始录音"
            >
              <Mic className="w-7 h-7" />
            </button>
          </>
        ) : (
          <button
            onClick={stopRecording}
            className="w-16 h-16 rounded-full bg-red-600 text-white shadow-lg shadow-red-500/30 hover:bg-red-500 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            title="停止录音"
          >
            <Square className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}
