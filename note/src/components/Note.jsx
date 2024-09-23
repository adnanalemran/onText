import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';

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
            }
        };

        fetchNote();
    }, [title]);

    const handleChange = (event) => {
        const newDescription = event.target.value;
        setDescription(newDescription);
        socket.emit('noteUpdated', { title, description: newDescription });
    };

    const handleSave = async () => {
        const sendData = { title, description };
        try {
            const response = await axios.post('http://localhost:5000/note', sendData);
            if (response.status === 201 || response.status === 200) {
                setUpdateStatus(true);
                console.log('Note saved successfully');
            }
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(description);
        alert('Note copied to clipboard!');
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
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <div>
                {updateStatus ? (
                    <span className="text-green-600">Updated successfully</span>
                ) : (
                    <span className="text-orange-600">Updating...</span>
                )}
            </div>
            <textarea
                placeholder='Start typing here...'
                rows={10}
                value={description}
                onChange={handleChange}
                className='w-full h-64 p-4 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <div className="flex justify-between mt-4">
                <button 
                    onClick={handleSave} 
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Save
                </button>
                <button 
                    onClick={handleCopy} 
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                    Copy
                </button>
            </div>
        </div>
    );
};

export default Note;
