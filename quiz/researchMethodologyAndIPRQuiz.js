// Research Methodology and IPR Quiz Questions
const researchMethodologyAndIPRQuestions = [
    {
        question: "What is the first step in the research process?",
        options: ["Data collection", "Literature review", "Formulating a research problem", "Data analysis"],
        answer: "Formulating a research problem"
    },
    {
        question: "Which of the following is a type of intellectual property right?",
        options: ["Copyright", "Patent", "Trademark", "All of the above"],
        answer: "All of the above"
    },
    {
        question: "What is a hypothesis?",
        options: ["A proven fact", "A tentative statement that can be tested", "A conclusion of a study", "A research question"],
        answer: "A tentative statement that can be tested"
    },
    {
        question: "Which research method involves observing subjects in their natural environment?",
        options: ["Experimental research", "Survey research", "Case study research", "Observational research"],
        answer: "Observational research"
    },
    {
        question: "What is plagiarism?",
        options: ["Summarizing someone else's work", "Citing sources correctly", "Presenting someone else's work or ideas as your own", "Collaborating on a research project"],
        answer: "Presenting someone else's work or ideas as your own"
    },
    {
        question: "What is the main purpose of a literature review?",
        options: ["To collect new data", "To identify gaps in existing research", "To analyze statistical data", "To formulate a hypothesis"],
        answer: "To identify gaps in existing research"
    },
    {
        question: "Which type of sampling involves selecting participants randomly from a population?",
        options: ["Convenience sampling", "Snowball sampling", "Random sampling", "Quota sampling"],
        answer: "Random sampling"
    },
    {
        question: "What is a patent designed to protect?",
        options: ["Literary and artistic works", "Brand names and logos", "Inventions", "Confidential business information"],
        answer: "Inventions"
    },
    {
        question: "What does IPR stand for?",
        options: ["International Patent Rights", "Intellectual Property Rights", "Industrial Production Regulations", "Information Protection Resources"],
        answer: "Intellectual Property Rights"
    },
    {
        question: "Which research design investigates relationships between variables without manipulating them?",
        options: ["Experimental design", "Correlational design", "Quasi-experimental design", "Descriptive design"],
        answer: "Correlational design"
    },
    {
        question: "What is a trademark used for?",
        options: ["Protecting inventions", "Protecting musical compositions", "Distinguishing goods and services of one enterprise from those of other enterprises", "Protecting plant varieties"],
        answer: "Distinguishing goods and services of one enterprise from those of other enterprises"
    },
    {
        question: "What is qualitative research primarily concerned with?",
        options: ["Numerical data and statistical analysis", "Understanding meanings, experiences, and perspectives", "Testing hypotheses rigorously", "Generalizing findings to a large population"],
        answer: "Understanding meanings, experiences, and perspectives"
    },
    {
        question: "Which ethical principle in research emphasizes protecting the identity of participants?",
        options: ["Informed consent", "Beneficence", "Anonymity/Confidentiality", "Justice"],
        answer: "Anonymity/Confidentiality"
    },
    {
        question: "What is a research instrument?",
        options: ["A laboratory tool", "A device used to measure variables", "A technique for data analysis", "A tool used to collect data, such as a questionnaire or interview guide"],
        answer: "A tool used to collect data, such as a questionnaire or interview guide"
    },
    {
        question: "What is the main objective of descriptive research?",
        options: ["To establish cause-and-effect relationships", "To explore relationships between variables", "To describe the characteristics of a population or phenomenon", "To develop theories"],
        answer: "To describe the characteristics of a population or phenomenon"
    },
    {
        question: "Which of the following is a component of a research proposal?",
        options: ["Results section", "Discussion of findings", "Methodology", "Conclusion"],
        answer: "Methodology"
    },
    {
        question: "What is copyright designed to protect?",
        options: ["Inventions", "Literary and artistic works", "Brand names", "Trade secrets"],
        answer: "Literary and artistic works"
    },
    {
        question: "What is the term for a systematic error in a study that leads to an incorrect estimate of association?",
        options: ["Random error", "Sampling error", "Bias", "Confounding"],
        answer: "Bias"
    },
    {
        question: "Which intellectual property right protects the confidential business information?",
        options: ["Patent", "Copyright", "Trademark", "Trade secret"],
        answer: "Trade secret"
    },
    {
        question: "What is a variable in research?",
        options: ["A constant value", "A factor that can change or be controlled", "A fixed experimental condition", "A type of data analysis"],
        answer: "A factor that can change or be controlled"
    },
    {
        question: "Which statistical test is used to compare means of two groups?",
        options: ["Chi-square test", "ANOVA", "T-test", "Regression analysis"],
        answer: "T-test"
    },
    {
        question: "What is peer review in academic research?",
        options: ["A method of data collection", "Evaluation of scholarly work by others with similar expertise", "A statistical analysis technique", "A way to distribute research findings"],
        answer: "Evaluation of scholarly work by others with similar expertise"
    },
    {
        question: "What is a primary source of data?",
        options: ["A textbook", "A journal article summarizing other studies", "Raw data collected directly by the researcher", "A newspaper article"],
        answer: "Raw data collected directly by the researcher"
    },
    {
        question: "What is the purpose of an abstract in a research paper?",
        options: ["To provide a detailed methodology", "To summarize the main points of the paper", "To list all references", "To discuss future research directions"],
        answer: "To summarize the main points of the paper"
    },
    {
        question: "Which term refers to the extent to which a research study measures what it intends to measure?",
        options: ["Reliability", "Validity", "Generalizability", "Objectivity"],
        answer: "Validity"
    }
];

