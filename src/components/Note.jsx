import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import { FaSave, FaCopy, FaFileDownload, FaFilePdf, FaShare, FaSync } from 'react-icons/fa'; // Import the refresh icon
import { toast, Toaster } from 'react-hot-toast';

const Note = () => {
    const { title } = useParams();
    const [description, setDescription] = useState('');
    const [updateStatus, setUpdateStatus] = useState(true);

    const fetchNote = async () => {
        try {
            const response = await axios.get(`https://textapp-eight.vercel.app/note/${title}`);
            if (response.data) {
                setDescription(response.data.description);
                setUpdateStatus(true); // Reset update status when fetching note
            }
        } catch (error) {
            console.error('Error fetching note:', error);

        }
    };

    useEffect(() => {
        fetchNote();
    }, [title]);

    const handleChange = (event) => {
        const newDescription = event.target.value;
        setDescription(newDescription);
        setUpdateStatus(false);
    };

    const handleSave = async () => {
        const sendData = { title, description };
        try {
            const response = await axios.post('https://textapp-eight.vercel.app/note', sendData);
            if (response.status === 201 || response.status === 200) {
                setUpdateStatus(true);
                toast.success('Cloud saved successfully!');
            }
        } catch (error) {
            console.error('Error saving data:', error);
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

    const handleExportPdf = () => {
        const pdf = new jsPDF();
        pdf.text(description, 10, 10);
        pdf.save(`${title}.pdf`);
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
                    <button
                        onClick={handleSave}
                        className={`text-xs lg:px-4 px-2 py-1 lg:py-2 rounded-lg transition ${updateStatus ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
                        disabled={updateStatus}
                    >
                        <FaSave className="inline-block mr-1" /> {updateStatus ? 'Saved' : 'Save'}
                    </button>
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
                    {/* Refresh Button */}
                    <button
                        onClick={handleRefresh}
                        className="text-xs bg-slate-700 text-white lg:px-4 px-2 py-1 lg:py-2 rounded-lg hover:bg-slate-900 transition"
                    >
                        <FaSync className="inline-block mr-2" /> Refresh
                    </button>
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
                position="top-center"
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
