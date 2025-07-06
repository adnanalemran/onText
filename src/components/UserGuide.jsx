import { Link } from "react-router-dom";

const UserGuide = () => {
    return (
        <div className="h-screen overflow-hidden flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-slate-900 dark:text-white">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-30 dark:opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23666' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
            </div>

            {/* Header */}
            <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center space-x-3">
                    <Link 
                        to="/" 
                        className="p-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl hover:bg-white/80 dark:hover:bg-slate-700/60 transition-all duration-300 shadow-sm"
                        title="Go Home"
                    >
                        <svg className="w-4 h-4 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </Link>
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-sm">T</span>
                        </div>
                        <span className="text-xl font-semibold text-slate-800 dark:text-slate-200 tracking-tight">onText</span>
                    </div>
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                    User Guide
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 flex-1 overflow-auto p-4 lg:p-6">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Hero Section */}
                    <div className="text-center space-y-4">
                        <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                            How to Use <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">onText</span>
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                            Learn how to create, share, and manage your text documents with our simple and intuitive platform.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Getting Started */}
                        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-xl">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Getting Started</h3>
                            </div>
                            <div className="space-y-3 text-slate-600 dark:text-slate-300">
                                <p className="flex items-start space-x-2">
                                    <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                                    <span>Click "Start Sharing" on the home page to create a new note</span>
                                </p>
                                <p className="flex items-start space-x-2">
                                    <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                                    <span>A unique URL will be generated for your note</span>
                                </p>
                                <p className="flex items-start space-x-2">
                                    <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                                    <span>Start typing - your text saves automatically</span>
                                </p>
                            </div>
                        </div>

                        {/* Sharing */}
                        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-xl">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Sharing Your Text</h3>
                            </div>
                            <div className="space-y-3 text-slate-600 dark:text-slate-300">
                                <p className="flex items-start space-x-2">
                                    <span className="w-6 h-6 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                                    <span>Copy the URL from your browser's address bar</span>
                                </p>
                                <p className="flex items-start space-x-2">
                                    <span className="w-6 h-6 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                                    <span>Share the URL with anyone you want to see your text</span>
                                </p>
                                <p className="flex items-start space-x-2">
                                    <span className="w-6 h-6 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                                    <span>They can view and edit the text in real-time</span>
                                </p>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-xl">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Key Features</h3>
                            </div>
                            <div className="space-y-3 text-slate-600 dark:text-slate-300">
                                <div className="flex items-center space-x-2">
                                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Auto-save every second</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Real-time word and character count</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Export to TXT and PDF formats</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Keyboard shortcuts support</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Mobile-responsive design</span>
                                </div>
                            </div>
                        </div>

                        {/* Keyboard Shortcuts */}
                        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-xl">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Keyboard Shortcuts</h3>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-600 dark:text-slate-300">Save</span>
                                    <kbd className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-mono shadow-sm">Ctrl+S</kbd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-600 dark:text-slate-300">Select All</span>
                                    <kbd className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-mono shadow-sm">Ctrl+A</kbd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-600 dark:text-slate-300">Copy Text</span>
                                    <kbd className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-mono shadow-sm">Ctrl+Shift+C</kbd>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tips Section */}
                    <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-xl">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Pro Tips</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 text-slate-600 dark:text-slate-300">
                            <div className="space-y-2">
                                <p className="font-medium text-slate-700 dark:text-slate-200">📝 Writing Tips</p>
                                <ul className="space-y-1 text-sm">
                                    <li>• Use clear, descriptive titles for your notes</li>
                                    <li>• Keep your URLs private if the content is sensitive</li>
                                    <li>• Export important documents to PDF for backup</li>
                                </ul>
                            </div>
                            <div className="space-y-2">
                                <p className="font-medium text-slate-700 dark:text-slate-200">🔒 Security</p>
                                <ul className="space-y-1 text-sm">
                                    <li>• Anyone with the URL can edit your text</li>
                                    <li>• Don't share URLs with sensitive information</li>
                                    <li>• Consider using password protection for important notes</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center space-y-4">
                        <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 border border-blue-200/50 dark:border-blue-700/50 rounded-2xl p-6">
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Ready to Get Started?</h3>
                            <p className="text-slate-600 dark:text-slate-300 mb-4">
                                Create your first note and start sharing text instantly!
                            </p>
                            <Link to="/">
                                <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                    Start Creating
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 flex items-center justify-center px-6 py-4 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200/50 dark:border-slate-700/50">
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

export default UserGuide;
