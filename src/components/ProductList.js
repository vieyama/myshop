import { isEmpty, map } from 'lodash'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { useHistory } from 'react-router'

export default function ProductList(props) {
    const { data, token, handleDelete } = props
    const history = useHistory()

    return (
        <div className="row">
            {map(data, (item, key) => (
                <div className="col" key={key}>
                    <div className="card-product">
                        <img
                            className="product-image"
                            src={`https://picsum.photos/id/${key + 1}/200/200`}
                            alt=""
                            style={{
                                backgroundImage: `url(https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081)`,
                                backgroundSize: 'contain',
                            }}
                        />
                        <div className="product-desc">
                            <h3 className="product-name">
                                {item.product_name}
                            </h3>
                            <h4 className="product-sku">
                                Kode SKU : {item.code_sku}
                            </h4>
                            <h4 className="product-price">
                                Rp. {item.price} | {item.qty} pcs
                            </h4>
                            {!isEmpty(token) && (
                                <div className="product-action">
                                    <button
                                        className="link"
                                        style={{ marginRight: 10 }}
                                        onClick={() =>
                                            history.push({
                                                pathname: '/product',
                                                state: { id: item.id },
                                            })
                                        }
                                    >
                                        <AiOutlineEdit />
                                    </button>
                                    <button
                                        className="link"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        <AiOutlineDelete />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
