import "./App.css";
import { useState } from "react";

function App() {
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [message, setMessage] = useState("");

  const [moonPhase, setMoonPhase] = useState("");
  const [moonRise, setMoonRise] = useState("");
  const [moonSet, setMoonSet] = useState("");
  const [sunRise, setSunRise] = useState("");
  const [sunSet, setSunSet] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(
        "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=" +
          address,
        {
          method: "GET"
        }
      );
      let resJson = await res.json();
      if (res.status === 200) {
        setLatitude(resJson[0].lat);
        setLongitude(resJson[0].lon);
        setMessage("Lat/Long found for address");
        handleLookupMoonPhase();
        handleLookupMoonRiseSet(resJson[0].lat, resJson[0].lon);
        handleLookupSunRiseSet(resJson[0].lat, resJson[0].lon);
      } else {
        setMessage("Could not find Lat/Long for address");
      }
    } catch (err) {
      console.log(err);
    }
  };

  let handleLookupMoonPhase = async (e) => {
    try {
      let res = await fetch("/api/moon/phase", {
        method: "GET"
      });
      let resJson = await res.json();
      console.log(resJson);
      if (res.status === 200) {
        setMoonPhase(resJson.Illuminated_pc);
      }
    } catch (err) {
      console.log(err);
    }
  };

  let handleLookupMoonRiseSet = async (lat, long) => {
    try {
      let res = await fetch(
        "/api/moon/rise-set?lat=" + lat + "&long=" + long,
        {
          method: "GET"
        }
      );
      let resJson = await res.json();
      console.log(resJson);
      if (res.status === 200) {
        setMoonRise(resJson.Rise);
        setMoonSet(resJson.Set);
      }
    } catch (err) {
      console.log(err);
    }
  };

  let handleLookupSunRiseSet = async (lat, long) => {
    try {
      let res = await fetch(
        "/api/sun/rise-set?lat=" + lat + "&long=" + long,
        {
          method: "GET"
        }
      );
      let resJson = await res.json();
      console.log(resJson);
      if (res.status === 200) {
        setSunRise(resJson.Rise);
        setSunSet(resJson.Set);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>Address:</label>
        <input
          type="text"
          value={address}
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
        />
        <label>Latitude:</label>
        <input
          type="text"
          value={latitude}
          placeholder="Latitude"
          readOnly={true}
        />
        <label>Longitude:</label>
        <input
          type="text"
          value={longitude}
          placeholder="Longitude"
          readOnly={true}
        />

        <button type="submit">Lookup</button>
        <div className="message">{message ? <p>{message}</p> : null}</div>

        <h1>Sun</h1>
        <label>Rise time:</label>
        <input type="text" value={sunRise} placeholder="" readOnly={true} />
        <label>Set time:</label>
        <input type="text" value={sunSet} placeholder="" readOnly={true} />

        <h1>Moon</h1>
        <label>Phase:</label>
        <input type="text" value={moonPhase} placeholder="" readOnly={true} />
        <label>Rise time:</label>
        <input type="text" value={moonRise} placeholder="" readOnly={true} />
        <label>Set time:</label>
        <input type="text" value={moonSet} placeholder="" readOnly={true} />
      </form>
    </div>
  );
}

export default App;
