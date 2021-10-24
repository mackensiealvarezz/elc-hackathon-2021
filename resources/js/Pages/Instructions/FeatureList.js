import { CheckIcon } from '@heroicons/react/outline'

const features = [
    {
        name: 'Shopping',
        description: <span>If you are interested in shopping you can say these key phrases ( <span class="font-bold text-indigo-600">Shopping</span>,
            or <span class="font-bold text-indigo-600"> Interested In Shopping</span>) </span>
    },
    {
        name: 'Categories',
        description: <span>When searching through a category say these phrases to select the category ( <span class="font-bold text-indigo-600">Interested in Categories </span>
            or <span class="font-bold text-indigo-600"> Filter by <span className="underline">Lip Color</span></span>) </span>,
    },
    {
        name: 'Viewing a Product',
        description: <span>To select a specific product say ( <span class="font-bold text-indigo-600">Please show me <span className="underline">Cafe Rose </span></span>
            or <span class="font-bold text-indigo-600">Let me see <span className="underline">Cafe Rose </span></span>) </span>,
    },
    {
        name: 'Purchase',
        description: <span>To purchase an item, you can say ( <span class="font-bold text-indigo-600">Purchase <span className="underline">Cafe Rose </span></span>
            or <span class="font-bold text-indigo-600">Buy <span className="underline"> Lost Cherry </span></span>) </span>
    },
    {
        name: 'Viewing your Cart',
        description: <span>To view what in your cart, you can say ( <span class="font-bold text-indigo-600">View my Cart</span>,
            or <span class="font-bold text-indigo-600"> Open Cart</span>) </span>
    },
    {
        name: 'Removing a Product',
        description: <span>To remove an item from your cart, you can say ( <span class="font-bold text-indigo-600">Remove <span className="underline">Cafe Rose </span></span>
            or <span class="font-bold text-indigo-600">Delete <span className="underline"> Lost Cherry </span></span>) </span>
    },
    {
        name: 'Checkout',
        description: <span>To checkout and complete your order, you can use the following phrases: ( <span class="font-bold text-indigo-600">Checkout </span>
            or <span class="font-bold text-indigo-600">Finish</span>) </span>
    },
]

export default function FeatureList() {
    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
                <div>
                    <h2 className="text-base font-semibold text-indigo-600 uppercase tracking-wide">Everything you need</h2>
                    <p className="mt-2 text-3xl font-extrabold text-gray-900">Beauty AI Commands</p>
                    <p className="mt-4 text-lg text-gray-500">
                        For this POC, we have created a couple commands that you can find on this page to guide on having a hands-free shopping experience.
                    </p>
                </div>
                <div className="mt-12 lg:mt-0 lg:col-span-2">
                    <dl className="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:grid-rows-4 sm:grid-flow-col sm:gap-x-6 sm:gap-y-10 lg:gap-x-8">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative">
                                <dt>
                                    <CheckIcon className="absolute h-6 w-6 text-green-500" aria-hidden="true" />
                                    <p className="ml-9 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                                </dt>
                                <dd className="mt-2 ml-9 text-base text-gray-500">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
