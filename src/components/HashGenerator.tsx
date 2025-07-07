import React, { useState, useEffect } from 'react';
import BruteForceAnimation from './BruteForceAnimation';
import RecentList from './RecentList';
import { formatTime } from '../utils/timeUtils';

interface HashResult {
  id: number;
  hash: string;
  timestamp: string;
}

const HashGenerator: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isGenerating, setIsGenerating] = useState(false);
  const [recentHashes, setRecentHashes] = useState<HashResult[]>([]);
  const [currentSecond, setCurrentSecond] = useState(0);

  // Update time every 100ms for smooth animation
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setCurrentSecond(now.getSeconds());
      
      // Check if we're at a target second (0, 15, 30, 45)
      const second = now.getSeconds();
      if (second === 0 || second === 15 || second === 30 || second === 45) {
        if (!isGenerating) {
          generateHash(now);
        }
      } else {
        setIsGenerating(false);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, [isGenerating]);

  const generateHash = (time: Date) => {
    setIsGenerating(true);
    
    // Generate a random hash-like string (16 characters)
    const characters = 'abcdef0123456789';
    let hash = '';
    for (let i = 0; i < 16; i++) {
      hash += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    // Add it to recent hashes
    const newHash: HashResult = {
      id: Date.now(),
      hash,
      timestamp: formatTime(time),
    };
    
    // Add to beginning of array (newest first) and limit to 20
    setRecentHashes(prev => [newHash, ...prev].slice(0, 20));
    
    // Play sound effect (optional)
    const audio = new Audio(`data:audio/mp3;base64,${generateBeepSound()}`);
    audio.volume = 0.2;
    audio.play().catch(() => {});
  };

  // Function to generate a short beep sound encoded in base64
  // This is a simple placeholder that won't actually produce a sound
  const generateBeepSound = () => {
    return '';
  };

  // Calculate if we should be in "brute force" mode
  const shouldShowBruteForce = () => {
    const second = currentSecond;
    return second !== 0 && second !== 15 && second !== 30 && second !== 45;
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Digital clock */}
      <div className="text-center mb-6 mt-2">
        <div className="text-lg text-green-300 mb-1">SYSTEM TIME</div>
        <div className="text-4xl font-bold text-green-400 font-mono tracking-widest">
          {formatTime(currentTime)}
        </div>
      </div>
      
      {/* Hash generator display */}
      <div className="relative flex-1 border border-green-700 bg-black bg-opacity-80 rounded p-4 mb-6 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {shouldShowBruteForce() ? (
            <BruteForceAnimation targetSecond={getNextTargetSecond(currentSecond)} />
          ) : (
            <div className="text-2xl text-green-400 font-bold animate-pulse">
              {recentHashes.length > 0 ? recentHashes[0].hash : ''}
            </div>
          )}
        </div>
        
        {/* Simulated terminal output at the bottom */}
        <div className="absolute bottom-2 left-2 right-2 text-xs text-green-500 font-mono h-16 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="whitespace-nowrap overflow-hidden">
              $ {generateRandomCommand()} {i % 3 === 0 ? '[COMPLETE]' : '[RUNNING]'}
            </div>
          ))}
        </div>
      </div>
      
      {/* Recent hashes */}
      <div className="border border-green-700 rounded p-4">
        <div className="text-sm text-green-300 mb-2 flex justify-between">
          <span>RECENT HASH LIST</span>
          <span className="text-green-500">{recentHashes.length}/20</span>
        </div>
        <RecentList hashes={recentHashes} />
      </div>
    </div>
  );
};

// Helper function to determine the next target second
const getNextTargetSecond = (currentSecond: number): number => {
  if (currentSecond < 15) return 15;
  if (currentSecond < 30) return 30;
  if (currentSecond < 45) return 45;
  return 0;
};

// Generate random terminal-like commands for visual effect
const generateRandomCommand = (): string => {
  const commands = [
    'scan --target=192.168.1.* -p 22,80,443',
    'hash -a SHA256 -f /usr/data/secrets.bin',
    'decrypt --force --method=brute /encrypted/file.dat',
    'ssh root@10.0.3.7 -i ~/.keys/private.key',
    'nmap -sS -O --script=vuln 172.16.0.0/24',
    'inject --payload=reverse_shell.exe --target=vulnerable_service',
    'sudo tcpdump -i eth0 -n -s 0 -w capture.pcap',
    'cat /var/log/system.log | grep ERROR | tail -n 50',
    './exploit -t CVE-2025-1337 --target=host.victim.com',
    'curl -s -X POST https://api.target.com/v1/auth --data "user=admin"'
  ];
  
  return commands[Math.floor(Math.random() * commands.length)];
};

export default HashGenerator;