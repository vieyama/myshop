let email = localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser')).email
    : ''
let token = localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser')).token
    : ''

export const initialState = {
    email: '' || email,
    token: '' || token,
    loading: false,
    errorMessage: null,
}

export const AuthReducer = (initialState, action) => {
    switch (action.type) {
        case 'REQUEST_LOGIN':
            return {
                ...initialState,
                loading: true,
            }
        case 'LOGIN_SUCCESS':
            return {
                ...initialState,
                ...action.payload,
            }
        case 'LOGOUT':
            return {
                ...initialState,
                email: '',
                token: '',
            }

        case 'LOGIN_ERROR':
            return {
                ...initialState,
                loading: false,
                errorMessage: action.error,
            }

        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}
