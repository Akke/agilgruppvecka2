import { useState } from "react";

const Counter = () => {
    const [count, setCount] = useState(0);

    return (
        <>
            count is {count}
        </>
    );
}

export default Counter;