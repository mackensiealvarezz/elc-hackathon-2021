import { Link } from "@inertiajs/inertia-react"

const favorites = [
    {
        id: 1,
        name: 'CAFE ROSE',
        price: '$263',
        href: route('product', 'CAFE ROSE'),
        imageSrc: 'https://i1.adis.ws/i/tom_ford/T1-CAFE-ROSE_OC_50ML_B?$large$&bg=rgb(255,255,255)',

    },
    {
        id: 2,
        name: 'OUD WOOD',
        price: '$263',
        href: route('product', 'OUD WOOD'),
        imageSrc: 'https://i1.adis.ws/i/tom_ford/T1-OUD-WOOD_OC_50ML_B?$pdp_zoom_dsk$&bg=rgb(255,255,255)&bg=rgb(255,255,255)',

    },
    {
        id: 3,
        name: 'ROSE PRICK',
        price: '$368',
        href: route('product', 'ROSE PRICK'),
        imageSrc: 'https://i1.adis.ws/i/tom_ford/T8-ROSE_OC_250ML_B?$large$&bg=rgb(255,255,255)',

    },
]
export default function TrendingProducts() {
    return (
        <section aria-labelledby="favorites-heading">
            <div className="px-4 py-24 mx-auto max-w-7xl sm:py-32 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-baseline sm:justify-between">
                    <h2 id="favorites-heading" className="text-2xl font-extrabold tracking-tight text-gray-900">
                        Our Favorites
                    </h2>
                    <Link href={route('search')} className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block">
                        Browse all favorites<span aria-hidden="true"> &rarr;</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 mt-6 gap-y-10 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:gap-x-8">
                    {favorites.map((favorite) => (
                        <div key={favorite.id} className="relative group">
                            <div className="w-full overflow-hidden rounded-lg h-96 group-hover:opacity-75 sm:h-auto sm:aspect-w-2 sm:aspect-h-3">
                                <img
                                    src={favorite.imageSrc}
                                    className="object-cover object-center w-full h-full"
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
