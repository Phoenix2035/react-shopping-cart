import React, {useState} from 'react';
import formatCurrency from '../util';
import Fade from "react-reveal/Fade";


function Cart({cartItems, removeFromCart, addOrder}) {
    const [showCheckout, setShowCheckout] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")

    const createOrder = e => {
        e.preventDefault();
        const order = {
            name,
            email,
            address,
            cartItems
        };
        addOrder(order)
    };

    return (
        <div>
            {
                cartItems.length === 0 ?
                    <div className="cart cart-header">Cart is Empty</div>
                    :
                    <div className="cart cart-header">You have {cartItems.length} in the Cart {" "}</div>
            }
            <div>
                <div className="cart">
                    <Fade left cascade>
                        <ul className="cart-items">
                            {
                                cartItems.map(item =>
                                    <li key={item._id}>
                                        <div>
                                            <img src={item.image} alt={item.title}/>
                                        </div>
                                        <div>
                                            <div>{item.title}</div>
                                            <div className="right">
                                                {formatCurrency(item.price)} x {item.count}{" "}
                                                <button className="button" onClick={() => removeFromCart(item)}>Remove
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                )
                            }
                        </ul>
                    </Fade>
                </div>
                {cartItems.length !== 0 && (
                    <div>
                        <div className="cart">
                            <div className="total">
                                <div>
                                    Total:{" "}
                                    {formatCurrency(cartItems.reduce((a, c) => a + c.price * c.count, 0))}
                                </div>
                                <button onClick={() => setShowCheckout(true)} className="button primary">Proceed
                                </button>
                            </div>
                        </div>

                        {
                            showCheckout && (
                                <Fade top cascade>
                                    <div className="cart">
                                        <form onSubmit={createOrder}>
                                            <ul className="form-container">
                                                <li>
                                                    <label>Email</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        onChange={e => setEmail(e.target.value)}
                                                        required/>
                                                </li>

                                                <li>
                                                    <label>Name</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        onChange={e => setName(e.target.value)}
                                                        required/>
                                                </li>

                                                <li>
                                                    <label>Address</label>
                                                    <input
                                                        type="text"
                                                        name="address"
                                                        onChange={e => setAddress(e.target.value)}
                                                        required/>
                                                </li>

                                                <li>
                                                    <button className="button primary" type="submit">Checkout</button>
                                                </li>
                                            </ul>
                                        </form>
                                    </div>
                                </Fade>
                            )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart
