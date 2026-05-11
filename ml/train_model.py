import pandas as pd

from sklearn.model_selection import train_test_split

from sklearn.linear_model import LinearRegression

from sklearn.preprocessing import LabelEncoder

import joblib

# =====================================
# LOAD DATASET
# =====================================
data = pd.read_csv(
    "real_dataset.csv"
)
# KEEP ONLY IMPORTANT CROPS
important_crops = [
    "Tomato",
    "Wheat",
    "Onion",
    "Potato",
    "Rice",
    "Cotton",
    "Sugarcane",
    "Garlic",
    "Maize",
]

# CLEAN NAMES
data["Commodity"] = (
    data["Commodity"]
    .astype(str)
    .str.strip()
    .str.title()
)

# FILTER DATA
data = data[
    data["Commodity"]
    .isin(important_crops)
]
# =====================================
# REMOVE EMPTY VALUES
# =====================================
data = data.dropna()
# CLEAN CROP NAMES
data["Commodity"] = (
    data["Commodity"]
    .astype(str)
    .str.strip()
    .str.title()
)

# CLEAN SEASON
data["season"] = (
    data["season"]
    .astype(str)
    .str.strip()
    .str.title()
)

# =====================================
# SELECT IMPORTANT COLUMNS
# =====================================
data = data[
    [
        "Commodity",
        "rainfall_mm",
        "temp_mean",
        "month",
        "season",
        "Modal_Price",
    ]
]

# =====================================
# ENCODE CROP NAMES
# =====================================
crop_encoder = LabelEncoder()

data["Commodity"] = crop_encoder.fit_transform(
    data["Commodity"]
)

# =====================================
# ENCODE SEASON
# =====================================
season_encoder = LabelEncoder()

data["season"] = season_encoder.fit_transform(
    data["season"]
)

# =====================================
# SAVE ENCODERS
# =====================================

print(
    crop_encoder.classes_
)
joblib.dump(
    crop_encoder,
    "crop_encoder.pkl"
)

joblib.dump(
    season_encoder,
    "season_encoder.pkl"
)

# =====================================
# FEATURES
# =====================================
X = data[
    [
        "Commodity",
        "rainfall_mm",
        "temp_mean",
        "month",
        "season",
    ]
]

# =====================================
# TARGET
# =====================================
y = data["Modal_Price"]

# =====================================
# SPLIT DATA
# =====================================
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# =====================================
# MODEL
# =====================================
model = LinearRegression()

# =====================================
# TRAIN MODEL
# =====================================
model.fit(
    X_train,
    y_train
)

# =====================================
# SAVE MODEL
# =====================================
joblib.dump(
    model,
    "crop_price_model.pkl"
)

print(
    "REAL AI MODEL TRAINED SUCCESSFULLY ✅"
)