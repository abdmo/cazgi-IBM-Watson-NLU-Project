const express = require('express');
const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

const dotenv = require('dotenv');
dotenv.config();

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key
        }),
        serviceUrl: api_url
    });
    return naturalLanguageUnderstanding;
}

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    const urlToAnalyze = req.query.url;
    naturalLanguageUnderstanding = getNLUInstance();

    const analyzeParams = {
        'url': urlToAnalyze,
        'features': {
            'emotion': {}
        }
    };

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            emotionResults = analysisResults.result.emotion.document.emotion;
            res.send(JSON.stringify(emotionResults));
        })
        .catch(err => {
            console.log('error:', err);
        });
});

app.get("/url/sentiment", (req,res) => {
    const urlToAnalyze = req.query.url;
    naturalLanguageUnderstanding = getNLUInstance();

    const analyzeParams = {
        'url': urlToAnalyze,
        'features': {
            'sentiment': {}
        }
    };

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            sentimentResults = analysisResults.result.sentiment.document;
            res.send(JSON.stringify(sentimentResults));
        })
        .catch(err => {
            console.log('error:', err);
        });
});

app.get("/text/emotion", (req,res) => {
    const textToAnalyze = req.query.text;
    naturalLanguageUnderstanding = getNLUInstance();

    const analyzeParams = {
        'text': textToAnalyze,
        'features': {
            'emotion': {}
        }
    };

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            emotionResults = analysisResults.result.emotion.document.emotion;
            res.send(JSON.stringify(emotionResults));
        })
        .catch(err => {
            console.log('error:', err);
        });
});

app.get("/text/sentiment", (req,res) => {
    const textToAnalyze = req.query.text;
    naturalLanguageUnderstanding = getNLUInstance();

    const analyzeParams = {
        'text': textToAnalyze,
        'features': {
            'sentiment': {}
        }
    };

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            sentimentResults = analysisResults.result.sentiment.document;
            res.send(JSON.stringify(sentimentResults));
        })
        .catch(err => {
            console.log('error:', err);
        });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

