import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';

const socket = io('http://localhost:5000'); // Your backend URL

const Note = () => {
    const { title } = useParams(); // Get title from URL
    const [description, setDescription] = useState('');
    const [updateStatus, setUpdateStatus] = useState(true);

    // Fetch note data
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

    // Handle textarea change
    const handleChange = (event) => {
        const newDescription = event.target.value;
        setDescription(newDescription);
        socket.emit('noteUpdated', { title, description: newDescription }); // Emit change
    };

    // Save data to the server
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

    // Listen for real-time updates
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
        <div className="note-container">
            <h2>{title}</h2>
            <div>
                {updateStatus ? (
                    <span style={{ color: 'green' }}>Updated successfully</span>
                ) : (
                    <span style={{ color: 'orange' }}>Updating...</span>
                )}
            </div>
            <textarea
                placeholder='Start typing here...'
                rows={10}
                value={description}
                onChange={handleChange}
                className='textarea'
            />
            <button onClick={handleSave} className="save-button">Save</button>
        </div>
    );
};

export default Note;
