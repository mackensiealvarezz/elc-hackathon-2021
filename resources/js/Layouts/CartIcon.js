import { useEffect, useState } from 'react'
import { ShoppingBagIcon } from "@heroicons/react/outline"
import { Link } from "@inertiajs/inertia-react"
import { Inertia } from '@inertiajs/inertia';

export default function CartIcon({ cartInfo, auth }) {
    const [count, setCount] = useState(cartInfo.count);
    const cartId = cartInfo.id;
    useEffect(() => {
        if (cartId) {
            Echo.private(`Cart.${cartId}`)
                .listen('CartUpdatedEvent', (e) => {
                    setCount(e.count)
                })

        } else {
            setCount(0)
        }

    }, [cartId])

    return (
        <div className="ml-4 flow-root lg:ml-6">
            <Link href={route('cart')} className="group -m-2 p-2 flex items-center">
                <ShoppingBagIcon
                    className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                />
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{count}</span>
                <span className="sr-only">items in cart, view bag</span>
            </Link>
        </div>
    )
}
