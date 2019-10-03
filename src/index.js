console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all';

let breeds = []

const getImageDiv = () => document.querySelector('div#dog-image-container');
const getBreedUl = () => document.querySelector('ul#dog-breeds');

document.addEventListener('DOMContentLoaded', function() {
  fetchImages();
  fetchBreeds();
  document.querySelector('select').addEventListener('change', filterBreed);
});

const fetchImages = () => {
  fetch(imgUrl)
  .then(parseJson)
  .then(displayImages)
}

const fetchBreeds = () => {
  fetch(breedUrl)
  .then(parseJson)
  .then(addBreeds)
}

const filterBreed = (e) => {
  let letter = e.target.value;
  displayBreeds(sortStartedWith(letter))
}

const changeColor = e => {
  e.target.style.color = 'green';
}

const parseJson = resp => resp.json();

const displayImages = images => {
  images.message.forEach(displayImage);
}

const displayImage = image => {
  let img = document.createElement('img');
  img.src = image;
  getImageDiv().appendChild(img);
}

const addBreeds = data => {
  for(key in data.message) {
    breeds = [...breeds, ...data.message[key]]
  }
  displayBreeds(breeds);
}

const displayBreeds = breeds => {
  getBreedUl().innerHTML = "";
  breeds.forEach(breed => displayBreed(breed));
}

const displayBreed = breed => {
  let li = document.createElement('li');
  li.textContent = breed;
  li.addEventListener('click', changeColor.bind(li));
  getBreedUl().appendChild(li);
}

const sortStartedWith = (letter) => {
  return breeds.filter(breed => breed[0] === letter);
}