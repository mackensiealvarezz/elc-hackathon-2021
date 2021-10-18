import { useState } from 'react'
import Header from '@/Layouts/Header'
import Footer from '@/Layouts/Footer'
import { StarIcon } from '@heroicons/react/solid'
import { useForm } from '@inertiajs/inertia-react'


const product = {

    breadcrumbs: [
        { id: 1, name: 'Travel', href: '#' },
        { id: 2, name: 'Bags', href: '#' },
    ],

}
const reviews = { average: 5, totalCount: 1624 }

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetail(props) {

    const { data, setData, post } = useForm({
        product_id: props.product.id,
    })

    const onClickHandler = (e) => {
        e.preventDefault()
        post(route('addToBag'))
    }

    return (
        <div className="bg-white">
            <Header auth={props.auth}>
                <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
                    {/* Product details */}
                    <div className="lg:max-w-lg lg:self-end">
                        <nav aria-label="Breadcrumb">
                            <ol role="list" className="flex items-center space-x-2">
                                {product.breadcrumbs.map((breadcrumb, breadcrumbIdx) => (
                                    <li key={breadcrumb.id}>
                                        <div className="flex items-center text-sm">
                                            <a href={breadcrumb.href} className="font-medium text-gray-500 hover:text-gray-900">
                                                {breadcrumb.name}
                                            </a>
                                            {breadcrumbIdx !== product.breadcrumbs.length - 1 ? (
                                                <svg
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                    className="flex-shrink-0 w-5 h-5 ml-2 text-gray-300"
                                                >
                                                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                                                </svg>
                                            ) : null}
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </nav>

                        <div className="mt-4">
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{props.product.name}</h1>
                        </div>

                        <section aria-labelledby="information-heading" className="mt-4">
                            <h2 id="information-heading" className="sr-only">
                                Product information
                            </h2>

                            <div className="flex items-center">
                                <p className="text-lg text-gray-900 sm:text-xl">${props.product.price}</p>

                                <div className="pl-4 ml-4 border-l border-gray-300">
                                    <h2 className="sr-only">Reviews</h2>
                                    <div className="flex items-center">
                                        <div>
                                            <div className="flex items-center">
                                                {[0, 1, 2, 3, 4].map((rating) => (
                                                    <StarIcon
                                                        key={rating}
                                                        className={classNames(
                                                            reviews.average > rating ? 'text-yellow-400' : 'text-gray-300',
                                                            'h-5 w-5 flex-shrink-0'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                ))}
                                            </div>
                                            <p className="sr-only">{reviews.average} out of 5 stars</p>
                                        </div>
                                        <p className="ml-2 text-sm text-gray-500">{reviews.totalCount} reviews</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 space-y-6">
                                <p className="text-base text-gray-500">{props.product.description}</p>
                            </div>

                        </section>
                    </div>

                    {/* Product image */}
                    <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
                        <div className="overflow-hidden rounded-lg aspect-w-1 aspect-h-1">
                            <img src={props.product.image} className="object-cover object-center w-full h-full" />
                        </div>
                    </div>

                    {/* Product form */}
                    <div className="mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
                        <section aria-labelledby="options-heading">
                            <h2 id="options-heading" className="sr-only">
                                Product options
                            </h2>

                            <form onSubmit={onClickHandler}>
                                <div className="mt-10">
                                    <button
                                        type="submit"
                                        className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                                    >
                                        Add to bag
                                    </button>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </Header>
            <Footer />
        </div>
    )
}
