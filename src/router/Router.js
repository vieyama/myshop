import Home from 'views/Home'
import Login from 'views/Login'
import Register from 'views/Register'
import AddEditProduct from 'views/AddEditProduct'
var routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },

    {
        path: '/login',
        name: 'Login',
        component: Login,
    },

    {
        path: '/register',
        name: 'Register',
        component: Register,
    },

    {
        path: '/product',
        name: 'AddEditProduct',
        component: AddEditProduct,
    },
]
export default routes
