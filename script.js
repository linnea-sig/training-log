//1. Element
const workoutForm = document.querySelector("#workoutForm");

const activityInput = document.querySelector("#activity");
const minutesInput = document.querySelector("#minutes");
const noteInput = document.querySelector("#note");

const errorText = document.querySelector("#error");

const clearBtn = document.querySelector("#clearBtn");

const workoutList = document.querySelector("#workoutList");

const totalText = document.querySelector("#total");



let workouts = [];



//2. Data
workoutForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const activity = activityInput.value.trim();
    const minutes = minutesInput.value.trim();
    const note = noteInput.value.trim();

    if (activity === "") {
        errorText.textContent = "Please enter an activity";
        return;
    }

    if (activity.length < 2) {
        errorText.textContent = "Activty needs to be atleast 2 characters long";
        return;
    }



    if (minutes === "" || isNaN(minutes)) {
        errorText.textContent = "Please enter time in numbers";
        return;
    }

    if (minutes < 1 || minutes > 300) {
        errorText.textContent = "Minutes need to be between 1 - 300";
        return;
    }


    
    if (note === "") {
        errorText.textContent = "Please enter a note";
        return;
    }

    if (note.length < 2) {
        errorText.textContent = "Notes need to be atleast 2 characters long";
        return;
    }

    errorText.textContent = "";



    const savedWorkout = {
        activity: activity,
        minutes: minutes,
        note: note
    };

    workouts.push(savedWorkout);


    
    activityInput.value = "";
    minutesInput.value = "";
    noteInput.value = "";
})

//3. Add a workout