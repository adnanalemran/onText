import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import { FaSave, FaCopy, FaFileExport, FaFileDownload, FaFilePdf } from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';
const socket = io('http://localhost:5000'); // Your backend URL

const Note = () => {
    const { title } = useParams();
    const [description, setDescription] = useState('');
    const [updateStatus, setUpdateStatus] = useState(true);
    const [showExportOptions, setShowExportOptions] = useState(false);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/note/${title}`);
                if (response.data) {
                    setDescription(response.data.description);
                }
            } catch (error) {
                console.error('Error fetching note:', error);
                toast.error('Error fetching note.');
            }
        };

        fetchNote();
    }, [title]);

    const handleChange = (event) => {
        const newDescription = event.target.value;
        setDescription(newDescription);
        socket.emit('noteUpdated', { title, description: newDescription });
        setUpdateStatus(false);
    };

    const handleSave = async () => {
        const sendData = { title, description };
        try {
            const response = await axios.post('http://localhost:5000/note', sendData);
            if (response.status === 201 || response.status === 200) {
                setUpdateStatus(true);
                toast.success('Note saved successfully!');
            }
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(description);
        toast.success('Note copied to clipboard!');
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

    useEffect(() => {
        socket.on('noteUpdated', (note) => {
            if (note.title === title) {
                setDescription(note.description);
            }
        });

        return () => {
            socket.off('noteUpdated');
        };
    }, [title]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-950 text-white">
            {/* Header */}
            <header className="bg-gray-800 px-4 py-2 shadow-md flex justify-between items-center ">
                <h1 className="text-2xl font-bold">{title}</h1>
                <div className="mb-2  text-sm">
                    {updateStatus ? (
                        <span className="text-green-400">Saved successfully</span>
                    ) : (
                        <span className="text-yellow-500">* Unsaved changes, click save </span>
                    )}
                </div>

                <div className="flex justify-between items-center  gap-2">
                    <button
                        onClick={handleSave}
                        className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ${updateStatus ? 'border-green-500' : 'border-yellow-500'}`}
                    >
                        <FaSave className="inline-block mr-2" /> Save
                    </button>
                    <button
                        onClick={handleCopy}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                    >
                        <FaCopy className="inline-block mr-2" /> Copy
                    </button>
                    <div className=" ">
                         
                         
                            <div className="  right-0 flex  gap-1  shadow-lg">
                                <button
                                    onClick={handleExportTxt}
                                    className="w-full text-left p-2 bg-gray-600   rounded-lg  hover:bg-gray-500 transition flex items-center text-white"
                                >
                                    <FaFileDownload className="inline-block mr-2" /> .txt
                                </button>
                                <button
                                    onClick={handleExportPdf}
                                    className="w-full text-left p-2 bg-gray-600   rounded-lg  hover:bg-gray-500transition flex items-center text-white"
                                >
                                    <FaFilePdf className="inline-block mr-2" /> .pdf
                                </button>
                            </div>
                        
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-1  ">
                <div className="w-full   mx-auto   p-6   shadow-lg">


                    <textarea
                        placeholder='Start typing here...'
                        rows={20}
                        value={description}
                        onChange={handleChange}
                        className='w-full min-h-[85vh] p-4 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
                    />

                </div>
            </div>

            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    );
};

export default Note;
