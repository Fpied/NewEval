const buttonCookie = document.querySelector("#button_cookie");
const cookieBanner = document.querySelector("#cookie-banner");
const addStain = document.querySelector("#main__form__button__add");
const inputText = document.querySelector("#main__form__input");
const error = document.querySelector("#error");
const liste = document.querySelector("#main__liste");
const buttonFilter = document.querySelector("#main__button__filter");
let taches = [];

function accepterCookies(){
    const dateToDay = new Date();
    dateToDay.setDate(dateToDay.getDate() + 30); // Pour les trentes jours
    document.cookie = `rgpd_consent=true;expires=${dateToDay.toUTCString()};path=/`;
    document.getElementById('cookie-banner').style.display = 'none';
    cookieBanner.style.display = "none";

}

function sauvegarder(){
    localStorage.setItem("taches", JSON.stringify(taches));
}

function afficherTache(filtre = "toutes"){
    liste.innerHTML = "";
    

        for (const tache of taches) {
            if (filtre === "aFaire" && tache.fait ===true){
                continue;
            }

            if (filtre === "terminees" && tache.fait === false){
                continue;
            }
            // les li
            let li = document.createElement("li");
            li.classList.add("main__liste__li");
            let p = document.createElement("p");
            p.classList.add("main__liste__li__p");
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("main__liste__checkbox");
            checkbox.checked = tache.fait;

            if (tache.fait) {
                p.style.textDecoration = "line-through";
            } else {
                p.style.textDecoration = "none";
            }
        let buttonDelete = document.createElement("button");
        buttonDelete.textContent = "Supprimer";
        buttonDelete.classList.add("main__liste__delete");
            
        p.textContent = tache.texte;
        li.appendChild(p);
        li.appendChild(checkbox);
        li.appendChild(buttonDelete);
         liste.appendChild(li);


        checkbox.addEventListener("click", () =>{
            tache.fait = checkbox.checked;
            if(tache.fait){
                p.style.textDecoration = "line-through";
                tache.fait = true;
                sauvegarder();
                afficherTache();

            } else {
                p.style.textDecoration = "none";
                tache.fait = false;
                sauvegarder();
                afficherTache();
            }
        })

        buttonDelete.addEventListener("click", () =>{
            // essaie d'un filtre
            taches = taches.filter(element => element.id !== tache.id);
            sauvegarder();
            afficherTache();
        })




    }

        
        

    
    

}




taches = JSON.parse(localStorage.getItem("taches")) || [];
afficherTache();



addStain.addEventListener("click", (event) => {
    event.preventDefault();

    if(inputText.value !== ""){
        const value = inputText.value;
        const newTache = {
            id: Date.now(),
            texte: value,
            fait: false

        };
        taches.push(newTache);
        sauvegarder();
        afficherTache();


    } else{
        error.textContent = "Veuillez entrer un champ valide";
        error.style.color = "red";

    }
})

// gestion des cookies
if (!document.cookie.includes("rgpd_consent"))
{
    cookieBanner.style.display = "block";
}

buttonCookie.addEventListener("click",accepterCookies);

let buttonAll = document.createElement("button");
        buttonAll.textContent = "toutes";
        let buttonToDo = document.createElement("button");
        buttonToDo.textContent = "À faire";
        let buttonFinich = document.createElement("button");
        buttonFinich.textContent = "Terminées";
        

        buttonAll.addEventListener("click", () =>{
            afficherTache("toutes");
            buttonAll.style.opacity = "0.8";
            buttonToDo.style.opacity = "1";
            buttonFinich.style.opacity = "1";
            
            
        })

        buttonToDo.addEventListener("click", () => {
            afficherTache("aFaire");
            buttonAll.style.opacity = "1";
            buttonToDo.style.opacity = "0.8";
            buttonFinich.style.opacity = "1";

            // afficher les tâches à faire
        });

        buttonFinich.addEventListener("click", () => {
            afficherTache("terminees");
            buttonAll.style.opacity = "1";
            buttonToDo.style.opacity = "1";
            buttonFinich.style.opacity = "0.8";

            // afficher les tâches terminées
        });

        const buttons = [buttonAll, buttonToDo, buttonFinich];
        for(const button of buttons){
            button.classList.add("Button__main__button__filter");
            buttonFilter.appendChild(button);
            
        }








