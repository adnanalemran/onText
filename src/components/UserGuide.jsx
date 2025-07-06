const UserGuide = () => {
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg text-white">
            <div className="space-y-6">
                {/* Header */}
                <div className="text-center space-y-3">
                    <h1 className="text-2xl font-bold text-white">
                        User Guide
                    </h1>
                    <p className="text-sm text-gray-400 max-w-lg mx-auto">
                        Learn how to create, manage, and share your notes with our simple platform
                    </p>
                </div>

                {/* Overview Section */}
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        Overview
                    </h2>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        Create, save, and access notes using unique URLs. No accounts needed - just pure text sharing.
                    </p>
                </div>

                {/* Quick Steps */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            Create Note
                        </h2>
                        <div className="space-y-2 text-sm text-gray-300">
                            <p>Visit any URL with your desired title:</p>
                            <code className="block bg-gray-800/50 rounded p-2 text-green-400 font-mono text-xs">
                                https://ontext.vercel.app/My-Note
                            </code>
                            <p>Start typing - your note saves automatically!</p>
                        </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                </svg>
                            </div>
                            Share & Export
                        </h2>
                        <div className="space-y-2 text-sm text-gray-300">
                            <p>Use the toolbar buttons to:</p>
                            <ul className="list-disc list-inside space-y-1 text-xs">
                                <li>Copy text to clipboard</li>
                                <li>Share via native sharing</li>
                                <li>Export as TXT or PDF</li>
                                <li>Toggle auto-save</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        Features
                    </h2>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="text-center space-y-2">
                            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto">
                                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <p className="text-xs text-gray-400">Fast</p>
                        </div>
                        <div className="text-center space-y-2">
                            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto">
                                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <p className="text-xs text-gray-400">Secure</p>
                        </div>
                        <div className="text-center space-y-2">
                            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto">
                                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <p className="text-xs text-gray-400">Simple</p>
                        </div>
                    </div>
                </div>

                {/* Quick Start */}
                <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        Quick Start
                    </h2>
                    <div className="space-y-2 text-sm text-gray-300">
                        <ol className="list-decimal list-inside space-y-1">
                            <li>Click "Start Sharing" on the home page</li>
                            <li>Type your content in the text area</li>
                            <li>Your note saves automatically</li>
                            <li>Share the URL with others</li>
                        </ol>
                        <p className="text-green-400 text-xs font-medium mt-3">
                            ✨ That's it! No registration required.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserGuide;
