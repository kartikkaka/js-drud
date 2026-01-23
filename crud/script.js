
const ideaList = document.querySelector("#ideaList");
const modal = document.querySelector("#ideaModal");
const form = document.querySelector("#ideaForm");
const emptyState = document.querySelector("#emptyState");
const addIdeaBtn = document.querySelector("#addIdeaBtn");
const getStartedBtn = document.querySelector("#getStarted");

let ideas = JSON.parse(localStorage.getItem("ideas")) ?? [];
let editIndex = null;




const saveIdeas = () => {
  localStorage.setItem("ideas", JSON.stringify(ideas));
  renderIdeas();
};


const openModal = () => (modal.style.display = "flex");
const closeModal = () => (modal.style.display = "none");


addIdeaBtn.addEventListener("click", openModal);

getStartedBtn.addEventListener("click", () => {
  window.scrollTo({ top: 500, behavior: "smooth" });
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});


form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newIdea = {
    title: title.value.trim(),
    description: description.value.trim(),
    tags: tags.value.split(",").map(tag => tag.trim()),
    category: category.value,
    likes: 0,
    comments: []
  };

  if (editIndex !== null) {
    ideas[editIndex] = { ...ideas[editIndex], ...newIdea };
    editIndex = null;
  } else {
    ideas = [...ideas, newIdea]; 
  }

  form.reset();
  closeModal();
  saveIdeas();
});


const renderIdeas = () => {
  ideaList.innerHTML = "";

  emptyState.style.display = ideas.length ? "none" : "block";

  ideas.forEach((idea, index) => {
    const { title, description, tags, likes } = idea; 

    const card = document.createElement("div");
    card.className = "idea-card";

    card.innerHTML = `
      <h3>${title}</h3>
      <p>${description}</p>

      <div class="tags">
        ${tags.map(tag => `<span>${tag}</span>`).join("")}
      </div>

      <div class="actions">
        <button class="like">👍 ${likes}</button>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </div>
    `;


    card.querySelector(".like").addEventListener("click", () => {
      ideas[index].likes++;
      saveIdeas();
    });


    card.querySelector(".delete").addEventListener("click", () => {
      ideas = ideas.filter((_, i) => i !== index);
      saveIdeas();
    });

 
    card.querySelector(".edit").addEventListener("click", () => {
      title.value = idea.title;
      description.value = idea.description;
      tags.value = idea.tags.join(",");
      category.value = idea.category;
      editIndex = index;
      openModal();
    });

    ideaList.appendChild(card);
  });
};


renderIdeas();
