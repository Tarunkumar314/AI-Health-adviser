// Toggle mobile navigation menu
const menuBtn = document.getElementById('menubar');
const navbar = document.querySelector('.navbar');
const aboutBtn = document.getElementById('aboutBtn');
const botIcon = document.getElementById('botIcon');


aboutBtn.addEventListener('click',()=>{
    var element = document.querySelector(".about"); 
    // Get the element's position relative to the viewport
    var elementPosition = element.getBoundingClientRect().top -60;
    // Scroll to the element
    window.scrollTo({
        top: elementPosition,
        behavior: 'smooth' 
    });
})

menuBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

// Close mobile navigation menu when clicking on a link
const navLinks = document.querySelectorAll('.navbar a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
    });
});

// Adjust header style on scroll
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header.style.background = '#13575e'; // Change background color on scroll
    } else {
        header.style.background = 'var(--mainclr)'; // Revert to original background color
    }
});

// Smooth scroll functionality for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            window.scrollTo({
                top: target.offsetTop - header.clientHeight, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Handling window resize for responsiveness
window.addEventListener('resize', () => {
    if (window.innerWidth > 767) {
        navbar.classList.remove('active'); // Ensure menu is hidden on desktop view
    }
});

// Chatbot functionality
const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;

// Function to create chat list item
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

// Function to generate response from the chatbot
const generateResponse = (chatElement, retries = 3) => {
    const API_URL = "https://ctagenerator-api.azurewebsites.net/api/v1/main/cta/getBotResponseForMedical";
    const messageElement = chatElement.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // model: "gpt-3.5-turbo",
            question: userMessage ,
        })
    }

    fetch(API_URL, requestOptions)
        .then(res => {
            return res.json();
        })
        .then(data => {
           
            console.log(data);
            messageElement.textContent = data.data;
        })
        .catch((e) => {
            console.log(e);
            messageElement.classList.add("error");
            messageElement.textContent = e.message || "Oops! Something went wrong. Please try again.";
        })
        .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

// Function to handle chat
const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if (!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

// Event listener for sending chat
sendChatBtn.addEventListener("click", handleChat);

// Optionally, you can add an event listener to the chat input to send message on Enter key press
chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        handleChat();
    }
});

// Adjust the height of the input textarea based on its content
chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

// Handle chat on Enter key press
chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

// Event listeners for chat toggling
// sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
botIcon.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

document.addEventListener('DOMContentLoaded', () => {
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    const moreTexts = document.querySelectorAll('.more-text');

    readMoreButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            moreTexts[index].classList.toggle('show');
            button.textContent = moreTexts[index].classList.contains('show') ? 'Read Less' : 'Read More';
        });
    });
});