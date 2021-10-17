import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { MenuIcon, SearchIcon, ShoppingBagIcon, XIcon } from '@heroicons/react/outline'
import classNames from '@/classNames'
import { Link } from '@inertiajs/inertia-react'

const navigation = {
    categories: [
        {
            id: 'women',
            name: 'Women',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc: 'https://i1.adis.ws/i/tom_ford/T6C7_OC_OS_A?$large$&bg=rgb(255,255,255)',
                    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
                },
                {
                    name: 'Our Favorite',
                    href: '#',
                    imageSrc: 'https://i1.adis.ws/i/tom_ford/T0RN-01-0001_OC_OS_A?$large$&bg=rgb(255,255,255)',
                    imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                },
            ],
            sections: [
                {
                    id: 'fragrance',
                    name: 'Fragrance',
                    items: [
                        { name: 'BEST SELLERS', href: 'search', data: { categories: ['women', 'fragrance'] } },
                        { name: 'DISCOVER PRIVATE BLEND', href: 'search', data: { categories: ['women', 'fragrance'] } },
                        { name: 'PRIVATE BLEND', href: 'search', data: { categories: ['women', 'fragrance'] } },
                        { name: 'SIGNATURE', href: 'search', data: { categories: ['women', 'fragrance', 'signature'] } },
                        { name: 'CANDLES', href: 'search', data: { categories: ['women', 'fragrance', 'candles'] } },
                    ],
                },
                {
                    id: 'FACE',
                    name: 'FACE',
                    items: [
                        { name: 'BRONZER', href: 'search', data: { categories: ['women', 'fragrance'] } },
                        { name: 'BRUSHES', href: 'search', data: { categories: ['women', 'fragrance'] } },
                        { name: 'CHEEK COLOR', href: 'search', data: { categories: ['women', 'fragrance'] } },
                        { name: 'CONCEALER', href: 'search', data: { categories: ['women', 'fragrance'] } },
                        { name: 'FOUNDATION', href: 'search', data: { categories: ['women', 'fragrance'] } },
                        { name: 'POWDER', href: 'search', data: { categories: ['women', 'fragrance'] } },
                    ],
                },
                {
                    id: 'LIPS',
                    name: 'LIPS',
                    items: [
                        { name: 'LIP COLOR', href: 'search', data: { categories: ['women', 'fragrance'] } },
                        { name: 'BOYS & GIRLS', href: 'search', data: { categories: ['women', 'fragrance'] } },
                        { name: 'LIP LACQUER', href: 'search', data: { categories: ['women', 'fragrance'] } },
                        { name: 'LIP GLOSS', href: 'search', data: { categories: ['women', 'fragrance'] } },
                    ],
                },
            ],
        },
        {
            id: 'men',
            name: 'Men',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc: 'https://i1.adis.ws/i/tom_ford/T3H9-01-0001_OC_OS_A?$large$&bg=rgb(255,255,255)',
                    imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
                },
                {
                    name: 'Our Favorite',
                    href: '#',
                    imageSrc: 'https://i1.adis.ws/i/tom_ford/T660_OC_OS_A?$large$&bg=rgb(255,255,255)',
                    imageAlt:
                        'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
                },
            ],
            sections: [
                {
                    id: 'fragrance',
                    name: 'Fragrance',
                    items: [
                        { name: 'BEST SELLERS', href: 'search', data: { categories: ['women', 'fragrance'] } },
                        { name: 'DISCOVER PRIVATE BLEND', href: 'search', data: { categories: ['women', 'fragrance'] } },
                        { name: 'PRIVATE BLEND', href: 'search', data: { categories: ['women', 'fragrance'] } },
                        { name: 'SIGNATURE', href: 'search', data: { categories: ['women', 'fragrance'] } },
                        { name: 'CANDLES', href: 'search', data: { categories: ['women', 'fragrance'] } },
                    ],
                },
                {
                    id: 'MEN',
                    name: 'MEN',
                    items: [
                        { name: 'BEARD', href: 'search', data: { categories: ['women', 'fragrance'] } },
                        { name: 'BODY', href: 'search', data: { categories: ['women', 'fragrance'] } },
                        { name: 'FACE', href: 'search', data: { categories: ['women', 'fragrance'] } },
                    ],
                },
            ],
        },
    ],
    pages: [
        { name: 'Company', href: 'https://www.elcompanies.com/en/our-brands/tom-ford-beauty' },
        { name: 'Stores', href: 'https://www.tomford.com/stores' },
    ],
}


