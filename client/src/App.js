import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PrivateRoutes from "./services/PrivateRoutes";

import {
    LandingPage,
    ProductsPage,
    LoginPage,
    SignUpPage,
    SingleProductPage,
    CheckoutPage,
    AddListingPage,
    ResetPasswordPage,
    ForgotPasswordPage,
    EditListingPage,
    CartPage,
    ProfilePage,
    ReturnCancellationPage,
    ContactPage,
} from './pages';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <LandingPage /> } />

                {/* User account */}
                <Route path="login" element={ <LoginPage /> } />
                <Route path="sign-up" element={ <SignUpPage /> } />
                <Route path="forgot-password" element={ <ForgotPasswordPage /> } />
                <Route path="reset-password/:token" element={ <ResetPasswordPage /> } />

                {/* All Products */}
                <Route path="products" element={ <ProductsPage /> } />
                {/* Single Products */}
                <Route path="products/:id" element={ <SingleProductPage/>} />

                <Route path="/user" element={<PrivateRoutes />}>
                    {/* Info user account */}
                    <Route path="/user/profile" element={ <ProfilePage /> } />

                    {/* Add, edit Product */}
                    <Route path="/user/product/add" element={ <AddListingPage /> } />
                    <Route path="/user/product/update/:id" element={ <EditListingPage /> } />

                    {/* Orders history */}
                    <Route path="/user/orders" element={<ReturnCancellationPage />} />
                </Route>

                {/* Info user: Buy */}
                <Route path="cart" element={ <CartPage /> } />
                <Route path="checkout" element={ <CheckoutPage /> } />

                {/* Default Route */}
                <Route path="*" element={<Navigate to="/" />} />

                {/* Contact page */}
                <Route path="contacts" element={<ContactPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;