import { Form, Button, message } from 'antd'
import { isEmpty } from 'lodash'
import provider from 'provider'
import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuthState } from '../Context'

const Register = () => {
    const [form] = Form.useForm()
    const history = useHistory()
    const userDetails = useAuthState()
    useEffect(() => {
        const { token } = userDetails
        !isEmpty(token) && history.push('/')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleRegister = async (value) => {
        await provider
            .register('/register', {
                email: value.email,
                password: value.password,
            })
            .then(async (res) => {
                delete value.password
                delete value.confirm
                const dataInsert = {
                    id: res.id,
                    ...value,
                }
                await provider
                    .insert('/users', dataInsert)
                    .then(() => {
                        message.success('Registrasi berhasil, silahkan login')
                        history.push('/')
                    })
                    .then(() =>
                        message.error('Registrasi gagal, silahkan coba lagi')
                    )
            })
    }

    return (
        <div className="row">
            <div className="col" style={{ justifySelf: 'center' }}>
                <div className="login-page">
                    <h3>Signup</h3>
                    <Form name="basic" form={form} onFinish={handleRegister}>
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Form harus di isi!',
                                },
                            ]}
                        >
                            <input
                                placeholder="Nama"
                                type="text"
                                className="form-input"
                            />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Form harus di isi!',
                                },
                            ]}
                        >
                            <input
                                placeholder="Nomor telepon"
                                type="text"
                                className="form-input"
                            />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Form harus di isi!',
                                },
                            ]}
                        >
                            <input
                                placeholder="Username"
                                type="text"
                                className="form-input"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Form harus di isi!',
                                },
                            ]}
                        >
                            <input
                                placeholder="Password"
                                type="password"
                                className="form-input"
                            />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Ulangi password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue('password') === value
                                        ) {
                                            return Promise.resolve()
                                        }
                                        return Promise.reject(
                                            'Password tidak sama!'
                                        )
                                    },
                                }),
                            ]}
                        >
                            <input
                                placeholder="Ulangi Password"
                                type="password"
                                className="form-input"
                            />
                        </Form.Item>

                        <Form.Item style={{ marginTop: 20 }}>
                            <Button type="primary" htmlType="submit">
                                Register
                            </Button>
                        </Form.Item>

                        <div style={{ marginTop: 25 }}>
                            Sudah memiliki akun? <Link to="/login">Login</Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Register
