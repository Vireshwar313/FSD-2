import { useState } from "react";
import "./App.css";

function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (name === "") {
      validationErrors.name = "Name is required";
    }

    const emailPattern = /\S+@\S+\.\S+/;

    if (!emailPattern.test(email)) {
      validationErrors.email = "Enter a valid email";
    }

    if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("Registration Successful");
    }
  };

  return (
    <div className="container">

      <form className="form" onSubmit={handleSubmit}>

        <h2>User Registration</h2>

        <div>
          <label>Name</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
          <p className="error">{errors.name}</p>
        </div>

        <div>
          <label>Email</label>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
          <p className="error">{errors.email}</p>
        </div>

        <div>
          <label>Password</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
          <p className="error">{errors.password}</p>
        </div>

        <div>
          <label>Confirm Password</label>
          <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
          <p className="error">{errors.confirmPassword}</p>
        </div>

        <button type="submit">Register</button>

      </form>

    </div>
  );
}

export default App;