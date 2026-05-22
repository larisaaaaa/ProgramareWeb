import { useState } from "react";
import "./Pages.css";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setFeedback("Completeaza toate campurile!");
    } else {
      setFeedback("Multumim, " + name + "!");
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <div style={{ textAlign: "left" }}>
      <h3>Contact Form</h3>

      <form onSubmit={handleSubmit}>
        <label>
          Nume:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nume"
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </label>

        <label>
          Mesaj:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Scrie mesajul..."
          />
        </label>

        <button type="submit" style={{ textAlign: "left" }}>Submit</button>
      </form>

      <p style={{ marginTop: "20px" }}>Result: {feedback}</p>
    </div>
  );
}

export default ContactForm;
