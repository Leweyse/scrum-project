import { useEffect } from 'react';
import {ProductRow} from "../../components/block";
import {Footer, Navbar} from "../../components";

const ReturnCancellationPage = () => {

    return (
        <>
            <Navbar />
            <main id={"returnCancellationSection"}>
                <div className={"titleSection"}>
                    <h1>Returns</h1>
                    <p>Order history</p>
                </div>
                <section className={"totalSection"}>
                    <header>
                        <p className={"itemsColumn"}>Order number</p>
                        <p>Items</p>
                        <p>Quantity</p>
                        <p>Price</p>
                        <p>Total</p>
                        <p>   </p>
                    </header>
                    <section>
                        <p>SOMENUMBER</p>
                        <p>Title of product</p>
                        <p>2</p>
                        <p>35.00</p>
                        <p>70.00</p>
                        {/*<p id={"orderNumber"}>SOMENUMBER</p>*/}
                        {/*<ProductRow*/}
                        {/*    // key={idx}*/}
                        {/*    order={"SOMENUMBER"}*/}
                        {/*    title={"Title Product"}*/}
                        {/*    quantity={"2"}*/}
                        {/*    price={`34.00 $`}*/}
                        {/*    total={`68.00 $`}*/}
                        {/*    />*/}
                        <button>Return</button>
                    </section>
                    <section>
                        <p>SOMENUMBER</p>
                        <p>Title of product</p>
                        <p>2</p>
                        <p>35.00</p>
                        <p>70.00</p>
                        <button>Return</button>
                    </section>
                        <button id={"returnAll"}>Return all</button>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default ReturnCancellationPage;