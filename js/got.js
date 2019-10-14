

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
      });
    const characterListContainer = document.getElementById('characterListContainer');
    characterListContainer.innerHTML = '';
    characterListContainer.appendChild(listContainer);
  }

  function showFoundCharacter(character) {
    let foundCharacterName = document.getElementById('foundCharacterName');
    let foundCharacterPicture = document.getElementById('foundCharacterPicture');
    let foundCharacterBio = document.getElementById('foundCharacterBio');
    let foundCharacterBadge = document.getElementById('foundCharacterBadge');

    if (character) {
      foundCharacterPicture.src = character.picture;
      foundCharacterBadge.src = character.house ? 'assets/houses/' + character.house + '.png' : '';
      foundCharacterName.innerText = character.name;
      foundCharacterBio.innerText = character.bio;
    } else {
      foundCharacterPicture.src = '';
      foundCharacterBadge.src = '';
      foundCharacterName.innerText = 'Character not found';
      foundCharacterBio.innerText = '';
    }
  }

  function findCharacter(name) {
    let character = gotData.find(character => {
      return character.name.toLowerCase().indexOf(name.toLowerCase()) !== -1;
    });
    showFoundCharacter(character);
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
    const nameToFind = inputField.value
    findCharacter(nameToFind)
  }

  window.addEventListener('load', () => {
    inputField = document.getElementById('searchInput');
    searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', searchButtonClickHandler);
    loadData();
  });
}())



