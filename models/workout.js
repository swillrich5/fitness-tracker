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
            distance: {
              type: Number,
              unique: false,
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
      ],
      totalDuration: Number,
      totalWeight: Number,

});

WorkoutSchema.methods.getTotalDuration = function() {
  for (var i = 0; i < this.exercises.length; i++) {
    this.totalDuration += this.exercises[i].duration;
  }
  return this.totalDuration;
}

WorkoutSchema.methods.getTotalWeight = function() {
  for (var i = 0; i < this.exercises.length; i++) {
    if (this.exercises[i].type === "resistance") {
      this.totalWeight += (this.exercises[i].weight * this.exercises[i].reps);
    }
  }
  return this.totalWeight;
}


const Workout = mongoose.model("Workout", WorkoutSchema);

// Workout.aggregate([
//   {
//     $addFields: { 
//       totalDuration: { $sum: "$exercises.duration" },
//       totalWeight: { $sum: "$exercises.weight" }
//     }
//   }
// ])

module.exports = Workout;