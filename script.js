// Mobile nav
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({behavior:'smooth', block:'start'});
      nav.classList.remove('open');
      hamburger.setAttribute('aria-expanded','false');
    }
  });
});

// Back to top
const toTop = document.getElementById('toTop');
if (toTop) {
  toTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
}

// Lightweight contact form handler
function handleSubmit(e){
  e.preventDefault();
  const form = e.currentTarget;
  const data = Object.fromEntries(new FormData(form).entries());
  const note = document.getElementById('formNote');
  note.textContent = "Thanks, " + (data.name || "there") + "! I’ll get back to you shortly.";
  form.reset();
  return false;
}
 
// Initialize EmailJS (replace with your actual Public Key from EmailJS dashboard)
(function(){
    emailjs.init("off5uu0Gd536MOD_U");
})();

function sendMail(event) {
    // Collect form data
     event.preventDefault(); 
    let params = {
        from_name: document.getElementById("name").value,
        from_email: document.getElementById("email").value,
         subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
    };

    // Replace with your actual Service ID and Template ID from EmailJS
       emailjs.send("service_o5pubyt","template_spfr5d9",params)
    .then(function(response) {
        console.log("SUCCESS! ,response");
        document.getElementById("formNote").innerText = "✅ Message sent successfully!";
        document.getElementById("formNote").style.color ="white";
    }, function(error) {
        document.getElementById("formNote").innerText = "❌ Failed to send. Try again!";
        document.getElementById("formNote").style.color = "red";
        console.error("Error:", error);
    });

    return false; // Prevent form refresh
}
