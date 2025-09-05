import { useState } from "react";
import axios from "axios";
import "./UserForm.css";

export default function UserForm() {
  const [form, setForm] = useState({
    name: "",
    middlename: "",
    lastname: "",
    number: "",
    aadhaar: "",
    permanentAddress: "",
    currentAddress: ""
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSame = () => setForm({ ...form, currentAddress: form.permanentAddress });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:5000/api/users/save", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("User saved");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to save user");
    }
  };

  return (
    <div className="user-container">
      <h2>User Form</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="middlename" placeholder="Middle Name" value={form.middlename} onChange={handleChange} />
        <input name="lastname" placeholder="Last Name" value={form.lastname} onChange={handleChange} />
        <input name="number" placeholder="Phone Number" value={form.number} onChange={handleChange} />
        <input name="aadhaar" placeholder="Aadhaar Number" value={form.aadhaar} onChange={handleChange} />
        <input name="permanentAddress" placeholder="Permanent Address" value={form.permanentAddress} onChange={handleChange} />
        <input name="currentAddress" placeholder="Current Address" value={form.currentAddress} onChange={handleChange} />
        <button type="button" onClick={handleSame}>Same as Permanent</button>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
