import { Navbar, Footer } from '../../components';

export default function CheckoutPage() {
    return (
        <>
            <Navbar />
            <main id={"checkoutPage"}>
                <p id={"checkoutTitle"}>Checkout</p>
                <form id={"checkoutForm"}>
                    <div className={"checkoutFormRow"}>
                        <label className={"checkoutFormUnit"}>
                            First name *
                            <input name={"firstName"} type={"text"} required/>
                        </label>
                        <label className={"checkoutFormUnit"}>
                            Last name *
                            <input name={"lastName"} type={"text"} required/>
                        </label>
                    </div>
                    <div className={"checkoutFormRow"}>
                        <label className={"checkoutFormUnit"}>
                            Phone number *
                            <input name={"phoneNumber"} type={"text"} required/>
                        </label>
                        <label className={"checkoutFormUnit"}>
                            Address line 1 *
                            <input name={"address1"} type={"text"} required/>
                        </label>
                    </div>
                    <div className={"checkoutFormRow"}>
                        <label className={"checkoutFormUnit"}>
                            Address line 2
                            <input name={"address2"} type={"text"}/>
                        </label>
                        <label className={"checkoutFormUnit"}>
                            Postcode *
                            <input name={"postcode"} type={"text"} required/>
                        </label>
                    </div>
                    <div className={"checkoutFormRow"}>
                        <label className={"checkoutFormUnit"}>
                            City *
                            <input name={"city"} type={"text"} required/>
                        </label>
                        <label className={"checkoutFormUnit"}>
                            Country *
                            <input name={"country"} type={"text"} required/>
                        </label>
                    </div>
                    <div className={"checkoutFormRow"}>
                        <label className={"checkoutFormUnit"}>
                            Payment method *
                            <span id={"checkoutRadio"}><input name={"paymentMethod"} type={"radio"} value={"Cash on delivery"} required/> Cash on delivery</span>
                        </label>
                        <button id={"checkoutPageConfirmButton"}>Confirm</button>
                    </div>
                </form>
            </main>
            <Footer />
        </>
    )
}