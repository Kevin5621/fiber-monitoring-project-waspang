"use client";

import React from "react";

interface LoginVisualProps {
  isClient: boolean;
}

export function LoginVisual({ isClient }: LoginVisualProps) {
  return (
    <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary/5 via-primary/15 to-primary/25 relative overflow-hidden">
      {/* Subtle background blur effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full">
          {isClient && Array(5).fill(0).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-primary/20"
              style={{
                width: `${Math.random() * 400 + 200}px`,
                height: `${Math.random() * 400 + 200}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `translate(-50%, -50%)`,
                filter: 'blur(70px)',
                opacity: Math.random() * 0.3 + 0.1
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Main visual element - Clean network visualization */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-96 h-96">
          {/* Central hub node */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-16 h-16 bg-primary/70 rounded-full shadow-lg flex items-center justify-center backdrop-blur-sm">
              <svg className="w-8 h-8 text-primary-foreground" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4.75L19.25 9L12 13.25L4.75 9L12 4.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.25 11.25L4.75 14L12 18.25L19.25 14L14.75 11.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="absolute -inset-4 bg-primary/10 rounded-full blur-md animate-pulse" style={{ animationDuration: '3s' }}></div>
          </div>
          
          {/* network connections with data packet animation */}
          <div className="absolute inset-0">
            {/* Connection lines with data packet animations */}
            {[
              { angle: 15, length: 160 },   // Top-right
              { angle: 65, length: 180 },   // Right-top
              { angle: 120, length: 170 },  // Right-bottom
              { angle: 160, length: 150 },  // Bottom-right
              { angle: 195, length: 180 },  // Bottom-left
              { angle: 250, length: 170 },  // Left-bottom
              { angle: 290, length: 190 },  // Left-top
              { angle: 340, length: 160 },  // Top-left
            ].map((line, i) => {
              const angleRad = (line.angle) * (Math.PI / 180);
              
              return (
                <div 
                  key={i}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    height: '1.5px',
                    width: `${line.length}px`,
                    transform: `translate(-1px, -50%) rotate(${line.angle}deg)`,
                    transformOrigin: 'left center',
                  }}
                >
                  {/* Static line - and more subtle */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-full bg-primary/20"
                  />
                  
                  {/* data packet animation */}
                  <div className="relative h-full w-full">
                    {/* First data packet */}
                    <div 
                      className="absolute top-0 h-full w-4 bg-primary/80 blur-sm rounded-full"
                      style={{
                        animation: `cleanDataFlow 3s ${i * 0.4}s infinite`,
                        opacity: 0.8,
                      }}
                    />
                    
                    {/* Second data packet (delayed) */}
                    <div 
                      className="absolute top-0 h-full w-3 bg-primary/70 blur-sm rounded-full"
                      style={{
                        animation: `cleanDataFlow 3s ${i * 0.4 + 1.5}s infinite`,
                        opacity: 0.6,
                      }}
                    />
                  </div>
                  
                  {/* End node - design */}
                  <div 
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary/40 flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/80"></div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Clean data flow animation keyframes */}
          <style jsx>{`
            @keyframes cleanDataFlow {
              0% {
                left: 0;
                opacity: 0;
              }
              5% {
                opacity: 0.8;
              }
              95% {
                opacity: 0.8;
              }
              100% {
                left: calc(100% - 4px);
                opacity: 0;
              }
            }
          `}</style>
        </div>
      </div>
      
      {/* Brand title with design */}
      <div className="absolute bottom-16 left-0 w-full text-center">
        <div className="relative inline-block">
          <div className="absolute inset-0 -m-4 bg-primary/5 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '4s' }}></div>
          <h2 className="text-5xl font-bold relative">
            <span className="text-primary/20">Fiber</span>
            <span className="text-primary/70">Track</span>
          </h2>
          <div className="mt-2 text-sm text-primary/50 font-medium tracking-wider">FIBER NETWORK MANAGEMENT SYSTEM</div>
        </div>
      </div>
      
      {/* Subtle floating particles */}
      <div className="absolute inset-0">
        {isClient && Array(20).fill(0).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-primary/20"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.2,
              animation: `floatParticle ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
        
        <style jsx>{`
          @keyframes floatParticle {
            0% {
              transform: translateY(0) translateX(0);
            }
            50% {
              transform: translateY(-20px) translateX(10px);
            }
            100% {
              transform: translateY(0) translateX(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
}