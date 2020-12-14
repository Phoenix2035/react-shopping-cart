import React, {useState} from 'react';
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import Zoom from "react-reveal/Zoom";
import Modal from 'react-modal';

function Products({products, addToCart}) {

    const [modalProduct, setModalProduct] = useState(null);

    const openModal = product => {
        setModalProduct({product})
    };

    const closeModal = () => {
        setModalProduct(null)
    };


    return (
        <div>
            <Fade bottom cascade>
                <ul className="products">
                    {
                        products.map(product =>
                            <li key={product._id}>
                                <div className="product">
                                    <a href={"#" + product._id}>
                                        <img
                                            onClick={() => openModal(product)}
                                            src={product.image}
                                            alt={product.title}/>
                                        <p>
                                            {product.title}
                                        </p>
                                    </a>
                                    <div className="product-price">
                                        <div>
                                            {formatCurrency(product.price)}
                                        </div>

                                        <button
                                            onClick={() => addToCart(product)}
                                            className="button primary">
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </li>
                        )
                    }
                </ul>
            </Fade>
            {
                modalProduct && (
                    <Modal isOpen onRequestClose={closeModal}>
                        {console.log(modalProduct.product)}
                        <Zoom>
                            <button className="close-modal" onClick={closeModal}>x</button>
                            <div className="product-details">
                                <img src={modalProduct.product.image} alt={modalProduct.product.title}/>
                                <div className="product-details-description">
                                    <p>
                                        <strong>{modalProduct.product.title}</strong>
                                    </p>

                                    <p>
                                        {modalProduct.product.description}
                                    </p>

                                    <p>
                                        Available Sizes: {" "}

                                        {modalProduct.product.availableSizes.map((item, i) =>
                                            <span key={i}>{" "}
                                                <button>{item}</button>
                                        </span>)}
                                    </p>
                                    <div className="product-price">
                                        <div>
                                            {formatCurrency(modalProduct.product.price)}
                                        </div>
                                        <button className="button primary" onClick={() => {
                                            addToCart(modalProduct.product);
                                            closeModal();
                                        }}>
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Zoom>
                    </Modal>
                )
            }
        </div>
    )
}

export default Products
