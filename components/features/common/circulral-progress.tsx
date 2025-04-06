import React from 'react';

interface CircularProgressProps {
  percentage: number;
  size?: 'sm' | 'md' | 'lg';
  strokeWidth?: number;
  showPercentage?: boolean;
}

const CircularProgress = ({ 
  percentage, 
  size = 'md', 
  strokeWidth = 3,
  showPercentage = true  // Changed default to true to show percentage by default
}: CircularProgressProps) => {
  // Size mapping
  const sizeMap = {
    sm: 24,
    md: 32,
    lg: 48
  };
  
  const actualSize = sizeMap[size];
  const radius = (actualSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  // Color based on percentage
  const getColor = (percent: number) => {
    if (percent >= 100) return '#22c55e'; // Green for completed
    if (percent >= 70) return '#3b82f6';  // Blue for good progress
    if (percent >= 30) return '#f59e0b';  // Amber for medium progress
    return '#ef4444';                     // Red for low progress
  };

  // Font size based on component size
  const getFontSize = () => {
    if (size === 'sm') return '8px';
    if (size === 'md') return '10px';
    return '14px';
  };

  return (
    <div className="relative" style={{ width: actualSize, height: actualSize }}>
      {/* Background circle */}
      <svg width={actualSize} height={actualSize} viewBox={`0 0 ${actualSize} ${actualSize}`}>
        <circle
          cx={actualSize / 2}
          cy={actualSize / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/20"
        />
        
        {/* Progress circle */}
        <circle
          cx={actualSize / 2}
          cy={actualSize / 2}
          r={radius}
          fill="none"
          stroke={getColor(percentage)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${actualSize / 2} ${actualSize / 2})`}
        />
      </svg>
      
      {/* Percentage text */}
      {showPercentage && (
        <div 
          className="absolute inset-0 flex items-center justify-center font-medium"
          style={{ 
            color: getColor(percentage),
            fontSize: getFontSize()
          }}
        >
          {percentage}%
        </div>
      )}
    </div>
  );
};

export default CircularProgress;