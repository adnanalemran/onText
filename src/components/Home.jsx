import { Link } from "react-router-dom";

// Function to generate a random three-digit number
const getRandomNumber = () => {
    return Math.floor(100 + Math.random() * 900); // Generates a number between 100 and 999
};

const Home = () => {
    const randomNumber = getRandomNumber(); // Call the function to get a random number

    return (
        <div className="flex flex-col items-center justify-center mt-16 p-6  rounded-lg  ">
            <h2 className="lg:text-4xl text-2xl font-bold mb-6 text-center text-gray-300">
                Save Your Text and Share It with Others
            </h2>



            <Link to={`https://ontext.vercel.app/${randomNumber}`}>
                <button
                    className="relative inline-flex items-center gap-2 px-6 py-3 font-semibold text-blue-50 bg-gradient-to-tr from-blue-900/30 via-blue-900/70 to-blue-900/30 ring-4 ring-blue-900/20 rounded-full overflow-hidden hover:opacity-90 transition-opacity before:absolute before:top-4 before:left-1/2 before:-translate-x-1/2 before:w-[100px] before:h-[100px] before:rounded-full before:bg-gradient-to-b before:from-blue-50/10 before:blur-xl"
                >
                    Share Text Now
                </button>
            </Link>

            <p className="mt-8 text-gray-500">
                Just save, copy, or remember the link to access your text later.
            </p>

            <div className="mt-14 p-4 border border-gray-300 rounded-lg  shadow-sm hidden lg:inline">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">How to Use:</h3>
                <ul className="list-disc list-inside text-gray-600">
                    <li>Click the <strong>Share Text Now</strong> button to create your unique link.</li>
                    <li>Copy the generated link shown in the address bar.</li>
                    <li>Share the link via email, messaging apps, or any other platform.</li>
                    <li>Click the link anytime to retrieve your saved text.</li>
                </ul>
            </div>


        </div>
    );
};

export default Home;
