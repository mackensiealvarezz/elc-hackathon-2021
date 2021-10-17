const categories = [
    {
        name: 'New Arrivals',
        href: '#',
        imageSrc: 'https://i1.adis.ws/i/tom_ford/T726_INITIATE_OS_A?$large$&bg=rgb(255,255,255)',
    },
    {
        name: 'Fragrance',
        href: '#',
        imageSrc: 'https://i1.adis.ws/i/tom_ford/T0-TOBACCO_OC_50ML_A?$large$&bg=rgb(255,255,255)',
    },
    {
        name: 'Foundation',
        href: '#',
        imageSrc: 'https://i1.adis.ws/i/tom_ford/T7N1_MINIMALIST_OS_A?$large$&bg=rgb(255,255,255)',
    },
    {
        name: 'Men',
        href: '#',
        imageSrc: 'https://i1.adis.ws/i/tom_ford/T443_OC_OS_A?$large$&bg=rgb(255,255,255)',
    },
    { name: 'Candle', href: '#', imageSrc: 'https://i1.adis.ws/i/tom_ford/T55J_OC_OS_A?$large$&bg=rgb(255,255,255)' },
]


export default function ShopByCategory() {
    return (
        <section aria-labelledby="category-heading" className="max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <div className="px-4 sm:px-6 sm:flex sm:items-center sm:justify-between lg:px-8 xl:px-0">
                <h2 id="category-heading" className="text-2xl font-extrabold tracking-tight text-gray-900">
                    Shop by Category
                </h2>
                <a href="#" className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block">
                    Browse all categories<span aria-hidden="true"> &rarr;</span>
                </a>
            </div>

            <div className="mt-4 flow-root">
                <div className="-my-2">
                    <div className="box-content py-2 relative h-80 overflow-x-auto xl:overflow-visible">
                        <div className="absolute min-w-screen-xl px-4 flex space-x-8 sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:grid xl:grid-cols-5 xl:gap-x-8">
                            {categories.map((category) => (
                                <a
                                    key={category.name}
                                    href={category.href}
                                    className="relative w-56 h-80 rounded-lg p-6 flex flex-col overflow-hidden hover:opacity-75 xl:w-auto"
                                >
                                    <span aria-hidden="true" className="absolute inset-0">
                                        <img src={category.imageSrc} alt="" className="w-full h-full object-center object-cover" />
                                    </span>
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                                    />
                                    <span className="relative mt-auto text-center text-xl font-bold text-white">{category.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}