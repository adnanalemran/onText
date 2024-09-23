import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Note from './components/Note';
 
 

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/:title" element={<Note />} />
                {/* Add more routes if needed */}
            </Routes>
        </Router>
    );
};

export default App;
