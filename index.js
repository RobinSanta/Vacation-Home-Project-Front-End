const vacationHomesURl = `http://localhost:3000/vacation_homes`;
document.addEventListener('DOMContentLoaded', () => {
    const ownersURl = `http://localhost:3000/owners`;
    const locationsURl = `http://localhost:3000/locations`;
    
    fetch(vacationHomesURl)
    .then(resp => resp.json())
    .then(homes => showVacationHomes(homes));

    fetch(ownersURl)
    .then(resp => resp.json())
    .then(owners => addOwners(owners));

    fetch(locationsURl)
    .then(resp => resp.json())
    .then(locations => addLocations(locations));

    document.getElementById('add-home-form')
    .addEventListener('submit', event => {
        event.preventDefault();
        createVacationHome({
            name: event.target.name.value,
            owner: event.target.owners.value,
            location: event.target.locations.value
        }, vacationHomesURl);
    });

    document.getElementById('add-owner-form')
    .addEventListener('submit', event => {
        event.preventDefault();
        createOwner({
            name: event.target.name.value
        }, ownersURl);
    });
});

function makeVacationHomeCard(home) {
    const div = document.createElement('div');
    div.className = 'vacation-home-card mdl-card mdl-shadow--4dp';
    div.id = home.id;

    const name = document.createElement('div');
    name.className = 'mdl-card__title';
    const nameLabel = document.createElement('h3');
    nameLabel.className = 'mdl-card__title-text';
    nameLabel.textContent = home.name;
    name.appendChild(nameLabel);

    const owner = document.createElement('div');
    owner.className = 'mdl-card__supporting-text';
    owner.textContent = `Owner: ${home.owner.name}`;
    
    const location = document.createElement('div');
    location.className = 'mdl-card__supporting-text';
    location.textContent = `Location: ${home.location.name}`;
    
    const climate = document.createElement('div');
    climate.className = 'mdl-card__supporting-text';
    climate.textContent = `Climate: ${home.location.climate}`;

    const actions = document.createElement('div');
    actions.className = 'mdl-card__actions mdl-card--border';

    const destroy = document.createElement('button');
    destroy.className = 'mdl-button mdl-js-button mdl-button--fab mdl-button--colored';
    destroy.value = home.id;

    const buttonLabel = document.createElement('i');
    buttonLabel.className = 'material-icons';
    buttonLabel.textContent = 'delete';

    destroy.appendChild(buttonLabel);
    destroy.onclick = ev => {
        ev.preventDefault();
        fetch(vacationHomesURl + `/${ev.target.childElementCount ? ev.target.value : ev.target.parentElement.value}`, {
            method: "DELETE",
        })
        .then(() => destroy.parentElement.parentElement.remove());
    };
    actions.appendChild(destroy);

    div.appendChild(name);
    div.appendChild(owner);
    div.appendChild(location);
    div.appendChild(climate);
    div.appendChild(actions);
    
    return div;
}

function addVacationHome(home) {
    const homeList = document.getElementById('home-list');
    const div = makeVacationHomeCard(home);
    homeList.appendChild(div);
}

function showVacationHomes(homes) {
    for(let i = 0; i < homes.length; i++) {
        addVacationHome(homes[i]);
    }
}

function addOwners(owners) {
    for (let i = 0; i < owners.length; i++) {
        const option = document.createElement('option');
        const addHomeForm = document.getElementById('owners');
        option.value = `${owners[i].id}`;
        option.textContent = `${owners[i].name}`;
        addHomeForm.appendChild(option);
    }
}

function addLocations(locations) {
    for (let i = 0; i < locations.length; i++) {
        const option = document.createElement('option');
        const addHomeForm = document.getElementById('locations');
        option.value = `${locations[i].id}`;
        option.textContent = `${locations[i].name}`;
        addHomeForm.appendChild(option);
    }
}

function createVacationHome(home, vacationHomesURl) {
    fetch(vacationHomesURl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(home)
    })
    .then(resp => resp.json())
    .then(home => addVacationHome(home));
}

function createOwner(owner, ownersURl) {
    fetch(ownersURl, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(owner)
    })
    .then(resp => resp.json())
    .then(owner => {
        return owner
    })
}