export default function Header(props) {
    const [open, setOpen] = useState(false)
    const [showPin, setShowPin] = useState(false)

    return (
        <Fragment>
            {/* Mobile menu */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setOpen}>
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
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
                            <div className="px-4 pt-5 pb-2 flex">
                                <button
                                    type="button"
                                    className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                                    onClick={() => setOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>

                            {/* Links */}
                            <Tab.Group as="div" className="mt-2">
                                <div className="border-b border-gray-200">
                                    <Tab.List className="-mb-px flex px-4 space-x-8">
                                        {navigation.categories.map((category) => (
                                            <Tab
                                                key={category.name}
                                                className={({ selected }) =>
                                                    classNames(
                                                        selected ? 'text-yellow-600 border-yellow-600' : 'text-gray-900 border-transparent',
                                                        'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                                                    )
                                                }
                                            >
                                                {category.name}
                                            </Tab>
                                        ))}
                                    </Tab.List>
                                </div>
                                <Tab.Panels as={Fragment}>
                                    {navigation.categories.map((category) => (
                                        <Tab.Panel key={category.name} className="pt-10 pb-8 px-4 space-y-10">
                                            <div className="grid grid-cols-2 gap-x-4">
                                                {category.featured.map((item) => (
                                                    <div key={item.name} className="group relative text-sm">
                                                        <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                                            <img src={item.imageSrc} alt={item.imageAlt} className="object-center object-cover" />
                                                        </div>
                                                        <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                                            <span className="absolute z-10 inset-0" aria-hidden="true" />
                                                            {item.name}
                                                        </a>
                                                        <p aria-hidden="true" className="mt-1">
                                                            Shop now
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                            {category.sections.map((section) => (
                                                <div key={section.name}>
                                                    <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                                                        {section.name}
                                                    </p>
                                                    <ul
                                                        role="list"
                                                        aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                                        className="mt-6 flex flex-col space-y-6"
                                                    >
                                                        {section.items.map((item) => (
                                                            <li key={item.name} className="flow-root">
                                                                <a href={route(item.href)} method="get" data={item.data} className="-m-2 p-2 block text-gray-500">
                                                                    {item.name}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </Tab.Panel>
                                    ))}
                                </Tab.Panels>
                            </Tab.Group>

                            <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                                {navigation.pages.map((page) => (
                                    <div key={page.name} className="flow-root">
                                        <a href={page.href} className="-m-2 p-2 block font-medium text-gray-900">
                                            {page.name}
                                        </a>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                                <div className="flow-root">
                                    <a href="#" className="-m-2 p-2 block font-medium text-gray-900">
                                        Sign in
                                    </a>
                                </div>
                                <div className="flow-root">
                                    <a href="#" className="-m-2 p-2 block font-medium text-gray-900">
                                        Create account
                                    </a>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 py-6 px-4">
                                <a href="#" className="-m-2 p-2 flex items-center">
                                    <img
                                        src="https://tailwindui.com/img/flags/flag-canada.svg"
                                        alt=""
                                        className="w-5 h-auto block flex-shrink-0"
                                    />
                                    <span className="ml-3 block text-base font-medium text-gray-900">CAD</span>
                                    <span className="sr-only">, change currency</span>
                                </a>
                            </div>
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition.Root>

            <header className="relative overflow-hidden">
                {/* Top navigation */}
                <nav aria-label="Top" className="relative z-20 bg-white bg-opacity-90 backdrop-filter backdrop-blur-xl">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="h-16 flex items-center">
                            <button
                                type="button"
                                className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                                onClick={() => setOpen(true)}
                            >
                                <span className="sr-only">Open menu</span>
                                <MenuIcon className="h-6 w-6" aria-hidden="true" />
                            </button>

                            {/* Logo */}
                            <div className="ml-4 flex lg:ml-0">
                                <a href={route('landing')}>
                                    <span className="sr-only">Tom Ford Beauty</span>
                                    <img
                                        className="h-8 w-auto"
                                        src="https://media.elcompanies.com/images/e/estee-lauder-companies/universal/our-brands/tom-ford-beauty/tom-ford-beauty.png?h=140&la=en&w=720"
                                        alt=""
                                    />
                                </a>
                            </div>

                            {/* Flyout menus */}
                            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                                <div className="h-full flex space-x-8">
                                    {navigation.categories.map((category) => (
                                        <Popover key={category.name} className="flex">
                                            {({ open }) => (
                                                <>
                                                    <div className="relative flex">
                                                        <Popover.Button
                                                            className={classNames(
                                                                open
                                                                    ? 'border-yellow-600 text-yellow-600'
                                                                    : 'border-transparent text-gray-700 hover:text-gray-800',
                                                                'relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px'
                                                            )}
                                                        >
                                                            {category.name}
                                                        </Popover.Button>
                                                    </div>

                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-200"
                                                        enterFrom="opacity-0"
                                                        enterTo="opacity-100"
                                                        leave="transition ease-in duration-150"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Popover.Panel className="absolute top-full inset-x-0 bg-white text-sm text-gray-500">
                                                            {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                            <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />
                                                            {/* Fake border when menu is open */}
                                                            <div className="absolute inset-0 top-0 h-px max-w-7xl mx-auto px-8" aria-hidden="true">
                                                                <div
                                                                    className={classNames(
                                                                        open ? 'bg-gray-200' : 'bg-transparent',
                                                                        'w-full h-px transition-colors ease-out duration-200'
                                                                    )}
                                                                />
                                                            </div>

                                                            <div className="relative">
                                                                <div className="max-w-7xl mx-auto px-8">
                                                                    <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                                                        <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                                                            {category.featured.map((item) => (
                                                                                <div key={item.name} className="group relative text-base sm:text-sm">
                                                                                    <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                                                                        <img
                                                                                            src={item.imageSrc}
                                                                                            alt={item.imageAlt}
                                                                                            className="object-center object-cover"
                                                                                        />
                                                                                    </div>
                                                                                    <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                                                                        <span className="absolute z-10 inset-0" aria-hidden="true" />
                                                                                        {item.name}
                                                                                    </a>
                                                                                    <p aria-hidden="true" className="mt-1">
                                                                                        Shop now
                                                                                    </p>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                        <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                                                            {category.sections.map((section) => (
                                                                                <div key={section.name}>
                                                                                    <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                                                                        {section.name}
                                                                                    </p>
                                                                                    <ul
                                                                                        role="list"
                                                                                        aria-labelledby={`${section.name}-heading`}
                                                                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                    >
                                                                                        {section.items.map((item) => (
                                                                                            <li key={item.name} className="flex">
                                                                                                <Link href={route(item.href)} method="get" data={item.data} className="hover:text-gray-800">
                                                                                                    {item.name}
                                                                                                </Link>
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Popover.Panel>
                                                    </Transition>
                                                </>
                                            )}
                                        </Popover>
                                    ))}

                                    {navigation.pages.map((page) => (
                                        <a
                                            key={page.name}
                                            href={page.href}
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                        >
                                            {page.name}
                                        </a>
                                    ))}
                                </div>
                            </Popover.Group>

                            <div className="ml-auto flex items-center">

                                {props.auth.user ? (
                                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                        <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                            Welcome {props.auth.user.name}
                                        </a>
                                        <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                        <span className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                            Pin:
                                            <button className="font-bold" onClick={() => setShowPin(!showPin)} >{showPin ? props.auth.user.pin : '***'}</button>
                                        </span>
                                        <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                        <Link href={route('logout')} method="post" as="button" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                            Log Out
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                        <Link href={route('login')} className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                            Sign in
                                        </Link>
                                    </div>
                                )}



                                {/* Cart */}
                                <div className="ml-4 flow-root lg:ml-6">
                                    <a href="#" className="group -m-2 p-2 flex items-center">
                                        <ShoppingBagIcon
                                            className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                                        <span className="sr-only">items in cart, view bag</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero section */}
                {props.children}
            </header >
        </Fragment >
    )
}
