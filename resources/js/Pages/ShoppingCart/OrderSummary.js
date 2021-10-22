import { useForm } from '@inertiajs/inertia-react'
import React from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Inertia } from '@inertiajs/inertia';

export default function OrderSummary({ cart, user }) {

    const { data, setData, post } = useForm({
        donation: null,
    })

    let [isOpen, setIsOpen] = useState(false)

    const closeModal = () => {
        setIsOpen(false)
        post(route('clearCart'))
    }

    const openModal = () => {
        setIsOpen(true)
    }

    const handleChange = (e) => {
        setData({
            donation: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //  console.log('s');
        post(route('checkout'))
        openModal()
    }

    function donorMessage() {
        if (data.donation != null && data.donation != 0) {
            return <p className="text-pink-700">Thank you for donating ${data.donation} towards the Breast Cancer Research Foundation!</p>;
        } else {
            return;
        }
    }

    return (
        <section
            aria-labelledby="summary-heading"
            className="px-4 py-6 mt-16 rounded-lg bg-gray-50 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
        >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                Order summary
            </h2>
            <form onSubmit={handleSubmit} >
                <dl className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <dt className="text-sm text-gray-600">Subtotal</dt>
                        <dd className="text-sm font-medium text-gray-900">${cart.total}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                        <dt className="text-sm text-gray-600 rounded-md bg-pink-100">BCRF Donation</dt>
                        <div>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">
                                        $
                                    </span>
                                </div>
                                <input type="number" min="0" step="1" name="donation" id="price" onChange={handleChange} className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" placeholder="0" />
                                <div className="absolute inset-y-0 right-0 flex items-center">
                                    <label htmlFor="currency" className="sr-only">Currency</label>
                                    <select id="currency" name="currency" className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
                                        <option>USD</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <dt className="text-base font-medium text-gray-900">Order total</dt>
                        <dd className="text-base font-medium text-gray-900">${cart.total}</dd>
                    </div>
                </dl>
                <div className="mt-6">
                    <button
                        type="submit"
                        value="submit"
                        className="w-full px-4 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                    >
                        Checkout
                    </button>
                </div>
            </form>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Payment successful.
                                    Thanks for shopping with us, {user.name}!
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        <br />
                                        Your payment of ${cart.total} has been successfully submitted.<br /><br />
                                        {donorMessage()}
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeModal}
                                    >
                                        Go to Home
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </section>
    )
}
