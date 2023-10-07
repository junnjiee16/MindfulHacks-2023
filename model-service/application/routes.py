from . import app
import numpy as np
from transformers import AutoModelForSequenceClassification, AutoTokenizer
from flask import request
import csv
import urllib.request
from langchain.llms import CTransformers
from llama_index import (
    StorageContext,
    load_index_from_storage,
    set_global_service_context,
    ServiceContext,
)
from llama_index.prompts import Prompt
from llama_index.response_synthesizers import get_response_synthesizer
from llama_index.indices.postprocessor import SimilarityPostprocessor
from llama_index.query_engine import RetrieverQueryEngine

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
    return {"emoji": predict_emoji(data['text'])}

# Init Mistral7B-Orca
cfg = {
    'max_new_tokens': 512, 
    'repetition_penalty': 1.1,
    'temperature': 0.7,
    'context_length': 8192,
    'stop': ["<|im_end|>", "<|im_start|>"],
    'reset': False
}

llm = CTransformers(model='TheBloke/Mistral-7B-OpenOrca-GGUF', model_file='mistral-7b-openorca.Q4_K_M.gguf', config=cfg)
service_context = ServiceContext.from_defaults(embed_model="local:sentence-transformers/all-MiniLM-L6-v2", llm=llm)
set_global_service_context(service_context)


@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    prompt = data["prompt"]

    try:
        storage_context = StorageContext.from_defaults(persist_dir='./articles_index')
        index = load_index_from_storage(storage_context)
        print("Index loaded correctly.")
    except:
        return {"err": "Index was not loaded."}


    template = """<|im_start|>system
    We have provided context information below. 
    ---------------------
    {context_str}
    ---------------------
    Answer all questions given this information and without using prior information. If you are unable to answer a question, please write 'I don't know'.<|im_end|>
    <|im_start|>user
    {query_str}<|im_end|>
    <|im_start|>assistant
    """

    qa_prompt = Prompt(template)
    synth = get_response_synthesizer(text_qa_template=qa_prompt)

    postprocessor = [SimilarityPostprocessor(similarity_cutoff=0.7)]
    retriever = index.as_retriever(retriever_mode="embedding")
    query_engine = RetrieverQueryEngine(
        retriever, 
        synth, 
        node_postprocessors=postprocessor
    )

    response = query_engine.query(prompt)
    return {"result": str(response)}