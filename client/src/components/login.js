import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router";
 
export default function Login() {
    const [form, setForm] = useState({
      email: "",
      password: "",
    });
    const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
    setForm((prev) => {
      return { ...prev, ...value };
    });
  }

 // This function will handle the submission.
 async function onSubmit(e) {
    e.preventDefault();
  
// When a post request is sent to the create url, we'll add a new record to the database.
    try {
        const response = await fetch("http://localhost:5050/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
  
        if (response.ok) {
          const data = await response.json();
  
          if (data === "Not found") {
            window.alert("User not found");
          } else {
            setForm({ email: "", password: "" });
            navigate("/");
          }
        } else {
          throw new Error("Request failed with status: " + response.status);
        }
      } catch (error) {
        window.alert(error.message);
      }
    }
    
    // This following section will display the form that takes input from the user to update the data.
    return (
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={form.email}
              onChange={(e) => updateForm({ email: e.target.value })}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => updateForm({ password: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      );
    }
  