import React from 'react';

const MapLegend: React.FC = () => {
  return (
    <div className="flex items-center text-xs">
      {[
        { color: 'bg-green-500', label: 'Terdokumentasi' },
        { color: 'bg-red-500', label: 'Belum' }
      ].map((item, i) => (
        <div key={i} className={`flex items-center ${i > 0 ? 'ml-3' : ''}`}>
          <div className={`w-3 h-1 ${item.color} mr-1`}></div>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default MapLegend;