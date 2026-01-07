const questions = [
    {
        question: "Amur Temur qachon tug‘ilgan?",
        options: ["1336-yil 9-aprelda", "1330-yil 9-oktyabrda", "1220-yil 9-aprelda"],
        correct: 0
    },
    {
        question: "iPhone 17 Pro Max ni kim yasagan?",
        options: ["Ilon Mask", "Stiv Jobs", "Larri Peyj"],
        correct: 1
    },
    {
        question: "Microsoft kompaniyasini kim yasagan?",
        options: ["Chad Hurley", "Larry Peyj", "Bill Gates"],
        correct: 2
    }
];

const quizDiv = document.getElementById("quiz");
const resultDiv = document.getElementById("result");
const actionBtn = document.getElementById("actionBtn");

let finished = false;

function loadQuiz() {
    quizDiv.innerHTML = "";

    questions.forEach((q, index) => {
        let html = `<div class="question"><p>${index + 1}. ${q.question}</p>`;

        q.options.forEach((option, i) => {
            html += `
                <label onclick="selectAnswer(${index}, ${i}, this)">
                    <input type="radio" name="q${index}" value="${i}">
                    ${option}
                </label>
            `;
        });

        html += `</div>`;
        quizDiv.innerHTML += html;
    });
}

function selectAnswer(qIndex, oIndex, label) {
    if (finished) return;

    const labels = document.querySelectorAll(
        `.question:nth-child(${qIndex + 1}) label`
    );

    labels.forEach(l => l.classList.remove("selected"));
    label.classList.add("selected");
    label.querySelector("input").checked = true;
}

function finishTest() {
    if (!finished) {
        let score = 0;

        questions.forEach((q, index) => {
            const inputs = document.querySelectorAll(`input[name="q${index}"]`);

            inputs.forEach((input, i) => {
                const label = input.parentElement;
                label.classList.remove("selected");

                if (i === q.correct) label.classList.add("correct");
                if (input.checked && i !== q.correct) label.classList.add("wrong");
            });

            const selected = document.querySelector(`input[name="q${index}"]:checked`);
            if (selected && Number(selected.value) === q.correct) score++;
        });

        resultDiv.innerText = `Natija: ${score} / ${questions.length}`;
        actionBtn.innerText = "Qayta boshlash";
        finished = true;

    } else {
        finished = false;
        resultDiv.innerText = "";
        actionBtn.innerText = "Testni yakunlash";
        loadQuiz();
    }
}

loadQuiz();
