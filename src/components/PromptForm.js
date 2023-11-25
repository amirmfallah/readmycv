import { useState } from "react";
import styles from "./PromptForm.module.css";

export default function PromptForm({ onSubmit, isLoading }) {
  const [prompt, setPrompt] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // Fire callback...
        if (prompt === "") {
          return;
        }

        onSubmit(prompt);
        setPrompt("");
      }}
    >
      <input
        className={styles.input}
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
