console.log('connected')

//Step 1: Select and Element

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

const baseURL = 'http://localhost:4000'

//Step 2: Write out the function

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

const getAllChars = () => {
  clearCharacters()
  axios.get(`${baseURL}/characters`)
    .then((res) => {
      console.log(res.data)
      let characterArray = res.data
for(let i = 0; i < characterArray.length; i++){
  createCharacterCard(characterArray[i])
}

    })
    .catch((error) => {
      console.log(error)
    })

}

const getOneChar = (event) => {
  clearCharacters()

  axios.get(`${baseURL}/character/${event.target.id}`)
    .then((res) => {
      console.log(res.data)
      createCharacterCard(res.data)
  

    })
    .catch((error) => {
      console.log(error)
    })
  


}

const addNewChar = (event) => {
  event.preventDefault()

  clearCharacters()

  let newLikes = [...newLikesText.value.split(',')]
  console.log(newLikes)

  let bodyObj = {
    firstName: newFirstInput.value,
    lastName: newLastInput.value,
    gender: newGenderDropDown.value,
    age: newAgeInput.value,
    likes: newLikes
  }

  axios.post(`${baseURL}/character`, bodyObj)
  .then((res) => {
    let newArr = res.data

    for(let i = 0;  i < newArr.length; i++){
      createCharacterCard(newArr[i])
    }
  })
  .catch((error) => {
    console.log(error)
  })


  
}

//Step 3: Combine Step 1 and Step 2 using addEventListener

getAllBtn.addEventListener('click', getAllChars)

for(let i = 0; i < charBtns.length; i++){
  charBtns[i].addEventListener('click', getOneChar)
}

createForm.addEventListener('submit', addNewChar)
