import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage.jsx'
import ProductsPage from "./pages/ProductsPage.jsx"
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import useLenis from './hooks/useLenis'
import ProfilePage from './pages/ProfilePage'
import WishlistPage from './pages/WishlistPage'
import AddressPage from './pages/AddressPage'
import OrdersPage from './pages/OrdersPage'
import CheckoutPage from './pages/CheckoutPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ProtectedRoute from './components/ProtectedRoute'
import AdminDashboard from './pages/AdminDashboard'
import AdminOrdersPage from './pages/AdminOrdersPage'
import AdminUsersPage from './pages/AdminUsersPage'
import AdminProductsPage from './pages/AdminProductsPage'
import HelpPage from './pages/HelpPage'
import ShippingPage from './pages/ShippingPage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import CareersPage from './pages/CareersPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import CookiesPage from './pages/CookiesPage'

function ScrollToTop() {
    const { pathname, search } = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname, search])
    return null
}

function App() {
    useLenis()

    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/addresses" element={<AddressPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="/shipping" element={<ShippingPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/cookies" element={<CookiesPage />} />
                <Route path="/admin" element={
                    <ProtectedRoute requiredRole="ADMIN">
                        <AdminDashboard />
                    </ProtectedRoute>
                } />
                <Route path="/admin/orders" element={
                    <ProtectedRoute requiredRole="ADMIN">
                        <AdminOrdersPage />
                    </ProtectedRoute>
                } />
                <Route path="/admin/users" element={
                    <ProtectedRoute requiredRole="ADMIN">
                        <AdminUsersPage />
                    </ProtectedRoute>
                } />
                <Route path="/admin/products" element={
                    <ProtectedRoute requiredRole="ADMIN">
                        <AdminProductsPage />
                    </ProtectedRoute>
                } />
            </Routes>
        </>
    )
}

export default App