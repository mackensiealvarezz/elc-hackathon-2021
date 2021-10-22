import { usePage } from "@inertiajs/inertia-react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout(props) {

    const { auth } = usePage().props

    return (
        <div className="bg-white">
            <Header auth={auth}>
                {props.children}
            </Header>
            <Footer />
        </div>
    )
}
