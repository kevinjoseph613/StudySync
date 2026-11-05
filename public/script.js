
function searchTutors() {
    const search = document.getElementById("subjectSearch").value.trim().toLowerCase();
    const tutors = document.querySelectorAll(".tutor");

    tutors.forEach(function(tutor) {
        const subjects = tutor.querySelector("p").textContent.toLowerCase();

        if (subjects.includes(search) && search !== "") {
            tutor.style.display = "block";
        } else {
            tutor.style.display = "none";
        }
    });
}
