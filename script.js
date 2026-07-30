// ==========================
// HYDRATION TRACKER
// ==========================



// Daily water goal

const waterGoal = 2500;



// Get saved water value
// If nothing exists, start from 0

let waterIntake = 
localStorage.getItem("water")
?
Number(localStorage.getItem("water"))
:
0;





// Select HTML elements

const waterProgress =
document.getElementById("waterProgress");


const waterText =
document.getElementById("waterText");


const addCup =
document.getElementById("addCup");


const addBottle =
document.getElementById("addBottle");


const resetWater =
document.getElementById("resetWater");


const goalMessage =
document.getElementById("goalMessage");





// Function to update UI

function updateWater(){


    // Calculate percentage

    let percentage =
    (waterIntake / waterGoal) * 100;



    // Limit progress bar maximum

    if(percentage > 100){

        percentage = 100;

    }



    // Update progress bar width

    waterProgress.style.width =
    percentage + "%";



    // Update text

    waterText.innerText =
    `${waterIntake} / ${waterGoal} ml`;




    // Goal checking

    if(waterIntake >= waterGoal){


        waterProgress.style.background =
        "green";


        goalMessage.innerText =
        "🎉 Goal Achieved!";


    }

    else{


        waterProgress.style.background =
        "#3b82f6";


        goalMessage.innerText =
        "";

    }




    // Save data

    localStorage.setItem(
        "water",
        waterIntake
    );


}





// Add 250 ml

addCup.addEventListener(
"click",
function(){


    waterIntake += 250;


    updateWater();


});





// Add 500 ml

addBottle.addEventListener(
"click",
function(){


    waterIntake += 500;


    updateWater();


});





// Reset water

resetWater.addEventListener(
"click",
function(){


    waterIntake = 0;


    updateWater();


});


// ==========================
// HABIT TRACKER
// ==========================



// Get saved habits

let habits =
localStorage.getItem("habits")
?
JSON.parse(localStorage.getItem("habits"))
:
[];





// Select elements


const habitInput =
document.getElementById("habitInput");


const addHabit =
document.getElementById("addHabit");


const habitList =
document.getElementById("habitList");


const habitWarning =
document.getElementById("habitWarning");






// Display habits function


function displayHabits(){



    habitList.innerHTML="";



    habits.forEach(function(habit,index){



        const div =
        document.createElement("div");


        div.className =
        "habit-item";



        div.innerHTML = `


        <h3>
        ${habit.name}
        </h3>


        <p>
        🔥 Streak: ${habit.streak}
        </p>



        <button onclick="logHabit(${index})">
        Log Today
        </button>



        <button onclick="deleteHabit(${index})">
        Delete
        </button>


        `;



        habitList.appendChild(div);



    });



    localStorage.setItem(
        "habits",
        JSON.stringify(habits)
    );



}







// Add new habit


addHabit.addEventListener(
"click",
function(){



    const habitName =
    habitInput.value.trim();




    if(habitName===""){


        habitWarning.innerText =
        "Please enter a habit";


        return;


    }




    // Maximum 4 habits


    if(habits.length>=4){


        habitWarning.innerText =
        "Maximum 4 habits allowed";


        return;


    }





    habits.push({

        name:habitName,

        streak:0

    });





    habitInput.value="";



    habitWarning.innerText="";



    displayHabits();



});







// Increase streak


function logHabit(index){



    habits[index].streak++;


    displayHabits();


}







// Delete habit


function deleteHabit(index){



    habits.splice(index,1);



    displayHabits();


}





// ==========================
// CALORIE TRACKER
// ==========================



// Get saved calories


let totalCalories =

localStorage.getItem("calories")

?

Number(localStorage.getItem("calories"))

:

0;






// Select elements


const activity =
document.getElementById("activity");


const duration =
document.getElementById("duration");


const calculateCalories =
document.getElementById("calculateCalories");


const calories =
document.getElementById("calories");







// Update calories display


function updateCalories(){


    calories.innerText =
    totalCalories;



    localStorage.setItem(
        "calories",
        totalCalories
    );


}








// Calculate button


calculateCalories.addEventListener(
"click",
function(){



    // Get activity rate


    const rate =
    Number(activity.value);





    // Get duration


    const time =
    Number(duration.value);





    // Validation


    if(time<=0 || isNaN(time)){


        alert(
        "Please enter valid duration"
        );


        return;


    }






    // Formula

    const burnedCalories =
    rate * time;





    // Add to daily total


    totalCalories += burnedCalories;





    // Clear input


    duration.value="";





    updateCalories();



});

// ==========================
// DARK / LIGHT MODE
// ==========================



const themeToggle =
document.getElementById("themeToggle");





// Load saved theme


let savedTheme =
localStorage.getItem("theme");



if(savedTheme === "dark"){


    document.body.classList.add("dark");


}







// Toggle theme


themeToggle.addEventListener(
"click",
function(){



    document.body.classList.toggle("dark");



    // Check current theme


    if(document.body.classList.contains("dark")){


        localStorage.setItem(
            "theme",
            "dark"
        );


    }

    else{


        localStorage.setItem(
            "theme",
            "light"
        );


    }



});




// Load saved calories


updateCalories();
// Load habits when page opens


displayHabits();




// Load saved data when page opens

updateWater();