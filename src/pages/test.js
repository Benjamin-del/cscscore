import React, { useState, useEffect } from 'react';

export default function MyComponent() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <p>The current time is: {time.toLocaleTimeString()}</p>;
}
