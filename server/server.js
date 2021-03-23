const express = require('express');
const app = express();
const db = require('../database_mysql/connection.js');
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get('/qa/questions', (req, res) => {
  var product_id = req.query.product_id;
  var queryResults = {
    product_id: product_id,
    results: []
  }
  var query = `SELECT * FROM questions INNER JOIN answers ON questions.question_id=answers.question_id WHERE questions.product_id=${product_id};`;
  db.connection.query(query, (err, data) => {
    if (err) {
      console.log('query error', err);
    } else {
      var questionStorage = [];
      var questionIds = [];
      var questionsResults = queryResults.results;
      data.forEach((result) => {
        if(!questionIds.includes(result.question_id))
        questionIds.push(result.question_id)
      })
      questionIds.forEach((id) => {
        var questionObj = {
          question_id: id,
          answers: {}
        }

        questionsResults.push(questionObj);
      });

      questionsResults.forEach(question => {
        data.forEach((result) => {
          if(question.question_id === result.question_id) {
            question.question_body = result.question_body;
            question.question_date = result.question_date;
            question.asker_name = result.asker_name;
            question.question_helpfulness = result.question_helpfulness;
            question.reported = Boolean(result.reported);

            var answerObj = {
              id: result.answer_id,
              body:result.answer_body,
              date:result.answer_date,
              answerer_name:result.answerer_name,
              helpfulness:result.helpfulness,
              photos: []
            }
            question.answers[result.answer_id] = answerObj;
          }
        })
      })

      var photosQuery = `SELECT * FROM photos WHERE answer_id IN (SELECT answer_id FROM answers WHERE question_id IN (SELECT question_id FROM questions WHERE product_id=${product_id}));`;
      db.connection.query(photosQuery, (photosError, photosResults) => {
        if (photosError) {
          console.log('failed getting photos for questions', photosError);
        } else {
          photosResults.forEach((photo) => {
            var photoObj = {
              id: photo.id,
              url: photo.url
            }
            queryResults.results.forEach((question) => {
              for(var answerID in question.answers) {
                if(question.answers[answerID].id === photo.answer_id) {
                  question.answers[answerID].photos.push(photoObj);
                }
              }
            })
          })
        }
        res.status(200).send(queryResults);
      });
    }
  });
});

app.get('/qa/questions/:question_id/answers', (req, res) => {
  const question_id = req.params.question_id;
  var queryResults = {
    question: req.params.question_id,
    page: req.params.page || 1,
    count: req.params.count || 5,
    results: []
  };
  var photosQuery = `SELECT * FROM photos WHERE answer_id IN (SELECT answer_id FROM answers WHERE question_id=${question_id});`;
  db.connection.query(photosQuery, (photosError, photosResults) => {
    if(photosError) {
      console.log('failed to get photos for answers', photosError);
    } else {
      var answer_ids = [];
      photosResults.forEach((photo) => {
        if(!answer_ids.includes(photo.answer_id)) {
          answer_ids.push(photo.answer_id);
        }
      });
      answer_ids.forEach((id) => {
        var answerObj = {
          answer_id: id,
          photos: []
        };
        for (var i = 0; i < photosResults.length; i++) {
          var photoObj = {
            id: photosResults[i].id,
            url: photosResults[i].url
          }
          if (photosResults[i].answer_id === id) {
            answerObj.photos.push(photoObj);
          }
        };
        queryResults.results.push(answerObj);
      });

      var answerQuery = `SELECT * FROM answers WHERE question_id = ${question_id};`;
      db.connection.query(answerQuery, (answersError, answersResults) => {
        if (answersError) {
          console.log('failed to get answers for questions', answersError);
        } else {
          if(answersResults.length > 0 && queryResults.length > 0) {
              for (var j = 0; j < answersResults.length; j++) {
                for (var k = 0; k < queryResults.results.length; k++) {
                  if (answersResults[j].answer_id === queryResults.results[k].answer_id) {
                    queryResults.results[k].body = answersResults[j].answer_body || 'answer removed';
                    queryResults.results[k].date = answersResults[j].answer_date;
                    queryResults.results[k].answerer_name = answersResults[j].answerer_name;
                    queryResults.results[k].helpfulness = answersResults[j].helpfulness;
                  } else {
                    var answerObj = {
                      answer_id: answersResults[j].answer_id,
                      body: answersResults[j].answer_body || 'answer removed',
                      date: answersResults[j].answer_date,
                      answerer_name: answersResults[j].answerer_name,
                      helpfulness: answersResults[j].helpfulness,
                      photos: []
                    }
                  }
                }
                queryResults.results.push(answerObj);
              }
            }
          }
        res.status(200).send(queryResults);
      });
    }
  });
});


app.listen(port, () => {
  console.log(`server is listening on port: ${port}`);
});