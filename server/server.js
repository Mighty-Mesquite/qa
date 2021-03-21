const express = require('express');
const app = express();
const db = require('../database_mysql/connection.js');
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get('/qa/questions', (req, res) => {
  // ${req.query.product_id}
  var questionsQuery = `SELECT * FROM QUESTIONS WHERE (product_id=${req.query.product_id});`;
  db.connection.query(questionsQuery, (error, results) => {
    if (error) {
      console.log('failed to get all questions', error);
    } else {
      res.send(results);
    }
  });

});

app.get('/qa/questions/:question_id/answers', (req, res) => {
  const question_id = req.params.question_id;
  var queryResults = {
    question: req.params.question_id,
    page: req.params.page || 0,
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
        res.send(queryResults);
      });
    }
  });
});







app.listen(port, () => {
  console.log(`server is listening on port: ${port}`);
});

// var global = {};
// app.get('/qa/questions/:question_id/answers', (req, res) => {
//   //${req.params.question_id}
//   var answersQuery = `SELECT * FROM ANSWERS WHERE (question_id=${req.params.question_id});`;
//   var queryResults = {
//     question: req.params.question_id,
//     page: req.params.page || 0,
//     count: req.params.count || 5,
//     results: []
//   }
//   db.connection.query(answersQuery, (error, results) => {
//     if (error) {
//       console.log('failed to get answers by question_id', error);
//     } else {
//       for (var i = 0; i < results.length; i++) {

//         var answerObj = {
//           answer_id: results[i].answer_id,
//           body: results[i].answer_body || 'answer removed',
//           date: results[i].answer_date,
//           answerer_name: results[i].answerer_name,
//           helpfulness: results[i].helpfulness,
//           photos: []
//         };
//         let answerID = results[i].answer_id;
//         var answer = results[i];
//         let photosQuery = `SELECT * FROM PHOTOS WHERE (answer_id=${answerID});`;
//         db.connection.query(photosQuery, (errorPhotos, resultsPhotos) => {
//           if (errorPhotos) {
//             console.log('failed to get photos by answer_id', errorPhotos);
//           } else {
//             console.log('inside photos loop');
//             // answerObj.photos.push({1: 234234, 4: 234234});
//             answerObj.photos = [{1: 234234, 2:34234}];
//             // if(resultsPhotos.length > 0) {
//             //   var photosArray = []
//             //   for (var j = 0; j < resultsPhotos.length; j++) {
//             //     var photoObj = {
//             //       id: resultsPhotos[j].id,
//             //       url: resultsPhotos[j].url
//             //     }
//             //     console.log('THIS IS LINE 48', answer);
//             //     photosArray.push(photoObj);
//             //   }
//             //   /.photos = photosArray;
//             // }
//             console.log(answerObj, "IS HERE!!!!!!!!!!!!!!!!!!!!!!!!!");
//           }
//           console.log(queryResults, 'INSIDE ');
//         })
//         queryResults.results.push(answerObj);
//       }
//       res.send(queryResults);
//       console.log(queryResults, 'OUTSIDE ');
//     }
//   })
// })



