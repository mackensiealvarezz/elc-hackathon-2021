import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import ValidationErrors from '@/Components/ValidationErrors';

export default function Login() {


    const { data, setData, post, processing, errors, reset } = useForm({
        email: 'demo@estee.com',
        password: 'demo',
        remember: '',
    });


    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };


    return (
        <div className="min-h-screen bg-white flex">
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <Link href={route('landing')}>
                            <img
                                className="h-12 w-auto"
                                src="https://media.elcompanies.com/images/e/estee-lauder-companies/universal/our-brands/tom-ford-beauty/tom-ford-beauty.png?h=140&la=en&w=720"
                                alt="Workflow"
                            />
                        </Link>

                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                        <p className="mt-2 py-2 text-sm font-bold text-gray-600">
                            Test User:
                            email: demo@estee.com
                            password: demo
                        </p>
                        <ValidationErrors errors={errors} />
                    </div>

                    <div className="mt-8">

                        <div className="mt-6">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="email"
                                            value={data.email}
                                            onChange={onHandleChange}
                                            required
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-gray-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            autoComplete="current-password"
                                            onChange={onHandleChange}
                                            required
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-gray-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                            Remember me
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block relative w-0 flex-1 border-l border-black">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="https://i1.adis.ws/i/tom_ford/101121_Desktop_2253x1000_003?$landgrid_dsk_3-3$"
                    alt=""
                />
            </div>
        </div>
    )
}
