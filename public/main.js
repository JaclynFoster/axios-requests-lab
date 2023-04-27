console.log('connected')
//Step 1: Get the HTML
const getAllBtn = document.querySelector('#all')
const charBtns = document.querySelectorAll('.char-btns')
const ageForm = document.querySelector('#age-form')
const ageInput = document.querySelector('#age-input')
const createForm = document.querySelector('#create-form')
const newFirstInput = document.querySelector('#first')
const newLastInput = document.querySelector('#last')
const newGenderDropDown = document.querySelector('select')
const newAgeInput = document.querySelector('#age')
const newLikesText = document.querySelector('textarea')
const charContainer = document.querySelector('section')

const baseURL = "http://localhost:4000"

//Step 2: Create Callback function
function createCharacterCard(char) {
  let charCard = document.createElement('div')
  charCard.innerHTML = `<h3>${char.firstName} ${char.lastName}</h3>
  <p>gender: ${char.gender} | age: ${char.age}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>`

  charContainer.appendChild(charCard)
}

function clearCharacters() {
  charContainer.innerHTML = ``
}

//Create a function that will create Axios.get request

function getAllChars() {
  clearCharacters()
  axios.get(`${baseURL}/characters`)
  .then((response) => {
    console.log(response.data)
    for(let i = 0; i < response.data.length; i++) {
       createCharacterCard(response.data[i])
    }
  })
}

//Create function that will run axios.get with route param
function getOneChar(e) {
  clearCharacters()
  axios.get(`${baseURL}/character/${e.target.id}`)
  .then((response) => {
    console.log(response.data)
    createCharacterCard(response.data)
  })
  .catch((error) => {
    console.log(error)
  })
}

//Create a function that will run axios request with query string
function getOldChars(e) {
  //form buttons need event handler submit not click
  //forms also take event as a param
  e.preventDefault()
  clearCharacters()
  //console.log(e)
  axios.get(`${baseURL}/character/?age=${ageInput.value}`)
  .then((response) => {
    console.log(response.data)
    for (let i = 0; i < response.data.length; i++) { //need for loop due to data being an array of objects
      createCharacterCard(response.data[i])
    }
  })
  .catch((error) => {
    console.log(error)
  })
}

//Create a new function that will create a new character
function newChar(e) {
e.preventDefault()

let newLikes = [...newLikesText.value.split(",")]
//takes new likes and spreads split strings into an array  ex: ["eat", "run", "play"]
let body = {
  firstName: newFirstInput.value,
  lastName: newLastInput.value,
  gender: newGenderDropDown.value,
  age: newAgeInput.value,
  likes: newLikes
}

axios.post(`${baseURL}/character`, body)
.then((response) => {
  console.log(response.data)
  for (let i =0; i < response.data.length; i++) {
    createCharacterCard(response.data[i])
  }
})
.catch((error) => {
  console.log(error)
})

newFirstInput.value = ""
newLastInput.value = ""
newGenderDropDown.value = ""
newAgeInput.value = ""
newLikesText.value = ""

}

//Step 3: Add Event Listeners
getAllBtn.addEventListener("click", getAllChars)

//for individual character button
for(let i = 0; i < charBtns.length; i++) {
  charBtns[i].addEventListener("click", getOneChar)
}

//on forms you need to target the form itself not the button
ageForm.addEventListener("submit", getOldChars)

createForm.addEventListener("submit", newChar)