import { useEffect, useState } from "react";
import { Device } from "twilio-client"
import { Link } from "@inertiajs/inertia-react"
import { Inertia } from '@inertiajs/inertia';
import { PhoneIcon, PhoneIncomingIcon } from "@heroicons/react/outline";


function setupHandlers(device) {
    device.on('ready', function (_device) {
        console.log('ready voice-channel');
    });

    /* Report any errors to the call status display */
    device.on('error', function (error) {
        console.log('error');
    });

    /* Callback for when Twilio Client initiates a new connection */
    device.on('connect', function (connection) {
        // Enable the hang up button and disable the call buttons
        console.log('connect');
    });

    /* Callback for when a call ends */
    device.on('disconnect', function (connection) {
        // Disable the hangup button and enable the call buttons
        console.log('disconnect');
    });

    /* Callback for when Twilio Client receives a new incoming call */
    device.on('incoming', function (connection) {
        console.log('incoming');
        // updateCallStatus("Incoming support call");

        // // Set a callback to be executed when the connection is accepted
        // connection.accept(function () {
        //     updateCallStatus("In call with customer");
        // });

        // // Set a callback on the answer button and enable it
        // answerButton.click(function () {
        //     connection.accept();
        // });
        // answerButton.prop("disabled", false);
    });
};


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
    }, [])

    return (
        <div>

            {connectedDevice && (
                <PhoneIncomingIcon
                    className="flex-shrink-0 h-6 w-6 text-green-400 group-hover:text-green-500"
                    aria-hidden="true"
                    onClick={disconnectDeviceHandler}
                />
            )}

            {!connectedDevice && (
                <PhoneIcon
                    className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                    onClick={connectDeviceHandler}
                />
            )}


        </div>
    )
}
