
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Note from './components/Note';
import Welcome from './components/Welcome';



const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/:title" element={<Note />} />
                <Route path="/" element={<Welcome />} />
                {/* Add more routes if needed */}
            </Routes>
        </Router>
    );
};

export default App;
