import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/common/Card';
import { skillRadar } from '@/data/user';
import type { SkillRadar } from '@/types';
import { Target } from 'lucide-react';

interface RadarChartProps {
  data?: SkillRadar;
}

const dimensions = [
  { key: 'vocabulary', label: '词汇', icon: '📚' },
  { key: 'grammar', label: '语法', icon: '📝' },
  { key: 'listening', label: '听力', icon: '🎧' },
  { key: 'speaking', label: '口语', icon: '🗣️' },
  { key: 'reading', label: '阅读', icon: '📖' },
  { key: 'writing', label: '写作', icon: '✍️' },
] as const;

export default function RadarChart({ data = skillRadar }: RadarChartProps) {
  const [animated, setAnimated] = useState(false);
  const [hoveredDim, setHoveredDim] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const centerX = 150;
  const centerY = 150;
  const radius = 100;
  const sides = 6;
  const angleOffset = -Math.PI / 2;

  const getPoint = (index: number, value: number) => {
    const angle = angleOffset + (index * 2 * Math.PI) / sides;
    const r = (value / 100) * radius;
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle),
    };
  };

  const getLabelPoint = (index: number) => {
    const angle = angleOffset + (index * 2 * Math.PI) / sides;
    const r = radius + 25;
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle),
    };
  };

  const dataPoints = dimensions.map((dim, idx) =>
    getPoint(idx, animated ? data[dim.key] : 0)
  );

  const pathD = dataPoints
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ') + ' Z';

  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1];

  const getAverage = () => {
    const values = dimensions.map((d) => data[d.key]);
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-cyan-400" />
              能力雷达图
            </CardTitle>
            <p className="text-sm text-white/60 mt-1">六大语言能力综合评估</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold gradient-text-blue">{getAverage()}</p>
            <p className="text-white/50 text-xs">综合评分</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <svg width="300" height="320" viewBox="0 0 300 320">
            <defs>
              <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.6" />
              </linearGradient>
              <filter id="radarGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="pointGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {gridLevels.map((level, idx) => {
              const points = dimensions.map((_, i) => getPoint(i, level * 100));
              const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
              return (
                <path
                  key={idx}
                  d={d}
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                />
              );
            })}

            {dimensions.map((_, idx) => {
              const point = getPoint(idx, 100);
              return (
                <line
                  key={idx}
                  x1={centerX}
                  y1={centerY}
                  x2={point.x}
                  y2={point.y}
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                />
              );
            })}

            <path
              d={pathD}
              fill="url(#radarGradient)"
              stroke="#a78bfa"
              strokeWidth="2"
              filter="url(#radarGlow)"
              style={{
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              className="opacity-80"
            />

            {dataPoints.map((point, idx) => {
              const dim = dimensions[idx];
              const isHovered = hoveredDim === dim.key;
              return (
                <g key={idx}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={isHovered ? 8 : 6}
                    fill="#a78bfa"
                    stroke="white"
                    strokeWidth="2"
                    filter="url(#pointGlow)"
                    style={{
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={() => setHoveredDim(dim.key)}
                    onMouseLeave={() => setHoveredDim(null)}
                  />
                  {isHovered && (
                    <text
                      x={point.x}
                      y={point.y - 15}
                      textAnchor="middle"
                      fill="white"
                      fontSize="14"
                      fontWeight="bold"
                    >
                      {data[dim.key]}
                    </text>
                  )}
                </g>
              );
            })}

            {dimensions.map((dim, idx) => {
              const labelPos = getLabelPoint(idx);
              const value = data[dim.key];
              const isHovered = hoveredDim === dim.key;
              return (
                <g key={idx}>
                  <text
                    x={labelPos.x}
                    y={labelPos.y - 8}
                    textAnchor="middle"
                    fontSize="20"
                  >
                    {dim.icon}
                  </text>
                  <text
                    x={labelPos.x}
                    y={labelPos.y + 10}
                    textAnchor="middle"
                    fill={isHovered ? '#a78bfa' : 'rgba(255,255,255,0.8)'}
                    fontSize="13"
                    fontWeight={isHovered ? 'bold' : 'normal'}
                    style={{ transition: 'all 0.2s ease', cursor: 'pointer' }}
                    onMouseEnter={() => setHoveredDim(dim.key)}
                    onMouseLeave={() => setHoveredDim(null)}
                  >
                    {dim.label}
                  </text>
                  <text
                    x={labelPos.x}
                    y={labelPos.y + 26}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.5)"
                    fontSize="11"
                  >
                    {value}分
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4">
          {dimensions.map((dim) => {
            const value = data[dim.key];
            const isHovered = hoveredDim === dim.key;
            return (
              <div
                key={dim.key}
                className={`p-3 rounded-xl bg-white/5 border transition-all duration-300 cursor-pointer ${
                  isHovered
                    ? 'border-purple-500/50 bg-purple-500/10'
                    : 'border-white/5 hover:border-white/20'
                }`}
                onMouseEnter={() => setHoveredDim(dim.key)}
                onMouseLeave={() => setHoveredDim(null)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{dim.icon}</span>
                  <span className="text-sm text-white/70">{dim.label}</span>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-xl font-bold text-white">{value}</span>
                  <div className="flex-1 mx-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400"
                      style={{
                        width: animated ? `${value}%` : '0%',
                        transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
