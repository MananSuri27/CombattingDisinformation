from asyncio.windows_events import NULL
from flask import Flask, request, jsonify
import joblib
import pandas as pd
from urllib.parse import urlparse
from bs4 import BeautifulSoup
import requests
from flask_cors import CORS
from newspaper import Article




app = Flask(__name__)
CORS(app)


classifier = joblib.load('./model/pipeline.pkl')
newsitesdata=pd.read_csv('./datasets/newsites.tsv', sep='\s+', header=0 ) 