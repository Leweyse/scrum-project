import {ListingSection, Navbar, Footer} from "../../components";

export default function EditListingPage () {
    return (
        <>
            <Navbar/>
            <ListingSection name={"Pizza"} price={"5.00"} description={"Seller loves pizza"}/>
            <Footer/>
        </>
    )
}