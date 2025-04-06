import React from 'react';
import { PieChart } from 'lucide-react';

interface DocumentationChartProps {
  percentage: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const DocumentationChart = ({ 
  percentage, 
  size = 'md', 
  showLabel = false 
}: DocumentationChartProps) => {
  // Determine the size of the chart
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-16 w-16'
  };

  // Calculate the circle's circumference
  const radius = size === 'sm' ? 12 : size === 'md' ? 16 : 28;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate the dash offset based on percentage
  const dashOffset = circumference - (percentage / 100) * circumference;

  // Determine text size based on chart size
  const textSize = size === 'sm' ? 'text-[8px]' : size === 'md' ? 'text-xs' : 'text-sm';

  return (
    <div className={`relative ${sizeClasses[size]} flex items-center justify-center`}>
      <svg className="w-full h-full" viewBox="0 0 44 44">
        {/* Background circle */}
        <circle
          className="text-muted/30 stroke-current"
          strokeWidth="4"
          fill="transparent"
          r={radius}
          cx="22"
          cy="22"
        />
        {/* Progress circle */}
        <circle
          className="text-primary stroke-current"
          strokeWidth="4"
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx="22"
          cy="22"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: dashOffset,
            transform: 'rotate(-90deg)',
            transformOrigin: 'center'
          }}
        />
        
        {/* Percentage text */}
        {(size === 'lg' || showLabel) && (
          <text
            x="22"
            y="22"
            textAnchor="middle"
            dominantBaseline="middle"
            className={`${textSize} font-medium fill-current`}
          >
            {percentage}%
          </text>
        )}
      </svg>
      
      {/* Small icon for small and medium sizes when not showing label */}
      {size !== 'lg' && !showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <PieChart className={`${size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'} text-primary`} />
        </div>
      )}
    </div>
  );
};

export default DocumentationChart;