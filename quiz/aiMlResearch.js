// AI & ML Research Papers Data
const aiMlResearchPapers = [
    {
        title: "Attention Is All You Need",
        authors: "Ashish Vaswani et al.",
        year: 2017,
        journal: "NeurIPS",
        abstract: "The paper introduces the Transformer, a novel network architecture solely relying on attention mechanisms, dispensing with recurrence and convolutions entirely.",
        link: "https://arxiv.org/pdf/1706.03762"
    },
    {
        title: "Deep Learning",
        authors: "Yoshua Bengio, Yann LeCun, Geoffrey Hinton",
        year: 2015,
        journal: "Nature",
        abstract: "A review paper on deep learning, covering various deep learning architectures and their applications in different fields.",
        link: "https://www.cs.toronto.edu/~hinton/absps/NatureDeepReview.pdf"
    },
    {
        title: "ImageNet Classification with Deep Convolutional Neural Networks",
        authors: "Alex Krizhevsky, Ilya Sutskever, Geoffrey Hinton",
        year: 2012,
        journal: "NeurIPS",
        abstract: "We train a large, deep convolutional neural network to classify the 1.2 million high-resolution images in the ImageNet LSVRC-2010 contest into 1000 different classes.",
        link: "https://proceedings.neurips.cc/paper/2012/file/c399862d3b9d6b76c8436e924ad868de-Paper.pdf"
    },
    {
        title: "Generative Adversarial Nets",
        authors: "Ian Goodfellow et al.",
        year: 2014,
        journal: "NeurIPS",
        abstract: "We propose a new framework for estimating generative models via an adversarial process, in which we simultaneously train two models: a generative model G that captures the data distribution, and a discriminative model D that estimates the probability that a sample came from the training data rather than G.",
        link: "https://proceedings.neurips.cc/paper/2014/file/5ca3e9b122f61f8f06494c97b1afccf3-Paper.pdf"
    },
    {
        title: "Playing Atari with Deep Reinforcement Learning",
        authors: "Volodymyr Mnih et al.",
        year: 2013,
        journal: "arXiv",
        abstract: "We present the first deep learning model to successfully learn control policies directly from high-dimensional sensory input using reinforcement learning.",
        link: "https://arxiv.org/pdf/1312.5602"
    }
];

function displayResearchPapers() {
    const researchPapersList = document.getElementById("researchPapersList");
    researchPapersList.innerHTML = "";

    aiMlResearchPapers.forEach(paper => {
        const paperDiv = document.createElement("div");
        paperDiv.classList.add("paper-card");
        paperDiv.innerHTML = `
            <div class="paper-title">${paper.title}</div>
            <div class="paper-meta">
                <span>${paper.authors} (${paper.year})</span>
                <span class="paper-journal">${paper.journal}</span>
            </div>
            <p class="paper-abstract">${paper.abstract}</p>
            <a href="${paper.link}" target="_blank" class="paper-link">Read Full Paper</a>
        `;
        researchPapersList.appendChild(paperDiv);
    });
}

window.onload = function() {
    displayResearchPapers();
    document.getElementById("backToDashboard").addEventListener("click", () => {
        window.location.href = "../index.html"; // Fixed path to navigate back to the main dashboard
    });
};
