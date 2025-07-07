import React from 'react';

interface HashResult {
  id: number;
  hash: string;
  timestamp: string;
}

interface RecentListProps {
  hashes: HashResult[];
}

const RecentList: React.FC<RecentListProps> = ({ hashes }) => {
  if (hashes.length === 0) {
    return (
      <div className="flex items-center justify-center h-16 text-green-700">
        No hash results generated yet. Waiting for next interval...
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
      {hashes.map((hash) => (
        <div
          key={hash.id}
          className="flex-shrink-0 border border-green-800 bg-black bg-opacity-80 p-2 rounded 
                     hover:bg-green-900 hover:bg-opacity-30 transition-all duration-200 
                     cursor-pointer group relative"
          title={`Generated at ${hash.timestamp}`}
        >
          <div className="text-xs text-green-500 font-bold">{hash.hash}</div>
          <div className="absolute -bottom-6 left-0 right-0 text-xs text-green-700 opacity-0 
                          group-hover:opacity-100 transition-opacity duration-200 text-center">
            {hash.timestamp.split(' ')[1]}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentList;