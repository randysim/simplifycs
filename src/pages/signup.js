import Head from 'next/head'
import styles from '@/styles/Signup.module.css'
import { useState, useEffect } from "react"

function Prompt({prompt, handler, level, visible, disabled }) {
    return (
      <div className={`${styles.inputLine} ${visible ? "" : styles.inputLineHidden}`}>
        <p className={styles.prompt}>{prompt}:&nbsp;</p>

        <input
          maxLength={40 - prompt.length}
          size={40 - prompt.length}
          className={styles.input}
          onKeyPress={handler}
          level={level}
          prompt={prompt}
          id={`input${level}`}
          disabled={disabled}
        ></input>

        <p
          className={styles.errorMessage}
          id={`error${level}`}
        ></p>
      </div>
    )
}

export default function Signup() {
  const [inputLevel, setInputLevel] = useState(1);
  const [infoCollected, setInfoCollected] = useState({});

  async function post(url, content) {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content)
    }).then(resp => resp.json());
  }

  async function handler(event) {
    function setError(error) {
      let e = document.querySelector(`#error${parseInt(event.target.getAttribute("level"))}`);
      e.innerText = error;
    }

    let input = event.target.value;
    console.log(event.target);

    if (event.key == "Enter") {
      setError("");

      switch (event.target.getAttribute("prompt")) {
        case "Email": {
          let resp = await post("/api/signup/sendVerificationCode", {email: input});

          if (resp.error) {
            setError(resp["error"]);
            return;
          }

          setInfoCollected({...infoCollected, email: input});
          break;
        }
        case "Verification Key": {
          let resp = await post("/api/signup/checkVerificationCode", {email: infoCollected.email, verificationKey: input});

          if (resp.error) {
            setError(resp["error"]);
            return;
          }

          setInfoCollected({...infoCollected, verificationKey: input});
          break;
        }
        case "First Name": {
          if (!input.match(/^['a-zA-Z]{2,}$/)) {
            setError("First name must match the following regex: /^['a-zA-Z]{2,}$/");
            return;
          }

          setInfoCollected({...infoCollected, firstName: input});
          break;
        }
        case "Last Name": {
          if (!input.match(/^['a-zA-Z]{2,}$/)) {
            setError("Last name must match the following regex: /^['a-zA-Z]{2,}$/");
            return;
          }

          setInfoCollected({...infoCollected, lastName: input});
          break;
        }
        case "Username": {
          setInfoCollected({...infoCollected, username: input});
          break;
        }
        case "Password": {
          if (input.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
          }

          setInfoCollected({...infoCollected, password: input});
          break;
        }
        case "Create Account? (y/n)": {
          if (input.toLowerCase() == "y") {
            let resp = await post("/api/signup/createAccount", infoCollected);

            if (resp.error) {
              setError(resp.error);
              return;
            }
          }
          
          break;
        }
      }

      event.target.blur();

      // get the next prompt
      let next = document.querySelector(`#input${parseInt(event.target.getAttribute("level")) + 1}`);
      if (next) {
        setTimeout(() => {next.focus()}, 5);

        // only reveal the next input if this one is the last one
        if (parseInt(event.target.getAttribute("level")) == inputLevel) {
          setInputLevel(inputLevel + 1);
        }
      }
    }
  }

  return (
    <div className={styles.console}>
      <p>$ python signup.py</p>
      <Prompt handler={handler} visible={inputLevel >= 1} disabled={inputLevel >= 2} level={1} prompt="Email" />
      <Prompt handler={handler} visible={inputLevel >= 2} disabled={inputLevel >= 3} level={2} prompt="Verification Key" />
      <Prompt handler={handler} visible={inputLevel >= 3} level={3} prompt="First Name" />
      <Prompt handler={handler} visible={inputLevel >= 4} level={4} prompt="Last Name" />
      <Prompt handler={handler} visible={inputLevel >= 5} level={5} prompt="Username" />
      <Prompt handler={handler} visible={inputLevel >= 6} level={6} prompt="Password" />
      <Prompt handler={handler} visible={inputLevel >= 7} level={7} prompt="Create Account? (y/n)" />
    </div>
  )
}
