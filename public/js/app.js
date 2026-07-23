// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()



  document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const overlay = document.getElementById("mobileMenuOverlay");
  const closeBtn = document.getElementById("mobileMenuClose");

  if (menuBtn && overlay && closeBtn) {
    menuBtn.addEventListener("click", () => {
      overlay.classList.add("show");
      document.body.style.overflow = "hidden"; // prevent background scroll
    });

    closeBtn.addEventListener("click", () => {
      overlay.classList.remove("show");
      document.body.style.overflow = "";
    });
  }
});