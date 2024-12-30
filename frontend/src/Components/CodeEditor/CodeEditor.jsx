import React, { useState } from "react";
import { Editor } from "@monaco-editor/react";
import axios from "axios";
import "./CodeEditor.css";

function CodeEditor() {
  const [language, setLanguage] = useState("cpp");
  const [value, setValue] = useState(getBoilerplate("cpp"));
  const [userInput, setUserInput] = useState("");
  const [output, setOutput] = useState("");
  const [executionTime, setExecutionTime] = useState(null);
  const [memoryUsed, setMemoryUsed] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Language options
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
    setIsLoading(true);
    setOutput("");
    setExecutionTime(null);
    setMemoryUsed(null);

    try {
      const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
        language,
        version: "*",
        files: [{ name: `main.${language === "cpp" || language === "c" ? "cpp" : language === "python" ? "py" : "js"}`, content: value }],
        stdin: userInput,
      });

      if (response.data && response.data.run) {
        setOutput(response.data.run.stdout || response.data.run.stderr || "No output.");
        setExecutionTime(response.data.run.time || "N/A");
        setMemoryUsed(response.data.run.memory || "N/A");
      } else {
        setOutput("No output received from the server.");
        setExecutionTime("N/A");
        setMemoryUsed("N/A");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.error) {
          setOutput(`Error: ${error.response.data.error}`);
        } else if (error.response.data.run) {
          setOutput(`Execution Error: ${error.response.data.run.stderr}`);
        } else {
          setOutput("Unknown error occurred.");
        }
      } else {
        setOutput(`Error: ${error.message}`);
      }
      setExecutionTime("N/A");
      setMemoryUsed("N/A");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="code-editor-container">
      <div className="header">
        <h1>Code Editor</h1>
        <div className="controls">
          <select
            value={language}
            onChange={(e) => {
              const selectedLang = e.target.value;
              setLanguage(selectedLang);
              setValue(getBoilerplate(selectedLang)); // Change boilerplate immediately
            }}
          >
            {Object.keys(languageMap).map((lang) => (
              <option key={lang} value={lang}>
                {languageMap[lang]}
              </option>
            ))}
          </select>
          <button onClick={executeCode} disabled={isLoading}>
            {isLoading ? "Running..." : "Run Code"}
          </button>
        </div>
      </div>
      <Editor
        theme="vs-dark"
        height="60vh"
        language={language === "python" ? "python" : language === "javascript" ? "javascript" : "cpp"}
        value={value}
        onChange={(newValue) => setValue(newValue || "")}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
        }}
      />
      <textarea
        placeholder="Input (if required)"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className="user-input"
      />
      <div className="output">
        <h3>Output:</h3>
        <pre>{output}</pre>
        <p><strong>Execution Time:</strong> {executionTime} seconds</p>
        <p><strong>Memory Used:</strong> {memoryUsed} KB</p>
      </div>
    </div>
  );
}

export default CodeEditor;
