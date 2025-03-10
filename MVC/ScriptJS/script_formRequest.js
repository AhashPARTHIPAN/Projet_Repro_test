// Pour afficher les options de couverture
const couvertureOui = document.getElementById('couverture_oui');
const couvertureDebutFin = document.querySelectorAll('.couv');

// Pour afficher/cacher la couleur de la couverture du debut
const couvDebutCheck = document.getElementById('couv_debut');
const coulCouvDebut = document.getElementById('coul_couv_debut');

// Pour afficher/cacher la couleur de la couverture de fin
const couvFinCheck = document.getElementById('couv_fin');
const coulCouvFin = document.getElementById('coul_couv_fin');

// Pour afficher/cacher les différents choix de finition
const finitionMultipleCheck = document.getElementById("finition_multiple_check");
const finitionMultipleChoix = document.getElementById("finition_multiple_choix");

// Pour afficher/cacher les types de perforation (si perforation choisi)
const pliageOui = document.getElementById("pliage");
const crea_cahierOui = document.getElementById("crea_cahier");
const perforationOui = document.getElementById("perforation_radio");
const typesPerforation = document.querySelectorAll(".type_perforation");
const trous2 = document.getElementById("trous2");
const trous3 = document.getElementById("trous3");

const typeBrochure = document.querySelectorAll(".type-brochure");
const formats = document.getElementById("format");

typeBrochure.forEach(brochure => {
    if(brochure.textContent == "Livret"){
        brochure.addEventListener("click", () => {
            const optionExiste = formats.querySelector("option[value='2']");
            if (optionExiste) {
                formats.value = 2;
            } else {
                formats.innerHTML += "<option value='2' selected>A5</option>";
            }
        })
    }
    else {
        brochure.addEventListener("click", () => {
            // Si ce n'est pas "Livret", on supprime l'option A5 si elle existe
            const optionToRemove = formats.querySelector("option[value='2']");
            if (optionToRemove) {
                optionToRemove.remove();
            }
        })
    }
})

// onclick rendre visible couverture de debut et de fin
couvertureOui.addEventListener("click", () => {
    if(couvertureOui.checked){
        couvertureDebutFin.forEach(couv => {
            couv.style.display = "block";
        });
    }
    else{
        couvertureDebutFin.forEach(couv => {
            couv.style.display = "none";
        });
        coulCouvDebut.style.display = "none";
        coulCouvFin.style.display = "none";
        couvDebutCheck.checked = false;
        couvFinCheck.checked = false;
    }
});

// afficher/caché la couleur de la couverture de début
couvDebutCheck.addEventListener("click",()=>{
    if(couvDebutCheck.checked){
        coulCouvDebut.style.display = "block";
    }
    else{
        coulCouvDebut.style.display = "none";
    }
})

// afficher/caché la couleur de la couverture de fin
couvFinCheck.addEventListener("click",()=>{
    if(couvFinCheck.checked){
        coulCouvFin.style.display = "block";
    }
    else{
        coulCouvFin.style.display = "none";
    }
})

// afficher/caché les différents choix pour la finition
finitionMultipleCheck.addEventListener("click", ()=>{
    if(finitionMultipleCheck.checked){
        finitionMultipleChoix.style.display = "block";
    }
    else{
        finitionMultipleChoix.style.display = "none";
    }
})

pliageOui.addEventListener("click", ()=>{
    if(pliageOui.checked){
        typesPerforation.forEach(type => {
            type.style.display = "none";
        })
        trous2.checked = false;
        trous3.checked = false;
    }
})

crea_cahierOui.addEventListener("click", ()=>{
    if(crea_cahierOui.checked){
        typesPerforation.forEach(type => {
            type.style.display = "none";
        })
        trous2.checked = false;
        trous3.checked = false;
    }
})

perforationOui.addEventListener("click", ()=>{
    if(perforationOui.checked){
        typesPerforation.forEach(type => {
            type.style.display = "inline-block";
        })
    }
})

// ------ FIN AFFICHER/CACHER ------ //

// ------ DEBUT VERIF DATE ------ //

const date_demande = document.getElementById('date_livraison');

date_demande.addEventListener('change', () => {
    const inputDate = new Date(date_demande.value); // date demandée
    const today = new Date(); // aujourd'hui
    let joursAjoutes = 0;

    const todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (inputDate < todayWithoutTime) {
        alert("La date choisie est antérieure à aujourd'hui. Veuillez sélectionner une date valide.");
        date_demande.value = "";
        return; // Arrêter le script ici si la date est dans le passé
    }

    // Ajouter 48h en jours ouvrés à la date actuelle
    while (joursAjoutes < 2) {
        today.setDate(today.getDate() + 1);
        const jourSemaine = today.getDay();
        // Ignorer les weekends (samedi = 6, dimanche = 0)
        if (jourSemaine !== 0 && jourSemaine !== 6) {
            joursAjoutes++;
        }
    }

    // Vérifier si la date de livraison est correcte
    if (inputDate <= today) {
        alert("La date de livraison est inférieure à 48 heures en jours ouvrés. La demande risque de ne pas être réalisé à temps et n'est pas prioritaire.");
        // Sur la demande du client, on accepte quand même la date. 
    }
});

// ------ FIN VERIF DATE ------ //

// ------ DEBUT VERIF TAILLE FICHIER ------ //

const fileInput = document.getElementById('fileInput');
const maxSize = 200 * 1024 * 1024; // 200 Mo en octets

fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
        if (file.size > maxSize) {
            alert("Le fichier dépasse la taille maximale autorisée de 200 Mo.");
            fileInput.value = "";
        }
    }
});

// ------ FIN VERIF TAILLE FICHIER ------ //
