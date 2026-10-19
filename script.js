const workoutForm = document.querySelector("#workoutForm");

const activityInput = document.querySelector("#activity");
const minutesInput = document.querySelector("#minutes");
const noteInput = document.querySelector("#note");

const errorText = document.querySelector("#error");

const clearBtn = document.querySelector("#clearBtn");
const removeLastBtn = document.querySelector("#removeLastBtn");

const workoutList = document.querySelector("#workoutList");

const totalText = document.querySelector("#total");



let workouts = [];
totalText.textContent = "No workouts yet";



try {
    const saved = localStorage.getItem("workouts");
    workouts = JSON.parse(saved) || [];
} catch (error) {
    console.log("Could not read saved workouts");
};

function save() {
    const workoutsText = JSON.stringify(workouts);
    localStorage.setItem("workouts", workoutsText);
};



function render() {
    workoutList.textContent = "";
    let totalCounter = 0;
    let averageCounter = 0;

    for (let i = 0; i < workouts.length; i++) {
        const workoutLi = document.createElement("li");
        let label = workouts[i].minutes > 30 ? "Long" : "Short";

        if (label === "Long") {
            workoutLi.classList.add("long");
        };

        if (label === "Short") {
            workoutLi.classList.add("short");
        };

        let kind = "";

        switch (workouts[i].activity) {
            case "run":
            case "jog":
            case "walk":
            case "swim":
            case "biking":
                kind = "Cardio";
                break;
            case "gym":
            case "HIIT":
            case "strength":
                kind = "Strength"
                break;
            default:
                kind = "Other";
        };

        const titleElement = document.createElement("h4");
        const kindOfElement = document.createElement("p");
        const minutesElement = document.createElement("p");
        const noteElement = document.createElement("p");

        titleElement.textContent = workouts[i].activity;
        kindOfElement.textContent = kind;
        minutesElement.textContent = `Time: ${workouts[i].minutes} - ${label}`;
        noteElement.textContent = workouts[i].note;

        workoutLi.appendChild(titleElement);
        workoutLi.appendChild(kindOfElement);
        workoutLi.appendChild(minutesElement);
        workoutLi.appendChild(noteElement);

        workoutList.appendChild(workoutLi);



        totalCounter += Number(workouts[i].minutes);
        averageCounter = totalCounter / workouts.length;

        totalText.textContent = `Total minutes of activity: ${totalCounter} min. Average activity duration: ${averageCounter} min.`
    }
};

render();


workoutForm.addEventListener("submit", function (event) {
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
    save();
    render();



    activityInput.value = "";
    minutesInput.value = "";
    noteInput.value = "";
});



clearBtn.addEventListener("click", function () {
    workouts.splice(0, workouts.length);
    localStorage.removeItem("workouts");
    render();
    totalText.textContent = "No workouts yet";
});



removeLastBtn.addEventListener("click", function () {
    workouts.pop();
    save()
    render()
});