import csv
from txtai.embeddings import Embeddings

def run():
    insights_path = "../insights.csv"

    embeddings = Embeddings({"path": "sentence-transformers/all-MiniLM-L6-v2"})

    with open(insights_path, encoding="utf-8-sig") as f:

        reader = csv.reader(f)

        txtai_data = []

        for row in reader:
            txtai_data.append((row[0], row[1], None))
        
        embeddings.index(txtai_data)

        embeddings.save("./search/insights_index/")
