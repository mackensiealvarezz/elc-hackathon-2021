import { Link } from "@inertiajs/inertia-react";

export default function CallToActionSection() {
    return (
        <section aria-labelledby="sale-heading">
            <div className="pt-32 overflow-hidden sm:pt-14">
                <div className="bg-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="relative pt-48 pb-16 sm:pb-24">
                            <div>
                                <h2 id="sale-heading" className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                                    Up to 20% off.
                                </h2>
                                <div className="mt-6 text-base">
                                    <Link href={route('search')} className="font-semibold text-white">
                                        Shop the sale<span aria-hidden="true"> &rarr;</span>
                                    </Link>
                                </div>
                            </div>

                            <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 sm:top-6 sm:translate-x-0">
                                <div className="ml-24 flex space-x-6 min-w-max sm:ml-3 lg:space-x-8">
                                    <div className="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                                                src="https://i1.adis.ws/i/tom_ford/T1LG-01-0001_OC_OS_A?$large$&bg=rgb(255,255,255)"
                                                alt=""
                                            />
                                        </div>

                                        <div className="mt-6 flex-shrink-0 sm:mt-0">
                                            <img
                                                className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                                                src="https://i1.adis.ws/i/tom_ford/T5JJ_BLONDE_OS_A?$large$&bg=rgb(255,255,255)"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="flex space-x-6 sm:-mt-20 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-64 w-64 rounded-lg object-cover  md:h-72 md:w-72"
                                                src="https://i1.adis.ws/i/tom_ford/T31H-1_CHADWICK_OS_HAND2?sm=aspect&aspect=3.14:4&w=1086&img404=img404&bg=rgb(218,218,218)"
                                                alt=""
                                            />
                                        </div>

                                        <div className="mt-6 flex-shrink-0 sm:mt-0">
                                            <img
                                                className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                                                src="https://i1.adis.ws/i/tom_ford/T6YM_AFNVLT_OS_C?$large$&bg=rgb(255,255,255)"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                                                src="https://i1.adis.ws/i/tom_ford/T432-01-0001_OC_OS_A?$large$&bg=rgb(255,255,255)"
                                                alt=""
                                            />
                                        </div>

                                        <div className="mt-6 flex-shrink-0 sm:mt-0">
                                            <img
                                                className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                                                src="https://i1.adis.ws/i/tom_ford/T57A_REFLECTSGILT_OS_A?$large$&bg=rgb(255,255,255)"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
