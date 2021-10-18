import { Fragment, useState, useEffect } from 'react'
import Header from '@/Layouts/Header'
import Footer from '@/Layouts/Footer'
import CartItem from './CartItem'
import OrderSummary from './OrderSummary'
import { Link } from '@inertiajs/inertia-react'

export default function ShoppingCart(props) {


    const cartItems = props.cart.products;

    useEffect(() => {

    }, [cartItems])



    return (
        <div className="bg-white">
            {/* Mobile menu */}
            <Header auth={props.auth}>
                <main className="max-w-2xl px-4 pt-16 pb-24 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>

                    <form className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
                        <section aria-labelledby="cart-heading" className="lg:col-span-7">
                            <h2 id="cart-heading" className="sr-only">
                                Items in your shopping cart
                            </h2>

                            <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
                                {cartItems.map((product, productIdx) => (
                                    <CartItem product={product} key={product.pivot.id} />
                                ))}
                            </ul>
                        </section>

                        {/* Order summary */}
                        <OrderSummary cart={props.cart} />

                    </form>

                    {/* Related products */}
                    <section aria-labelledby="related-heading" className="mt-24">
                        <h2 id="related-heading" className="text-lg font-medium text-gray-900">
                            You may also like&hellip;
                        </h2>

                        <div className="grid grid-cols-1 mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            <div className="relative group">
                                <div className="w-full overflow-hidden rounded-md min-h-80 aspect-w-1 aspect-h-1 group-hover:opacity-75 lg:h-80 lg:aspect-none">
                                    <img
                                        src={props.relatedProduct.image}

                                        className="object-cover object-center w-full h-full lg:w-full lg:h-full"
                                    />
                                </div>
                                <div className="flex justify-between mt-4">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <Link href={route('product', props.relatedProduct.name)}>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {props.relatedProduct.name}
                                            </Link>
                                        </h3>

                                    </div>
                                    <p className="text-sm font-medium text-gray-900">${props.relatedProduct.price}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </Header>
            <Footer />
        </div>
    )
}
