import React, { useState } from 'react';
import Filter from './components/Filter';
import Products from './components/Products';
import data from './data.json';

function App() {
    const [products, setProducts] = useState(data.products)
    const [size, setSize] = useState("")
    const [sort, setSort] = useState("")

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
        const sort = e.target.value
        setSort(sort)
        setProducts((products) => products.slice().sort((a, b) => (
            sort === "lowest" ? a.price > b.price ? 1 : -1 :
                sort === 'highest' ? a.price < b.price ? 1 : -1 : a._id > b._id ? 1 : -1
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
                        <Products products={products} />
                    </div>
                    <div className="sidebar">
                        Cart Items
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