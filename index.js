// https://random-data-api.com/api/users/random_user

document.addEventListener("DOMContentLoaded", () => { // EventListener (1/3)
    dataFetcher()
    dataFinder()
})

function dataFetcher() {
    fetch("http://localhost:3000/employees")
    .then(res => res.json())
    .then(data => dataDisplayer(data))
    .catch(error => console.error(error))
}

function dataDisplayer(data) {
    const refinedData = data.map((obj) => (({
        avatar, 
        id, 
        first_name, 
        last_name, 
        social_insurance_number, 
        date_of_birth, 
        address, 
        email, 
        phone_number, 
        employment
    }) => ({
           photo: avatar, 
           id, 
           first: first_name, 
           last: last_name, 
           ssn: social_insurance_number, 
           dob: date_of_birth, 
           address: `${address.street_address} ${address.city} ${address.state} ${address.zip_code.split("-")[0]}`, 
           email, 
           phone: phone_number, 
           position: employment.title
       }))(obj))

    refinedData.forEach(obj => {
    const mainContainer = document.querySelector(".employee_list_container")
    const employeeDiv = document.createElement("div") 
    const subContainer = document.createElement("div")
    const categoryDiv = document.createElement("div") 
    const detailDiv = document.createElement("div") 
    const img = document.createElement("img")
    
    mainContainer.appendChild(employeeDiv)
    employeeDiv.appendChild(img)
    employeeDiv.appendChild(subContainer)
    subContainer.appendChild(categoryDiv)
    subContainer.appendChild(detailDiv)
    
    employeeDiv.setAttribute("class", "employee_div")
    employeeDiv.setAttribute("id", `employee_${obj.id}`)
    subContainer.setAttribute("class", "subcontainer")
    categoryDiv.setAttribute("class", "category_div")
    detailDiv.setAttribute("class", "detail_div")
    img.setAttribute("src", obj.photo)
    

    // Categories for employee detail
    Object.entries(obj).forEach(entry => {
        const categoryLi = document.createElement("li")
        const detailLi = document.createElement("li")
        
        if (entry[0] !== "photo") {
            categoryDiv.appendChild(categoryLi)
            detailDiv.appendChild(detailLi)
            
            categoryLi.insertAdjacentText("afterbegin", entry[0])
            detailLi.insertAdjacentText("afterbegin", entry[1])
        }})
    })
}

function dataFinder() {
    const form = document.querySelector("#employee_finder")

    form.addEventListener("submit", (e) => { // EventListener (2/3)
        const targetId = +e.target[0].value
        const target = document.querySelector(`#employee_${targetId}`)

        target.setAttribute("class", "search_result") // Simple interactivity: Highlights on searched employee
        target.addEventListener("click", () => { // Removes highlight
            target.setAttribute("class", "employee_div")
        })
        e.preventDefault()
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