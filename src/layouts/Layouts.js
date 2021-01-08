import React from 'react'
import Header from './Header'
import { useAuthState } from '../Context'

const Layouts = ({ children }) => {
    const userDetails = useAuthState()
    let d = new Date()
    let year = d.getFullYear()
    return (
        <div className="layouts">
            <Header userDetails={userDetails} />
            <div className="content">{children}</div>
            <footer>&copy; MyShop {year}</footer>
        </div>
    )
}

export default Layouts
