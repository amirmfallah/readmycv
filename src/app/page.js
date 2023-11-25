"use client";
import styles from "./page.module.css";
import { useState } from "react";
import PromptForm from "@/components/PromptForm";

function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

import MDEditor from "@uiw/react-md-editor";

export default function Home() {
  const [choices, setChoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h1>ReadMyCV</h1>
        <p>Turn your CV into a beautiful Github README in a click</p>
        <PromptForm
          isLoading={isLoading}
          onSubmit={async ({ prompt, github }) => {
            setIsLoading(true);
            const response = await fetch("/api/chat-gpt", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                prompt,
                github,
              }),
            });

            setIsLoading(false);
            const result = await response.json();
            setChoices(result.choices);
            setValue(result.choices[0].message.content);
          }}
        />
      </div>
      {choices.map((choice) => {
        return (
          <div className={styles.response}>
            <div className={styles.actions}>
              <h3>Your README.md is generated now</h3>
              <div
                className={styles.downloadButton}
                onClick={() => download("README.md", value)}
              >
                Download
              </div>
            </div>
            <MDEditor height={480} value={value} onChange={setValue} />
          </div>
        );
      })}
    </main>
  );
}
