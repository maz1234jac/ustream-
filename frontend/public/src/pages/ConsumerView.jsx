import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ConsumerView() {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/media").then(res => setMedia(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold">Consumer View</h2>
      <div className="grid grid-cols-3 gap-4">
        {media.map((item, idx) => (
          <div key={idx} className="border p-2">
            <img src={item.url} className="w-full h-48 object-cover" />
            <p>{item.title}</p>
            <p>{item.caption}</p>
            <p><i>{item.location}</i></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConsumerView;
