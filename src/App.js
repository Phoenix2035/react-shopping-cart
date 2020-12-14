import React, { useState } from 'react';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/Products';
import data from './data.json';

function App() {
    const [products, setProducts] = useState(data.products)
    const [size, setSize] = useState("")
    const [sort, setSort] = useState("")
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) ? JSON.parse(localStorage.getItem('cartItems')) : [])

    const createOrder = order => {
        alert("Need to save order for " + order.name)
    }

    const removeFromCart = product => {
        const carts = cartItems.slice()
        setCartItems(carts.filter(item => item._id !== product._id))
        localStorage.setItem("cartItems", JSON.stringify(carts.filter(item => item._id !== product._id)))
    }

    const addToCart = product => {
        let alreadyInCart = false
        const carts = cartItems.slice()

        carts.forEach(item => {
            if (item._id === product._id) {
                item.count++
                alreadyInCart = true
            }
        })
        if (!alreadyInCart) {
            carts.push({ ...product, count: 1 })
        }
        setCartItems(carts)

        localStorage.setItem("cartItems", JSON.stringify(carts))
    }


    const filterProducts = (e) => {
        if (e.target.value === '') {
            setSize(e.target.value)
            setProducts(data.products)
        } else {
            setSize(e.target.value)
            setProducts(data.products.filter(item => item.availableSizes.indexOf(e.target.value) >= 0))
        }

    }
    const sortProducts = (e) => {
        const sortVal = e.target.value
        setSort(sortVal)
        setProducts((products) => products.slice().sort((a, b) => (
            sortVal === "lowest" ? a.price > b.price ? 1 : -1 :
                sortVal === 'highest' ? a.price < b.price ? 1 : -1 : a._id > b._id ? 1 : -1
        )))
    }

    return (
        <div className="grid-container">
            <header>
                <a href="/">React Shopping Cart</a>
            </header>
            <main>
                <div className="content">
                    <div className="main">
                        <Filter
                            count={products.length}
                            size={size}
                            sort={sort}
                            filterProducts={filterProducts}
                            sortProducts={sortProducts}
                        />
                        <Products products={products} addToCart={addToCart} />
                    </div>
                    <div className="sidebar">
                        <Cart cartItems={cartItems} removeFromCart={removeFromCart} addOrder={createOrder} />
                    </div>
                </div>
            </main>
            <footer>
                All right is reserved
            </footer>
        </div>
    );
}

export default App;