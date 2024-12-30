import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./MarkdownViewer.css";

function MarkdownViewer() {
  const [markdown, setMarkdown] = useState("Enter text here...");

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  return (
    <div className="MarkdownViewer-container">
      <div>
        <h1>You can write blogs here</h1>
        <form action="#" method="post">
          <textarea
            className="MarkdownViewer-left"
            value={markdown}
            onChange={handleChange}
          />
          <button type="submit">
            Post this blog now!
          </button>
        </form>
      </div>
      <div>
        <h1>Preview can be found here</h1>
        <div className="MarkdownViewer-right">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default MarkdownViewer;
