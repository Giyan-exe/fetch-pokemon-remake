const searchInput = document.querySelector(".form-control.me-2");
const searchBtn = document.querySelector(".btn.btn-outline-primary");
const shuffleBtn = document.querySelector(".btn.btn-outline-success");
const loader = document.createElement("div");
loader.setAttribute("id", "loading-spinner");

document.body.appendChild(loader);

async function fetchPokemon(name) {
        let resultContainer = document.querySelector(".result-container");
        let errorContainer = document.querySelector(".error-container");
        
        loader.style.display = "block";
        
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

        if(!response.ok) {
            throw new Error(`Pokemon not found`);
        }

        const data = await response.json();
        
        if(errorContainer) {
            errorContainer.remove();
        }

        let newResultContainer = document.createElement("div");
        newResultContainer.setAttribute("class", "result-container");
        newResultContainer.style.display = "flex";

        if(resultContainer) {
            resultContainer.replaceWith(newResultContainer);
        } else {
            document.body.appendChild(newResultContainer);
        }

        const result = document.createElement("div");
        result.setAttribute("class", "result");

        newResultContainer.appendChild(result);

        const pokemonImg = document.createElement("img");
        pokemonImg.setAttribute("src", data.sprites.front_default);
        pokemonImg.setAttribute("class", "pokemon-img");
        pokemonImg.setAttribute("height", "157px");
        pokemonImg.setAttribute("width", "150px");

        result.appendChild(pokemonImg);

        const pokemonDescription = document.createElement("div");
        pokemonDescription.setAttribute("class", "pokemon-description");

        result.appendChild(pokemonDescription);

        const pokedexId = document.createElement("p");
        pokedexId.setAttribute("class", "pokedex-entry");

        const pokemonId = data.id.toString();
        const finalId =  "#" + pokemonId.padStart(4, "0");
        pokedexId.textContent = finalId;
        
        pokemonDescription.appendChild(pokedexId);
        
        const pokemonName = document.createElement("p");
        pokemonName.setAttribute("class", "pokemon-name");
        pokemonName.textContent = data.name;
        
        pokemonDescription.appendChild(pokemonName);

        const pokemonTypeContainer = document.createElement("div");
        pokemonTypeContainer.setAttribute("class", "pokemon-type");

        pokemonDescription.appendChild(pokemonTypeContainer);

        data.types.forEach(typeInfo => { typeInfo.type.name 
            const pokemonType = document.createElement("p");
            pokemonType.textContent = typeInfo.type.name;
            pokemonType.setAttribute("class", typeInfo.type.name);

            pokemonTypeContainer.appendChild(pokemonType);
        });
        }  catch(error) {
            
            console.error(error);

            if(resultContainer) {
                resultContainer.remove();
            }

            let newErrorContainer = document.createElement("div");
            newErrorContainer.setAttribute("class", "error-container");
            
            if(errorContainer) {
                errorContainer.replaceWith(newErrorContainer);
            } else {
                document.body.appendChild(newErrorContainer);
            }
            
            const errorResult = document.createElement("div");
            errorResult.setAttribute("class", "error");

            newErrorContainer.appendChild(errorResult);

            const errorSad = document.createElement("p");
            errorSad.setAttribute("class", "error-sad");
            errorSad.textContent = ":(";

            errorResult.appendChild(errorSad);
            
            let errorMsg = document.createElement("p");
            errorMsg.setAttribute("class", "error-msg");
            errorMsg.textContent = name;
            errorMsg.appendChild(document.createElement("br"));
            errorMsg.appendChild(document.createTextNode(" not found"));
            errorMsg.appendChild(document.createElement("br"));
            errorMsg.appendChild(document.createTextNode("in pokedex"));
            
            errorResult.appendChild(errorMsg);
        } finally {
            loader.style.display = "none";
        }
}

searchInput.addEventListener("keydown", function(e){
    if (e.key === " " || e.code === "Space") {
        e.preventDefault();
    }
});

searchInput.addEventListener("keydown", function(e){
    if (e.key === "Enter") {
        e.preventDefault();
    }
});

searchInput.addEventListener("input", function() {
    searchBtn.disabled = searchInput.value.trim() === "";
});

searchBtn.addEventListener("click", function(e){
    e.preventDefault();
    const pokemonResult = searchInput.value.trim().toLowerCase();

    const specialPokemon = {
        giratina: "giratina-altered",
        keldeo: "keldeo-ordinary",
        meloetta: "meloetta-aria",
        indeedee: "indeedee-male",
        deoxys: "deoxys-normal",
    };

    if(pokemonResult in specialPokemon) {
       const specialCase = specialPokemon[pokemonResult];
       fetchPokemon(specialCase);
       searchInput.value = "";
       searchBtn.disabled = true;
    } else {
       fetchPokemon(pokemonResult);
       searchInput.value = "";
       searchBtn.disabled = true;
    }
});

shuffleBtn.addEventListener("click", function(e){
    e.preventDefault();
    const shuffleNumber = getShuffleNumber();
    fetchPokemon(shuffleNumber);
});

function getShuffleNumber() {
    return Math.floor (Math.random() * 1000) + 1;
}
