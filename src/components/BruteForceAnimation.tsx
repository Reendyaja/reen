import React, { useEffect, useRef } from 'react';

interface BruteForceAnimationProps {
  targetSecond: number;
}

const BruteForceAnimation: React.FC<BruteForceAnimationProps> = ({ targetSecond }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Matrix rain effect
    const columns = Math.floor(canvas.width / 20);
    const drops: number[] = Array(columns).fill(0);
    
    // Characters to display (hexadecimal for hash-like appearance)
    const chars = '0123456789abcdef';
    
    const draw = () => {
      // Semi-transparent black background to create trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Green text
      ctx.fillStyle = '#00ff41';
      ctx.font = '15px monospace';
      
      // Draw the matrix rain
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        // x coordinate of the drop
        const x = i * 20;
        
        // y coordinate of the drop
        const y = drops[i] * 20;
        
        // Draw the character
        ctx.fillText(char, x, y);
        
        // Randomly reset some drops to the top
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Move the drop down
        drops[i]++;
      }
    };
    
    // Animate
    const interval = setInterval(draw, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  // Get current date and time
  const now = new Date();
  const currentSecond = now.getSeconds();
  
  // Calculate seconds until next target
  const secondsLeft = 
    targetSecond > currentSecond 
      ? targetSecond - currentSecond 
      : 60 - currentSecond + targetSecond;
  
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
      
      <div className="relative z-10 text-center">
        <div className="text-lg text-green-300 mb-2">BRUTE FORCE IN PROGRESS</div>
        <div className="flex mb-2">
          {Array.from({ length: 16 }, (_, i) => (
            <div 
              key={i} 
              className="w-6 h-8 mx-px bg-black border border-green-700 flex items-center justify-center overflow-hidden"
            >
              <div className="animate-pulse" style={{ animationDelay: `${i * 50}ms` }}>
                {['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)]}
              </div>
            </div>
          ))}
        </div>
        <div className="text-sm text-green-400">
          HASH GENERATION IN <span className="text-green-300 font-bold">{secondsLeft}</span> SECONDS
        </div>
      </div>
    </div>
  );
};

export default BruteForceAnimation;