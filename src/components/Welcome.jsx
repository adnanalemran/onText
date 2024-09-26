 
const Welcome = () => {
 
    return (
        <div className="max-h-screen  flex flex-col min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <header className="bg-gray-800 px-4 py-2 shadow-md flex justify-between items-center ">
                <h1 className="text-2xl font-bold">Wel Come </h1>
 
            </header>

            {/* Main Content */}
            <div className="flex flex-1 pb-7 ">
                <div className="w-full   mx-auto     shadow-lg">
                    <div
                        className='w-full min-h-full p-2 bg-gray-900      focus:outline-none focus:ring-2 focus:ring-transparent resize-none text-sm'
                    >
                        Well come to Text share .
                        <h3 className='text-xl pt-2'>How to use </h3>
                        <hr/>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic fugiat similique cupiditate nemo dolor. Neque, repudiandae necessitatibus est recusandae sapiente quia quisquam. Iure doloremque illo atque in maiores minus natus!</p>


                    </div>

                </div>
            </div>

          
            <div className="bg-gray-900 text-gray-600 p-1 text-center text-xs absolute  bottom-0  w-full">
                <p>Developed by Adnan al Emran | Inspired by the CodeShare community.</p>
            </div>

        </div>
    );
};

export default Welcome;
