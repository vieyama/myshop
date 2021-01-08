import React from 'react'
import { useHistory } from 'react-router-dom'

const Page404 = () => {
    const history = useHistory()

    const handleRedirect = () => history.replace('/')

    return (
        <div className="not-found">
            <div className="row">
                <div className="col">
                    <img
                        src="https://image.freepik.com/free-vector/404-error-page-found_41910-364.jpg"
                        alt=""
                    />
                    <br/>
                    <button className="primary" onClick={handleRedirect}>
                        Back to home
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Page404
