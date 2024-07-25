// import { useSelector, useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ordered, restocked } from './cakeSlice';

const CakeView = () => {
    const numbOfCakes = useAppSelector((state) => state.cake.numOfCakes);
    const dispath = useAppDispatch();
    return (
        <div>
            <h2>Number of cake - {numbOfCakes} </h2>
            <button onClick={() => dispath(ordered())}>Order cake</button>
            <button onClick={() => dispath(restocked(5))}>Restock cake</button>
        </div>
    )
}

export default CakeView;