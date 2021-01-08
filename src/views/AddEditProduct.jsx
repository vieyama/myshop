import { Form, message } from 'antd'
import { isEmpty } from 'lodash'
import provider from 'provider'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const Login = (props) => {
    const id = props.location.state.id
    const [form] = Form.useForm()
    const history = useHistory()

    const getProductById = async () => {
        await provider.get(`/product/${id}`).then((res) => {
            console.log(res)
            form.setFieldsValue({
                ...res,
            })
        })
    }

    useEffect(() => {
        if (!isEmpty(id)) {
            getProductById()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleFinish = async (value) => {
        console.log(value)

        if (isEmpty(id)) {
            await provider.insert('/product', value).then(() => {
                message.success('Tambah data berhasil')
                history.push('/')
            })
        } else {
            await provider.update(`/product/${id}`, value).then(() => {
                message.success('Update data berhasil')
                history.push('/')
            })
        }
    }

    return (
        <div className="row">
            <div className="col" style={{ justifySelf: 'center' }}>
                <div className="login-page" style={{ marginTop: 10 }}>
                    <h3>Tambah data produk</h3>

                    <Form name="basic" form={form} onFinish={handleFinish}>
                        <Form.Item
                            name="code_sku"
                            rules={[
                                {
                                    required: true,
                                    message: 'Form harus di isi!',
                                },
                            ]}
                        >
                            <input
                                placeholder="Kode SKU"
                                type="number"
                                className="form-input"
                            />
                        </Form.Item>

                        <Form.Item
                            name="product_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Form harus di isi!',
                                },
                            ]}
                        >
                            <input
                                placeholder="Nama Produk"
                                type="text"
                                className="form-input"
                            />
                        </Form.Item>

                        <Form.Item
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: 'Form harus di isi!',
                                },
                            ]}
                        >
                            <input
                                placeholder="Harga Produk"
                                type="number"
                                className="form-input"
                            />
                        </Form.Item>

                        <Form.Item
                            name="qty"
                            rules={[
                                {
                                    required: true,
                                    message: 'Form harus di isi!',
                                },
                            ]}
                        >
                            <input
                                placeholder="Jumlah Produk"
                                type="number"
                                className="form-input"
                            />
                        </Form.Item>

                        <Form.Item
                            name="product_image"
                            valuePropName="fileList"
                            rules={[
                                {
                                    required: isEmpty(id) ? true : false,
                                    message: 'Form harus di isi!',
                                },
                            ]}
                        >
                            <input
                                placeholder="Gambar Produk"
                                type="file"
                                className="form-input"
                                accept="image/*"
                            />
                        </Form.Item>

                        <Form.Item style={{ marginTop: 20 }}>
                            <button type="submit" style={{ marginRight: 10 }}>
                                {isEmpty(id) ? 'Tambah' : 'Update'}
                            </button>
                            <button onClick={() => history.push('/')}>
                                Batal
                            </button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login
