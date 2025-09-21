// Physical Activity Content
const physicalActivityData = [
    {
        title: "Introduction to Physical Activity",
        description: "Understand the importance of regular physical activity for overall well-being, focus, and stress reduction.",
        benefits: [
            "Improved cardiovascular health",
            "Enhanced mood and reduced stress",
            "Better sleep quality",
            "Increased energy levels",
            "Improved cognitive function"
        ]
    },
    {
        title: "Light Cardio & Stretching",
        description: "Simple activities you can do daily to stay active.",
        examples: [
            "Brisk walking (15-20 minutes)",
            "Stretching (5-10 minutes, focusing on major muscle groups)",
            "Light jogging (10-15 minutes)"
        ],
        tips: [
            "Start slowly and gradually increase intensity.",
            "Listen to your body and avoid overexertion.",
            "Stay hydrated."
        ]
    },
    {
        title: "Yoga & Mindfulness",
        description: "Incorporate yoga poses and mindfulness exercises for flexibility and mental calm.",
        examples: [
            "Basic yoga poses (e.g., Cat-Cow, Downward Dog, Warrior II)",
            "Deep breathing exercises",
            "Short guided meditation"
        ],
        resources: [
            { name: "Yoga With Adriene (YouTube)", link: "https://www.youtube.com/user/yogawithadriene" },
            { name: "Headspace App", link: "https://www.headspace.com/" }
        ]
    },
    {
        title: "Strength Training Basics",
        description: "Basic bodyweight exercises to build strength.",
        examples: [
            "Push-ups (modified on knees if needed)",
            "Squats",
            "Lunges",
            "Plank (hold for 30-60 seconds)"
        ],
        tips: [
            "Maintain proper form to prevent injuries.",
            "Perform 2-3 sets of 10-15 repetitions for each exercise.",
            "Rest between sets."
        ]
    },
    {
        title: "Activity Tracking & Consistency",
        description: "Tips for staying consistent with your physical activity goals.",
        tips: [
            "Set realistic goals.",
            "Find an activity you enjoy.",
            "Schedule your workouts like appointments.",
            "Track your progress (e.g., using a fitness app or journal).",
            "Find an accountability partner."
        ]
    }
];

function displayPhysicalActivityContent() {
    const physicalActivityContentDiv = document.getElementById("physicalActivityContent");
    if (!physicalActivityContentDiv) return;

    physicalActivityContentDiv.innerHTML = "";

    physicalActivityData.forEach(section => {
        let contentHtml = `
            <div class="activity-title">${section.title}</div>
            <div class="activity-desc">${section.description}</div>
        `;

        if (section.benefits) {
            contentHtml += `<h4>Benefits:</h4><ul>${section.benefits.map(benefit => `<li>${benefit}</li>`).join('')}</ul>`;
        }
        if (section.examples) {
            contentHtml += `<h4>Examples:</h4><ul>${section.examples.map(example => `<li>${example}</li>`).join('')}</ul>`;
        }
        if (section.tips) {
            contentHtml += `<h4>Tips for Success:</h4><ul>${section.tips.map(tip => `<li>${tip}</li>`).join('')}</ul>`;
        }
        if (section.resources) {
            contentHtml += `<h4>Resources:</h4><ul>${section.resources.map(res => `<li><a href="${res.link}" target="_blank">${res.name}</a></li>`).join('')}</ul>`;
        }
        contentHtml += `<hr>`;
        physicalActivityContentDiv.innerHTML += contentHtml;
    });
}

window.onload = function() {
    displayPhysicalActivityContent();
    document.getElementById("backToDashboard").addEventListener("click", () => {
        window.location.href = "index.html"; // Navigate back to the main dashboard
    });
};
