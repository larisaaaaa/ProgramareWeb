function submitForm() { 
    var form = document.getElementById("contactForm");
    function   handleSubmit(event) {
        event.preventDefault();
    }
    form.addEventListener('submit', handleSubmit);
    const nume = document.getElementById("nume").value; 
    const email = document.getElementById("email").value; 
    const mesaj = document.getElementById("mesaj").value; 
    const feedbackElement = document.getElementById("form-feedback");
    if(nume.length < 2) {
        feedbackElement.textContent = "Numele trebuie sa contina cel putin 2 caractere.";
        feedbackElement.style.color = "red";
        return;
    }
     if (!email.includes("@")) {
            feedbackElement.textContent = "Adresa de email nu este valida.";
            feedbackElement.style.color = "red";
            return;
     }
     if(mesaj.length < 10) {
        feedbackElement.textContent = "Mesajul trebuie sa contina cel putin 10 caractere.";
        feedbackElement.style.color = "red";
        return;
     }
     console.log("Nume: " + nume);
     console.log("Email: " + email);
     console.log("Mesaj: " + mesaj);
     feedbackElement.textContent = "Formularul a fost trimis cu succes!";
     feedbackElement.style.color = "green";

}

function darkMode() {
   var element = document.body;
   element.classList.toggle("dark-mode-toggle");
}

const date = new Date();
const hour = date.getHours();
let greeting;
if (hour >= 6 && hour < 12) {
   greeting = 'Buna dimineata! Bine ai venit la pagina mea'}
else if (hour >= 12 && hour < 18) {
     greeting = 'Buna ziua! Bine ai venit la pagina mea'}
else if (hour >= 18 &&  hour < 6){
     greeting = 'Buna seara! Bine ai venit la pagina mea'}
document.querySelector('header p').textContent = greeting;

function hideElement() {
     const element = document.querySelectorAll('h2');
     element.forEach(function(h2) { 
          h2.addEventListener('click', function() {
               while (h2.nextElementSibling && h2.nextElementSibling.tagName !== 'h2') {
                    h2.nextElementSibling.style.display = h2.nextElementSibling.style.display === 'none' ? 'block' : 'none';
                    h2 = h2.nextElementSibling;
               }
     });
})
}