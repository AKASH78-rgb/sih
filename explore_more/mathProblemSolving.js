// Math Problem Solving Content
const mathContentData = [
    {
        title: "Algebra Fundamentals",
        description: "Practice solving linear equations, inequalities, and working with polynomials.",
        topics: [
            "Solving for x in ax + b = c",
            "Systems of two linear equations",
            "Factoring simple polynomials"
        ],
        resources: [
            { name: "Khan Academy: Algebra Basics", link: "https://www.khanacademy.org/math/algebra-basics" },
            { name: "Algebra.com", link: "https://www.algebra.com/" }
        ],
        practiceProblems: [
            "If 3x + 5 = 14, find x.",
            "Solve: 2(y - 3) < 8.",
            "Factorize: x^2 + 5x + 6."
        ]
    },
    {
        title: "Geometry Essentials",
        description: "Review concepts of shapes, angles, area, and perimeter.",
        topics: [
            "Area and perimeter of rectangles and triangles",
            "Types of angles (acute, obtuse, right)",
            "Pythagorean theorem"
        ],
        resources: [
            { name: "Khan Academy: Geometry", link: "https://www.khanacademy.org/math/geometry" },
            { name: "Math Is Fun: Geometry", link: "https://www.mathsisfun.com/geometry/index.html" }
        ],
        practiceProblems: [
            "Find the area of a rectangle with length 10cm and width 4cm.",
            "If a right triangle has legs of length 3 and 4, what is the length of the hypotenuse?"
        ]
    },
    {
        title: "Calculus Introduction (Derivatives)",
        description: "Understand the basics of differentiation and finding derivatives of simple functions.",
        topics: [
            "Definition of a derivative",
            "Power rule",
            "Derivatives of exponential and logarithmic functions"
        ],
        resources: [
            { name: "Paul's Online Math Notes: Calculus I", link: "https://tutorial.math.lamar.edu/Classes/CalcI/CalcI.aspx" },
            { name: "Khan Academy: Differential Calculus", link: "https://www.khanacademy.org/math/differential-calculus" }
        ],
        practiceProblems: [
            "Find the derivative of f(x) = x^3.",
            "Differentiate g(x) = 5e^x."
        ]
    },
    {
        title: "Statistics & Probability Basics",
        description: "Learn about mean, median, mode, and basic probability concepts.",
        topics: [
            "Calculating mean, median, and mode",
            "Probability of single events",
            "Introduction to normal distribution"
        ],
        resources: [
            { name: "Khan Academy: Statistics & Probability", link: "https://www.khanacademy.org/math/statistics-probability" },
            { name: "Stat Trek: Statistics and Probability Tutorial", link: "https://stattrek.com/" }
        ],
        practiceProblems: [
            "Find the mean, median, and mode of the data set: {2, 4, 4, 5, 7, 8}.",
            "What is the probability of rolling a 6 on a fair six-sided die?"
        ]
    }
];

function displayMathContent() {
    const mathContentElement = document.getElementById("mathContent");
    if (!mathContentElement) return;
    
    let contentHTML = "";
    
    mathContentData.forEach((topic, index) => {
        const topicId = topic.title.toLowerCase().replace(/\s+/g, '-');
        
        contentHTML += `
            <div class="math-section" id="${topicId}">
                <div class="math-topic-card">
                    <h3>${topic.title}</h3>
                    <p>${topic.description}</p>
                    
                    <h4>Key Topics:</h4>
                    <ul class="topic-list">
                        ${topic.topics.map(t => `<li>${t}</li>`).join('')}
                    </ul>
                    
                    <h4>Resources:</h4>
                    <div class="math-resources">
                        ${topic.resources.map(r => `<a href="${r.link}" target="_blank" class="math-resource-link">${r.name}</a>`).join('')}
                    </div>
                    
                    <h4>Practice Problems:</h4>
                    ${topic.practiceProblems.map(p => `<div class="practice-problem">${p}</div>`).join('')}
                </div>
            </div>
        `;
    });
    
    mathContentElement.innerHTML = contentHTML;
}

window.onload = function() {
    displayMathContent();
    document.getElementById("backToDashboard").addEventListener("click", () => {
        window.location.href = "index.html"; // Navigate back to the main dashboard
    });
};
