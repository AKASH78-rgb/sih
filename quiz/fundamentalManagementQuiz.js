// Fundamental Management Quiz Questions
const fundamentalManagementQuestions = [
    {
        question: "What is the primary function of management?",
        options: ["Producing goods", "Marketing products", "Achieving organizational goals", "Maximizing profit"],
        answer: "Achieving organizational goals"
    },
    {
        question: "Which management function involves setting goals and objectives?",
        options: ["Organizing", "Leading", "Planning", "Controlling"],
        answer: "Planning"
    },
    {
        question: "What does SWOT analysis stand for?",
        options: ["Strengths, Weaknesses, Opportunities, Threats", "Skills, Workload, Objectives, Tasks", "Strategies, Wisdom, Outlook, Teamwork", "Systems, Workflow, Operations, Training"],
        answer: "Strengths, Weaknesses, Opportunities, Threats"
    },
    {
        question: "Which of the following is NOT a level of management?",
        options: ["Top-level", "Middle-level", "Lower-level", "Operational-level"],
        answer: "Operational-level"
    },
    {
        question: "What is the process of delegating authority and responsibility?",
        options: ["Centralization", "Decentralization", "Empowerment", "Coordination"],
        answer: "Decentralization"
    },
    {
        question: "Which theory emphasizes motivation through a hierarchy of needs?",
        options: ["Theory X and Y", "Herzberg's Two-Factor Theory", "McClelland's Theory", "Maslow's Hierarchy of Needs"],
        answer: "Maslow's Hierarchy of Needs"
    },
    {
        question: "What is a budget in management?",
        options: ["A strategic plan", "A financial plan", "A marketing plan", "A production plan"],
        answer: "A financial plan"
    },
    {
        question: "Which type of leadership involves making decisions without consulting others?",
        options: ["Democratic", "Autocratic", "Laissez-faire", "Transformational"],
        answer: "Autocratic"
    },
    {
        question: "What is the purpose of controlling in management?",
        options: ["To motivate employees", "To allocate resources", "To ensure goals are met", "To develop new strategies"],
        answer: "To ensure goals are met"
    },
    {
        question: "What is the term for a manager's ability to influence employees to achieve goals?",
        options: ["Authority", "Power", "Leadership", "Responsibility"],
        answer: "Leadership"
    },
    {
        question: "Which organizational structure is characterized by a clear chain of command and centralized authority?",
        options: ["Matrix structure", "Flat structure", "Hierarchical structure", "Divisional structure"],
        answer: "Hierarchical structure"
    },
    {
        question: "What is the process of attracting, developing, and maintaining a qualified workforce?",
        options: ["Financial management", "Operations management", "Human resource management", "Marketing management"],
        answer: "Human resource management"
    },
    {
        question: "Which of the following is an example of an external environmental factor affecting management?",
        options: ["Company culture", "Employee morale", "Government regulations", "Organizational structure"],
        answer: "Government regulations"
    },
    {
        question: "What is the concept of \"span of control\" in management?",
        options: ["The number of layers in an organization", "The number of subordinates a manager can effectively supervise", "The total number of employees in an organization", "The range of tasks a manager performs"],
        answer: "The number of subordinates a manager can effectively supervise"
    },
    {
        question: "What is the final step in the control process?",
        options: ["Setting standards", "Measuring performance", "Comparing performance to standards", "Taking corrective action"],
        answer: "Taking corrective action"
    },
    {
        question: "Which of the following is a disadvantage of a decentralized organizational structure?",
        options: ["Slow decision-making", "Lack of employee autonomy", "Duplication of effort", "Reduced creativity"],
        answer: "Duplication of effort"
    },
    {
        question: "What is the role of a middle manager?",
        options: ["Setting overall organizational goals", "Directly supervising non-managerial employees", "Implementing strategies and policies", "Performing routine tasks"],
        answer: "Implementing strategies and policies"
    },
    {
        question: "What is the purpose of a mission statement?",
        options: ["To describe the company's products", "To outline the company's financial goals", "To define the company's purpose and values", "To detail the company's marketing strategies"],
        answer: "To define the company's purpose and values"
    },
    {
        question: "Which management function involves motivating employees and directing their behavior?",
        options: ["Planning", "Organizing", "Leading", "Controlling"],
        answer: "Leading"
    },
    {
        question: "What is a policy in management?",
        options: ["A specific instruction for a task", "A broad guideline for decision-making", "A detailed step-by-step procedure", "A financial expenditure limit"],
        answer: "A broad guideline for decision-making"
    },
    {
        question: "Which of these is a key characteristic of an effective leader?",
        options: ["Strict adherence to rules", "Ability to delegate effectively", "Focus on individual tasks", "Avoiding conflict"],
        answer: "Ability to delegate effectively"
    },
    {
        question: "What is the term for a temporary group formed to address a specific issue or project?",
        options: ["Department", "Division", "Task force", "Committee"],
        answer: "Task force"
    },
    {
        question: "Which management approach emphasizes efficiency and scientific methods in the workplace?",
        options: ["Human relations approach", "Contingency approach", "Scientific management", "Systems approach"],
        answer: "Scientific management"
    },
    {
        question: "What is brainstorming primarily used for in management?",
        options: ["Problem solving", "Decision making", "Generating ideas", "Conflict resolution"],
        answer: "Generating ideas"
    },
    {
        question: "What is the main advantage of clear communication in an organization?",
        options: ["Increased conflict", "Improved efficiency", "Reduced employee morale", "Slower decision-making"],
        answer: "Improved efficiency"
    }
];

let currentQuestions = [];
let answeredQuestions = {}; // Stores answers for current batch
let quizScore = 0;
let totalAttempted = 0;

// Function to shuffle questions and pick 5 unique ones
function getFiveRandomQuestions() {
    const availableQuestions = fundamentalManagementQuestions.filter(q => !currentQuestions.some(cq => cq.question === q.question));
    if (availableQuestions.length < 5) {
        console.warn("Not enough unique questions left. Resetting quiz.");
        currentQuestions = [];
        answeredQuestions = {};
        quizScore = 0;
        totalAttempted = 0;
        return fundamentalManagementQuestions.sort(() => 0.5 - Math.random()).slice(0, 5);
    }
    return availableQuestions.sort(() => 0.5 - Math.random()).slice(0, 5);
}

// Function to display questions
function displayQuestions() {
    const quizQuestionsDiv = document.getElementById("quizQuestions");
    if (!quizQuestionsDiv) return;
    quizQuestionsDiv.innerHTML = "";

    currentQuestions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("quiz-question");
        questionDiv.innerHTML = `
            <p class="question-text">${index + 1}. ${q.question}</p>
            <div class="options-container">
                ${q.options.map(option => `
                    <label class="quiz-option">
                        <input type="radio" name="question-${index}" value="${option}" ${answeredQuestions[index] === option ? "checked" : ""}>
                        <span>${option}</span>
                    </label>
                `).join('')}
            </div>
            <div id="feedback-${index}" class="feedback"></div>
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

    const resultsDiv = document.getElementById("quizResults");
    if (resultsDiv) resultsDiv.innerHTML = ""; // Clear previous results
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
    updateQuizPerformance("fundamentalManagement");
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

    // Back to Dashboard (handle any back buttons on the page)
    const backButtons = document.querySelectorAll('.back-button');
    backButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            window.location.href = "../index.html";
        });
    });
};
