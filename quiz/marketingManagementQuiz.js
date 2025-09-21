// Marketing Management Quiz Questions
const marketingManagementQuestions = [
    {
        question: "What is the primary goal of marketing?",
        options: ["Maximizing production", "Selling goods and services", "Creating and delivering value to customers", "Minimizing costs"],
        answer: "Creating and delivering value to customers"
    },
    {
        question: "Which of the following is NOT one of the 4 Ps of marketing?",
        options: ["Product", "Price", "People", "Promotion"],
        answer: "People"
    },
    {
        question: "What is market segmentation?",
        options: ["Dividing a market into distinct groups of buyers", "Advertising a product to a wide audience", "Setting the price of a product", "Distributing products through various channels"],
        answer: "Dividing a market into distinct groups of buyers"
    },
    {
        question: "What is the term for a product's position in the market relative to its competitors?",
        options: ["Market share", "Brand equity", "Product placement", "Competitive advantage"],
        answer: "Competitive advantage"
    },
    {
        question: "Which of the following is an example of direct marketing?",
        options: ["Television advertisement", "Email newsletter", "Billboard", "Magazine ad"],
        answer: "Email newsletter"
    },
    {
        question: "What is a brand?",
        options: ["A company's logo", "A marketing campaign", "A name, term, sign, symbol, or design that identifies a seller's goods or services", "The price of a product"],
        answer: "A name, term, sign, symbol, or design that identifies a seller's goods or services"
    },
    {
        question: "Which stage of the product life cycle is characterized by high costs and low sales?",
        options: ["Growth", "Maturity", "Decline", "Introduction"],
        answer: "Introduction"
    },
    {
        question: "What is the process of gathering, analyzing, and interpreting information about a market?",
        options: ["Market research", "Sales forecasting", "Product development", "Competitive analysis"],
        answer: "Market research"
    },
    {
        question: "Which pricing strategy involves setting a high initial price for a new product?",
        options: ["Penetration pricing", "Skimming pricing", "Cost-plus pricing", "Value-based pricing"],
        answer: "Skimming pricing"
    },
    {
        question: "What is public relations?",
        options: ["Direct selling to customers", "Paid advertising campaigns", "Building good relations with the company's various publics", "Developing new products"],
        answer: "Building good relations with the company's various publics"
    },
    {
        question: "Which of the following is an internal factor affecting marketing decisions?",
        options: ["Economic conditions", "Technological advancements", "Company resources", "Political stability"],
        answer: "Company resources"
    },
    {
        question: "What is the purpose of a marketing plan?",
        options: ["To track sales figures", "To outline marketing objectives, strategies, and tactics", "To manage customer relationships", "To develop new products"],
        answer: "To outline marketing objectives, strategies, and tactics"
    },
    {
        question: "What is the term for the set of actual and potential buyers of a product or service?",
        options: ["Target audience", "Market", "Customer base", "Demographics"],
        answer: "Market"
    },
    {
        question: "Which type of promotion involves personal communication with customers?",
        options: ["Advertising", "Sales promotion", "Public relations", "Personal selling"],
        answer: "Personal selling"
    },
    {
        question: "What is supply chain management?",
        options: ["Managing customer complaints", "Managing the flow of goods and services from raw materials to final consumers", "Developing marketing strategies", "Setting product prices"],
        answer: "Managing the flow of goods and services from raw materials to final consumers"
    },
    {
        question: "Which of the following describes a product that is tangible and can be stored?",
        options: ["Service", "Idea", "Good", "Experience"],
        answer: "Good"
    },
    {
        question: "What is a brand extension?",
        options: ["Introducing a new brand", "Using an existing brand name for a new product in a different category", "Changing a brand's logo", "Reducing a product's price"],
        answer: "Using an existing brand name for a new product in a different category"
    },
    {
        question: "Which pricing method involves setting prices based on what competitors charge?",
        options: ["Cost-plus pricing", "Value-based pricing", "Competitive pricing", "Dynamic pricing"],
        answer: "Competitive pricing"
    },
    {
        question: "What is the primary goal of advertising?",
        options: ["To generate immediate sales", "To build brand awareness and persuade customers", "To collect customer feedback", "To reduce production costs"],
        answer: "To build brand awareness and persuade customers"
    },
    {
        question: "What is a marketing channel?",
        options: ["A communication medium", "A path through which goods and services flow from producers to consumers", "A pricing strategy", "A product feature"],
        answer: "A path through which goods and services flow from producers to consumers"
    },
    {
        question: "Which of the following is a disadvantage of internal market research?",
        options: ["High cost", "Lack of control", "Potential bias", "Slow data collection"],
        answer: "Potential bias"
    },
    {
        question: "What is the purpose of a product's packaging?",
        options: ["To reduce shipping costs", "To protect the product and convey information", "To enhance product features", "To set the product's price"],
        answer: "To protect the product and convey information"
    },
    {
        question: "What is green marketing?",
        options: ["Marketing products in rural areas", "Marketing environmentally friendly products and practices", "Using green colors in branding", "Marketing agricultural products"],
        answer: "Marketing environmentally friendly products and practices"
    },
    {
        question: "What is a focus group?",
        options: ["A large-scale survey", "A group of experts discussing a topic", "A small group of people assembled for a guided discussion", "An individual interview"],
        answer: "A small group of people assembled for a guided discussion"
    },
    {
        question: "What is the term for the unique selling proposition of a product?",
        options: ["Brand image", "Value proposition", "Market share", "Product feature"],
        answer: "Value proposition"
    }
];

let currentQuestions = [];
let answeredQuestions = {}; // Stores answers for current batch
let quizScore = 0;
let totalAttempted = 0;

// Function to shuffle questions and pick 5 unique ones
function getFiveRandomQuestions() {
    const availableQuestions = marketingManagementQuestions.filter(q => !currentQuestions.some(cq => cq.question === q.question));
    if (availableQuestions.length < 5) {
        console.warn("Not enough unique questions left. Resetting quiz.");
        currentQuestions = [];
        answeredQuestions = {};
        quizScore = 0;
        totalAttempted = 0;
        return marketingManagementQuestions.sort(() => 0.5 - Math.random()).slice(0, 5);
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
    updateQuizPerformance("marketingManagement");
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
