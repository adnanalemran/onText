import { Link } from "react-router-dom";

// Function to generate a random three-digit number
const getRandomNumber = () => {
    return Math.floor(100 + Math.random() * 900); // Generates a number between 100 and 999
};

const Home = () => {
    const randomNumber = getRandomNumber(); // Call the function to get a random number

    return (
        <div className="space-y-6">
            {/* CTA Button */}
            <Link to={`/${randomNumber}`}>
                <button className="group relative inline-flex items-center gap-3 px-8 py-4 font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Start Sharing
                </button>
            </Link>

            {/* Quick Info */}
            <div className="text-center space-y-2">
                <p className="text-xs text-gray-500">
                    No registration required • Instant sharing • Always free
                </p>
            </div>
        </div>
    );
};

export default Home;
