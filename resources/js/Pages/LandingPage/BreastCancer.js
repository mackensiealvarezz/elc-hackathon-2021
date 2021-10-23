import { Link } from "@inertiajs/inertia-react";
import React from "react";
import Ticker from "react-ticker";

export default function BreastCancer(props) {
    return (
        <section aria-labelledby="cause-heading">
            <div className="relative px-6 py-32 bg-gray-800 sm:py-12 sm:px-12 lg:px-16">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.wfla.com%2Fwp-content%2Fuploads%2Fsites%2F71%2F2020%2F10%2FBreast-cancer-awareness-ribbon.jpg%3Fw%3D1280&f=1&nofb=1"
                        alt=""
                        className="object-cover object-center w-full h-full"
                    />
                </div>
                <div aria-hidden="true" className="absolute inset-0 bg-gray-900 bg-opacity-50" />
                <Ticker>
                    {({ index }) => (
                        <>
                            <div className="space-y-5">
                                <div className="flex space-x-5">
                                    {props.donors[0].map((donor) => {
                                        return <h1 key={donor.name} style={{ paddingRight: "2em", opacity: "50%", color: "white" }}>{donor.name}</h1>
                                    })}
                                </div>
                                <div className="flex space-x-20">
                                    {props.donors[1].map((donor) => {
                                        return <h1 key={donor.name} style={{ paddingRight: "2em", opacity: "50%", color: "white" }}>{donor.name}</h1>
                                    })}
                                </div>
                                <div className="flex space-x-32">
                                    {props.donors[2].map((donor) => {
                                        return <h1 key={donor.name} style={{ paddingRight: "2em", opacity: "50%", color: "white" }}>{donor.name}</h1>
                                    })}
                                </div>

                            </div>
                        </>
                    )}
                </Ticker>
                <div className="box-border h-10" />
                <div className="relative flex flex-col items-center max-w-3xl mx-auto text-center">
                    <h2 id="cause-heading" className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        Help us fight breast cancer
                    </h2>
                    <p className="mt-3 text-xl text-white">
                        Breast cancer is now the most commonly diagnosed cancer worldwide, making the need to help find a cure more urgent than ever.
                        Become a donor and together we can rally to help create a breast cancer-free world.
                    </p>
                    <Link
                        href={route('cart')}
                        className="block w-full px-8 py-3 mt-8 text-base font-medium text-gray-900 bg-white border border-transparent rounded-md hover:bg-gray-100 sm:w-auto"
                    >
                        Donate Now
                    </Link>
                </div>
            </div>
        </section>
    )
}
