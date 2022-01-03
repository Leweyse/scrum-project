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

                {/* All Products */}
                <Route path="products" element={ <ProductsPage /> } />
                {/* Single Products */}
                <Route path="products/:id" element={ <SingleProductPage/>} />

                {/* User account */}
                <Route path="login" element={ <LoginPage /> } />
                <Route path="sign-up" element={ <SignUpPage /> } />
                <Route path="reset-password" element={ <ResetPasswordPage /> } />

                {/* Info user account */}
                <Route path="profile" element={ <ProfilePage /> } />

                {/* Info user: Buy */}
                <Route path="cart" element={ <CartPage /> } />
                <Route path="checkout" element={ <CheckoutPage /> } />

                {/* Add, edit Product */}
                <Route path="product/add" element={ <AddListingPage /> } />
                <Route path="product/update/:id" element={ <EditListingPage /> } />

                {/* Default Route */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;