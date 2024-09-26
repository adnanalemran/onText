import Home from "./Home";


const Welcome = () => {

    return (
        <div className="max-h-screen  flex flex-col min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <header className="bg-gray-800 px-4 py-2 shadow-md flex justify-between items-center ">
                <h1 className="text-2xl font-bold">onText</h1>

            </header>

            {/* Main Content */}
            <div className="flex flex-1 pb-7 ">
                <div className="w-full   mx-auto     shadow-lg">
                    <div
                        className='w-full min-h-full p-2 bg-gray-900      focus:outline-none focus:ring-2 focus:ring-transparent resize-none text-sm'
                    >
                        <Home />
                    </div>

                </div>
            </div>


            <div className="bg-gray-900 text-gray-600 p-1 text-center text-xs absolute bottom-0 w-full">
                <a href='https://github.com/adnanalemran'>Developed by Adnan al Emran</a>
            </div>

        </div>
    );
};

export default Welcome;
