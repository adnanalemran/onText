import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import { FaSave, FaCopy, FaFileDownload, FaFilePdf, FaShare, FaSync, FaHome } from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';

const Note = () => {
    const { title } = useParams();
    const [description, setDescription] = useState('');
    const [updateStatus, setUpdateStatus] = useState(true);
    const [isAutoSave, setIsAutoSave] = useState(true); // Toggle for auto-save

    const fetchNote = useCallback(async () => {
        try {
            const response = await axios.get(`https://textapp-eight.vercel.app/note/${title}`);
            if (response.data) {
                setDescription(response.data.description);
                setUpdateStatus(true);
            }
        } catch (error) {
            console.error('Error fetching note:', error);
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
                if (isManual) { // Only show toast for manual save
                    toast.success('Saved successfully!');
                }
            }
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }, [title, description]);

    useEffect(() => {
        if (isAutoSave && !updateStatus) {
            const autoSaveInterval = setTimeout(async () => {
                await handleSave(); // Auto-save will not show a toast
            }, 200);
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
        navigator.clipboard.writeText(description);
        toast.success('Copied to clipboard!');
    };

    const handleExportTxt = () => {
        const blob = new Blob([description], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${title}.txt`;
        link.click();
        toast.success('TXT file downloaded!');
    };

    // Function to format date to dd/mm/yyyy and time to HH:MM:SS AM/PM
    const formatDateTime = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        // Format time to HH:MM:SS AM/PM
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12; // Convert to 12-hour format
        hours = hours ? String(hours).padStart(2, '0') : '12'; // the hour '0' should be '12'

        const formattedDate = `${day}/${month}/${year}`;
        const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;

        return { formattedDate, formattedTime };
    };

    const handleExportPdf = () => {
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            putOnlyUsedFonts: true,
        });

        // Set the title
        pdf.setFontSize(18);
        pdf.text(title, 10, 10); // Add title at the top

        // Set font size for the description
        pdf.setFontSize(12);

        // Add the description text
        const pageHeight = pdf.internal.pageSize.height; // Get the height of the PDF page
        const margin = 5; // Set a margin
        const textLines = pdf.splitTextToSize(description, pdf.internal.pageSize.width - margin * 2); // Split the text into lines

        let y = 20; // Starting Y position for the text

        for (let i = 0; i < textLines.length; i++) {
            if (y + 10 > pageHeight - margin - 60) { // Check if adding the next line exceeds the page height before footer
                pdf.addPage(); // Add a new page
                y = 10; // Reset Y position to 10
            }
            pdf.text(textLines[i], margin, y); // Add text line to the PDF
            y += 10; // Move Y position down for the next line
        }

        // Add the export date and time
        const { formattedDate, formattedTime } = formatDateTime(new Date()); // Get current date and time
        const url = window.location.href; // Get the current URL

        pdf.setFontSize(10); // Smaller font size for footer
        const footerY = pageHeight - margin - 10; // Position Y for the footer 10px from the bottom

        const footerText2 = `URL: ${url}`; // Current URL
        const createdByText = "Thank you for use onText :) "; // Add creator text
        const footerText1 = `Exported on: ${formattedDate} ${formattedTime}`; // Export date and time
        // Calculate width for right alignment

        const footerTextWidth2 = pdf.getTextWidth(footerText2);
        const createdByTextWidth = pdf.getTextWidth(createdByText);
        const footerTextWidth1 = pdf.getTextWidth(footerText1);
        const footerWidth = Math.max(footerTextWidth1, footerTextWidth2, createdByTextWidth); // Use the wider text for positioning
        const footerX = pdf.internal.pageSize.width - footerWidth - margin; // Right-align footer text with margin

        // Add footer texts
        pdf.text(createdByText, footerX, footerY + 10); // Created by text
        pdf.text(footerText1, footerX, footerY); // Export date and time
        pdf.text(footerText2, footerX, footerY + 5); // Current URL

        pdf.save(`${title}.pdf`); // Save the PDF with the title
        toast.success('PDF file downloaded!');
    };

    const handleShare = async () => {
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
            toast.error('Sharing not supported.');
        }
    };

    const handleRefresh = () => {
        fetchNote(); // Call the fetchNote function to refresh the data
    };

    return (
        <div className="h-screen overflow-hidden flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
            </div>

            {/* Header */}
            <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/10">
                <div className="flex items-center space-x-3">
                    <a 
                        href="/" 
                        className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300"
                        title="Go Home"
                    >
                        <FaHome className="w-4 h-4" />
                    </a>
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">T</span>
                        </div>
                        <span className="text-lg font-medium text-gray-300">onText</span>
                    </div>
                    <span className="text-sm text-gray-500 font-mono">/{title}</span>
                </div>

                {/* Status and Controls */}
                <div className="flex items-center space-x-3">
                    {/* Save Status */}
                    <div className="hidden lg:flex items-center space-x-2">
                        {updateStatus ? (
                            <div className="flex items-center space-x-2 text-green-400">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-xs">Saved</span>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2 text-yellow-400">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                <span className="text-xs">Unsaved</span>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                        {!isAutoSave && (
                            <button
                                onClick={() => handleSave(true)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 text-xs font-medium ${
                                    updateStatus 
                                        ? 'bg-gray-600 cursor-not-allowed opacity-50' 
                                        : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transform hover:scale-105'
                                }`}
                                disabled={updateStatus}
                            >
                                <FaSave className="w-3 h-3" />
                                {updateStatus ? 'Saved' : 'Save'}
                            </button>
                        )}

                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg transition-all duration-300 text-xs font-medium transform hover:scale-105"
                        >
                            <FaCopy className="w-3 h-3" />
                            Copy
                        </button>

                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-lg transition-all duration-300 text-xs font-medium transform hover:scale-105"
                        >
                            <FaShare className="w-3 h-3" />
                            Share
                        </button>

                        <button
                            onClick={handleExportTxt}
                            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 rounded-lg transition-all duration-300 text-xs font-medium transform hover:scale-105"
                        >
                            <FaFileDownload className="w-3 h-3" />
                            TXT
                        </button>

                        <button
                            onClick={handleExportPdf}
                            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg transition-all duration-300 text-xs font-medium transform hover:scale-105"
                        >
                            <FaFilePdf className="w-3 h-3" />
                            PDF
                        </button>

                        <button
                            onClick={handleRefresh}
                            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 rounded-lg transition-all duration-300 text-xs font-medium transform hover:scale-105"
                        >
                            <FaSync className="w-3 h-3" />
                            Refresh
                        </button>

                        {/* Auto Save Toggle */}
                        <label className="hidden lg:flex items-center cursor-pointer space-x-2">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={isAutoSave}
                                onChange={handleToggleAutoSave}
                            />
                            <div className="relative w-9 h-5 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                            <span className="text-xs font-medium text-gray-300">Auto</span>
                        </label>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 flex-1 flex p-4 overflow-auto">
                <div className="w-full max-w-6xl mx-auto flex flex-col h-full">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg overflow-hidden flex-1 flex flex-col">
                        <textarea
                            placeholder='Start typing here...'
                            value={description}
                            onChange={handleChange}
                            className='w-full h-full min-h-0 p-6 bg-transparent focus:outline-none focus:ring-0 resize-none text-base leading-relaxed placeholder-gray-400 flex-1'
                        />
                    </div>
                </div>
            </main>

            {/* Toast Notifications */}
            <Toaster
                position="bottom-right"
                reverseOrder={false}
                gutter={8}
                toastOptions={{
                    style: {
                        background: 'rgba(0, 0, 0, 0.9)',
                        color: 'white',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        fontSize: '14px',
                    },
                    duration: 3000,
                }}
            />

            {/* Footer */}
            <footer className="relative z-10 flex items-center justify-center px-6 py-3 text-xs text-gray-500 border-t border-white/10">
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

export default Note;
