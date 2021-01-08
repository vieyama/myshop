import { Form } from 'antd'
import { isEmpty } from 'lodash'
import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { loginUser, useAuthState, useAuthDispatch } from '../Context'

const Login = () => {
    const [form] = Form.useForm()
    const history = useHistory()

    const dispatch = useAuthDispatch()
    const { loading, errorMessage } = useAuthState()

    const userDetails = useAuthState()
    useEffect(() => {
        const { token } = userDetails
        !isEmpty(token) && history.push('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleLogin = async (value) => {
        await loginUser(dispatch, value).then(() => {
            history.push('/')
        })
    }

    return (
        <div className="row">
            <div className="col" style={{ justifySelf: 'center' }}>
                <div className="login-page" style={{ marginTop: 70 }}>
                    <h3>Login</h3>
                    {errorMessage ? (
                        <p className="error-login">{errorMessage}</p>
                    ) : null}
                    <Form name="basic" form={form} onFinish={handleLogin}>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <input
                                placeholder="Username"
                                type="text"
                                className="form-input"
                                disabled={loading}
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <input
                                placeholder="Password"
                                type="password"
                                className="form-input"
                                disabled={loading}
                            />
                        </Form.Item>

                        <Form.Item style={{ marginTop: 20 }}>
                            <button type="submit" disabled={loading}>
                                Submit
                            </button>
                        </Form.Item>

                        <div style={{ marginTop: 25 }}>
                            Belum memiliki akun?{' '}
                            <Link to="/register">Register</Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login
