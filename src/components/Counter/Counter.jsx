import { useState } from "react";

const Counter = () => {
    const [count, setCount] = useState(0);
    const addToCount = () => {
        setCount(count + 1)
    }
    const subtractCount = () => {
        if(count == 0){
            return
        }
        setCount(count - 1)
    } 

    return (
        <div>
            <button onClick={subtractCount}>-</button>
            {count}
            <button onClick={addToCount}>+</button>
        </div>
            
        
    );
}

export default Counter;