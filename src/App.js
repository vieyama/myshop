import React, { lazy } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Layout from 'layouts/Layouts'
import routes from 'router/Router'
import { AuthProvider } from './Context'

const NotFound = lazy(() => import('views/NotFound'))

const App = () => {
    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            return (
                <Route
                    path={prop.path}
                    component={prop.component}
                    key={key}
                    exact
                />
            )
        })
    }
    return (
        <AuthProvider>
            <BrowserRouter>
                <Layout>
                    <Switch>
                        {getRoutes(routes)}
                        <Route component={NotFound} path="*" />
                    </Switch>
                </Layout>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
