//import { useSelector, useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ordered, restocked } from './icecreamSlice';
import { useState } from 'react';


function IcecreamView() {
    const [value, setValue] = useState(1);
    const numbOfIcecream = useAppSelector((state) => state.icecream.numOfIcecreams);
    const dispatch = useAppDispatch();

    return (
        <div>
            <h2>Number of ice creams -  {numbOfIcecream}</h2>
            <button onClick={() => dispatch(ordered())}>Order ice cream</button>
            <input
                type='number'
                value={value}
                onChange={e => setValue(parseInt(e.target.value))} />
            <button onClick={() => dispatch(restocked(value))}>Restock ice creams</button>
        </div>
    )
}

export default IcecreamView;