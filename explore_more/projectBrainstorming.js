// Project Brainstorming Logic

const projectIdeasData = {
    "web development": [
        {
            name: "To-Do List App",
            difficulty: "Beginner",
            description: "A simple but practical application to manage daily tasks with features like task categorization and priority levels.",
            roadmap: [
                "Create HTML structure with input field and task list",
                "Style with CSS for a clean, user-friendly interface",
                "Add JavaScript functionality to add, complete, and delete tasks",
                "Implement local storage to save tasks between sessions",
                "Add categories and priority levels for better organization"
            ]
        },
        {
            name: "Personal Portfolio Website",
            difficulty: "Beginner-Intermediate",
            description: "Showcase your skills and projects with a professional portfolio website that highlights your accomplishments.",
            roadmap: [
                "Design layout with sections for about, projects, skills, and contact",
                "Implement responsive design for all device sizes",
                "Add animations and transitions for a polished look",
                "Optimize images and performance",
                "Implement a contact form with validation"
            ]
        },
        {
            name: "Recipe Sharing Platform",
            difficulty: "Intermediate",
            description: "A community-driven website where users can share, discover, and rate recipes with search and filtering capabilities.",
            roadmap: [
                "Design database schema for recipes, users, and ratings",
                "Create user authentication system",
                "Implement recipe upload with image support",
                "Add search and filtering functionality",
                "Develop user profile and saved recipes features"
            ]
        }
    ],
    "mobile app development": [
        {
            name: "Weather App",
            difficulty: "Beginner-Intermediate",
            description: "A weather application that provides current conditions and forecasts based on user location or search.",
            roadmap: [
                "Set up development environment (React Native/Flutter)",
                "Integrate with weather API",
                "Create UI for displaying current weather and forecast",
                "Implement location services to get user's current location",
                "Add weather alerts and notifications"
            ]
        },
        {
            name: "Fitness Tracker",
            difficulty: "Intermediate",
            description: "Track workouts, set goals, and monitor progress with this comprehensive fitness companion app.",
            roadmap: [
                "Design database schema for workouts and progress",
                "Create UI for logging exercises and viewing statistics",
                "Implement notifications for workout reminders",
                "Add data visualization for progress tracking",
                "Integrate with health platforms (Google Fit/Apple Health)"
            ]
        },
        {
            name: "Language Learning Flashcards",
            difficulty: "Intermediate",
            description: "An interactive flashcard app for language learning with spaced repetition and pronunciation practice.",
            roadmap: [
                "Design flashcard system with front/back views",
                "Implement spaced repetition algorithm",
                "Add audio pronunciation features",
                "Create progress tracking and statistics",
                "Develop offline mode for learning anywhere"
            ]
        }
    ],
    "game development": [
        {
            name: "2D Platformer",
            difficulty: "Intermediate",
            description: "A side-scrolling platform game with character movement, obstacles, enemies, and collectibles.",
            roadmap: [
                "Set up game engine (Unity/Godot)",
                "Design character and level assets",
                "Implement player movement and physics",
                "Add enemies, obstacles, and collectibles",
                "Create level progression and scoring system"
            ]
        },
        {
            name: "Memory Card Game",
            difficulty: "Beginner",
            description: "Test and improve memory skills with this classic card matching game featuring different difficulty levels.",
            roadmap: [
                "Create card matching logic",
                "Design card backs and fronts",
                "Implement scoring system",
                "Add animations for card flips and matches",
                "Include multiple difficulty levels with different grid sizes"
            ]
        },
        {
            name: "Quiz Trivia Game",
            difficulty: "Beginner-Intermediate",
            description: "A knowledge-testing game with questions from various categories and difficulty levels.",
            roadmap: [
                "Design question and answer database structure",
                "Create UI for question display and answer selection",
                "Implement scoring and timer functionality",
                "Add different categories and difficulty levels",
                "Include multiplayer or leaderboard features"
            ]
        }
    ],
    "data science": [
        {
            name: "Personal Finance Dashboard",
            difficulty: "Intermediate",
            description: "Visualize and analyze personal spending habits with interactive charts and budget tracking.",
            roadmap: [
                "Set up data collection from CSV/bank exports",
                "Create data cleaning and categorization scripts",
                "Implement visualization dashboard with charts",
                "Add budget tracking and alerts",
                "Develop trend analysis and recommendations"
            ]
        },
        {
            name: "Movie Recommendation System",
            difficulty: "Intermediate-Advanced",
            description: "Build a recommendation engine that suggests movies based on user preferences and viewing history.",
            roadmap: [
                "Collect and prepare movie dataset",
                "Implement collaborative filtering algorithm",
                "Create content-based recommendation features",
                "Develop user interface for ratings and recommendations",
                "Add performance metrics and algorithm tuning"
            ]
        },
        {
            name: "Twitter Sentiment Analyzer",
            difficulty: "Intermediate",
            description: "Analyze the sentiment of tweets about specific topics or brands using natural language processing.",
            roadmap: [
                "Set up Twitter API connection",
                "Implement text preprocessing pipeline",
                "Train sentiment classification model",
                "Create visualization dashboard for results",
                "Add real-time monitoring capabilities"
            ]
        }
    ],
    "general": [
        {
            name: "Personal Blog (Static Site Generator)",
            difficulty: "Beginner",
            description: "Create your own blog to share your thoughts and experiences using modern static site generators.",
            roadmap: [
                "Choose a static site generator (e.g., Jekyll, Hugo, Next.js)",
                "Set up theme and content structure",
                "Create initial blog posts with markdown",
                "Configure custom domain (optional)",
                "Deploy to a hosting service (e.g., GitHub Pages, Netlify)"
            ]
        },
        {
            name: "Online Resume/Portfolio",
            difficulty: "Beginner",
            description: "Build a professional online presence to showcase your skills and experience to potential employers.",
            roadmap: [
                "Design layout and content structure for your resume",
                "Implement with HTML/CSS/JavaScript",
                "Add responsive design for mobile compatibility",
                "Optimize for search engines (SEO)",
                "Host online (e.g., Netlify, Vercel, GitHub Pages)"
            ]
        }
    ]
};

