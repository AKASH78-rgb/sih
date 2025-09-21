// Career Planning Logic

// Sample data for recommendations (can be expanded)
const careerData = {
    "software development": {
        roadmap: [
            "1. Master a core programming language (Python/Java/JavaScript).",
            "2. Understand data structures and algorithms.",
            "3. Learn version control (Git).",
            "4. Build personal projects (web/mobile apps).",
            "5. Explore specific domains (e.g., AI/ML, web dev, mobile dev).",
            "6. Practice coding challenges and interview preparation."
        ],
        books: [
            "Clean Code by Robert C. Martin",
            "Cracking the Coding Interview by Gayle Laakmann McDowell",
            "The Pragmatic Programmer by Andrew Hunt and David Thomas"
        ],
        projects: [
            "Personal portfolio website",
            "CRUD application (e.g., a simple blog or task manager)",
            "Data visualization tool",
            "Small game using a framework/library"
        ],
        workshops: [
            "Online courses on Udemy/Coursera (e.g., 'Python for Everybody', 'The Web Developer Bootcamp')",
            "Local coding bootcamps",
            "FreeCodeCamp or The Odin Project"
        ]
    },
    "ai and machine learning": {
        roadmap: [
            "1. Strengthen mathematical foundations (linear algebra, calculus, statistics).",
            "2. Learn Python and relevant libraries (NumPy, Pandas, Scikit-learn, TensorFlow/PyTorch).",
            "3. Understand core ML concepts (supervised/unsupervised learning, deep learning).",
            "4. Work on data science projects (Kaggle competitions).",
            "5. Explore specialized areas (NLP, computer vision, reinforcement learning).",
            "6. Read research papers and stay updated with new algorithms."
        ],
        books: [
            "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow by Aurélien Géron",
            "Deep Learning by Ian Goodfellow, Yoshua Bengio, and Aaron Courville",
            "Pattern Recognition and Machine Learning by Christopher Bishop"
        ],
        projects: [
            "Image classification with CNNs",
            "Sentiment analysis of text data",
            "Predictive modeling for a dataset",
            "Build a simple recommender system"
        ],
        workshops: [
            "Coursera's 'Deep Learning Specialization' by Andrew Ng",
            "fast.ai courses",
            "TensorFlow/PyTorch official tutorials and documentation",
            "Kaggle Learn courses"
        ]
    },
    "marketing": {
        roadmap: [
            "1. Understand marketing fundamentals (4 Ps, market research, consumer behavior).",
            "2. Learn digital marketing skills (SEO, SEM, social media marketing, content marketing).",
            "3. Gain experience with analytics tools (Google Analytics).",
            "4. Develop communication and copywriting skills.",
            "5. Build a portfolio with case studies and campaigns.",
            "6. Stay updated with industry trends and tools."
        ],
        books: [
            "Contagious: How to Build Word of Mouth in the Digital Age by Jonah Berger",
            "Influence: The Psychology of Persuasion by Robert Cialdini",
            "Permission Marketing by Seth Godin"
        ],
        projects: [
            "Develop a social media strategy for a local business.",
            "Create a content marketing plan and execute it.",
            "Run a small Google Ads campaign.",
            "Analyze website traffic and suggest improvements."
        ],
        workshops: [
            "Google Digital Garage (free courses)",
            "HubSpot Academy certifications",
            "LinkedIn Learning courses on marketing"
        ]
    },
    "general": {
        roadmap: [
            "1. Identify your core skills and interests.",
            "2. Research different career paths that align with them.",
            "3. Talk to professionals in those fields (informational interviews).",
            "4. Set short-term and long-term goals.",
            "5. Continuously learn and adapt."
        ],
        books: [
            "What Color Is Your Parachute? by Richard N. Bolles",
            "Atomic Habits by James Clear",
            "Mindset: The New Psychology of Success by Carol S. Dweck"
        ],
        projects: [
            "Volunteer for a cause you care about.",
            "Start a small personal blog or online presence.",
            "Learn a new software or tool relevant to your field."
        ],
        workshops: [
            "Public speaking workshops",
            "Time management courses",
            "Networking events and conferences"
        ]
    }
};

window.onload = function() {
    // Hide recommendations initially
    document.getElementById("careerRecommendations").classList.remove("active");
    
    // Generate roadmap when button is clicked
    document.getElementById("generateRoadmap").addEventListener("click", function() {
        const interests = document.getElementById("careerInterests").value.toLowerCase();
        let recommendations = careerData.general;

        if (interests.includes("ai") || interests.includes("machine learning") || interests.includes("ml")) {
            recommendations = careerData["ai and machine learning"];
        } else if (interests.includes("software") || interests.includes("development") || interests.includes("programming")) {
            recommendations = careerData["software development"];
        } else if (interests.includes("marketing")) {
            recommendations = careerData["marketing"];
        }

        displayRecommendations(recommendations);
        
        // Show recommendations with animation
        document.getElementById("careerRecommendations").classList.add("active");
        
        // Scroll to recommendations
        document.getElementById("careerRecommendations").scrollIntoView({ behavior: 'smooth' });
    });
    
    // Back to dashboard button
    document.getElementById("backToDashboard").addEventListener("click", function() {
        window.location.href = "../index.html";
    });
};

function displayRecommendations(recommendations) {
    // Update roadmap
    document.getElementById("roadmapContent").innerHTML = recommendations.roadmap.map(step => `<p>${step}</p>`).join('');
    
    // Update recommended books
    let booksHTML = "";
    recommendations.books.forEach(book => {
        booksHTML += `
        <div class="resource-card">
            <h4>${book}</h4>
        </div>`;
    });
    document.getElementById("bookList").innerHTML = booksHTML;
    
    // Update recommended projects
    let projectsHTML = "";
    recommendations.projects.forEach(project => {
        projectsHTML += `
        <div class="resource-card">
            <h4>${project}</h4>
        </div>`;
    });
    document.getElementById("projectList").innerHTML = projectsHTML;
    
    // Update workshops and courses
    let workshopsHTML = "";
    recommendations.workshops.forEach(workshop => {
        workshopsHTML += `
        <div class="resource-card">
            <h4>${workshop}</h4>
        </div>`;
    });
    document.getElementById("workshopList").innerHTML = workshopsHTML;
}

document.getElementById("backToDashboard").addEventListener("click", () => {
    window.location.href = "index.html"; // Navigate back to the main dashboard
});
