import pandas as pd

data = pd.read_csv(
    "real_dataset.csv"
)

print(
    data["season"]
    .unique()
)