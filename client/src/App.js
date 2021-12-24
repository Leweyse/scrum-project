import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage, ProductsPage, LoginPage, SingleProductPage, CheckoutPage } from './pages';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <LandingPage /> } />
                <Route path="product" element={ <SingleProductPage/>}/>
                <Route path="products" element={ <ProductsPage /> } />
                <Route path="login" element={ <LoginPage /> } />
                <Route path="checkout" element={ <CheckoutPage /> } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
