import { Fragment, useState, useEffect } from 'react'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, PlusSmIcon } from '@heroicons/react/solid'
import Header from '@/Layouts/Header'
import Footer from '@/Layouts/Footer'
import classNames from '@/classNames'
import ProductCard from './ProductCard'
import { useForm } from '@inertiajs/inertia-react'

const breadcrumbs = [{ id: 1, name: 'Men', href: '#' }]
const filters = [
    {
        id: 'category',
        name: 'Category',
        options: [
            { value: 'women', label: 'Women' },
            { value: 'men', label: 'Men' },
            { value: 'fragrance', label: 'Fragrance' },
            { value: 'best_sellers', label: 'Best Sellers' },
            { value: 'face', label: 'Face' },
            { value: 'signature', label: 'Signature' },
            { value: 'candles', label: 'Candles' },
        ],
    },
]

export default function ProductList2(props) {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    const { data, setData, get } = useForm({
        categories: [],
    })

    const propCategories = props.filters.categories;



    useEffect(() => {
        if (propCategories) {
            setData({ categories: propCategories });
        }

    }, [propCategories]);



    const onChangeHandler = (e) => {
        let oldCategories = data.categories;

        if (oldCategories.includes(e.target.value)) {
            const index = oldCategories.indexOf(e.target.value);
            oldCategories.splice(index, 1);
        } else {
            oldCategories.push(e.target.value);
        }

        setData({ categories: oldCategories });
        get(route('search'))
    }

    return (
        <div className="bg-white">


            <div>
                <Header auth={props.auth}>

                    {/* Mobile filter dialog */}
                    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                        <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                            <Transition.Child
                                as={Fragment}
                                enter="transition-opacity ease-linear duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity ease-linear duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                            </Transition.Child>

                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-6 flex flex-col overflow-y-auto">
                                    <div className="px-4 flex items-center justify-between">
                                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                        <button
                                            type="button"
                                            className="-mr-2 w-10 h-10 p-2 flex items-center justify-center text-gray-400 hover:text-gray-500"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4">
                                        {filters.map((section) => (
                                            <Disclosure as="div" key={section.name} className="border-t border-gray-200 pt-4 pb-4">
                                                {({ open }) => (
                                                    <fieldset>
                                                        <legend className="w-full px-2">
                                                            <Disclosure.Button className="w-full p-2 flex items-center justify-between text-gray-400 hover:text-gray-500">
                                                                <span className="text-sm font-medium text-gray-900">{section.name}</span>
                                                                <span className="ml-6 h-7 flex items-center">
                                                                    <ChevronDownIcon
                                                                        className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                                                                        aria-hidden="true"
                                                                    />
                                                                </span>
                                                            </Disclosure.Button>
                                                        </legend>
                                                        <Disclosure.Panel className="pt-4 pb-2 px-4">
                                                            <div className="space-y-6">
                                                                {section.options.map((option, optionIdx) => (
                                                                    <div key={option.value} className="flex items-center">
                                                                        <input
                                                                            id={`${section.id}-${optionIdx}-mobile`}
                                                                            name={`categories[]`}
                                                                            onChange={onChangeHandler}
                                                                            defaultValue={option.value}
                                                                            type="checkbox"
                                                                            checked={data.categories.includes(option.value) ? true : false}
                                                                            className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                                        />
                                                                        <label
                                                                            htmlFor={`${section.id}-${optionIdx}-mobile`}
                                                                            className="ml-3 text-sm text-gray-500"
                                                                        >
                                                                            {option.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </fieldset>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>
                                </div>
                            </Transition.Child>
                        </Dialog>
                    </Transition.Root>

                    <div className="border-b border-gray-200">
                        <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <ol role="list" className="flex items-center space-x-4 py-4">
                                {breadcrumbs.map((breadcrumb) => (
                                    <li key={breadcrumb.id}>
                                        <div className="flex items-center">
                                            <a href={breadcrumb.href} className="mr-4 text-sm font-medium text-gray-900">
                                                {breadcrumb.name}
                                            </a>
                                            <svg
                                                viewBox="0 0 6 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden="true"
                                                className="h-5 w-auto text-gray-300"
                                            >
                                                <path d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z" fill="currentColor" />
                                            </svg>
                                        </div>
                                    </li>
                                ))}
                                <li className="text-sm">
                                    <a href="#" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                        Products
                                    </a>
                                </li>
                            </ol>
                        </nav>
                    </div>

                    <main className="max-w-2xl mx-auto px-4 lg:max-w-7xl lg:px-8">
                        <div className="border-b border-gray-200 pt-24 pb-10">
                            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Products</h1>
                            <p className="mt-4 text-base text-gray-500">
                                Checkout out the latest releases.
                            </p>
                        </div>

                        <div className="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
                            <aside>
                                <h2 className="sr-only">Filters</h2>

                                <button
                                    type="button"
                                    className="inline-flex items-center lg:hidden"
                                    onClick={() => setMobileFiltersOpen(true)}
                                >
                                    <span className="text-sm font-medium text-gray-700">Filters</span>
                                    <PlusSmIcon className="flex-shrink-0 ml-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                </button>

                                <div className="hidden lg:block">
                                    <form className="divide-y divide-gray-200 space-y-10">
                                        {filters.map((section, sectionIdx) => (
                                            <div key={section.name} className={sectionIdx === 0 ? null : 'pt-10'}>
                                                <fieldset>
                                                    <legend className="block text-sm font-medium text-gray-900">{section.name}</legend>
                                                    <div className="pt-6 space-y-3">
                                                        {section.options.map((option, optionIdx) => (
                                                            <div key={option.value} className="flex items-center">
                                                                <input
                                                                    id={`${section.id}-${optionIdx}`}
                                                                    name={`categories[]`}
                                                                    onChange={onChangeHandler}
                                                                    defaultValue={option.value}
                                                                    type="checkbox"
                                                                    checked={data.categories.includes(option.value) ? true : false}
                                                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                                />
                                                                <label htmlFor={`${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </fieldset>
                                            </div>
                                        ))}
                                    </form>
                                </div>
                            </aside>

                            <section aria-labelledby="product-heading" className="mt-6 lg:mt-0 lg:col-span-2 xl:col-span-3">
                                <h2 id="product-heading" className="sr-only">
                                    Products
                                </h2>

                                <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
                                    {props.products.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            </section>
                        </div>
                    </main>
                </Header>

                <Footer />
            </div>
        </div>
    )
}
