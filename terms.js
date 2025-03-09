// Verifică dacă utilizatorul a acceptat/refuzat termenii
document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("termsAccepted")) {
        document.getElementById("termsBox").style.display = "flex";
    }
});

// Dacă apasă pe "Da"
function acceptTerms() {
    localStorage.setItem("termsAccepted", "true");
    document.getElementById("termsBox").style.display = "none";
}

// Dacă apasă pe "Nu"
function declineTerms() {
    localStorage.setItem("termsAccepted", "false");
    document.getElementById("termsBox").style.display = "none";
}
