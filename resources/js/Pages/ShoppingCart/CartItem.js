import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XIcon as XIconSolid } from '@heroicons/react/solid'
export default function CartItem({ product }) {

    return(

        <li key={product.id} className="flex py-6 sm:py-10">
        <div className="flex-shrink-0">
            <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="object-cover object-center w-24 h-24 rounded-md sm:w-48 sm:h-48"
            />
        </div>

        <div className="flex flex-col justify-between flex-1 ml-4 sm:ml-6">
            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                <div>
                    <div className="flex justify-between">
                        <h3 className="text-sm">
                            <a href={product.href} className="font-medium text-gray-700 hover:text-gray-800">
                                {product.name}
                            </a>
                        </h3>
                    </div>
                    <p className="mt-1 text-sm font-medium text-gray-900">{product.price}</p>
                </div>

                <div className="mt-4 sm:mt-0 sm:pr-9">
                    <label className="sr-only">
                        Quantity, {product.name}
                    </label>


                    <div className="absolute top-0 right-0">
                        <button type="button" className="inline-flex p-2 -m-2 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Remove</span>
                            <XIconSolid className="w-5 h-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </li>
    )
}
