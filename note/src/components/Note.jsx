import { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import { FaSave, FaCopy, FaFileDownload, FaFilePdf } from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';
const socket = io('http://localhost:5000'); // Your backend URL

const Note = () => {
    const { title } = useParams();
    const [description, setDescription] = useState('');
    const [updateStatus, setUpdateStatus] = useState(true);


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
        <div className="max-h-screen  flex flex-col min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <header className="bg-gray-800 px-4 py-2 shadow-md flex justify-between items-center ">
                <h1 className="text-2xl font-bold">{title}</h1>


                <div className="flex justify-between items-center  gap-2">
                    <div className="  text-sm">
                        {updateStatus ? (
                            <span className="text-neutral-500">DB store successfully</span>
                        ) : (
                            <span className=" ">Unsaved changes, click save </span>
                        )}
                    </div>
                    <button
                        onClick={handleSave}
                        className={`text-xs px-4 py-3 rounded-lg transition ${updateStatus ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
                        disabled={updateStatus} // Disable the button when saved
                    >
                        <FaSave className="inline-block mr-1" /> {updateStatus ? 'Saved' : 'Save'}
                    </button>


                    <button
                        onClick={handleCopy}
                        className="text-xs bg-slate-700 text-white px-4 py-3 rounded-lg hover:bg-slate-900 transition"
                    >
                        <FaCopy className="inline-block mr-2" /> Copy
                    </button>
                    <div className=" ">


                        <div className="  right-0 flex  gap-1  shadow-lg">
                            <button
                                onClick={handleExportTxt}
                                className="text-xs bg-slate-700   px-4 py-3     w-full text-left p-2    rounded-lg  hover:slate-800 transition flex items-center text-white"
                            >
                                <FaFileDownload className="inline-block mr-2" /> .txt
                            </button>
                            <button
                                onClick={handleExportPdf}
                                className="text-xs bg-slate-700   px-4 py-3     w-full text-left p-2    rounded-lg  hover:slate-800 transition flex items-center text-white"
                            >
                                <FaFilePdf className="inline-block mr-2" /> .pdf
                            </button>
                        </div>

                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-1 pb-7 ">
                <div className="w-full   mx-auto     shadow-lg">
                    <textarea
                        placeholder='Start typing here...'
                        rows={20}
                        value={description}
                        onChange={handleChange}
                        className='w-full min-h-full p-2 bg-gray-900      focus:outline-none focus:ring-2 focus:ring-transparent resize-none text-sm'
                    />

                </div>
            </div>

            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                toastOptions={{
                    style: {
                        background: '#0a0a23', // Set background color to black
                        color: 'white', // Optional: Set text color to white for better contrast
                    },
                }}
            />
            <div className="bg-gray-900 text-gray-600 p-1 text-center text-xs absolute  bottom-0  w-full">
                <p>Developed by Adnan al Emran | Inspired by the CodeShare community.</p>
            </div>

        </div>
    );
};

export default Note;
