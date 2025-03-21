
import React, { useEffect, useState } from 'react';

type MetricProps = {
  title: string;
  score: number;
  color: string;
  delay: number;
};

const CircleMetric: React.FC<MetricProps> = ({ title, score, color, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const circumference = 2 * Math.PI * 38;
  const progress = (score / 10) * circumference;
  const dashoffset = circumference - progress;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getColorClass = () => {
    if (score >= 8) return 'text-audit-green';
    if (score >= 6) return 'text-audit-yellow';
    return 'text-audit-red';
  };

  return (
    <div className="flex flex-col items-center gap-1 transition-opacity duration-500" style={{ opacity: isVisible ? 1 : 0 }}>
      <div className="metric-circle">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle 
            cx="50" 
            cy="50" 
            r="38" 
            fill="transparent" 
            stroke="#333" 
            strokeWidth="8"
          />
          <circle 
            cx="50" 
            cy="50" 
            r="38" 
            fill="transparent" 
            stroke={color} 
            strokeWidth="8" 
            strokeDasharray={circumference} 
            strokeDashoffset={isVisible ? dashoffset : circumference}
            transform="rotate(-90 50 50)"
            style={{ 
              transition: "stroke-dashoffset 1.5s ease-out",
            }}
            className="animate-[circle-progress_1.5s_ease-out_forwards]"
          />
        </svg>
        <div className={`metric-value ${getColorClass()}`}>
          {score}/10
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-300">{title}</p>
      </div>
    </div>
  );
};

type AuditMetricsProps = {
  metrics: {
    security: number;
    performance: number;
    gasEfficiency: number;
    codeQuality: number;
    documentation: number;
    otherKeyAreas: number;
  }
};

const AuditMetrics: React.FC<AuditMetricsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-2 gap-4 py-2">
      <CircleMetric title="Security" score={metrics.security} color={metrics.security >= 8 ? "#27AE60" : metrics.security >= 6 ? "#F2C94C" : "#EB5757"} delay={100} />
      <CircleMetric title="Performance" score={metrics.performance} color={metrics.performance >= 8 ? "#27AE60" : metrics.performance >= 6 ? "#F2C94C" : "#EB5757"} delay={300} />
      <CircleMetric title="Gas Efficiency" score={metrics.gasEfficiency} color={metrics.gasEfficiency >= 8 ? "#27AE60" : metrics.gasEfficiency >= 6 ? "#F2C94C" : "#EB5757"} delay={500} />
      <CircleMetric title="Code Quality" score={metrics.codeQuality} color={metrics.codeQuality >= 8 ? "#27AE60" : metrics.codeQuality >= 6 ? "#F2C94C" : "#EB5757"} delay={700} />
      <CircleMetric title="Documentation" score={metrics.documentation} color={metrics.documentation >= 8 ? "#27AE60" : metrics.documentation >= 6 ? "#F2C94C" : "#EB5757"} delay={900} />
    </div>
  );
};

export default AuditMetrics;
