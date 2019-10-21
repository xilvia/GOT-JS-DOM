// findAll() {
//   fetch('../json/got.json')
//     .then(response => {
//       return response.json();
//     })
//     .then(GotJson => {
//       this.allGotChars(GotJson);
//     })

// var xhr = new XMLHttpRequest();
// xhr.open('GET', '../json/got.json');
// xhr.onload = () => {
//   this.allGotChars(JSON.parse(xhr.response));
// };
// xhr.send();


// IIFE
(function () {
  let gotData;
  let searchButton;
  let inputField;

  function getElementForCharacter(character) {
    let characterContainer = document.createElement('div');
    characterContainer.className = 'gotCharacter';

    let nameSpan = document.createElement('span');
    nameSpan.innerText = character.name;
    characterContainer.appendChild(nameSpan);

    let picture = document.createElement('img');
    picture.src = character.portrait;
    picture.className = 'portrait'
    characterContainer.appendChild(picture);

    return characterContainer;
  }

  function sortByName() {
    gotData = gotData.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }

  function showLivingChars() {
    const listContainer = document.createElement('div')
    gotData
      .filter(character => !character.dead)
      .forEach(character => {
        let characterContainer = getElementForCharacter(character);
        listContainer.appendChild(characterContainer);

        characterContainer.addEventListener('mouseover', onMouseOverHandler)
        characterContainer.addEventListener('click', showClickedChar)

      });
    const characterListContainer = document.getElementById('characterListContainer')
    characterListContainer.innerHTML = '';
    characterListContainer.appendChild(listContainer);
  }

  function showClickedChar(event) {
    let clickedChar = event.target.textContent || event.target.src.split('/')[4].slice(0, -4)
    if (clickedChar === 'theon') {
      clickedChar = 'Theon Greyjoy'
    }
    console.log(clickedChar)
    findCharacter(clickedChar)
  }

  function showFoundCharacter(character) {
    let foundCharacterName = document.getElementById('foundCharacterName');
    let foundCharacterPicture = document.getElementById('foundCharacterPicture');
    let foundCharacterBio = document.getElementById('foundCharacterBio');
    let foundCharacterOrg = document.getElementById('foundCharacterOrg');
    let foundCharacterHouse = document.getElementById('foundCharacterHouse');


    if (character) {
      foundCharacterPicture.src = character.picture;
      foundCharacterOrg.src =
        character.organization ? 'assets/houses/' + character.organization + '.png' : '';
      foundCharacterHouse.src =
        character.house ? 'assets/houses/' + character.house + '.png' : '';
      foundCharacterName.innerText = character.name;
      foundCharacterBio.innerText = character.bio;
    } else {
      foundCharacterPicture.src = '';
      foundCharacterOrg.src = '';
      foundCharacterHouse.src = '';
      foundCharacterName.innerText = 'Character not found';
      foundCharacterBio.innerText = '';
    }
  }

  function findCharacter(name) {
    let character = gotData.find(character => {
      return character.name.toLowerCase().indexOf(name.toLowerCase()) !== -1;
    });
    showFoundCharacter(character);
    resetSearchInput();
  }

  function loadData() {
    fetch('../json/got.json')
      .then(response => {
        return response.json();
      })
      .then(gotJson => {
        gotData = gotJson;
        sortByName();
        showLivingChars();
      });
  }

  function searchButtonClickHandler(e) {
    e.preventDefault();
    let nameToFind = inputField.value;
    !inputField.value ? nameToFind = '*' : '';
    findCharacter(nameToFind);
  }

  function resetSearchInput() {
    inputField.value = '';
  }

  function onMouseOverHandler(event) {
    event.target.style.color = "red"
    setTimeout(() => {
      event.target.style.color = "black";
    }, 100)
  }

  window.addEventListener('load', () => {
    inputField = document.getElementById('searchInput');
    searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', searchButtonClickHandler);
    loadData();
  });
}())