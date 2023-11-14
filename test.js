const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
// Your MongoDB connection string with username and password
mongoose.connect(`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URI}:27017/tododb`);


const connection = mongoose.connection;
connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
    assert.fail('Failed to connect to MongoDB');
  });
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
    process.exit(0);
  });



