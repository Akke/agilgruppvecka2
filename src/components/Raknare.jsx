import React, { useState } from 'react';

function Raknare() {
  const [count, setCount] = useState(0); 

  const handleClick = () => {
    setCount(count + 1);
  };

  return (<>
    
      <p>{count}</p> {}
      <button onClick={handleClick}>Öka</button> {/* Knappen */}
    </>
  );
}

export default Raknare;
