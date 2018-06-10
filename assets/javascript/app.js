//Display questions with a timer
// display options 
//capture results
//evaluate result for correct or incorrect 
// update counter for correct and incorrect 
// dispaly result 
// repeat the above till all questions run out 
// display final result 
// options to restart game 
// varibales i need 
// hold the questions 



$.fn.trivia = function() {   //$ binds a function to the document.ready event.
    var ThisThing = this;    //identifies the thing clicked 
    ThisThing.userPick = null; // capturs the user answer 
    ThisThing.answers = {  //keeps track of the result 
        correct: 0,
        incorrect: 0
    };
    ThisThing.images = null;  // if i feel like adding images 
    ThisThing.count = 20; // time count to answer thr question 
    ThisThing.current = 0; // start arrray for the question

    ThisThing.questions = [{  // object for questions - target 10 questions ..
        question: "Which number should come next in the pattern? 37, 34, 31, 28 ",
        choices: ["25", "38", "44", "41"],
        images: ["../images/"], // add a image if it feels like 
        correct: 0
    }, {
        question: "What is the capital of Burundi ? ",
        choices: ["Bujumbura", "Djibouti", "Mogadishu", "Asmara"],
        correct: 0

    }, {
        question: "What is the longest River in the world?",
        choices: ["Nile", "Yangtze", "Amazon", "Mississippi"],
        correct: 2

    }, 
    ];

    ThisThing.ask = function() {
        if (ThisThing.questions[ThisThing.current]) { // starts at 
            $("#timer").html("Time remaining: " + "00:" + ThisThing.count + " secs");
            $("#question_div").html(ThisThing.questions[ThisThing.current].question);
            var choicesArr = ThisThing.questions[ThisThing.current].choices;
            var buttonsArr = [];

            for (var i = 0; i < choicesArr.length; i++) {
                var button = $('<button>');
                button.text(choicesArr[i]);
                button.attr('data-id', i);
                $('#choices_div').append(button);
            }
            window.triviaCounter = setInterval(ThisThing.timer, 1000); // count down in one sec interval 
        } else {
            $('body').append($('<div />', {
                text: 'Unanswered: ' + (
                    ThisThing.questions.length - (ThisThing.answers.correct + ThisThing.answers.incorrect)),
                class: 'result'
            }));
            $('#start_button').text('Restart').appendTo('body').show();
        }
    };
    ThisThing.timer = function() { 
        ThisThing.count--;  // count down from 20 
        if (ThisThing.count <= 0) { 
            setTimeout(function() { // Display an alert box after ThisThing.next + 1000 (in ThisThing.next func)  :
                ThisThing.nextQ();
            });

        } else {
            $("#timer").html("Time remaining: " + "00:" + ThisThing.count + " secs");
        }
    };
    ThisThing.nextQ = function() {
        ThisThing.current++;
        clearInterval(window.triviaCounter);
        ThisThing.count = 30;
        $('#timer').html("");
        setTimeout(function() {
            ThisThing.cleanUp();
            ThisThing.ask();
        }, 1000)
    };
    ThisThing.cleanUp = function() {
        $('div[id]').each(function(item) {
            $(this).html('');
        });
        $('.correct').html('Correct answers: ' + ThisThing.answers.correct);
        $('.incorrect').html('Incorrect answers: ' + ThisThing.answers.incorrect);
    };
    ThisThing.answer = function(correct) {
        var string = correct ? 'correct' : 'incorrect';
        ThisThing.answers[string]++;
        $('.' + string).html(string + ' answers: ' + ThisThing.answers[string]);
    };
    return ThisThing;
};
 
// Trivia Function ends (fun of having first calss functions) 

var Trivia;

$("#start_button").click(function() {
    $(this).hide();
    $('.result').remove();
    $('div').html('');
    Trivia = new $(window).trivia();
    Trivia.ask();
});

$('#choices_div').on('click', 'button', function(e) {
    var userPick = $(this).data("id"),
        ThisThing = Trivia || $(window).trivia(),
        index = ThisThing.questions[ThisThing.current].correct,
        correct = ThisThing.questions[ThisThing.current].choices[index];

    if (userPick !== index) {
        $('#choices_div').text("Wrong Answer! The correct answer was: " + correct);
        ThisThing.answer(false);
    } else {
        $('#choices_div').text("Correct!!! The correct answer was: " + correct);
        ThisThing.answer(true);
    }
    ThisThing.nextQ();
});