import Home from "./Home";

const Welcome = () => {
    return (
        <div className="h-screen overflow-hidden flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
            </div>

            {/* Header */}
            <header className="relative z-10 flex items-center justify-between px-6 py-4">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">T</span>
                    </div>
                    <span className="text-lg font-medium text-gray-300">onText</span>
                </div>
                <div className="text-xs text-gray-500">
                    Simple • Secure • Fast
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 flex-1 flex items-center justify-center px-4">
                <div className="w-full max-w-md">
                    <div className="text-center space-y-8">
                        {/* Hero Section */}
                        <div className="space-y-4">
                            <h1 className="text-3xl font-bold text-white leading-tight">
                                Share Text
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                    Instantly
                                </span>
                            </h1>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
                                Create, save, and share text with anyone using simple URLs. 
                                No accounts, no complexity, just pure text sharing.
                            </p>
                        </div>

                        {/* CTA Button */}
                        <div className="pt-4">
                            <Home />
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-3 gap-4 pt-8">
                            <div className="text-center space-y-2">
                                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto">
                                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <p className="text-xs text-gray-500">Lightning Fast</p>
                            </div>
                            <div className="text-center space-y-2">
                                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto">
                                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <p className="text-xs text-gray-500">Secure</p>
                            </div>
                            <div className="text-center space-y-2">
                                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto">
                                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </div>
                                <p className="text-xs text-gray-500">Beautiful</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 flex items-center justify-center px-6 py-4 text-xs text-gray-500">
                <a 
                    href='https://github.com/adnanalemran' 
                    className="hover:text-gray-300 transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Made with ❤️ by Adnan
                </a>
            </footer>
        </div>
    );
};

export default Welcome;
