import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Footer() {
    return (
        <footer aria-labelledby="footer-heading" className="bg-white">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="py-10 border-t border-gray-200">
                    <p className="text-sm text-gray-500">Copyright &copy; 2021 Tom Ford(ELCHackathon2021).</p>
                </div>
            </div>

            <ToastContainer
                 theme="dark"
                 position="top-right"
                 hideProgressBar={false}
                 newestOnTop={false}
                 closeOnClick
                 rtl={false}
                 pauseOnFocusLoss={false}
                 draggable
                 pauseOnHover={false}

             toastClassName=" relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
             bodyClassName={() => "text-sm font-white font-med block p-3"}
             autoClose={2000}
            />
        </footer>

    )
}
