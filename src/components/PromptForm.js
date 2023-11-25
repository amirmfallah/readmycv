import { useState } from "react";
import styles from "./PromptForm.module.css";

export default function PromptForm({ onSubmit, isLoading }) {
  const [prompt, setPrompt] = useState("");
  const [github, setGithub] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // Fire callback...
        if (prompt === "") {
          return;
        }

        onSubmit({ prompt, github });
      }}
    >
      <input
        className={styles.input}
        placeholder="Paste your Github username"
        type="text"
        value={github}
        onChange={(e) => {
          setGithub(e.target.value);
        }}
      />
      <textarea
        className={styles.text_input}
        placeholder="Paste your CV Here"
        type="text"
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
      />
      <input
        className={styles.submitButton}
        type="submit"
        disabled={isLoading}
      />
    </form>
  );
}
