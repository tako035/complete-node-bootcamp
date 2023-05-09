const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello from server...', app: 'Natours' });
// });
// app.post('/', (req, res) => {
//   res.status(200).send('You can post here...');
// });

app.use((req, res, next) => {
  console.log('Hello from middleware app');
  next();
});

const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/dev-data/data/tours-simple.json`,
    (err, data) => {
      if (err) console.log(err);
      console.log('File read!');
    }
  )
);

const getAllTours = function (req, res) {
  res.json({
    code: 200,
    status: 'success',
    results: tours.length,
    data: tours,
  });
};
const getTour = function (req, res) {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      code: 404,
      status: 'fail',
      message: 'Requested ID not found!!!',
    });
  }
  res.json({
    code: 200,
    status: 'success',
    data: tour,
  });
};
const updateTour = function (req, res) {
  const id = req.params.id * 1;
  for (let i = 0; i < Object.keys(req.body).length; i++) {
    tours[id][Object.keys(req.body)[i]] = Object.values(req.body)[i];
  }
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) console.error('Write Error!');
      res.status(201).json({ code: 201, status: 'success', data: tours });
    }
  );
};
const addTour = function (req, res) {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) console.error('Write Error!');
      res.status(201).json({ code: 201, status: 'success', data: newTour });
    }
  );
};
const deleteTour = function (req, res) {
  const id = req.params.id * 1;
  const tour = tours.filter((child) => parseInt(child.id) !== id);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tour),
    (err) => {
      if (err) console.error('Write Error!');
      res.status(204).json({ code: 204, status: 'success', data: null });
    }
  );
};
app.route('/api/v1/tours').get(getAllTours).post(addTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.listen(8080, () => console.log('Listening on port 8080...'));
