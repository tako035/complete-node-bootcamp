const fs = require('fs');

const Tour = require('../models/tourmodel');
const APIFeatures = require('../utils/apiFeatures');
const { query } = require('express');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, (err) => {
//     if (err) console.log(err);
//     console.log('File read!');
//   })
// );

exports.getTourStats = async (req, res) => {
  try {
    const tourStats = await Tour.aggregate([
      { $match: { ratingsAverage: { $gte: 4.5 } } },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      { $sort: { avgPrice: 1 } },
    ]);
    res.status(200).json({ status: 'success', data: tourStats });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err.message });
  }
};

exports.getAllTours = async (req, res) => {
  try {
    //LET THE QUERY BEGIN
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitfields()
      .paginate();
    const tours = await features.query;
    res.status(200).json({ status: 'success', data: tours });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err.message });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({ status: 'success', data: tour });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err.message });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({ status: 'success', data: tour });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err.message });
  }
};

exports.addTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({ code: 201, status: 'success', data: newTour });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err.message });
  }
};
