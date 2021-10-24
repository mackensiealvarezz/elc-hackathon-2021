import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XIcon as XIconSolid } from '@heroicons/react/solid'
import { Link, useForm } from '@inertiajs/inertia-react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function CartItem({ product }) {

    const { data, setData, post } = useForm({
        cart_id: product.pivot.cart_id,
        product_id: product.id
    })

    const onClickHandler = (e) => {
        post(route('deleteFromBag'))
    }

    return (

        <li key={product.id} className="flex py-6 sm:py-10">
            <div className="flex-shrink-0">
                <img
                    src={product.image}
                    className="object-cover object-center w-24 h-24 rounded-md sm:w-48 sm:h-48"
                />
            </div>

            <div className="flex flex-col justify-between flex-1 ml-4 sm:ml-6">
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                        <div className="flex justify-between">
                            <h3 className="text-sm">
                                <Link href={route('product', product.name)} className="font-medium text-gray-700 hover:text-gray-800">
                                    {product.name}
                                </Link>
                            </h3>
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">${product.price}</p>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:pr-9">

                        <div className="absolute top-0 right-0">
                            <button onClick={onClickHandler} type="button" className="inline-flex p-2 -m-2 text-gray-400 hover:text-gray-500">
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
