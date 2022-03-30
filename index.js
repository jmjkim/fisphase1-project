document.addEventListener("DOMContentLoaded", () => { 
    dataFetcher(dataDisplayer)
    dataFinder()
})


function dataFetcher(callback) {
    fetch("http://localhost:3000/employees")
    .then(res => res.json())
    .then(callback)
    .catch(err => console.error(err))
}


function dataDisplayer(data) {
    const destructuredData = data.map(({
        avatar, 
        id, first_name, 
        last_name, 
        social_insurance_number, 
        date_of_birth, 
        address: {street_address, city, state, zip_code}, 
        email, 
        phone_number, 
        employment: {title}
    }) => {
        const destructuring = {
            photo: avatar, 
            id,
            first: first_name, 
            last: last_name, 
            ssn: social_insurance_number, 
            dob: date_of_birth, 
            address: `${street_address} ${city} ${state} ${zip_code}`, 
            email, 
            phone: phone_number, 
            position: `${title}` 
        }
        return destructuring
    })

    destructuredData.forEach(obj => {
    const listContainer = document.querySelector(".employee_list_container")
    const employeeDiv = document.createElement("div") 
    const subContainer = document.createElement("div")
    const categoryDiv = document.createElement("div") 
    const detailDiv = document.createElement("div") 
    const img = document.createElement("img")
    const editBtn = document.createElement("button")
    const updateEdit = document.createElement("button")
    
    employeeDiv.appendChild(img)
    employeeDiv.appendChild(subContainer)
    subContainer.appendChild(categoryDiv)
    subContainer.appendChild(detailDiv)
    employeeDiv.appendChild(editBtn)
    employeeDiv.appendChild(updateEdit)
    
    img.setAttribute("src", obj.photo)
    employeeDiv.setAttribute("class", "employee_div")
    employeeDiv.setAttribute("id", `employee_${obj.id}`)
    subContainer.setAttribute("class", "subContainer")
    categoryDiv.setAttribute("class", "category_div")
    detailDiv.setAttribute("class", "detail_div")
    editBtn.setAttribute("class", "button")
    editBtn.setAttribute("id", `edit_btn_${obj.id}`)
    updateEdit.setAttribute("class", "button")
    updateEdit.setAttribute("id", `submit_edit_${obj.id}`)

    editBtn.innerText = "Edit"
    updateEdit.innerText = "Update"
    
    listContainer.appendChild(employeeDiv)

    Object.entries(obj).forEach(entry => {
        const categoryLi = document.createElement("li")
        const detailLi = document.createElement("li")
        
        if (entry[0] !== "photo") {
            categoryLi.insertAdjacentText("afterbegin", entry[0].toUpperCase())
            detailLi.insertAdjacentText("afterbegin", entry[1])

            categoryDiv.appendChild(categoryLi)
            detailDiv.appendChild(detailLi)

            if (entry[0] === "ssn" || entry[0] === "address" || entry[0] === "dob") {
                detailLi.setAttribute("class", "pid")
            }
        }})
    dataEditor(editBtn, updateEdit, obj.id)    
    })
}


function dataFinder() {
    const form = document.querySelector("#employee_finder")
    
    form.addEventListener("submit", (e) => { 
        e.preventDefault()

        const target = document.querySelector(`#employee_${+e.target[0].value}`)

        target.setAttribute("class", "search_result")
        target.addEventListener("click", () => target.setAttribute("class", "employee_div"))

        target.scrollIntoView(true)
    })
}


function dataEditor(editBtn, updateEdit, targetId) {    
    const target = document.querySelector(`#employee_${targetId}`)
    const detailLi = target.childNodes[1].childNodes[1]

    editBtn.addEventListener("click", () => {
        detailLi.setAttribute("contenteditable", true)
        detailLi.setAttribute("class", "edit_mode")

        detailLi.addEventListener("keydown", (e) => {
            if (e.code === "Escape") {
                detailLi.setAttribute("contenteditable", false)
                detailLi.setAttribute("class", "detail_div")
            }
        })
    })

    updateEdit.addEventListener("click", () => {
        detailLi.setAttribute("contenteditable", false)
        detailLi.setAttribute("class", "detail_div")

        const splitAddress = detailLi.childNodes[5].innerText.split(" ")
        const liChildNode = detailLi.childNodes
        
        const cityOf = `${splitAddress[3]} ${splitAddress[4]}`
        const streetAddress = `${splitAddress[0]} ${splitAddress[1]} ${splitAddress[2]}`
        const zip = splitAddress[6]
        const stateOf = splitAddress[5]

        const patchContent = {
            id: liChildNode[0].innerText, 
            first_name: liChildNode[1].innerText, 
            last_name: liChildNode[2].innerText, 
            social_insurance_number: liChildNode[3].innerText, 
            date_of_birth: liChildNode[4].innerText, 
            address: {
                city: cityOf,
                street_address: streetAddress,
                zip_code: zip,
                state: stateOf
            },
            email: liChildNode[6].innerText,
            phone_number: liChildNode[7].innerText,
            employment: {
                title: liChildNode[8].innerText,
            }
        }

        fetch(`http://localhost:3000/employees/${targetId}`, ({
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(patchContent)
        }))
        .catch(err => console.error(err))
    })
}