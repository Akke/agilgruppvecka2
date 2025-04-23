import { useState } from "react";

const Counter = () => {
    const [count, setCount] = useState(0);
    const addToCount = () => {
        setCount(count + 1)
    }


    return (
        <div>
            {count}
            <button onClick={addToCount}>+</button>
        </div>
            
        
    );
}

export default Counter;