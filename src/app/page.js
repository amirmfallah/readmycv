"use client";
import styles from "./page.module.css";
import { useState } from "react";
import PromptForm from "@/components/PromptForm";
import Markdown from "react-markdown";

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

export default function Home() {
  const [choices, setChoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h1>ReadMyCV</h1>
        <p>Turn your CV into a beautiful Github README in a click</p>
        <PromptForm
          isLoading={isLoading}
          onSubmit={async (prompt) => {
            setIsLoading(true);
            const response = await fetch("/api/chat-gpt", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                prompt,
              }),
            });

            setIsLoading(false);
            const result = await response.json();
            setChoices(result.choices);
          }}
        />

        {choices.map((choice) => {
          return (
            <div className={styles.response}>
              <div className={styles.actions}>
                <div
                  className={styles.downloadButton}
                  onClick={() => download("README.md", choice.message.content)}
                >
                  Download
                </div>
              </div>
              <Markdown>{choice.message.content}</Markdown>
            </div>
          );
        })}
      </div>
    </main>
  );
}
