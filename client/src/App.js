import { BrowserRouter, Routes, Route } from "react-router-dom";
import { 
    LandingPage, 
    ProductsPage, 
    LoginPage, 
    SignUpPage, 
    SingleProductPage, 
    CheckoutPage,
    AddListingPage
} from './pages';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <LandingPage /> } />
                <Route path="product" element={ <SingleProductPage/>}/>
                <Route path="products" element={ <ProductsPage /> } />
                <Route path="login" element={ <LoginPage /> } />
                <Route path="sign-up" element={ <SignUpPage /> } />
                <Route path="checkout" element={ <CheckoutPage /> } />
                <Route path="add" element={ <AddListingPage /> } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
