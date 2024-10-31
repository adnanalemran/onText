import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import { FaSave, FaCopy, FaFileDownload, FaFilePdf, FaShare, FaSync } from 'react-icons/fa';
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
                    toast.success('Cloud saved successfully!');
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
            toast('Unsaved changes! Please save manually.', { icon: '⚠️' });
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(description);
        toast.success('Text copied to clipboard!');
    };

    const handleExportTxt = () => {
        const blob = new Blob([description], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${title}.txt`;
        link.click();
        toast.success('.txt file exported!');
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
        toast.success('.pdf file exported!');
    };




    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: description,
                    url: window.location.href,
                });
                toast.success('Note shared successfully!');
            } catch (error) {
                console.error('Error sharing:', error);
                toast.error('Error sharing the note.');
            }
        } else {
            toast.error('Sharing is not supported in this browser.');
        }
    };

    const handleRefresh = () => {
        fetchNote(); // Call the fetchNote function to refresh the data
    };

    return (
        <div className="max-h-screen flex flex-col min-h-screen bg-gray-900 text-white">
            <header className="bg-gray-800 px-4 py-2 shadow-md flex flex-col md:flex-row justify-between items-center">
                <h1 className="text-3xl lg:text-2xl font-bold pb-2 lg:pb-0">{title}</h1>
                <div className="flex flex-row justify-between items-center gap-2">
                    <div className="lg:text-sm hidden">
                        {updateStatus ? (
                            <span className="text-neutral-500">DB store successfully</span>
                        ) : (
                            <span>Unsaved changes, click save</span>
                        )}
                    </div>
                    {/* Conditional render of the save button */}
                    {!isAutoSave && (
                        <button
                            onClick={() => handleSave(true)} // Pass true for manual save
                            className={`text-xs lg:px-4 px-2 py-1 lg:py-2 rounded-lg transition ${updateStatus ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
                            disabled={updateStatus}
                        >
                            <FaSave className="inline-block mr-1" /> {updateStatus ? 'Saved' : 'Save'}
                        </button>
                    )}
                    <button
                        onClick={handleCopy}
                        className="text-xs bg-slate-700 text-white lg:px-4 px-2 py-1 lg:py-2 rounded-lg hover:bg-slate-900 transition"
                    >
                        <FaCopy className="inline-block mr-2" /> Copy
                    </button>
                    <button
                        onClick={handleShare}
                        className="text-xs bg-slate-700 text-white lg:px-4 px-2 py-1 lg:py-2 rounded-lg hover:bg-slate-900 transition"
                    >
                        <FaShare className="inline-block mr-2" /> Share
                    </button>
                    <button
                        onClick={handleExportTxt}
                        className="text-xs bg-slate-700 text-white lg:px-4 px-2 py-1 lg:py-2 rounded-lg hover:bg-slate-900 transition"
                    >
                        <FaFileDownload className="inline-block mr-2" /> .txt
                    </button>
                    <button
                        onClick={handleExportPdf}
                        className="text-xs bg-slate-700 text-white lg:px-4 px-2 py-1 lg:py-2 rounded-lg hover:bg-slate-900 transition"
                    >
                        <FaFilePdf className="inline-block mr-2" /> .pdf
                    </button>
                    <button
                        onClick={handleRefresh}
                        className="text-xs bg-slate-700 text-white lg:px-4 px-2 py-1 lg:py-2 rounded-lg hover:bg-slate-900 transition"
                    >
                        <FaSync className="inline-block mr-2" /> Refresh
                    </button>
                    {/* Auto Save Toggle */}
                    <label className="hidden lg:inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={isAutoSave}
                            onChange={handleToggleAutoSave}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Auto Save</span>
                    </label>
                </div>
            </header>

            <div className="flex flex-1 pb-7">
                <div className="w-full mx-auto shadow-lg">
                    <textarea
                        placeholder='Start typing here...'
                        rows={20}
                        value={description}
                        onChange={handleChange}
                        className='w-full min-h-full p-2 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-transparent resize-none text-sm'
                    />
                </div>
            </div>

            <Toaster
                position="bottom-right"
                reverseOrder={false}
                gutter={8}
                toastOptions={{
                    style: {
                        background: '#0a0a23',
                        color: 'white',
                    },
                }}
            />
            <div className="bg-gray-900 text-gray-600 p-1 text-center text-xs absolute bottom-0 w-full">
                <a href='https://github.com/adnanalemran'>Developed by Adnan al Emran || 2024</a>
            </div>
        </div>
    );
};

export default Note;
