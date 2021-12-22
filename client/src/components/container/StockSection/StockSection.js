import { ProductCard } from '../../block';

const StockSection = () => {
        return (
        <>
            <main id={'stockSection'}>
                {/* Testing purpose: create 10 components */}
                { Array.from(Array(10)).map(() => {
                    return (
                        <ProductCard
                            src={'https://m.media-amazon.com/images/I/61kocbtP2QL._AC_SL1000_.jpg'}
                            title={'Vinyl Ex:Re'}
                            price={'30.00 $'}
                            seller={'Daryl Castro'}
                        />  
                    )
                })}
            </main>
        </>
    )
}

export default StockSection;