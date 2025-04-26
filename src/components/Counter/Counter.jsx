import React from 'react';

export default function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <span data-testid="counter-value">{count}</span>
      <button onClick={() => setCount(count + 1)}>Öka</button>
    </div>
  );
}