let currentQuestions = [];
let answeredQuestions = {}; // Stores answers for current batch
let quizScore = 0;
let totalAttempted = 0;

// Function to shuffle questions and pick 5 unique ones
function getFiveRandomQuestions() {
    const availableQuestions = researchMethodologyAndIPRQuestions.filter(q => !currentQuestions.some(cq => cq.question === q.question));
    if (availableQuestions.length < 5) {
        console.warn("Not enough unique questions left. Resetting quiz.");
        currentQuestions = [];
        answeredQuestions = {};
        quizScore = 0;
        totalAttempted = 0;
        return researchMethodologyAndIPRQuestions.sort(() => 0.5 - Math.random()).slice(0, 5);
    }
    return availableQuestions.sort(() => 0.5 - Math.random()).slice(0, 5);
}

// Function to display questions
function displayQuestions() {
    const quizQuestionsDiv = document.getElementById("quizQuestions");
    quizQuestionsDiv.innerHTML = "";
    currentQuestions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("quiz-question");
        questionDiv.innerHTML = `
            <p class=\"question-text\">${index + 1}. ${q.question}</p>
            <div class=\"options-container\">
                ${q.options.map(option => `
                    <label class=\"quiz-option\">
                        <input type=\"radio\" name=\"question-${index}\" value=\"${option}\" ${answeredQuestions[index] === option ? "checked" : ""}>
                        <span>${option}</span>
                    </label>
                `).join('')}
            </div>
            <div id=\"feedback-${index}\" class=\"feedback\"></div>
        `;
        quizQuestionsDiv.appendChild(questionDiv);

        // Add event listeners for selected option styling
        const radios = questionDiv.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.addEventListener('change', () => {
                const labels = questionDiv.querySelectorAll('.quiz-option');
                labels.forEach(label => label.classList.remove('selected-option'));
                if (radio.checked) {
                    radio.parentElement.classList.add('selected-option');
                    answeredQuestions[index] = radio.value;
                }
            });

            // Set initial state if already answered
            if (radio.checked) {
                radio.parentElement.classList.add('selected-option');
            }
        });
    });
    document.getElementById("quizResults").innerHTML = ""; // Clear previous results
}

// Function to submit answers for the current batch of 5 questions
function submitAnswers() {
    let correctCount = 0;
    const quizResultsDiv = document.getElementById("quizResults");
    quizResultsDiv.innerHTML = "";

    currentQuestions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
        const feedbackDiv = document.getElementById(`feedback-${index}`);
        
        if (selectedOption) {
            answeredQuestions[index] = selectedOption.value;
            totalAttempted++;
            if (selectedOption.value === q.answer) {
                feedbackDiv.innerHTML = "✅ Correct!";
                feedbackDiv.style.color = "green";
                correctCount++;
            } else {
                feedbackDiv.innerHTML = `❌ Wrong! Correct answer: ${q.answer}`;
                feedbackDiv.style.color = "red";
            }
        } else {
            feedbackDiv.innerHTML = "⚠️ No answer selected";
            feedbackDiv.style.color = "orange";
        }
    });
    quizScore += correctCount;
    quizResultsDiv.innerHTML = `<p>You got ${correctCount} out of ${currentQuestions.length} correct in this round.</p>`;
    updateQuizPerformance("researchMethodologyAndIPR");
}

// Function to load the next set of questions
function loadNextQuestions() {
    answeredQuestions = {}; // Clear previous answers
    currentQuestions = getFiveRandomQuestions();
    displayQuestions();
    document.getElementById("quizResults").innerHTML = ""; // Clear results on new questions
}

// Function to update local storage with quiz performance
function updateQuizPerformance(quizType) {
    let performance = JSON.parse(localStorage.getItem('quizPerformance') || '{}');
    const today = new Date().toDateString();

    if (!performance[today]) {
        performance[today] = {};
    }
    if (!performance[today][quizType]) {
        performance[today][quizType] = { correct: 0, total: 0 };
    }

    performance[today][quizType].correct += quizScore;
    performance[today][quizType].total += totalAttempted;
    localStorage.setItem('quizPerformance', JSON.stringify(performance));
}

// Event Listeners
window.onload = function() {
    currentQuestions = getFiveRandomQuestions();
    displayQuestions();

    document.getElementById("submitQuiz").addEventListener("click", submitAnswers);
    document.getElementById("nextQuestions").addEventListener("click", loadNextQuestions);
    // Back to Dashboard buttons
    const backButtons = document.querySelectorAll('.back-button');
    backButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            window.location.href = "../index.html";
        });
    });
};
