from selenium import webdriver
from selenium.webdriver import ChromeOptions
from time import time, sleep
from html2text import html2text
from bs4 import BeautifulSoup
from llama_index import (
    VectorStoreIndex,
    load_index_from_storage,
    StorageContext,
    Document,
    ServiceContext,
    set_global_service_context
)

from llama_index.prompts import Prompt
from llama_index.schema import TextNode
from llama_index.text_splitter import SentenceSplitter
from langchain.llms import CTransformers
from llama_index.response_synthesizers import get_response_synthesizer
from llama_index.query_engine import RetrieverQueryEngine
from llama_index.indices.postprocessor import SimilarityPostprocessor

t0 = time()
# 1. set up llm and embedding models
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

# load index if it exists
try:
    storage_context = StorageContext.from_defaults(persist_dir='./articles_index')
    index = load_index_from_storage(storage_context)
    index_loaded = True
except:
    index_loaded = False

# scrape and create indcies if not exist
if not index_loaded:
    # 2. web scraping UnlockingADHD
    options = ChromeOptions()
    options.add_argument("--headless=new")
    driver = webdriver.Chrome(options=options)

    # articles
    urls = [
        "https://www.unlockingadhd.com/i-think-my-child-has-adhd-now-what/",
        "https://www.unlockingadhd.com/insights-into-adhd-diagnosis-treatment-and-resources/",
        "https://www.unlockingadhd.com/finding-right-professional/",
        "https://www.unlockingadhd.com/untreated-adhd-in-adults/",
        "https://www.unlockingadhd.com/spotting-adhd-symptoms-in-children-and-teens/",
        "https://www.unlockingadhd.com/having-healthy-conversations-about-adhd-medication/",
        "https://www.unlockingadhd.com/should-i-medicate-or-not-medicate-my-child/",
        "https://www.unlockingadhd.com/exercise-to-unlock-your-adhd-potential/",
        "https://www.unlockingadhd.com/non-medication-options-for-adhd-treatment/",
        "https://www.unlockingadhd.com/adhd-and-sleep-issues/",
        "https://www.unlockingadhd.com/therapies-and-activities-for-adhd-management/",
        "https://www.unlockingadhd.com/dyslexia-adhd-children-comorbidity/",
        "https://www.unlockingadhd.com/adhd-and-depression-in-adults-a-personal-perspective/",
        "https://www.unlockingadhd.com/adhd-and-obesity-is-there-a-link/",
        "https://www.unlockingadhd.com/fun-activities-for-kids-and-teens-with-adhd/",
        "https://www.unlockingadhd.com/how-to-thrive-with-adhd/"
    ]

    articles = []

    for url in urls:
        driver.get(url)
        sleep(0.5)

        content = driver.page_source.encode('utf-8').strip()
        soup = BeautifulSoup(content, "html.parser")
        article = str(soup.find("article"))
        articles.append((html2text(article)))

    print("Scraping done...")

    # 3. embed articles and storing in indemode
    documents = [Document(text=a, service_context=service_context) for a in articles]

    text_splitter = SentenceSplitter(chunk_size=256)

    text_chunks = []
    doc_idxs = []
    for doc_idx, doc in enumerate(documents):
        cur_text_chunks = text_splitter.split_text(doc.text)
        text_chunks.extend(cur_text_chunks)
        doc_idxs.extend([doc_idx] * len(cur_text_chunks))


    nodes = []
    for idx, text_chunk in enumerate(text_chunks):
        node = TextNode(text=text_chunk)
        src_doc = documents[doc_idxs[idx]]
        node.metadata = src_doc.metadata
        nodes.append(node)


    index = VectorStoreIndex(nodes)

    # save index to drive
    index.storage_context.persist("./articles_index")

print("Index loaded...")

# 4. QUERY TIME
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

response = query_engine.query("What are some common symptoms and challenges faced by individuals with ADHD, and how can a comprehensive treatment plan help in managing this condition effectively?")
print(f"\nResponse:\n{response}\n\n{'='*20}\nTime elapsed: {(time() - t0):.4f}s")