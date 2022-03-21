// https://random-data-api.com/api/users/random_user

function dataFetcher() {
    fetch("http://localhost:3000/employees")
    .then(response => response.json())
    .then(data => dataDisplayer(data))
    .catch(error => console.error(error))
}

function dataFinder(data) {
    const form = document.querySelector("#employee_finder")

    form.addEventListener("submit", (event) => { // eventListener (1/3)
        const target = document.querySelector(`#id-${data.id}`)
        const targetId = +event.target[0].value
        
        if (targetId === data.id) {
            target.scrollIntoView()
            target.setAttribute("class", "search_result")

            target.addEventListener("click", () => {
                target.removeAttribute("class")
            })
        }
        event.preventDefault()
    })
}    

function dataDisplayer(data) {
    const refinedData = data.map((object) => (({avatar, id, first_name, last_name, social_insurance_number, date_of_birth, address, email, phone_number, employment}) => ({avatar, id, first_name, last_name, social_insurance_number, date_of_birth, address, email, phone_number, employment}))(object))
    const container = document.querySelector("div.list_container")

    refinedData.map(object => {
        const arrOfObject = Object.values(object)
        const ul = document.createElement("ul")
        const img = document.createElement("img")
        const li = document.createElement("li")
        const btn = document.createElement("button")
        btn.innerText = "Edit"

        const address = {
            street_address: object.address.street_address,
            city: object.address.city,
            state: object.address.state,
            zip_code: object.address.zip_code,
        }    
        const newAddress = Object.values(address).join(" ")

        switch(arrOfObject[0]) {
            case arrOfObject[0]:
                img.setAttribute("src", object.avatar)
                ul.appendChild(img)
                ul.appendChild(btn)

            case arrOfObject[9]:
                li.insertAdjacentText("afterbegin", `Position: ${Object.values(arrOfObject[9])[0]}`)

            default:
                li.insertAdjacentText("beforeend", ` ID: ${arrOfObject[1]} First: ${arrOfObject[2]} Last: ${arrOfObject[3]} SSN: ${arrOfObject[4]} DOB: ${arrOfObject[5]} ${newAddress} Email: ${arrOfObject[7]} Phone: ${arrOfObject[8]}`)
        }
        container.appendChild(ul)
        ul.appendChild(li)
        ul.setAttribute("id", `id-${arrOfObject[1]}`)

        btn.addEventListener("click", (event) => {
            
        })

        dataFinder(object)
    })
}    
        
// function deleteButton(data) {
//     const deleteBtn = document.createElement("button")

//     deleteBtn.innerText = "Delete"
//     deleteBtn.setAttribute("class", "delete-btn")
//     deleteBtn.addEventListener("click", () => {
//         fetch(`http://localhost:3000/employees/${data.id}`, {
//             method: "DELETE",
//         })
//         .then(() => li.remove())
//     })
//     return deleteBtn
// }

document.addEventListener("DOMContentLoaded", () => { // eventListener (3/3)
    dataFetcher()
    dataFinder()
})