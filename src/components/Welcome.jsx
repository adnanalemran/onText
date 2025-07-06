import Home from "./Home";

const Welcome = () => {
    return (
        <div className="h-screen overflow-hidden flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-slate-900 dark:text-white">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-30 dark:opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23666' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
            </div>

            {/* Header */}
            <header className="relative z-10 flex items-center justify-between px-6 py-4">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-sm">T</span>
                    </div>
                    <span className="text-xl font-semibold text-slate-800 dark:text-slate-200 tracking-tight">onText</span>
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                    Simple • Secure • Fast
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 flex-1 flex items-center justify-center px-4">
                <div className="w-full max-w-md">
                    <div className="text-center space-y-8">
                        {/* Hero Section */}
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
                                    Share Text
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                                        Instantly
                                    </span>
                                </h1>
                                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm mx-auto font-medium">
                                    Create, save, and share text with anyone using simple URLs. 
                                    No accounts, no complexity, just pure text sharing.
                                </p>
                            </div>

                            {/* CTA Button */}
                            <div className="pt-4">
                                <Home />
                            </div>

                            <p className="text-slate-500 dark:text-slate-400 text-base">
                                Just save, copy, or remember the link to access your text later.
                            </p>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-3 gap-6 pt-8">
                            <div className="text-center space-y-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">Lightning Fast</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Instant sharing</p>
                                </div>
                            </div>

                            <div className="text-center space-y-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">Secure</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Private & safe</p>
                                </div>
                            </div>

                            <div className="text-center space-y-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">Beautiful</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Clean design</p>
                                </div>
                            </div>
                        </div>

                        {/* Info Card */}
                        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-2xl p-6 shadow-xl">
                            <div className="flex items-center justify-center space-x-2 text-slate-600 dark:text-slate-300">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm font-medium">No registration required • Instant sharing • Always free</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 flex items-center justify-center px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                <a 
                    href='https://github.com/adnanalemran' 
                    className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors duration-300 font-medium"
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
