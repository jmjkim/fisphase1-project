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
           address: `${address.street_address} ${address.city} ${address.state} ${address.zip_code}`, 
           email, 
           phone: phone_number, 
           position: `${employment.title}` 
       }))(obj))


    // Creates employee containers
    refinedData.forEach(obj => {
    const mainContainer = document.querySelector(".employee_list_container")
    const employeeDiv = document.createElement("div") 
    const subContainer = document.createElement("div")
    const categoryDiv = document.createElement("div") 
    const detailDiv = document.createElement("div") 
    const img = document.createElement("img")
    const editBtn = document.createElement("button")
    const submitEdit = document.createElement("button")
    
    mainContainer.appendChild(employeeDiv)
    employeeDiv.appendChild(img)
    employeeDiv.appendChild(subContainer)
    subContainer.appendChild(categoryDiv)
    subContainer.appendChild(detailDiv)
    employeeDiv.appendChild(editBtn)
    employeeDiv.appendChild(submitEdit)
    
    img.setAttribute("src", obj.photo)
    employeeDiv.setAttribute("class", "employee_div")
    employeeDiv.setAttribute("id", `employee_${obj.id}`)
    subContainer.setAttribute("class", "subContainer")
    categoryDiv.setAttribute("class", "category_div")
    detailDiv.setAttribute("class", "detail_div")
    editBtn.setAttribute("class", "button")
    editBtn.setAttribute("id", `edit_btn_${obj.id}`)
    submitEdit.setAttribute("class", "button")
    submitEdit.setAttribute("id", `submit_edit_${obj.id}`)

    editBtn.innerText = "Edit"
    submitEdit.innerText = "Update"


    // Creates Categories & Detail contents
    Object.entries(obj).forEach(entry => {
        const categoryLi = document.createElement("li")
        const detailLi = document.createElement("li")
        
        if (entry[0] !== "photo") {
            categoryDiv.appendChild(categoryLi)
            detailDiv.appendChild(detailLi)
            
            categoryLi.insertAdjacentText("afterbegin", entry[0].toUpperCase())
            detailLi.insertAdjacentText("afterbegin", entry[1])

            if (entry[0] === "ssn" || entry[0] === "address" || entry[0] === "dob") {
                detailLi.setAttribute("class", "pid")
            }
        }})

    dataEditor(editBtn, submitEdit, obj.id)    
    })
}


function dataFinder() {
    const form = document.querySelector("#employee_finder")

    form.addEventListener("submit", (e) => { // EventListener (2/3)
        const target = document.querySelector(`#employee_${+e.target[0].value}`)

        target.scrollIntoView(true)
        target.setAttribute("class", "search_result") // Simple interactivity: Highlights on searched employee
        target.addEventListener("click", () => target.setAttribute("class", "employee_div")) // Removes highlight

        e.preventDefault()
    })
}


function dataEditor(editBtn, submitEdit, targetId) {    
    editBtn.addEventListener("click", (e) => {
        const target = document.querySelector(`#employee_${targetId}`)
        const detailLi = target.childNodes[1].childNodes[1]
        detailLi.setAttribute("contenteditable", true)
        detailLi.setAttribute("class", "edit_mode")

        detailLi.addEventListener("keydown", (e) => {
            if (e.code === "Escape") {
                detailLi.setAttribute("contenteditable", false)
                detailLi.setAttribute("class", "detail_div")
            }
        })

        e.preventDefault()
    })

    submitEdit.addEventListener("click", (e) => {
        const target = document.querySelector(`#employee_${targetId}`)
        const detailLi = target.childNodes[1].childNodes[1]

        detailLi.setAttribute("contenteditable", false)
        detailLi.setAttribute("class", "detail_div")

        const splitAddress = detailLi.childNodes[5].innerText.split(" ")
        const streetAddress = `${splitAddress[0]} ${splitAddress[1]} ${splitAddress[2]}`
        const cityOf = `${splitAddress[3]} ${splitAddress[4]}`
        const stateOf = splitAddress[5]
        const zip = splitAddress[6]

        
        fetch(`http://localhost:3000/employees/${targetId}`, ({
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                id: detailLi.childNodes[0].innerText, 
                first_name: detailLi.childNodes[1].innerText, 
                last_name: detailLi.childNodes[2].innerText, 
                social_insurance_number: detailLi.childNodes[3].innerText, 
                date_of_birth: detailLi.childNodes[4].innerText, 
                address: {
                    city: cityOf,
                    street_address: streetAddress,
                    zip_code: zip,
                    state: stateOf
                },
                email: detailLi.childNodes[6].innerText,
                phone_number: detailLi.childNodes[7].innerText,
                employment: {
                    title: detailLi.childNodes[8].innerText,
                }})
            })
        )

        e.preventDefault()
    })
}