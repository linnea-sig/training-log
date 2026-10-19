const workoutForm = document.querySelector("#workoutForm");

const activityInput = document.querySelector("#activity");
const minutesInput = document.querySelector("#minutes");
const noteInput = document.querySelector("#note");

const errorText = document.querySelector("#error");

const clearBtn = document.querySelector("#clearBtn");

const workoutList = document.querySelector("#workoutList");

const totalText = document.querySelector("#total");



let workouts = [];



function render () {
    workoutList.textContent = "";

    for (let i = 0; i < workouts.length; i++) {
        const workoutLi = document.createElement("li");
        const label = workouts[i].minutes > 30 ? "Long" : "Short"; 

        const titleElement = document.createElement("h4");
        const minutesElement = document.createElement("p");
        const noteElement = document.createElement("p");

        titleElement.textContent = workouts[i].activity;
        minutesElement.textContent = `Time: ${workouts[i].minutes} - ${label}`;
        noteElement.textContent = workouts[i].note;

        workoutLi.appendChild(titleElement);
        workoutLi.appendChild(minutesElement);
        workoutLi.appendChild(noteElement);

        workoutList.appendChild(workoutLi);
    }
}

render();


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
    render();


    
    activityInput.value = "";
    minutesInput.value = "";
    noteInput.value = "";
})

