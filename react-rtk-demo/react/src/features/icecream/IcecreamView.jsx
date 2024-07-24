import { useSelector } from 'react-redux';


function IcecreamView() {
    const numbOfIcecream = useSelector((state) => state.icecream.numOfIceCreams);

    return (
        <div>
            <h2>Number of ice creams -  {numbOfIcecream}</h2>
            <button>Order ice cream</button>
            <button>Restock ice creams</button>
        </div>
    )
}

export default IcecreamView;