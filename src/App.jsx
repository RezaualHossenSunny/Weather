import { useEffect, useState } from "react";

function App() {
  const [city, setCity] = useState("Dhaka");
  const [input, setInput] = useState("");
  const [wdata, setWdata] = useState({ current: {} });

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(input);
    setInput("");
  };

  useEffect(() => {
    const weatherData = async () => {
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=ff112527d75f45c0afa123925241410&q=${city}`
        );

        const result = await response.json();
        setWdata(result);
      } catch (error) {
        console.log(error);
      }
    };
    weatherData();
  }, [city]);

  return (
    <>
      <div className="flex justify-center items-center w-screen h-screen p-4 md:p-0">
        <div className="w-full max-w-md bg-slate-800 py-6 shadow-2xl p-5 rounded-md flex flex-col items-center">
          <form onSubmit={handleSubmit} className="w-full mb-4">
            <input
              className="w-full px-2 py-3 rounded-md outline-none font-serif font-bold text-center text-lg"
              placeholder="Enter your City"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </form>

         {
          wdata &&
          <div className="text-center">
          <img
            className="mx-auto mb-2 "
            src={wdata.current.condition?.icon}
            alt={wdata.current.condition?.text}
          />
          <h1 className="font-bold text-4xl md:text-3xl text-white pb-1">
            {wdata.current?.temp_c } &deg;C
          </h1>
          <h2 className="font-bold text-2xl text-white pb-1">{city}</h2>
          <h3 className="font-bold text-lg md:text-base text-white pb-1">
            Last update : {wdata.current?.last_updated || "N/A"}
          </h3>
        </div>
         }
        </div>
      </div>
    </>
  );
}

export default App;
