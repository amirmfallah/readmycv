import { useState } from "react";
import styles from "./PromptForm.module.css";
import { Bars } from "react-loader-spinner";

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
      <label for="github" className={styles.label}>
        Github Username
      </label>
      <input
        id="github"
        className={styles.input}
        placeholder="Paste your Github username"
        type="text"
        value={github}
        onChange={(e) => {
          setGithub(e.target.value);
        }}
      />

      <label for="CV" className={styles.label}>
        CV / Resumé
      </label>
      <textarea
        id="CV"
        className={styles.text_input}
        placeholder="Paste your CV Here"
        type="text"
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
      />
      <div className={styles.actions}>
        <input
          className={styles.submitButton}
          type="submit"
          disabled={isLoading}
        />
        <Bars
          height="30"
          width="30"
          color="#000000"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={isLoading}
        />
      </div>
    </form>
  );
}
