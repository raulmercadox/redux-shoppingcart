import ProductItem from './ProductItem';
import classes from './Products.module.css';

const PRODUCTS = [
    {
        id: 'p1',
        title: 'Product 1',
        description: 'This is the amazing first product',
        price: 14.99
    },
    {
        id: 'p2',
        title: 'Product 2',
        description: 'This is the amazing second product',
        price: 19.99
    }
];

const Products = (props) => {
    return (
        <section className={classes.products}>
            <h2>Buy your favorite products</h2>
            <ul>
                {PRODUCTS.map(p => <ProductItem
                    id = {p.id}
                    key = {p.id}
                    title={p.title}
                    price={p.price}
                    description={p.description}
                />)}
            </ul>
        </section>
    );
};

export default Products;
