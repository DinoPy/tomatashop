import { NextPage } from 'next'
import React from 'react'
import { Product } from '../../types/interface/productPropsInterface'

const ProductItem: NextPage<{ product: Product }> = ({ product }) => {
    const item = (product: Product): JSX.Element => (
        <>
            <div> Yes </div>
            <div> Ya</div>

        </>
    )

    return (<>

        <div> {item(product)} </div>
    </>
    )
}

export default ProductItem