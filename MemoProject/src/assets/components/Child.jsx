import React from 'react'
import { memo } from 'react'

const Child = ({ name, sem, count }) => {
    console.log("hello world");
    console.log(name, sem);
    return (
        <>
            <div>
                Child
                {sem}
            </div>

            <p>Count from child {count}</p>
        </>
    )
}

export default memo(Child)
