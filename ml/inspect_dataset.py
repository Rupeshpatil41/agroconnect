import pandas as pd

data = pd.read_csv(
    "real_dataset.csv"
)

# CLEAN NAMES
data["Commodity"] = (
    data["Commodity"]
    .astype(str)
    .str.strip()
    .str.title()
)

# SHOW UNIQUE CROPS
print(
    sorted(
        data["Commodity"]
        .unique()
    )
)