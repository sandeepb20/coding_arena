import './App.css';
import MarkdownViewer from './Components/MarkdownViewer/MarkdownViewer';
import CodeEditor from './Components/CodeEditor/CodeEditor';
import LandingPage from './Components/LandingPage/LandingPage';

function App() {
  return (
    <div>
      <LandingPage></LandingPage>
      <CodeEditor></CodeEditor>
      <MarkdownViewer></MarkdownViewer>
    </div>
  );
}

export default App;
