from flask import Flask
from pathlib import Path

app = Flask(__name__)
# app.config.from_pyfile("../config.cfg")

from . import routes