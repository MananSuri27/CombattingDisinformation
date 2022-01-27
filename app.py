from flask import Flask, request, jsonify
import joblib
import pandas as pd
from urllib.parse import urlparse
from bs4 import BeautifulSoup
import requests
from flask_cors import CORS
from newspaper import Article
from tinydb import TinyDB


db = TinyDB("feedback.json")



app = Flask(__name__)
CORS(app)


classifier = joblib.load('./model/pipeline.pkl')
newsitesdata=pd.read_csv('./datasets/newsites.tsv', sep='\s+', header=0 ) 
# .\venv\Scripts\activate

# make predict route a post route
# add route to fetch newsmedia ranking
# add route to get related news articles

@app.route("/<name>")
def home(name):
     return f'{name}'

@app.route("/feedback",methods=['POST'])
def feedback():
    json_ = request.get_json()
    url = json_['url']
    label = round(json_['pred']) if json_['feedback']==1 else abs(round(json_['pred'])-1) 
    db.insert(({'url': url,'label':label }))
    return jsonify({'success':1})





@app.route('/predict', methods=['POST'])
def predict():
    json_ = request.get_json()

    domain = urlparse(json_['url']).netloc
    domain_normalised = '.'.join(domain.split('.')[-2:])
    fact = newsitesdata.loc[newsitesdata['source_url_normalized']== domain_normalised]['fact'].values[0] if newsitesdata.loc[newsitesdata['source_url_normalized']== domain_normalised].empty==False else 0
    bias = newsitesdata.loc[newsitesdata['source_url_normalized']== domain_normalised]['bias'].values[0] if newsitesdata.loc[newsitesdata['source_url_normalized']== domain_normalised].empty==False else 0

    summary=0
    newsdata=0


 

    if 'text' in json_.keys():       
        pred= classifier.predict_proba([json_['text']])
        article=Article(json_['url'])
        article.download()
        article.parse()
        article.nlp()

        keywords = article.keywords[:3]
        query_string = (" OR ").join(keywords)
        news = requests.get("https://newsapi.org/v2/everything?apiKey=d4eb5b20793e4892bebe84ce789ff3f9&sortBy=relevancy&sources=the-hindu,the-times-of-india,the-washington-post&pageSize=3&qInTitle=" + query_string)
        newsdata = news.json()
        if (newsdata["totalResults"] == 0):
            newsdata = 0
        print(newsdata)

    else:
        req = requests.get(json_['url'])
        text = BeautifulSoup(req.text, "html.parser").title.string.split("|")[0]
        print(text)
        pred = classifier.predict_proba([text])

        article=Article(json_['url'])
        article.download()
        article.parse()
        article.nlp()

        summary = article.summary

    return jsonify({'pred': pred[0][1], 'fact':fact, 'bias':bias, 'summary':summary, 'newsdata': newsdata})

    

if __name__ == "__main__":
    classifier = joblib.load('./model/pipeline.pkl')
    app.run(debug=True)

