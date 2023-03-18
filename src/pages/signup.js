import Head from "next/head";
import styles from "@/styles/Signup.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function Prompt({ setInputLevel, prompt, handler, level, visible }) {
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);

  function selectNext() {
    let next = document.querySelector(`#input${level + 1}`);

    if (next) {
      setTimeout(() => {
        next.focus();
      }, 5);

      setInputLevel(level + 1);
    }
  }

  function onKeyPress(event) {
    if (event.key == "Enter") {
      let input = event.target.value;
      handler({ event, input, setError, setDisabled, selectNext });
    }
  }

  return (
    <div
      className={`${styles.inputLine} ${visible ? "" : styles.inputLineHidden}`}
    >
      <p className={styles.prompt}>{prompt}:&nbsp;</p>

      <input
        maxLength={40 - prompt.length}
        size={40 - prompt.length}
        className={styles.input}
        onKeyPress={onKeyPress}
        level={level}
        prompt={prompt}
        id={`input${level}`}
        disabled={disabled}
      ></input>

      <p className={styles.errorMessage}>{error}</p>
    </div>
  );
}

export default function Signup() {
  const [inputLevel, setInputLevel] = useState(1);
  const [infoCollected, setInfoCollected] = useState({});
  const router = useRouter();

  async function post(url, content) {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    }).then((resp) => resp.json());
  }

  useEffect(() => {
    document.querySelector("#input1").focus();
  });

  return (
    <div
      className={styles.console}
      onBlur={(event) => {
        if (event.relatedTarget == null) {
          console.log("uh oh stinky");
          event.target.focus();
        }
      }}
    >
      <p>$ python signup.py</p>
      <Prompt
        handler={async ({
          event,
          input,
          setError,
          setDisabled,
          selectNext,
        }) => {
          let resp = await post("/api/signup/sendVerificationCode", {
            email: input,
          });

          if (resp.error) {
            setError(resp["error"]);
            return;
          }

          setInfoCollected({ ...infoCollected, email: input });
          setDisabled(true);
          selectNext();
        }}
        visible={inputLevel >= 1}
        level={1}
        setInputLevel={setInputLevel}
        prompt="Email"
      />
      <Prompt
        handler={async ({
          event,
          input,
          setError,
          setDisabled,
          selectNext,
        }) => {
          let resp = await post("/api/signup/checkVerificationCode", {
            email: infoCollected.email,
            verificationKey: input,
          });

          if (resp.error) {
            setError(resp["error"]);
            return;
          }

          setInfoCollected({ ...infoCollected, verificationKey: input });
          setDisabled(true);
          selectNext();
        }}
        visible={inputLevel >= 2}
        level={2}
        setInputLevel={setInputLevel}
        prompt="Verification Key"
      />
      <Prompt
        handler={async ({
          event,
          input,
          setError,
          setDisabled,
          selectNext,
        }) => {
          if (!input.match(/^['a-zA-Z]{2,}$/)) {
            setError(
              "First name must match the following regex: /^['a-zA-Z]{2,}$/"
            );
            return;
          }

          setInfoCollected({ ...infoCollected, firstName: input });
          selectNext();
        }}
        visible={inputLevel >= 3}
        level={3}
        setInputLevel={setInputLevel}
        prompt="First Name"
      />
      <Prompt
        handler={async ({
          event,
          input,
          setError,
          setDisabled,
          selectNext,
        }) => {
          if (!input.match(/^['a-zA-Z]{2,}$/)) {
            setError(
              "Last name must match the following regex: /^['a-zA-Z]{2,}$/"
            );
            return;
          }

          setInfoCollected({ ...infoCollected, lastName: input });
          selectNext();
        }}
        visible={inputLevel >= 3}
        level={4}
        setInputLevel={setInputLevel}
        prompt="Last Name"
      />
      <Prompt
        handler={async ({
          event,
          input,
          setError,
          setDisabled,
          selectNext,
        }) => {
          setInfoCollected({ ...infoCollected, username: input });
          selectNext();
        }}
        visible={inputLevel >= 3}
        level={5}
        setInputLevel={setInputLevel}
        prompt="Username"
      />
      <Prompt
        handler={async ({
          event,
          input,
          setError,
          setDisabled,
          selectNext,
        }) => {
          if (input.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
          }

          setInfoCollected({ ...infoCollected, password: input });
          selectNext();
        }}
        visible={inputLevel >= 3}
        level={6}
        setInputLevel={setInputLevel}
        prompt="Password"
      />
      <Prompt
        handler={async ({
          event,
          input,
          setError,
          setDisabled,
          selectNext,
        }) => {
          if (input.toLowerCase() == "y") {
            let resp = await post("/api/signup/createAccount", infoCollected);

            if (resp.error) {
              setError(resp.error);
              return;
            }

            router.push("/dashboard");
          }
        }}
        visible={inputLevel >= 7}
        level={7}
        setInputLevel={setInputLevel}
        prompt="Create Account? (y/n)"
      />
    </div>
  );
}
