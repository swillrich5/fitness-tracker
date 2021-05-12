const router = require("express").Router();
// const { Workout } = require("../models/index.js");
const Workout = require("../models/workout.js");

router.get("/exercise?", (req, res) => {
    console.log("i'm in api/exercise?");
    console.log("req.query.id = " + req.query.id);
    if (req.query.id) {    
        Workout.find({
            _id: req.query.id,
        })
        .then(workout => {
            // res.json(workout);
            res.redirect("exercise.html" + "?id=" + req.query.id);
        })
        .catch(err => {
            res.status(400).json(err);
            console.log(err);
        });
    } else {
        console.log("=========>>>> Adding New Workout <<<<=========")
        res.redirect("exercise.html");        
    }
});




router.get("/stats", (req, res) => {
    console.log("I'm in GET /api/stats");
    res.redirect("stats.html");
});


router.get("/api/workouts/range", (req, res) => {
    console.log("I'm in GET /api/workouts/range");
    Workout.find().sort({day: -1})
    .then(workout => {
        var workOutData = [];
        console.log(workout);
        console.log("======>>> loop starting <<<======");
        for (var i=0; (i < 7) && (i < workout.length); i++)
        {
            console.log(workout[i]);
            workOutData.push(workout[i]);
        }
        res.json(workOutData);
    })
    .catch(err => {
        res.status(400).json(err);
        console.log(err);
    });    
})



// router.get("/api/exercise", (req, res) => {
//     console.log("I'm in GET /api/exercise");
//     res.redirect("exercise.html");
// });


router.get("/api/workouts", (req, res) => {
    console.log("I'm in GET /api/workouts");
    Workout.find().sort({day: 1})
    .then(workout => {
        res.json(workout);
        // res.redirect("exercise.html");
    })
    .catch(err => {
        res.status(400).json(err);
        console.log(err);
    });
});




router.get("/api/workouts/:id", (req, res) => {
    console.log("I'm in GET /api/workouts/id");
    Workout.find({
        _id: req.params.id,
    })
    .then(workout => {
        res.json(workout);
    })
    .catch(err => {
        res.status(400).json(err);
        console.log(err);
    });
});



router.put("/api/workouts", (req, res) => {
    console.log("I'm in PUT /api/workouts");
     Workout.save(req.body)
    .then(workout => {
        res.json(workout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});



router.put("/api/workouts/:id", (req, res) => {
    console.log("I'm in PUT /api/workouts/:id");
    console.log(req.body);
    let exercise = req.body;
    console.log(exercise);
    console.log(req.params.id);
    Workout.findByIdAndUpdate( 
        req.params.id,
        { $push: { exercises: exercise }}
        )
    .then(workout => {
        res.json(workout);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
    // res.redirect("index.html");
});




router.post("/api/workouts", (req, res) => {
    console.log("I'm in POST /api/workouts");
    Workout.create(req.body)
        .then(workout => {
            res.json(workout);
        })
        .catch(err => {
            res.status(400).json(err);
        })
});




module.exports = router;