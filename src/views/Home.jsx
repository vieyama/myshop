import React, { useEffect, useState } from 'react'
import provider from 'provider'
import { ProductList } from 'components'
import InfiniteScroll from 'react-infinite-scroll-component'
import { concat, filter, isEmpty } from 'lodash'
import { useAuthState } from '../Context'
import { message } from 'antd'
import { useHistory } from 'react-router'

const Home = () => {
    const userDetails = useAuthState()
    const history = useHistory()
    const { token } = userDetails

    const [dataProduct, setDataProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    const getDataProduct = async () => {
        setLoading(true)
        await provider.get(`/product?page=${page}&limit=10`).then((res) => {
            setDataProduct(
                isEmpty(dataProduct) ? res : concat(dataProduct, res)
            )
            if (isEmpty(res)) {
                setHasMore(false)
            }
            setLoading(false)
        })
    }

    useEffect(() => {
        getDataProduct()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    const onLoadMore = async () => {
        setPage(page + 1)
    }

    const handleDelete = async (id) => {
        setLoading(true)
        const afterDelete = filter(dataProduct, (e) => e.id !== id)
        await provider.delete(`/product/${id}`).then(() => {
            setDataProduct(afterDelete)
            message.success('Data terhapus')
            setLoading(false)
        })
    }

    return (
        <div className="container">
            <div className="row" style={{ marginBottom: 20 }}>
                <div className="col" style={{ textAlign: 'start' }}>
                    <h2>Produk: </h2>
                </div>
                <div
                    className="col"
                    style={{ textAlign: 'end', alignSelf: 'center' }}
                >
                    {!isEmpty(token) && (
                        <button
                            className="primary"
                            onClick={() =>
                                history.push({
                                    pathname: '/product',
                                    state: { id: '' },
                                })
                            }
                        >
                            Tambah data
                        </button>
                    )}
                </div>
            </div>
            <InfiniteScroll
                dataLength={dataProduct.length}
                next={onLoadMore}
                hasMore={hasMore}
                endMessage=""
                loader={
                    <div
                        style={{
                            textAlign: 'center',
                            marginTop: 20,
                            height: 32,
                            lineHeight: '32px',
                        }}
                    >
                        Memuat...
                    </div>
                }
            >
                <ProductList
                    data={dataProduct}
                    loading={loading}
                    token={token}
                    handleDelete={handleDelete}
                />
            </InfiniteScroll>
        </div>
    )
}

export default Home
