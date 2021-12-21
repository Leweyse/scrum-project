import { ProductCard } from '../../components';

const ProductsPage = () => {
    return (
        <main id={'productsPage'}>
            <ProductCard 
                src={'https://m.media-amazon.com/images/I/61kocbtP2QL._AC_SL1000_.jpg'}
                title={'Vinyl Ex:Re'}
                price={'30.00 $'}
                seller={'Daryl Castro'}
            />
        </main>
    )
}

export default ProductsPage;