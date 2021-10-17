import { Fragment, useState } from 'react'
import Header from '@/Layouts/Header'
import Footer from '@/Layouts/Footer'
import CartItem from './CartItem'
import OrderSummary from './OrderSummary'

const products = [
    {
        id: 1,
        name: 'Basic Tee',
        href: '#',
        price: '$32.00',
        color: 'Sienna',
        inStock: true,
        size: 'Large',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in sienna.",
    },
    {
        id: 2,
        name: 'Basic Tee',
        href: '#',
        price: '$32.00',
        color: 'Black',
        inStock: false,
        leadTime: '3–4 weeks',
        size: 'Large',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
    },
    {
        id: 3,
        name: 'Nomad Tumbler',
        href: '#',
        price: '$35.00',
        color: 'White',
        inStock: true,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg',
        imageAlt: 'Insulated bottle with white base and black snap lid.',
    },
]
const relatedProducts = [
    {
        id: 1,
        name: 'Billfold Wallet',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-related-product-01.jpg',
        imageAlt: 'Front of Billfold Wallet in natural leather.',
        price: '$118',
        color: 'Natural',
    },
    // More products...
]

export default function Example() {

    return (
        <div className="bg-white">
            {/* Mobile menu */}
            <Header>
            <main className="max-w-2xl px-4 pt-16 pb-24 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>

                <form className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
                    <section aria-labelledby="cart-heading" className="lg:col-span-7">
                        <h2 id="cart-heading" className="sr-only">
                            Items in your shopping cart
                        </h2>

                        <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
                            {products.map((product, productIdx) => (
                               <CartItem product={product} key={productIdx}/>
                            ))}
                        </ul>
                    </section>

                    {/* Order summary */}
                    <OrderSummary/>

                </form>

                {/* Related products */}
                <section aria-labelledby="related-heading" className="mt-24">
                    <h2 id="related-heading" className="text-lg font-medium text-gray-900">
                        You may also like&hellip;
                    </h2>

                    <div className="grid grid-cols-1 mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {relatedProducts.map((relatedProduct) => (
                            <div key={relatedProduct.id} className="relative group">
                                <div className="w-full overflow-hidden rounded-md min-h-80 aspect-w-1 aspect-h-1 group-hover:opacity-75 lg:h-80 lg:aspect-none">
                                    <img
                                        src={relatedProduct.imageSrc}
                                        alt={relatedProduct.imageAlt}
                                        className="object-cover object-center w-full h-full lg:w-full lg:h-full"
                                    />
                                </div>
                                <div className="flex justify-between mt-4">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <a href={relatedProduct.href}>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {relatedProduct.name}
                                            </a>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{relatedProduct.color}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{relatedProduct.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            </Header>
            <Footer/>
        </div>
    )
}
