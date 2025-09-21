// Python Programming Content
const pythonContentData = [
    {
        title: "Introduction to Python",
        description: "Learn the basics of Python syntax, data types, and variables.",
        resources: [
            { name: "Python Official Tutorial", link: "https://docs.python.org/3/tutorial/" },
            { name: "W3Schools Python Tutorial", link: "https://www.w3schools.com/python/" }
        ],
        projects: [
            "Simple 'Hello World!' program",
            "Basic calculator using Python operators"
        ]
    },
    {
        title: "Control Flow & Functions",
        description: "Understand conditional statements (if/else), loops (for/while), and how to define and use functions.",
        resources: [
            { name: "Real Python: Conditionals", link: "https://realpython.com/python-conditional-statements/" },
            { name: "GeeksforGeeks: Python Functions", link: "https://www.geeksforgeeks.org/python-functions/" }
        ],
        projects: [
            "Number guessing game",
            "Factorial calculator using a function"
        ]
    },
    {
        title: "Data Structures (Lists, Tuples, Dictionaries)",
        description: "Explore Python's built-in data structures and their applications.",
        resources: [
            { name: "Programiz: Python List", link: "https://www.programiz.com/python-programming/list" },
            { name: "Python Dictionary Tutorial", link: "https://www.tutorialspoint.com/python/python_dictionaries.htm" }
        ],
        projects: [
            "Simple contact book using a dictionary",
            "Program to sort a list of numbers"
        ]
    },
    {
        title: "Object-Oriented Programming (OOP)",
        description: "Learn about classes, objects, inheritance, and polymorphism in Python.",
        resources: [
            { name: "Python OOP Tutorial", link: "https://www.geeksforgeeks.org/python-oops-concepts/" }
        ],
        projects: [
            "Create a 'Car' class with methods for starting and stopping",
            "Build a simple game with multiple interacting objects"
        ]
    },
    {
        title: "File Handling & Error Handling",
        description: "Understand how to read from and write to files, and handle exceptions.",
        resources: [
            { name: "Python File I/O", link: "https://www.w3schools.com/python/python_file_handling.asp" },
            { name: "Python Try Except", link: "https://www.w3schools.com/python/python_try_except.asp" }
        ],
        projects: [
            "Program to read a text file and count word frequency",
            "Simple log file generator"
        ]
    }
];

function createSectionNav() {
    const sectionNav = document.getElementById("sectionNav");
    if (!sectionNav) return;
    
    sectionNav.innerHTML = "";
    
    // Add "All" button
    const allButton = document.createElement("button");
    allButton.className = "section-button active";
    allButton.textContent = "All Topics";
    allButton.dataset.section = "all";
    sectionNav.appendChild(allButton);
    
    // Add section buttons
    pythonContentData.forEach((section, index) => {
        const button = document.createElement("button");
        button.className = "section-button";
        button.textContent = section.title;
        button.dataset.section = index;
        sectionNav.appendChild(button);
    });
    
    // Add event listeners
    const buttons = sectionNav.querySelectorAll(".section-button");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove("active"));
            // Add active class to clicked button
            button.classList.add("active");
            // Display content
            if (button.dataset.section === "all") {
                displayPythonContent();
            } else {
                displaySingleSection(parseInt(button.dataset.section));
            }
        });
    });
}

function displaySingleSection(index) {
    const pythonContentDiv = document.getElementById("pythonContent");
    if (!pythonContentDiv) return;
    
    pythonContentDiv.innerHTML = "";
    
    const section = pythonContentData[index];
    if (!section) return;
    
    let contentHtml = `
        <div class="python-section">
            <div class="activity-title">${section.title}</div>
            <div class="activity-desc">${section.description}</div>
            <h4>Resources:</h4>
            <ul>
                ${section.resources.map(res => `<li><a href="${res.link}" target="_blank" class="resource-link">${res.name}</a></li>`).join('')}
            </ul>
            <h4>Practice Projects:</h4>
            <ul>
                ${section.projects.map((proj, i) => {
                    const difficulty = i === 0 ? "beginner" : "intermediate";
                    return `<li class="project-item">${proj} <span class="difficulty ${difficulty}">${difficulty}</span></li>`;
                }).join('')}
            </ul>
        </div>
    `;
    
    pythonContentDiv.innerHTML = contentHtml;
}

function displayPythonContent() {
    const pythonContentDiv = document.getElementById("pythonContent");
    if (!pythonContentDiv) return;

    pythonContentDiv.innerHTML = "";

    pythonContentData.forEach((section, index) => {
        let contentHtml = `
            <div class="python-section">
                <div class="activity-title">${section.title}</div>
                <div class="activity-desc">${section.description}</div>
                <h4>Resources:</h4>
                <ul>
                    ${section.resources.map(res => `<li><a href="${res.link}" target="_blank" class="resource-link">${res.name}</a></li>`).join('')}
                </ul>
                <h4>Practice Projects:</h4>
                <ul>
                    ${section.projects.map((proj, i) => {
                        const difficulty = i === 0 ? "beginner" : "intermediate";
                        return `<li class="project-item">${proj} <span class="difficulty ${difficulty}">${difficulty}</span></li>`;
                    }).join('')}
                </ul>
            </div>
        `;
        pythonContentDiv.innerHTML += contentHtml;
    });
}

window.onload = function() {
    createSectionNav();
    displayPythonContent();
    document.getElementById("backToDashboard").addEventListener("click", () => {
        window.location.href = "../index.html"; // Navigate back to the main dashboard
    });
};
