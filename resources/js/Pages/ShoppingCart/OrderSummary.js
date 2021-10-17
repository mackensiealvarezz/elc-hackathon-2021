import { QuestionMarkCircleIcon, } from '@heroicons/react/solid'
export default function OrderSummary() {

    return(
        <section
        aria-labelledby="summary-heading"
        className="px-4 py-6 mt-16 rounded-lg bg-gray-50 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
    >
        <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
            Order summary
        </h2>

        <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">$99.00</dd>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <dt className="flex items-center text-sm text-gray-600">
                    <span>Shipping estimate</span>
                    <a href="#" className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Learn more about how shipping is calculated</span>
                        <QuestionMarkCircleIcon className="w-5 h-5" aria-hidden="true" />
                    </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">$5.00</dd>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <dt className="flex text-sm text-gray-600">
                    <span>Tax estimate</span>
                    <a href="#" className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Learn more about how tax is calculated</span>
                        <QuestionMarkCircleIcon className="w-5 h-5" aria-hidden="true" />
                    </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">$8.32</dd>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <dt className="text-base font-medium text-gray-900">Order total</dt>
                <dd className="text-base font-medium text-gray-900">$112.32</dd>
            </div>
        </dl>

        <div className="mt-6">
            <button
                type="submit"
                className="w-full px-4 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
            >
                Checkout
            </button>
        </div>
    </section>
    )
}
