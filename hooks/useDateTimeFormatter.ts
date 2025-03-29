import { useState, useEffect } from 'react';

export const useDateTimeFormatter = () => {
  // State for real-time date
  const [currentDate, setCurrentDate] = useState(new Date());

  // Update date every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format current date
  const formattedDate = currentDate.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Format current time
  const formattedTime = currentDate.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return { currentDate, formattedDate, formattedTime };
};