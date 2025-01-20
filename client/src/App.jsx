import { useState } from "react";

export default function App() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      // Fetch data from backend
      const response = await fetch("http://localhost:5000/"); // Use your backend URL here
      const data = await response.json(); // This will parse the JSON response
      setData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={fetchData}
      >
        Fetch data
      </button>

      {/* Display the fetched data */}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
