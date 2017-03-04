var questionArray = [{
    question: "What year did boy band ★NSYNC make their debut?",
    answers: ["1992", "1995", "1997", "2001"],
    correctAnswer: 2
}, {
    question: "Who are the members of ★NSYNC? ",
    answers: ["Nick Carter, Kevin Richardson, AJ McLean, Brian Littrell, Howie Dorough",
        "Joey McIntyre, Jordan Knight, Jon Knight, Donnie Wahlberg, Danny Wood",
        "Joey Fatone, Justin Timerlake, Chris Kirkpatrick, Lance Bass, JC Chasez",
        "John Lennon, Paul McCartney, George Harrison, Ringo Starr"
    ],
    correctAnswer: 3
}, {
    question: "During their career, the band supported which artist as the opening act of The Velvet Rope Tour?",
    answers: ["Britney Spears", "Janet Jackson", "Mariah Carey", "Aerosmith"],
    correctAnswer: 2
}, {
    question: "Which Member of ★NSYNC went on to become a superstar solo artist and actor, and is now married to actress Jessica Biel? ",
    answers: ["JC Chasez", "Lance Bass", "Justin Timerlake", "Joey Fatone"],
    correctAnswer: 3
}, {
    question: "In what city did ★NSYNC originate?",
    answers: ["Los Angeles, CA", "Orlando, FL", "New York, New York", "Nashville, TN"],
    correctAnswer: 2

}, {
    question: "Which of the following superstars did NSYNC not perform with?",
    answers: ["Michael Jackson", "Elton John", "Stevie Wonder", "Whitney Houston"],
    correctAnswer: 4
}, {
    question: "Which of ★NSYNC's albums was both the best-selling album of the decade and top-selling album of 2000?",
    answers: ["No Strings Attached", "NSYNC", "Celebrity", "The Essential NSYNC"],
    correctAnswer: 1
}, {
    question: "Ryan Tedder, the front man for OneRepublic, once entered an won an MTV singer/songwriter competition that was produced by which member of NSYNC?",
    answers: ["Chris Kirkpatrick", "Justin Timberlake", "Lance Bass", "Joey Fatone"],
    correctAnswer: 3
}, {
    question: "Justin Timberlake and JC Chasez performed together before joining NSYNC. Where? ",
    answers: ["Star Search", "The Mickey Mouse Club,Kids", "Incorporated", "The Ringling Brothers and Barnum & Bailey Circus"],
    correctAnswer: 2
}, {
    question: "How many albums did ★NSYNC sell during their career?",
    answers: ["Over 70 Million", "About 50 million", "Approximately 100 Million", "Less than 25 Million"],
    correctAnswer: 1
}];
var triviaQuestion;
var startTimer = 20;
var intervalId;
var counter;
var totalCorrect;
var totalWrong;



// press button to start game
$(document).ready(function() {
    $("#start-btn").on("click", function() {
        selectQuestion();
        //log()
        console.log(triviaQuestion);
        $(this).hide();
        $('#reset-btn').hide();
    });
});


function log() {
    totalCorrect = 0;
    totalWrong = 0;
    counter = 0;
    displayQuestion();
}

//function to choose the question
function selectQuestion() {
    var questionsAvalible = 10;
    triviaQuestion = [];
    var totalNumber = questionArray.length;

    while (triviaQuestion.length < questionsAvalible) {
        var randomQuestion = Math.floor((Math.random() * totalNumber));
        if (triviaQuestion.indexOf(randomQuestion) > -1) continue;
        triviaQuestion.push(randomQuestion);
    }
    log()
}




// function to show the question
function displayQuestion() {
    initialTimer = 20;
    var displayQuestion = $('<h2>').addClass('question').text(questionArray[triviaQuestion[counter]].question);
    var buttonforAnswers = $('<div>').addClass('answers');
    var numberAnswers = questionArray[triviaQuestion[counter]].answers.length;
    for (var i = 0; i < numberAnswers; i++) {
        var arrayAnswers = $('<button>').addClass('answer btn btn-md btn-default center-block ').text(questionArray[triviaQuestion[counter]].answers[i])
            .data('index', i).on("click", checkAnswer);
        buttonforAnswers.append(arrayAnswers);
    }

    $('.qa').empty().append(displayQuestion, buttonforAnswers);
    run()
}
//Function to check the answer inputed by the user
function checkAnswer(event) {
    clearTimeout(intervalId);
    $(".timer").empty();
    var user = $(this).data('index');
    console.log(user);

    if (user == questionArray[triviaQuestion[counter]].correctAnswer) {
        totalCorrect++;
        console.log(totalCorrect);

    } else {
        totalWrong++;
        console.log(totalWrong);
    }
    counter++;
    if (counter < 10) {
        displayQuestion();
    } else {
        stop()
    }
}
//grab the user choice
//compare the click event with the correct answer
//if correct correctanswer++
//if wrong wronganswer++
//if you have a next question continue on (displayQuestion), else
//if you have no questions left display result (stop function)
function questionTimer() {
    initialTimer--;
    $(".timer").empty().append("Time Remaining: " + initialTimer + " seconds");
    if (initialTimer === 0) {
        counter++;
        clearTimeout(intervalId);
        displayNextQuestion();
    }
}

//Function to call the questionTimer every second so that it countsdown
function run() {
    intervalId = setInterval(questionTimer, 1000);
}


//Function that stops the timer after the 10 questions
function stop() {
    console.log("Firing stop function");
    clearInterval(intervalId);
    $(".question").hide();
    $(".answers").hide();
    $(".timer").empty().append("You got " + totalCorrect + " out of 10 correct");
    $("#reset-btn").show().on("click", function() {
        $("#timer").empty()
        selectQuestion();
        $(this).hide();
    })

}
