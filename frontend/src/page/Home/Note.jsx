import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

const Note = () => {
    const { noteTitle } = useParams();

    const submitData = async () => {
        var title = noteTitle;
        const canvasText = document.getElementById(1).value;
        try {
            console.log(title, canvasText);

            // update data ref title 

        }
        catch {
            console.log('Create a data')
            //create data keep title 
        }

    }
    return (
        <div className='m-0  mx-auto'>
            <Helmet>
                <title>{noteTitle} || Text Share</title>
                <meta name="Keep and share your text " content="application" />
            </Helmet>
            <textarea rows={20}
                id='1'
                name='canvasText'
                onInput={submitData}
                placeholder="keep your text " className='w-full  h-[85vh] p-2 m-0'>
            </textarea>
        </div>
    );
};

export default Note;