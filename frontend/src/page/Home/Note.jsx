import React, { useState, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const Note = () => {
    const { noteTitle } = useParams();
    const { isPending, error, data, refetch } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
            fetch(`http://127.0.0.1:8000/api/v1/note/${noteTitle}`).then((res) =>
                res.json(),
            ),
    })

    //need fix  , data show undefined

    const [description, setDescription] = useState(`${data?.description}`);

    const [updateStatus, setUpdateStatus] = useState(true);

    // Handle text area change
    const handleChange = (event) => {
        setDescription(event.target.value);
    };

    // Submit data to the server
    const submitData = useCallback(async () => {
        const sendData = { title: noteTitle, description };
        try {
            setUpdateStatus(false);
            const response = await axios.post('http://127.0.0.1:8000/api/v1/note', sendData);
            if (response.status === 201) {
                setUpdateStatus(true);
                refetch();
            } else {
                console.log('Error saving data');
            }
        } catch (error) {
            console.error('Error saving data:', error);
            console.log('Error saving data');
        }
    }, [noteTitle, description]);


    useEffect(() => {

    }, [description, submitData]);



    if (isPending) return 'Loading...'
    return (
        <div className='m-0 mx-auto'>
            <Helmet>
                <title>{noteTitle} || Text Share</title>
                <meta name="description" content="Keep and share your text" />
            </Helmet>
            <button onClick={submitData}>
                Save
            </button>
            <div className="relative">
                <div className='   bottom-7 absolute end-5 '> {updateStatus ? <div className=" w-3 h-3 p-1 rounded-full bg-green-500 drop-shadow-2x"></div> : <div className=" w-3 h-3 p-1 rounded-full bg-warning drop-shadow-2x"></div>}</div>

            </div>

            <textarea
                rows={20}
                // defaultValue={data?.description}
                value={description}
                onChange={handleChange}

                className='w-full h-[85vh] p-2 m-0'
            />
        </div>
    );
};

export default Note;
