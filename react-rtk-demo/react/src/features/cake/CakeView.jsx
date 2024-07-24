import { useSelector } from 'react-redux';

const CakeView = () => {
    const numbOfCakes = useSelector((state) => state.cake.numOfCakes);
    return (
        <div>
            <h2>Number of cake - {numbOfCakes} </h2>
            <button>Order cake</button>
            <button>Restock cake</button>
        </div>
    )
}

export default CakeView;