import React, { useState } from 'react';
import axios from 'axios';

function CreatorView() {
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({ title: "", caption: "", location: "", people: "" });

  const handleUpload = async () => {
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    data.append("file", file);
    await axios.post("http://localhost:8000/upload", data);
    alert("Uploaded!");
  };

  return (
    <div className="my-4">
      <h2 className="text-xl font-semibold">Creator Upload</h2>
      <input type="text" placeholder="Title" onChange={e => setForm({...form, title: e.target.value})} />
      <input type="text" placeholder="Caption" onChange={e => setForm({...form, caption: e.target.value})} />
      <input type="text" placeholder="Location" onChange={e => setForm({...form, location: e.target.value})} />
      <input type="text" placeholder="People (comma separated)" onChange={e => setForm({...form, people: e.target.value})} />
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button className="bg-blue-500 text-white px-4 py-1" onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default CreatorView;