document.getElementById("generateProjectIdeas").addEventListener("click", () => {
    const interests = document.getElementById("projectInterests").value.toLowerCase();
    let recommendedProjects = projectIdeasData.general;

    if (interests.includes("web") || interests.includes("frontend") || interests.includes("backend")) {
        recommendedProjects = projectIdeasData["web development"];
    } else if (interests.includes("mobile") || interests.includes("android") || interests.includes("ios")) {
        recommendedProjects = projectIdeasData["mobile app development"];
    } else if (interests.includes("game")) {
        recommendedProjects = projectIdeasData["game development"];
    } else if (interests.includes("data science") || interests.includes("machine learning") || interests.includes("ai")) {
        recommendedProjects = projectIdeasData["data science and machine learning"];
    }

    displayProjectIdeas(recommendedProjects);
});

function displayProjectIdeas(projects) {
    const projectRecommendationsDiv = document.getElementById("projectRecommendations");
    const projectIdeasContent = document.getElementById("projectIdeasContent");
    projectIdeasContent.innerHTML = "";

    if (projects.length > 0) {
        projects.forEach(project => {
            projectIdeasContent.innerHTML += `
                <div class="activity-item">
                    <div class="activity-title">${project.name}</div>
                    <div class="activity-desc">Roadmap:</div>
                    <ul>
                        ${project.roadmap.map(step => `<li>${step}</li>`).join('')}
                    </ul>
                </div>
            `;
        });
    } else {
        projectIdeasContent.innerHTML = `<p>No specific recommendations found for your interests. Here are some general ideas:</p>`;
        projectIdeasData.general.forEach(project => {
            projectIdeasContent.innerHTML += `
                <div class="activity-item">
                    <div class="activity-title">${project.name}</div>
                    <div class="activity-desc">Roadmap:</div>
                    <ul>
                        ${project.roadmap.map(step => `<li>${step}</li>`).join('')}
                    </ul>
                </div>
            `;
        });
    }

    projectRecommendationsDiv.style.display = "block";
}

document.getElementById("backToDashboard").addEventListener("click", () => {
    window.location.href = "index.html";
});
