import { useForm } from '@inertiajs/inertia-react'
import React from 'react';

export default function OrderSummary({ cart, user }) {

    const { data, setData, post, setValue } = useForm({
        cart_id: cart.id,
        donation: 0,
        user_id: user.id,
    })

    const initialFormData = Object.freeze({
        donation: "",
    })

    const [formData, updateFormData] = React.useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }    

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData.donation);
        console.log(data.donation);
        data.donation = formData.donation;
        post(route('checkout'))
    }

    return (
        <section
            aria-labelledby="summary-heading"
            className="px-4 py-6 mt-16 rounded-lg bg-gray-50 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
        >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                Order summary
            </h2>
            <form>
            <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">${cart.total}</dd>
                </div>
                <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600 rounded-md bg-pink-100">BCRF Donation</dt>
                    <div>
                        <div class="mt-1 relative rounded-md shadow-sm">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span class="text-gray-500 sm:text-sm">
                                $
                            </span>
                            </div>
                            <input type="number" min="0.00" step="0.01" name="donation" id="price" onChange={handleChange} class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" placeholder="0.00" />
                            <div class="absolute inset-y-0 right-0 flex items-center">
                            <label for="currency" class="sr-only">Currency</label>
                            <select id="currency" name="currency" class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
                                <option>USD</option>
                                <option>CAD</option>
                                <option>EUR</option>
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
                <button onClick = {handleSubmit}
                    type="submit" value="submit"
                    className="w-full px-4 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                >
                    Checkout
                </button>
            </div>
            </form>
        </section>
    )
}
