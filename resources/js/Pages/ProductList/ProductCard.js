import { Link } from "@inertiajs/inertia-react";

export default function ProductCard({ product }) {
    return (
        <div
            key={product.id}
            className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden"
        >
            <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                <img
                    src={product.image}

                    className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                />
            </div>
            <div className="flex-1 p-4 space-y-2 flex flex-col">
                <h3 className="text-sm font-medium text-gray-900">
                    <Link href={route('product', product.name)}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                    </Link>
                </h3>
                <p className="text-sm text-gray-500">{product.description.substring(0, 200)}</p>
                <div className="flex-1 flex flex-col justify-end">
                    <p className="text-base font-medium text-gray-900">${product.price}</p>
                </div>
            </div>
        </div>
    )
}
