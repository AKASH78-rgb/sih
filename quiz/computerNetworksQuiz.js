// Computer Networks Quiz Questions
const computerNetworksQuestions = [
    {
        question: "Which layer of the OSI model is responsible for logical addressing?",
        options: ["Physical Layer", "Data Link Layer", "Network Layer", "Transport Layer"],
        answer: "Network Layer"
    },
    {
        question: "What is the primary function of a router?",
        options: ["Signal amplification", "Packet filtering", "Connecting different networks", "Data encryption"],
        answer: "Connecting different networks"
    },
    {
        question: "Which protocol is used for sending email?",
        options: ["HTTP", "FTP", "SMTP", "POP3"],
        answer: "SMTP"
    },
    {
        question: "What does DNS stand for?",
        options: ["Domain Name System", "Dynamic Network Service", "Digital Naming Standard", "Data Node Server"],
        answer: "Domain Name System"
    },
    {
        question: "Which of the following is a private IP address range?",
        options: ["1.0.0.0 - 1.255.255.255", "172.16.0.0 - 172.31.255.255", "192.169.0.0 - 192.169.255.255", "224.0.0.0 - 239.255.255.255"],
        answer: "172.16.0.0 - 172.31.255.255"
    },
    {
        question: "What is the maximum number of hosts in a Class C network?",
        options: ["128", "254", "256", "512"],
        answer: "254"
    },
    {
        question: "Which device operates at the Physical Layer of the OSI model?",
        options: ["Router", "Switch", "Hub", "Gateway"],
        answer: "Hub"
    },
    {
        question: "What is the purpose of a firewall?",
        options: ["To speed up network traffic", "To prevent unauthorized access to a network", "To compress data", "To monitor network usage"],
        answer: "To prevent unauthorized access to a network"
    },
    {
        question: "Which of the following is a connection-oriented protocol?",
        options: ["UDP", "IP", "TCP", "ICMP"],
        answer: "TCP"
    },
    {
        question: "What is the term for a unique identifier assigned to network interfaces for communication at the data link layer?",
        options: ["IP Address", "Port Number", "MAC Address", "Subnet Mask"],
        answer: "MAC Address"
    },
    {
        question: "What is the primary function of DHCP?",
        options: ["Resolving domain names", "Assigning IP addresses automatically", "Encrypting network traffic", "Routing data packets"],
        answer: "Assigning IP addresses automatically"
    },
    {
        question: "Which topology connects all devices to a central hub or switch?",
        options: ["Bus", "Ring", "Star", "Mesh"],
        answer: "Star"
    },
    {
        question: "What is the default port for HTTP?",
        options: ["21", "23", "80", "443"],
        answer: "80"
    },
    {
        question: "Which of the following is used to resolve IP addresses to MAC addresses?",
        options: ["DNS", "ARP", "RARP", "ICMP"],
        answer: "ARP"
    },
    {
        question: "What is a WAN?",
        options: ["Wireless Area Network", "Wide Area Network", "Web Access Network", "Wired Area Network"],
        answer: "Wide Area Network"
    },
    {
        question: "Which layer handles error detection and correction for a single link?",
        options: ["Physical Layer", "Data Link Layer", "Network Layer", "Transport Layer"],
        answer: "Data Link Layer"
    },
    {
        question: "What is the function of a switch in a network?",
        options: ["Broadcasts data to all devices", "Forwards data to a specific destination", "Encrypts data", "Amplifies signals"],
        answer: "Forwards data to a specific destination"
    },
    {
        question: "Which of these is a common type of wireless network security?",
        options: ["WEP", "WPA2", "FTP", "SSH"],
        answer: "WPA2"
    },
    {
        question: "What is latency in computer networks?",
        options: ["Data transfer rate", "Signal strength", "Delay before a transfer of data begins", "Amount of data transferred"],
        answer: "Delay before a transfer of data begins"
    },
    {
        question: "Which networking device is used to connect two dissimilar networks?",
        options: ["Hub", "Switch", "Bridge", "Gateway"],
        answer: "Gateway"
    },
    {
        question: "What does TCP stand for?",
        options: ["Transfer Control Protocol", "Transmission Control Protocol", "Technical Control Protocol", "Terminal Control Protocol"],
        answer: "Transmission Control Protocol"
    },
    {
        question: "Which class of IP address has the most host addresses?",
        options: ["Class A", "Class B", "Class C", "Class D"],
        answer: "Class A"
    },
    {
        question: "What is the purpose of a VPN?",
        options: ["To increase internet speed", "To create a secure connection over a public network", "To block ads", "To monitor network traffic"],
        answer: "To create a secure connection over a public network"
    },
    {
        question: "Which protocol is used for secure web browsing?",
        options: ["HTTP", "FTP", "HTTPS", "SMTP"],
        answer: "HTTPS"
    },
    {
        question: "What is the term for unwanted bulk email?",
        options: ["Phishing", "Malware", "Spam", "Adware"],
        answer: "Spam"
    }
];

let currentQuestions = [];
let answeredQuestions = {}; // Stores answers for current batch
let quizScore = 0;
let totalAttempted = 0;

// Function to shuffle questions and pick 5 unique ones
function getFiveRandomQuestions() {
    const availableQuestions = computerNetworksQuestions.filter(q => !currentQuestions.some(cq => cq.question === q.question));
    if (availableQuestions.length < 5) {
        console.warn("Not enough unique questions left. Resetting quiz.");
        currentQuestions = [];
        answeredQuestions = {};
        quizScore = 0;
        totalAttempted = 0;
        return computerNetworksQuestions.sort(() => 0.5 - Math.random()).slice(0, 5);
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
    updateQuizPerformance("computerNetworks");
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
