
async function searchTutors() {
    const search = document
        .getElementById("subjectSearch")
        .value
        .trim();

    const tutorList = document.getElementById("tutorList");

    tutorList.innerHTML = "<p>Searching for tutors...</p>";

    try {
    
        const response = await fetch(
            `/api/tutors?subject=${encodeURIComponent(search)}`
        );

        const tutors = await response.json();

      
        tutorList.innerHTML = "";

        if (tutors.length === 0) {
            tutorList.innerHTML = "<p>No tutors found for that subject.</p>";
            return;
        }

        tutors.forEach(function(tutor) {
            const tutorCard = document.createElement("div");
            tutorCard.className = "tutor";

            tutorCard.innerHTML = `
                <h4>${tutor.name}</h4>
                <p>Subject: ${tutor.subject}</p>
                <button>Request Session</button>
            `;

            tutorList.appendChild(tutorCard);
        });

    } catch (error) {
        tutorList.innerHTML =
            "<p>Unable to load tutors. Please try again later.</p>";

        console.error("Error searching for tutors:", error);
    }
}

const registrationForm = document.getElementById("registrationForm");

registrationForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    const message = document.getElementById("registrationMessage");

    message.textContent = "Creating account...";

    try {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                role: role
            })
        });

        const result = await response.json();

        if (response.ok) {
            message.textContent = result.message;
            registrationForm.reset();
        } else {
            message.textContent = result.message;
        }
    } catch (error) {
        message.textContent = "Unable to connect to the server.";
        console.error("Registration error:", error);
    }
});
