// client/src/pages/PricePrediction.jsx

import {
  useState,
} from "react";

import axios from "axios";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Sidebar from "../components/Sidebar";

function PricePrediction() {

    const [
  crop,
  setCrop,
] = useState("Wheat");

  const [
    month,
    setMonth,
  ] = useState("");

  const [
  season,
  setSeason,
] = useState("Kharif");

  const [
    previousPrice,
    setPreviousPrice,
  ] = useState("");

const [
  priceUnit,
  setPriceUnit,
] = useState("Qtl");

  const [
    rainfall,
    setRainfall,
  ] = useState("");

  const [
  temperature,
  setTemperature,
] = useState("");

  const [
  city,
  setCity,
] = useState("");

const [
  loadingWeather,
  setLoadingWeather,
] = useState(false);

  const [
    predictedPrice,
    setPredictedPrice,
  ] = useState(null);

  const [
  percentageChange,
  setPercentageChange,
] = useState(null);

const chartData = [
  {
    name:
      "Current",

    price:
      Number(
        previousPrice
      ),
  },

  {
    name:
      "Predicted",

    price:
      Number(
        predictedPrice
      ),
  },
];

// =====================================
// GET WEATHER
// =====================================
const getWeather =
  async () => {

    try {

      setLoadingWeather(
        true
      );

      const API_KEY =
        "478590b59cccba355d25f83e8cae1685";

      const res =
        await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        );

      // MOCK RAINFALL
      const rain =
        res.data.rain?.["1h"] ||
        40;

      setRainfall(rain);

      const temp =
  res.data.main.temp - 273.15;

setTemperature(
  temp.toFixed(2)
);

      alert(
        `Rainfall Loaded: ${rain} mm`
      );

    } catch (err) {

      console.log(err);

      alert(
        "Weather fetch failed"
      );

    } finally {

      setLoadingWeather(
        false
      );
    }
  };

  // =====================================
  // PREDICT PRICE
  // =====================================
  const predictPrice =
    async () => {

      try {

        const res =
          await axios.post(
            "https://agroconnect-ml-w96a.onrender.com/predict",

           {
  crop,

  rainfall,

  temp_mean:
    temperature,

  month,

  season,
}
          );

          console.log(
  res.data
);

        setPredictedPrice(
          res.data
            .predicted_price
        );

        const change =
  (
    (
      (
        res.data
          .predicted_price
        - previousPrice
      )
      / previousPrice
    )
    * 100
  ).toFixed(2);

setPercentageChange(
  change
);

      } catch (err) {

        console.log(err);

        alert(
          "Prediction Failed"
        );
      }
    };

  return (
    <div
      style={{
        display: "flex",
      }}
    >

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div
        style={{
          marginLeft:
            "250px",

          width:
            "100%",

          minHeight:
            "100vh",

          background:
            "#f5f7fb",

          padding:
            "40px",
        }}
      >

        {/* HEADER */}
        <div
          style={{
            marginBottom:
              "30px",
          }}
        >

          <h1
            style={{
              fontSize:
                "42px",
            }}
          >
            📈 Crop Price Prediction
          </h1>

          <p
            style={{
              color:
                "#666",
            }}
          >
            Predict future crop prices using AI
          </p>

        </div>

        {/* CARD */}
        <div
          style={{
            background:
              "white",

            padding:
              "35px",

            borderRadius:
              "24px",

            maxWidth:
              "500px",

            boxShadow:
              "0 8px 20px rgba(0,0,0,0.05)",
          }}
        >

            {/* CITY */}
<input
  type="text"

  placeholder="Enter City"

  value={city}

  onChange={(e) =>
    setCity(
      e.target.value
    )
  }

  style={{
    width:
      "100%",

    padding:
      "16px",

    marginBottom:
      "18px",

    borderRadius:
      "14px",

    border:
      "1px solid #ccc",
  }}
/>

<button
  onClick={
    getWeather
  }

  style={{
    width:
      "100%",

    padding:
      "14px",

    border:
      "none",

    borderRadius:
      "14px",

    background:
      "#0ea5e9",

    color:
      "white",

    fontWeight:
      "700",

    cursor:
      "pointer",

    marginBottom:
      "20px",
  }}
>
  {
    loadingWeather
      ? "Loading Weather..."
      : "Get Rainfall"
  }
</button>

{/* CROP */}
<select
  value={crop}

  onChange={(e) =>
    setCrop(
      e.target.value
    )
  }

  style={{
    width:
      "100%",

    padding:
      "16px",

    marginBottom:
      "18px",

    borderRadius:
      "14px",

    border:
      "1px solid #ccc",
  }}
>

  <option value="Wheat">
    Wheat
  </option>

  <option value="Rice">
    Rice
  </option>

  <option value="Tomato">
    Tomato
  </option>

  <option value="Onion">
    Onion
  </option>

</select>

{/* TEMPERATURE */}
<div
  style={{
    position:
      "relative",

    marginBottom:
      "18px",
  }}
>

  <input
    type="number"

    placeholder="Temperature"

    value={
      temperature
    }

    onChange={(e) =>
      setTemperature(
        e.target.value
      )
    }

    style={{
      width:
        "100%",

      padding:
        "16px",

      borderRadius:
        "14px",

      border:
        "1px solid #ccc",

      paddingRight:
        "70px",
    }}
  />

  <span
    style={{
      position:
        "absolute",

      right:
        "20px",

      top:
        "50%",

      transform:
        "translateY(-50%)",

      color:
        "#666",

      fontWeight:
        "600",
    }}
  >
    °C
  </span>

</div>

{/* SEASON */}
<select
  value={season}

  onChange={(e) =>
    setSeason(
      e.target.value
    )
  }

  style={{
    width:
      "100%",

    padding:
      "16px",

    marginBottom:
      "18px",

    borderRadius:
      "14px",

    border:
      "1px solid #ccc",
  }}
>

  <option value="0">Kharif</option>
<option value="1">Rabi</option>
<option value="2">Zaid</option>
</select>

         {/* MONTH */}
<select
  value={month}

  onChange={(e) =>
    setMonth(
      e.target.value
    )
  }

  style={{
    width:
      "100%",

    padding:
      "16px",

    marginBottom:
      "18px",

    borderRadius:
      "14px",

    border:
      "1px solid #ccc",
  }}
>

  <option value="">
    Select Month
  </option>

  <option value="1">
    January
  </option>

  <option value="2">
    February
  </option>

  <option value="3">
    March
  </option>

  <option value="4">
    April
  </option>

  <option value="5">
    May
  </option>

  <option value="6">
    June
  </option>

  <option value="7">
    July
  </option>

  <option value="8">
    August
  </option>

  <option value="9">
    September
  </option>

  <option value="10">
    October
  </option>

  <option value="11">
    November
  </option>

  <option value="12">
    December
  </option>

</select>

         {/* PREVIOUS PRICE */}
<div
  style={{
    display:
      "flex",

    gap:
      "12px",

    marginBottom:
      "18px",
  }}
>

  {/* INPUT */}
  <div
    style={{
      position:
        "relative",

      flex: 1,
    }}
  >

    <input
      type="number"

      placeholder="Previous Price"

      value={
        previousPrice
      }

      onChange={(e) =>
        setPreviousPrice(
          e.target.value
        )
      }

      style={{
        width:
          "100%",

        padding:
          "16px",

        borderRadius:
          "14px",

        border:
          "1px solid #ccc",

        paddingRight:
          "90px",
      }}
    />

    <span
      style={{
        position:
          "absolute",

        right:
          "20px",

        top:
          "50%",

        transform:
          "translateY(-50%)",

        color:
          "#666",

        fontWeight:
          "600",
      }}
    >
      ₹/
      {
        priceUnit
      }
    </span>

  </div>

  {/* UNIT SELECT */}
  <select
    value={priceUnit}

    onChange={(e) =>
      setPriceUnit(
        e.target.value
      )
    }

    style={{
      padding:
        "16px",

      borderRadius:
        "14px",

      border:
        "1px solid #ccc",

      width:
        "120px",
    }}
  >

    <option value="kg">
      kg
    </option>

    <option value="Qtl">
      Qtl
    </option>

    <option value="Ton">
      Ton
    </option>

  </select>

</div>
          {/* RAINFALL */}
<div
  style={{
    position:
      "relative",

    marginBottom:
      "22px",
  }}
>

  <input
    type="number"

    placeholder="Rainfall"

    value={rainfall}

    onChange={(e) =>
      setRainfall(
        e.target.value
      )
    }

    style={{
      width:
        "100%",

      padding:
        "16px",

      borderRadius:
        "14px",

      border:
        "1px solid #ccc",

      paddingRight:
        "70px",
    }}
  />

  <span
    style={{
      position:
        "absolute",

      right:
        "20px",

      top:
        "50%",

      transform:
        "translateY(-50%)",

      color:
        "#666",

      fontWeight:
        "600",
    }}
  >
    mm
  </span>

</div>

          {/* BUTTON */}
          <button
            onClick={
              predictPrice
            }

            style={{
              width:
                "100%",

              padding:
                "16px",

              border:
                "none",

              borderRadius:
                "14px",

              background:
                "#16a34a",

              color:
                "white",

              fontWeight:
                "700",

              cursor:
                "pointer",
            }}
          >
            Predict Price
          </button>

          {/* RESULT */}
          {predictedPrice && (

            <div
              style={{
                marginTop:
                  "28px",

                padding:
                  "22px",

                background:
                  "#dcfce7",

                borderRadius:
                  "18px",

                textAlign:
                  "center",
              }}
            >

              <h2>
                Predicted Price
              </h2>

              <h1
                style={{
                  color:
                    "#16a34a",
                }}
              >
               ₹
{
  predictedPrice
}
/{
  priceUnit
}
              </h1>

         <p
  style={{
    marginTop:
      "12px",

    fontSize:
      "18px",

    fontWeight:
      "600",

    color:
      percentageChange >= 0
        ? "#16a34a"
        : "#dc2626",
  }}
>

  {
    percentageChange >= 0
      ? "📈"
      : "📉"
  }

  {
    Math.abs(
      percentageChange
    )
  }
  %

  {
    percentageChange >= 0
      ? " increase expected"
      : " decrease expected"
  }

</p>     
<div
  style={{
    width:
      "100%",

    height:
      "300px",

    marginTop:
      "30px",
  }}
>

  <ResponsiveContainer
    width="100%"
    height="100%"
  >

    <LineChart
      data={chartData}
    >

      <CartesianGrid
        strokeDasharray="3 3"
      />

      <XAxis
        dataKey="name"
      />

      <YAxis />

      <Tooltip />

      <Line
        type="monotone"

        dataKey="price"

        stroke="#16a34a"

        strokeWidth={4}
      />

    </LineChart>

  </ResponsiveContainer>

</div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default PricePrediction;