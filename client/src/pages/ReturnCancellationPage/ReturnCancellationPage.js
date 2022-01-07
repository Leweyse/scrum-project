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
                        <p className={"itemsColumn"}>Items</p>
                        <p className={"itemsColumn"}>Quantity</p>
                        <p className={"itemsColumn"}>Price</p>
                        <p className={"itemsColumn"}>Total</p>
                        <p className={"itemsColumn"}>   </p>
                    </header>
                    <section>
                        <p className={"itemsColumn"}>SOMENUMBER</p>
                        <p className={"itemsColumn"}>Title of product</p>
                        <p className={"itemsColumn"}>2</p>
                        <p className={"itemsColumn"}>35.00</p>
                        <p className={"itemsColumn"}>70.00</p>
                        {/*<p id={"orderNumber"}>SOMENUMBER</p>*/}
                        {/*<ProductRow*/}
                        {/*    // key={idx}*/}
                        {/*    order={"SOMENUMBER"}*/}
                        {/*    title={"Title Product"}*/}
                        {/*    quantity={"2"}*/}
                        {/*    price={`34.00 $`}*/}
                        {/*    total={`68.00 $`}*/}
                        {/*    />*/}
                        <button className={"itemsColumn"}>Return</button>
                    </section>
                    <section>
                        <p className={"itemsColumn"}>SOMENUMBER</p>
                        <p className={"itemsColumn"}>Title of product</p>
                        <p className={"itemsColumn"}>2</p>
                        <p className={"itemsColumn"}>35.00</p>
                        <p className={"itemsColumn"}>70.00</p>
                        <button className={"itemsColumn"}>Return</button>
                    </section>
                    <section>
                        <button id={"returnAll"}>Return all</button>
                    </section>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default ReturnCancellationPage;