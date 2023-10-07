from . import app
import numpy as np
from transformers import AutoModelForSequenceClassification, AutoTokenizer
from flask import request
from flask_cors import CORS
import csv
import urllib.request
import json
import os

CORS(app)

### initialize model and tokenizer
MODEL_ID = "cardiffnlp/twitter-roberta-base-emoji"
model = AutoModelForSequenceClassification.from_pretrained(MODEL_ID)
tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)

### download label mappings
labels=[]
mapping_link = "https://raw.githubusercontent.com/cardiffnlp/tweeteval/main/datasets/emoji/mapping.txt"
with urllib.request.urlopen(mapping_link) as f:
    html = f.read().decode('utf-8').split("\n")
    csvreader = csv.reader(html, delimiter='\t')
labels = [row[1] for row in csvreader if len(row) > 1]

# get text to emoji prediction
def predict_emoji(text):
    encoded_input = tokenizer(text, return_tensors='pt')
    output = model(**encoded_input)

    # return emoji with highest probability
    scores = output[0][0].detach().numpy()
    ranking = np.argsort(scores)
    ranking = ranking[::-1]
    return labels[ranking[0]]

# API to predict emoji from text
@app.route("/predict-emoji", methods=['POST'])
def call_predict_emoji():
    data = request.get_json()
    print(data)
    return {"emoji": predict_emoji(data['text'])}

# API to save task data
@app.route("/save-task", methods=['POST'])
def save_task():
    data = request.get_json()
    with open(os.path.join(os.getcwd(), "application\\todoDatabase.json"), "r") as file:
        data_dict = json.load(file)

    # create dict
    new_dict = {
        "task": data['task'],
        "time": data['time'],
        "emoji": data['emoji']
    }
    data_dict.append(new_dict)

    with open(os.path.join(os.getcwd(), "application\\todoDatabase.json"), "w") as file:
        json.dump(data_dict, file)
    
    return data_dict