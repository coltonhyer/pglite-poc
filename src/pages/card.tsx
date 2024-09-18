import { useState } from 'react';
import Button from './button.tsx';

export default function Card(){
    let [count, setCount] = useState(0);
    return (
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex justify-center text-3xl text-black"> {count} </div>
            <div>
                <Button content="-" onClick={ () => setCount(count - 1) }/>
                <Button content="+" onClick={ () => setCount(count + 1) }/>
            </div>
        </div>
    )
}