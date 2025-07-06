import { useCallback, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import { FaSave, FaCopy, FaFileDownload, FaFilePdf, FaShare, FaSync, FaHome, FaKeyboard, FaInfoCircle, FaBars, FaTimes } from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';

const Note = () => {
    const { title } = useParams();
    const [description, setDescription] = useState('');
    const [updateStatus, setUpdateStatus] = useState(true);
    const [isAutoSave, setIsAutoSave] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [lastSaved, setLastSaved] = useState(null);
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const [showShortcuts, setShowShortcuts] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const textareaRef = useRef(null);

    // Calculate word and character count
    useEffect(() => {
        const words = description.trim() ? description.trim().split(/\s+/).length : 0;
        const chars = description.length;
        setWordCount(words);
        setCharCount(chars);
    }, [description]);

    const fetchNote = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`https://textapp-eight.vercel.app/note/${title}`);
            if (response.data) {
                setDescription(response.data.description);
                setUpdateStatus(true);
                setLastSaved(new Date());
            }
        } catch (error) {
            console.error('Error fetching note:', error);
            if (error.response?.status === 404) {
                toast('New note created!', { icon: '✨' });
            } else {
                toast.error('Failed to load note');
            }
        } finally {
            setIsLoading(false);
        }
    }, [title]);

    useEffect(() => {
        fetchNote();
    }, [title, fetchNote]);

    const handleChange = (event) => {
        setDescription(event.target.value);
        setUpdateStatus(false);
    };

    const handleSave = useCallback(async (isManual = false) => {
        const sendData = { title, description };
        try {
            const response = await axios.post('https://textapp-eight.vercel.app/note', sendData);
            if (response.status === 201 || response.status === 200) {
                setUpdateStatus(true);
                setLastSaved(new Date());
                if (isManual) {
                    toast.success('Saved successfully!');
                }
            }
        } catch (error) {
            console.error('Error saving data:', error);
            toast.error('Failed to save');
        }
    }, [title, description]);

    useEffect(() => {
        if (isAutoSave && !updateStatus) {
            const autoSaveInterval = setTimeout(async () => {
                await handleSave();
            }, 1000);
            return () => clearTimeout(autoSaveInterval);
        }
    }, [description, isAutoSave, updateStatus, handleSave]);

    const handleToggleAutoSave = () => {
        setIsAutoSave(!isAutoSave);
        if (isAutoSave) {
            toast('Auto-save disabled. Save manually.', { icon: '⚠️' });
        } else {
            toast('Auto-save enabled!', { icon: '✅' });
        }
    };

    const handleCopy = () => {
        if (description.trim()) {
            navigator.clipboard.writeText(description);
            toast.success('Copied to clipboard!');
        } else {
            toast.error('Nothing to copy');
        }
    };

    const handleExportTxt = () => {
        if (!description.trim()) {
            toast.error('Nothing to export');
            return;
        }
        const blob = new Blob([description], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${title}.txt`;
        link.click();
        toast.success('TXT file downloaded!');
    };

    const formatDateTime = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? String(hours).padStart(2, '0') : '12';
        const formattedDate = `${day}/${month}/${year}`;
        const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;
        return { formattedDate, formattedTime };
    };

    const handleExportPdf = () => {
        if (!description.trim()) {
            toast.error('Nothing to export');
            return;
        }
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            putOnlyUsedFonts: true,
        });

        pdf.setFontSize(18);
        pdf.text(title, 10, 10);

        pdf.setFontSize(12);
        const pageHeight = pdf.internal.pageSize.height;
        const margin = 5;
        const textLines = pdf.splitTextToSize(description, pdf.internal.pageSize.width - margin * 2);

        let y = 20;
        for (let i = 0; i < textLines.length; i++) {
            if (y + 10 > pageHeight - margin - 60) {
                pdf.addPage();
                y = 10;
            }
            pdf.text(textLines[i], margin, y);
            y += 10;
        }

        const { formattedDate, formattedTime } = formatDateTime(new Date());
        const url = window.location.href;
        pdf.setFontSize(10);
        const footerY = pageHeight - margin - 10;

        const footerText2 = `URL: ${url}`;
        const createdByText = "Thank you for use onText :) ";
        const footerText1 = `Exported on: ${formattedDate} ${formattedTime}`;

        const footerTextWidth2 = pdf.getTextWidth(footerText2);
        const createdByTextWidth = pdf.getTextWidth(createdByText);
        const footerTextWidth1 = pdf.getTextWidth(footerText1);
        const footerWidth = Math.max(footerTextWidth1, footerTextWidth2, createdByTextWidth);
        const footerX = pdf.internal.pageSize.width - footerWidth - margin;

        pdf.text(createdByText, footerX, footerY + 10);
        pdf.text(footerText1, footerX, footerY);
        pdf.text(footerText2, footerX, footerY + 5);

        pdf.save(`${title}.pdf`);
        toast.success('PDF file downloaded!');
    };

    const handleShare = async () => {
        if (!description.trim()) {
            toast.error('Nothing to share');
            return;
        }
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: description,
                    url: window.location.href,
                });
                toast.success('Shared successfully!');
            } catch (error) {
                console.error('Error sharing:', error);
                toast.error('Sharing failed.');
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success('URL copied to clipboard!');
        }
    };

    const handleRefresh = () => {
        fetchNote();
    };

    const handleClear = () => {
        if (description.trim()) {
            if (window.confirm('Are you sure you want to clear all text?')) {
                setDescription('');
                setUpdateStatus(false);
                toast.success('Text cleared');
            }
        }
    };

    const handleSelectAll = () => {
        textareaRef.current?.select();
        toast.success('All text selected');
    };

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 's':
                        e.preventDefault();
                        handleSave(true);
                        break;
                    case 'a':
                        e.preventDefault();
                        handleSelectAll();
                        break;
                    case 'c':
                        if (e.shiftKey) {
                            e.preventDefault();
                            handleCopy();
                        }
                        break;
                    case 'z':
                        if (e.shiftKey) {
                            e.preventDefault();
                        }
                        break;
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleSave]);

    const formatLastSaved = (date) => {
        if (!date) return 'Never';
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        
        if (minutes > 0) {
            return `${minutes}m ${seconds}s ago`;
        }
        return `${seconds}s ago`;
    };

    return (
        <div className="h-screen overflow-hidden flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-slate-900 dark:text-white">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-30 dark:opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23666' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
            </div>

            {/* Header */}
            <header className="relative z-10 flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4 border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center space-x-2 lg:space-x-3">
                    <a 
                        href="/" 
                        className="p-2 lg:p-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl hover:bg-white/80 dark:hover:bg-slate-700/60 transition-all duration-300 shadow-sm"
                        title="Go Home"
                    >
                        <FaHome className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                    </a>
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-sm">T</span>
                        </div>
                        <span className="text-base lg:text-lg font-semibold text-slate-800 dark:text-slate-200 tracking-tight">onText</span>
                    </div>
                    <span className="text-xs lg:text-sm text-slate-500 dark:text-slate-400 font-mono hidden sm:block">/{title}</span>
                </div>

                {/* Desktop Controls */}
                <div className="hidden lg:flex items-center space-x-4">
                    {/* Stats */}
                    <div className="flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-400 font-medium">
                        <span>{wordCount} words</span>
                        <span>{charCount} chars</span>
                        {lastSaved && (
                            <span title={lastSaved.toLocaleString()}>
                                Saved {formatLastSaved(lastSaved)}
                            </span>
                        )}
                    </div>

                    {/* Save Status */}
                    <div className="flex items-center space-x-2">
                        {updateStatus ? (
                            <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-xs font-medium">Saved</span>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400">
                                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                                <span className="text-xs font-medium">Unsaved</span>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                        {!isAutoSave && (
                            <button
                                onClick={() => handleSave(true)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 text-xs font-medium shadow-sm ${
                                    updateStatus 
                                        ? 'bg-slate-200 dark:bg-slate-700 cursor-not-allowed opacity-50' 
                                        : 'bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md hover:shadow-lg transform hover:scale-105'
                                }`}
                                disabled={updateStatus}
                                title="Save (Ctrl+S)"
                            >
                                <FaSave className="w-3 h-3" />
                                {updateStatus ? 'Saved' : 'Save'}
                            </button>
                        )}

                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all duration-300 text-xs font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                            title="Copy (Ctrl+Shift+C)"
                        >
                            <FaCopy className="w-3 h-3" />
                            Copy
                        </button>

                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl transition-all duration-300 text-xs font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                            <FaShare className="w-3 h-3" />
                            Share
                        </button>

                        <button
                            onClick={handleExportTxt}
                            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white rounded-xl transition-all duration-300 text-xs font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                            <FaFileDownload className="w-3 h-3" />
                            TXT
                        </button>

                        <button
                            onClick={handleExportPdf}
                            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all duration-300 text-xs font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                            <FaFilePdf className="w-3 h-3" />
                            PDF
                        </button>

                        <button
                            onClick={handleRefresh}
                            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-xl transition-all duration-300 text-xs font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                            title="Refresh"
                        >
                            <FaSync className="w-3 h-3" />
                            Refresh
                        </button>

                        <button
                            onClick={() => setShowShortcuts(!showShortcuts)}
                            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl transition-all duration-300 text-xs font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                            title="Keyboard Shortcuts"
                        >
                            <FaKeyboard className="w-3 h-3" />
                            Shortcuts
                        </button>

                        {/* Auto Save Toggle */}
                        <label className="flex items-center cursor-pointer space-x-2">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={isAutoSave}
                                onChange={handleToggleAutoSave}
                            />
                            <div className="relative w-9 h-5 bg-slate-300 dark:bg-slate-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Auto</span>
                        </label>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                    className="lg:hidden p-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl hover:bg-white/80 dark:hover:bg-slate-700/60 transition-all duration-300 shadow-sm"
                >
                    {showMobileMenu ? <FaTimes className="w-5 h-5 text-slate-600 dark:text-slate-300" /> : <FaBars className="w-5 h-5 text-slate-600 dark:text-slate-300" />}
                </button>
            </header>

            {/* Mobile Menu */}
            {showMobileMenu && (
                <div className="lg:hidden relative z-20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 p-4 shadow-lg">
                    <div className="space-y-4">
                        {/* Mobile Stats */}
                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                            <span>{wordCount} words • {charCount} chars</span>
                            {lastSaved && (
                                <span>Saved {formatLastSaved(lastSaved)}</span>
                            )}
                        </div>

                        {/* Mobile Save Status */}
                        <div className="flex items-center justify-center">
                            {updateStatus ? (
                                <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-xs font-medium">Saved</span>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400">
                                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                                    <span className="text-xs font-medium">Unsaved</span>
                                </div>
                            )}
                        </div>

                        {/* Mobile Action Buttons */}
                        <div className="grid grid-cols-2 gap-3">
                            {!isAutoSave && (
                                <button
                                    onClick={() => handleSave(true)}
                                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium shadow-sm ${
                                        updateStatus 
                                            ? 'bg-slate-200 dark:bg-slate-700 cursor-not-allowed opacity-50' 
                                            : 'bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md hover:shadow-lg'
                                    }`}
                                    disabled={updateStatus}
                                >
                                    <FaSave className="w-4 h-4" />
                                    {updateStatus ? 'Saved' : 'Save'}
                                </button>
                            )}

                            <button
                                onClick={handleCopy}
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg"
                            >
                                <FaCopy className="w-4 h-4" />
                                Copy
                            </button>

                            <button
                                onClick={handleShare}
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg"
                            >
                                <FaShare className="w-4 h-4" />
                                Share
                            </button>

                            <button
                                onClick={handleExportTxt}
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-br from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white rounded-xl transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg"
                            >
                                <FaFileDownload className="w-4 h-4" />
                                TXT
                            </button>

                            <button
                                onClick={handleExportPdf}
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg"
                            >
                                <FaFilePdf className="w-4 h-4" />
                                PDF
                            </button>

                            <button
                                onClick={handleRefresh}
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-br from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-xl transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg"
                            >
                                <FaSync className="w-4 h-4" />
                                Refresh
                            </button>

                            <button
                                onClick={() => setShowShortcuts(!showShortcuts)}
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg"
                            >
                                <FaKeyboard className="w-4 h-4" />
                                Shortcuts
                            </button>

                            {/* Mobile Auto Save Toggle */}
                            <label className="flex items-center justify-center gap-2 px-4 py-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl cursor-pointer shadow-sm">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={isAutoSave}
                                    onChange={handleToggleAutoSave}
                                />
                                <div className="relative w-10 h-6 bg-slate-300 dark:bg-slate-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Auto Save</span>
                            </label>
                        </div>
                    </div>
                </div>
            )}

            {/* Keyboard Shortcuts Modal */}
            {showShortcuts && (
                <div className="absolute inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 max-w-md w-full shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Keyboard Shortcuts</h3>
                            <button 
                                onClick={() => setShowShortcuts(false)}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            >
                                <FaTimes className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-700 dark:text-slate-300">Save</span>
                                <kbd className="px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-mono shadow-sm">Ctrl+S</kbd>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-700 dark:text-slate-300">Select All</span>
                                <kbd className="px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-mono shadow-sm">Ctrl+A</kbd>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-700 dark:text-slate-300">Copy Text</span>
                                <kbd className="px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-mono shadow-sm">Ctrl+Shift+C</kbd>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="relative z-10 flex-1 flex p-2 lg:p-4 overflow-auto">
                <div className="w-full max-w-6xl mx-auto flex flex-col h-full">
                    <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-xl overflow-hidden flex-1 flex flex-col">
                        {isLoading ? (
                            <div className="flex-1 flex items-center justify-center">
                                <div className="text-center space-y-4">
                                    <div className="spinner mx-auto"></div>
                                    <p className="text-slate-500 dark:text-slate-400">Loading note...</p>
                                </div>
                            </div>
                        ) : (
                            <textarea
                                ref={textareaRef}
                                placeholder='Start typing here...'
                                value={description}
                                onChange={handleChange}
                                className='w-full h-full min-h-0 p-4 lg:p-6 bg-transparent focus:outline-none focus:ring-0 resize-none text-base leading-relaxed placeholder-slate-400 dark:placeholder-slate-500 flex-1'
                            />
                        )}
                    </div>
                </div>
            </main>

            {/* Toast Notifications */}
            <Toaster
                position="bottom-center"
                reverseOrder={false}
                gutter={8}
                toastOptions={{
                    style: {
                        background: 'rgba(255, 255, 255, 0.95)',
                        color: '#1e293b',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(148, 163, 184, 0.2)',
                        fontSize: '14px',
                        maxWidth: '90vw',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    },
                    duration: 3000,
                }}
            />

            {/* Footer */}
            <footer className="relative z-10 flex items-center justify-center px-4 lg:px-6 py-3 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200/50 dark:border-slate-700/50">
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

export default Note;
