const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
      },
      exercises: [{
            type: {
              type: String,
              unique: false
            },
            name: {
              type: String,
              unique: true
            },
            duration: {
              type: Number,
              unique: false
            },
            weight: {
              type: Number,
              unique: false
            },
            reps: {
              type: Number,
              unique: false
            },
            sets: {
              type: Number,
              unique: false
            }
          }
      ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;