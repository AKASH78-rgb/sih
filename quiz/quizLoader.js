// Example quiz data (this would come from teacher portal / DB)
const quizzes = [
  { id: 1, title: "Fundamental Management Quiz", link: "quiz/fundamentalManagementQuiz.html" },
  { id: 2, title: "Computer Networks Quiz", link: "quiz/computerNetworksQuiz.html" },
  { id: 3, title: "Marketing Management Quiz", link: "quiz/marketingManagementQuiz.html" },
  { id: 4, title: "Research Methodology and IPR Quiz", link: "quiz/researchMethodologyAndIPRQuiz.html" },
];

// Function to load quizzes into student portal
function loadQuizzes() {
  const quizList = document.getElementById("quizList");
  quizList.innerHTML = ""; // Clear old content

  quizzes.forEach(quiz => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${quiz.link}" target="_blank">${quiz.title}</a>`;
    quizList.appendChild(li);
  });
}

// Call function when page loads
