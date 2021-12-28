import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
    LandingPage,
    ProductsPage,
    LoginPage,
    SignUpPage,
    SingleProductPage,
    CheckoutPage,
    AddListingPage,
    ResetPasswordPage,
    EditListingPage,
    CartPage,
    ProfilePage,
} from './pages';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <LandingPage /> } />
                <Route path="products" element={ <ProductsPage /> } />
                <Route path="products/:id" element={ <SingleProductPage/>} />
                <Route path="login" element={ <LoginPage /> } />
                <Route path="sign-up" element={ <SignUpPage /> } />
                <Route path="checkout" element={ <CheckoutPage /> } />
                <Route path="add" element={ <AddListingPage /> } />
                <Route path="edit" element={ <EditListingPage /> } />
                <Route path="reset-password" element={ <ResetPasswordPage /> } />
                <Route path="profile" element={ <ProfilePage /> } />
                <Route path="cart" element={ <CartPage /> } />

                {/* Default Route */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;