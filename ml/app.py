from flask import Flask, request, jsonify

from flask_cors import CORS

import joblib

# =====================================
# LOAD MODEL
# =====================================
model = joblib.load(
    "crop_price_model.pkl"
)

# =====================================
# LOAD ENCODERS
# =====================================
crop_encoder = joblib.load(
    "crop_encoder.pkl"
)

season_encoder = joblib.load(
    "season_encoder.pkl"
)

# =====================================
# CREATE APP
# =====================================
app = Flask(__name__)

CORS(app)

# =====================================
# HOME
# =====================================
@app.route("/")
def home():

    return "REAL Crop Price AI Running ✅"

# =====================================
# PREDICT
# =====================================
@app.route(
    "/predict",
    methods=["POST"]
)
def predict():

    try:

        data = request.json

        crop = (
            str(data["crop"])
            .strip()
            .title()
        )

        rainfall = float(
            data["rainfall"]
        )

        temp_mean = float(
            data["temp_mean"]
        )

        month = int(
            data["month"]
        )

        season = int(
    data["season"]
)

        # =====================================
        # ENCODE VALUES
        # =====================================
        crop_encoded = crop_encoder.transform(
            [crop]
        )[0]

        season_encoded = season
        # =====================================
        # PREDICT
        # =====================================
        prediction = model.predict(
            [[
                crop_encoded,
                rainfall,
                temp_mean,
                month,
                season_encoded
            ]]
        )

        predicted_price = round(
            prediction[0],
            2
        )

        return jsonify({
            "predicted_price":
            predicted_price
        })

    except Exception as e:

        print(
            "FULL ERROR:",
            e
        )

        return jsonify({
            "error":
            str(e)
        })

# =====================================
# RUN APP
# =====================================
if __name__ == "__main__":

    app.run(
        debug=True,
        port=5001
    )