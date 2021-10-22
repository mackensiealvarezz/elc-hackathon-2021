import { useEffect, useState } from "react";
import { Device } from "twilio-client"
import { Link } from "@inertiajs/inertia-react"
import { Inertia } from '@inertiajs/inertia';
import { PhoneIcon, PhoneIncomingIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";

export default function VoiceChat(props) {

    const [connectedDevice, setConnectedDevice] = useState(false)
    const [device, setDevice] = useState(null)

    useEffect(() => {
        if (device == null) {
            setDevice(new Device());
        } else {
            device.setup(props.auth.voiceToken)
            setupHandlers(device)
        }

    }, [device])

    const connectDeviceHandler = (e) => {
        device.connect()
        setConnectedDevice(true)
    }

    const disconnectDeviceHandler = (e) => {
        device.disconnectAll()
        setConnectedDevice(false)
    }


    const setupHandlers = (device) => {
        device.on('ready', function (_device) {
            console.log('ready voice-channel');
        });

        device.on('error', function (error) {
            console.log('error');
        });

        device.on('connect', function (connection) {
            console.log('connect');
        });


        device.on('disconnect', function (connection) {
            console.log('disconnect');
            setConnectedDevice(false);
        });

        device.on('incoming', function (connection) {
            console.log('incoming');
        });
    };

    useEffect(() => {

        Echo.private(`User.${props.auth.user.id}.Search`)
            .listen('SearchProductListEvent', (e) => {
                Inertia.visit(route('search', { categories: e.categories }))
            })

        Echo.private(`User.${props.auth.user.id}.ShowProduct`)
            .listen('ShowProductDetailEvent', (e) => {
                console.log(e);
                Inertia.visit(route('product', { name: e.product_name }))
            })
        Echo.private(`User.${props.auth.user.id}.ShowCart`)
            .listen('ShowCartEvent', (e) => {
                Inertia.visit(route('cart'))
            })

        Echo.private(`User.${props.auth.user.id}.AddedProductToCart`)
            .listen('AddedProductToCartEvent', (e) => {
                toast("Added to bag!")
                console.log('ads');
            })

        Echo.private(`User.${props.auth.user.id}.RemovedProductToCart`)
            .listen('RemovedProductToCartEvent', (e) => {
                toast("Removed from bag!")
            })
    }, [])

    return (
        <div>

            {connectedDevice && (
                <PhoneIncomingIcon
                    className="flex-shrink-0 h-6 w-6 text-green-400 group-hover:text-green-500 animate-bounce cursor-pointer"
                    aria-hidden="true"
                    onClick={disconnectDeviceHandler}
                />
            )}

            {!connectedDevice && (
                <PhoneIcon
                    className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500 cursor-pointer"
                    aria-hidden="true"
                    onClick={connectDeviceHandler}
                />
            )}


        </div>
    )
}
