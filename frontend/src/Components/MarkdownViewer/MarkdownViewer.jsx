import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./MarkdownViewer.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

function MarkdownViewer() {
  const [markdown, setMarkdown] = useState("Enter text here...");

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  return (
    <div className="MarkdownViewer-container">
      <Navbar />
      <div className="MarkdownViewer-content">
        <div className="MarkdownViewer-left-column">
          <h1>You can write blogs here</h1>
          <form action="#" method="post">
            <textarea
              className="MarkdownViewer-textarea"
              value={markdown}
              onChange={handleChange}
            />
            <button type="submit" className="MarkdownViewer-submit-button">
              Post this blog now!
            </button>
          </form>
        </div>
        <div className="MarkdownViewer-right-column">
          <h1>Preview can be found here</h1>
          <div className="MarkdownViewer-preview">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MarkdownViewer;
