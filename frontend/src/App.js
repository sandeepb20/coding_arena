import './App.css';
import MarkdownViewer from './Components/MarkdownViewer/MarkdownViewer';
import CodeEditor from './Components/CodeEditor/CodeEditor';

function App() {
  return (
    <div>
      <CodeEditor></CodeEditor>
      <MarkdownViewer></MarkdownViewer>
    </div>
  );
}

export default App;
