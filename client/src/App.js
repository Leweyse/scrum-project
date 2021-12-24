import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage, ProductsPage, LoginPage, SignUpPage, SingleProductPage, CheckoutPage } from './pages';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <LandingPage /> } />
                <Route path="product" element={ 
                    <SingleProductPage
                        src={'https://m.media-amazon.com/images/I/61kocbtP2QL._AC_SL1000_.jpg'}
                        name={'Vinyl Ex:Re'}
                        price={'30.00 $'}
                        seller={'Daryl Castro'}
                        description={"Sick vinyl bro, pls buy so I can pay my rent!"}
                    /> 
                }/>
                <Route path="products" element={ <ProductsPage /> } />
                <Route path="login" element={ <LoginPage /> } />
                <Route path="register" element={ <SignUpPage /> } />
                <Route path="checkout" element={ <CheckoutPage /> } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
