import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import MarkdownViewer from './Components/MarkdownViewer/MarkdownViewer';
import CodeEditor from './Components/CodeEditor/CodeEditor';
import LandingPage from './Components/LandingPage/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/code-editor" element={<CodeEditor />} />
        <Route path="/blogs" element={<MarkdownViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
