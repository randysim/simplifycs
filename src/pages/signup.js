import Head from 'next/head'
import styles from '@/styles/Signup.module.css'
import { useState, useEffect } from "react"

export default function Signup() {
  const [lineList, setLineList] = useState(["$ python signup.py"]);
  const [inputStep, setInputStep] = useState("Email");
  const [infoCollected, setInfoCollected] = useState({});

  useEffect(() => {
    document.querySelector("#input").focus();
  }, [])

  function print(s) {
    setLineList((old) => {return [...old, s]});
  }

  async function post(url, content) {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content)
    }).then(resp => resp.json());
  }

  async function submit() {
    if (event.key == "Enter") {
      let input = document.querySelector("#input").value.trim();

      if (inputStep == "Email") {
        let resp = await post("/api/signup/sendVerificationCode", {email: input});

        print(inputStep + ": " + document.querySelector("#input").value);

        if (resp["error"]) {
          print(resp["error"]);
        } else {
          print(resp["message"]);
          setInfoCollected({...infoCollected, email: input});
          setInputStep("Verification Key");
        }
      } else if (inputStep == "Verification Key") {
        let resp = await post("/api/signup/checkVerificationCode", {email: infoCollected.email, verificationKey: input});

        print(inputStep + ": " + document.querySelector("#input").value);

        if (resp["error"]) {
          print(resp["error"]);
        } else {
          print(resp["message"]);
          setInfoCollected({...infoCollected, verificationKey: input});
          setInputStep("First Name");
        }
      } else if (inputStep == "First Name") {
        print(inputStep + ": " + document.querySelector("#input").value);

        if (!input.match(/^['a-zA-Z]{2,}$/)) {
          print("First name must match the following regex: /^['a-zA-Z]{2,}$/");
        } else {
          setInfoCollected({...infoCollected, firstName: input});
          setInputStep("Last Name");
        }
      } else if (inputStep == "Last Name") {
        print(inputStep + ": " + document.querySelector("#input").value);

        if (!input.match(/^['a-zA-Z]{2,}$/)) {
          print("Last name must match the following regex: /^['a-zA-Z]{2,}$/");
        } else {
          setInfoCollected({...infoCollected, lastName: input});
          setInputStep("Username");
        }
      } else if (inputStep == "Username") {
        print(inputStep + ": " + document.querySelector("#input").value);

        setInfoCollected({...infoCollected, username: input});
        setInputStep("Password");
      } else if (inputStep == "Password") {
        print(inputStep + ": " + document.querySelector("#input").value);

        if (input.length < 8) {
          print("Password must be at least 8 characters.");
        } else {
          setInfoCollected({...infoCollected, password: input});
          setInputStep("Create Account? (y/n)");
        }
      } else if (inputStep == "Create Account? (y/n)") {
        if (input.toLowerCase() == "n") {
          setInputStep("Email");
        } else if (input.toLowerCase() == "y") {
          let resp = await post("/api/signup/createAccount", infoCollected);

          print(inputStep + ": " + document.querySelector("#input").value);

          if (resp["error"]) {
            print(resp["error"]);
            setInputStep("");
          } else {
            print(resp["message"]);
            print("Done");
            setInputStep("");
          }
        }
      }

      document.querySelector("#input").value = "";
    }
  }

  return (
    <div className={styles.console}>
      {lineList.map((line, i) => <p key={i}>{line}</p>)}

      <div className={styles.inputLine}>
        <p>{inputStep}:</p>
        &nbsp;
        <input
          id="input"
          size="50"
          className={styles.input}
          onBlur={() => {
            document.querySelector("#input").focus();
          }}
          onKeyPress={submit}
        ></input>
      </div>
    </div>
  )
}
