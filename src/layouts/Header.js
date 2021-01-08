import { isEmpty } from 'lodash'
import React from 'react'
import { useHistory } from 'react-router'
import { useAuthDispatch, logout } from '../Context'

function Header(props) {
    const dispatch = useAuthDispatch()
    const history = useHistory()
    const { userDetails } = props

    const handleLogout = () => {
        logout(dispatch)
        history.push('/')
    }
    return (
        <div className="header">
            <div className="header-left">
                <h2 className="header-logo">MyShop</h2>
            </div>
            <div className="header-right">
                {isEmpty(userDetails.token) ? (
                    <button
                        className="primary"
                        onClick={() => history.push('/login')}
                    >
                        Login
                    </button>
                ) : (
                    <div className="dropdown" style={{ float: 'right' }}>
                        <div className="profile">
                            <div style={{ alignSelf: 'center' }}>
                                <p className="user-name">{userDetails.name}</p>
                                <p className="user-email">{userDetails.email}</p>
                            </div>
                            <img
                                src="https://picsum.photos/id/1005/150/150"
                                className="header-avatar"
                                alt=""
                            />
                        </div>
                        <div className="dropdown-content">
                            <span
                                className="dropdown-link"
                                onClick={handleLogout}
                            >
                                Logout
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header
