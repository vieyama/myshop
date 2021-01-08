import axios from 'axios'
import { random } from 'lodash'
import provider from 'provider'

const ROOT_URL = process.env.REACT_APP_BASE_URL_AUTH

export async function loginUser(dispatch, loginPayload) {
    dispatch({ type: 'REQUEST_LOGIN' })
    return await axios
        .post(`${ROOT_URL}/login`, loginPayload)
        .then(async (res) => {
            const { data } = res
            const userid = random(1, 15)
            await provider.get(`/users/${userid}`).then((resUser) => {
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: { ...resUser, token: data.token },
                })
                localStorage.setItem(
                    'currentUser',
                    JSON.stringify({ ...resUser, token: data.token })
                )
                return { ...resUser, token: data.token }
            })
        })
        .catch((error) => {
            dispatch({ type: 'LOGIN_ERROR', error: error })
            console.log(error)
        })
}

export async function logout(dispatch) {
    dispatch({ type: 'LOGOUT' })
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
}
