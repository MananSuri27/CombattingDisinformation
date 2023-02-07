from flask import Flask, request, jsonify
import joblib
import pandas as pd
from urllib.parse import urlparse
from bs4 import BeautifulSoup
import requests
from flask_cors import CORS
from tinydb import TinyDB
from article_custom import Article


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


    summary=0
    newsdata=0

    if 'text' in json_.keys():       
        
        article = Article(json_['url'])
        pred = article.predict_fake_news()

        news = article.get_similar_articles()
        newsdata = news.json()
        if (newsdata["totalResults"] == 0):
            newsdata = 0
        print(newsdata)

        fact = article.get_factuality()
        bias = article.get_bias()

    else:
        req = requests.get(json_['url'])
        text = BeautifulSoup(req.text, "html.parser").title.string.split("|")[0]
        print(text)
        

        article=Article(json_['url'])

        pred = article.predict_fake_news()

        summary = article.get_summary()

        fact = article.get_factuality()
        bias = article.get_bias()

    return jsonify({'pred': pred[0][1], 'fact':fact, 'bias':bias, 'summary':summary, 'newsdata': newsdata})

    

if __name__ == "__main__":
    classifier = joblib.load('./model/pipeline.pkl')
    app.run(debug=True)

