import { Link } from "@inertiajs/inertia-react"

const favorites = [
    {
        id: 1,
        name: 'CAFE ROSE',
        price: '$32',
        href: route('product', 'CAFE ROSE'),
        imageSrc: 'https://i1.adis.ws/i/tom_ford/T1-CAFE-ROSE_OC_50ML_B?$large$&bg=rgb(255,255,255)',

    },
    {
        id: 2,
        name: 'NEROLI PORTOFINO FORTE',
        price: '$32',
        href: route('product', 'NEROLI PORTOFINO FORTE'),
        imageSrc: 'https://i1.adis.ws/i/tom_ford/T429_OC_50ML_B?$large$&bg=rgb(255,255,255)',

    },
    {
        id: 3,
        name: 'ROSE PRICK',
        price: '$36',
        href: route('product', 'ROSE PRICK'),
        imageSrc: 'https://i1.adis.ws/i/tom_ford/T8-ROSE_OC_250ML_B?$large$&bg=rgb(255,255,255)',

    },
]
export default function TrendingProducts() {
    return (
        <section aria-labelledby="favorites-heading">
            <div className="max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-baseline sm:justify-between">
                    <h2 id="favorites-heading" className="text-2xl font-extrabold tracking-tight text-gray-900">
                        Our Favorites
                    </h2>
                    <Link href={route('search')} className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block">
                        Browse all favorites<span aria-hidden="true"> &rarr;</span>
                    </Link>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:gap-x-8">
                    {favorites.map((favorite) => (
                        <div key={favorite.id} className="group relative">
                            <div className="w-full h-96 rounded-lg overflow-hidden group-hover:opacity-75 sm:h-auto sm:aspect-w-2 sm:aspect-h-3">
                                <img
                                    src={favorite.imageSrc}
                                    className="w-full h-full object-center object-cover"
                                />
                            </div>
                            <h3 className="mt-4 text-base font-semibold text-gray-900">
                                <Link
                                    href={favorite.href}
                                    method="get"

                                >
                                    <span className="absolute inset-0" />
                                    {favorite.name}
                                </Link>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">{favorite.price}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-6 sm:hidden">
                    <a href="#" className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                        Browse all favorites<span aria-hidden="true"> &rarr;</span>
                    </a>
                </div>
            </div>
        </section>
    )
}
