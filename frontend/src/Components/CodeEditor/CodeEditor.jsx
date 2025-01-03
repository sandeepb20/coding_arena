import React, { useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import axios from "axios";
import "./CodeEditor.css"; // CSS file reference remains as "CodeEditor.css"
import Navbar from "../Navbar/Navbar"; // Updated import paths
import Footer from "../Footer/Footer";   // Updated import paths

function CodeEditor() {
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(getBoilerplate("cpp"));
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [executionTime, setExecutionTime] = useState(null);
  const [memoryUsage, setMemoryUsage] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "x") {
        event.preventDefault();
        executeCode();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup to prevent multiple listeners
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Language options mapping
  const languageMap = {
    c: "C",
    cpp: "C++",
    python: "Python",
    javascript: "JavaScript",
  };

  // Boilerplate code for each language
  function getBoilerplate(lang) {
    switch (lang) {
      case "c":
        return `#include <stdio.h>\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`;
      case "cpp":
        return `#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello, World!";\n    return 0;\n}`;
      case "python":
        return `print("Hello, World!")`;
      case "javascript":
        return `console.log("Hello, World!");`;
      default:
        return "// Write your code here...";
    }
  }

  const executeCode = async () => {
    setIsExecuting(true);
    setOutput("");
    setExecutionTime(null);
    setMemoryUsage(null);

    try {
      const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
        language,
        version: "*",
        files: [
          {
            name: `main.${language === "cpp" || language === "c" ? "cpp" : language === "python" ? "py" : "js"}`,
            content: code,
          },
        ],
        stdin: input,
      });

      if (response.data && response.data.run) {
        const { stdout, stderr, time, memory } = response.data.run;
        setOutput(stdout || stderr || "No output.");
        setExecutionTime(time || "N/A");
        setMemoryUsage(memory || "N/A");
      } else {
        setOutput("No output received from the server.");
        setExecutionTime("N/A");
        setMemoryUsage("N/A");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || "Unknown error occurred.";
      setOutput(`Error: ${errorMessage}`);
      setExecutionTime("N/A");
      setMemoryUsage("N/A");
    } finally {
      setIsExecuting(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2000); // Show notification for 2 seconds
      },
      () => alert("Failed to copy to clipboard.")
    );
  };

  return (
    <div className="CodeEditor-container">
      <Navbar />
      <header className="CodeEditor-header">
        <h1>Code Editor</h1>
        <div className="CodeEditor-controls">
          <select
            value={language}
            onChange={(e) => {
              const selectedLang = e.target.value;
              setLanguage(selectedLang);
              setCode(getBoilerplate(selectedLang)); // Set boilerplate for selected language
            }}
          >
            {Object.keys(languageMap).map((lang) => (
              <option key={lang} value={lang}>
                {languageMap[lang]}
              </option>
            ))}
          </select>
          <button onClick={executeCode} disabled={isExecuting}>
            {isExecuting ? "Running..." : "Run Code"}
          </button>
        </div>
      </header>
      <Editor
        theme="vs-dark"
        height="60vh"
        language={language === "python" ? "python" : language === "javascript" ? "javascript" : "cpp"}
        value={code}
        onChange={(newValue) => setCode(newValue || "")}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
        }}
      />
      <textarea
        placeholder="Input (if required)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="CodeEditor-user-input"
      />
      <div className="CodeEditor-controls">
        <button onClick={() => copyToClipboard(input)} disabled={!input}>
          Copy Input
        </button>
        <button onClick={() => copyToClipboard(output)} disabled={!output}>
          Copy Output
        </button>
      </div>
      <div className={`CodeEditor-notification ${showNotification ? "visible" : ""}`}>
        Copied to clipboard!
      </div>
      <div className="CodeEditor-output">
        <h3>Output:</h3>
        <pre>{output}</pre>
        <p>
          <strong>Execution Time:</strong> {executionTime} seconds
        </p>
        <p>
          <strong>Memory Usage:</strong> {memoryUsage} KB
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default CodeEditor;
