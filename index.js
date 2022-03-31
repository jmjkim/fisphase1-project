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
        id, 
        first_name, 
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
    const listContainer = document.querySelector(".employee_list_container")

    destructuredData.forEach(obj => {
        const html = `
        <div class="employee_div" id="employee_${obj.id}">
            <img src="${obj.photo}">
            <div class="subContainer">
                <div class="category_div"></div>
                <div class="detail_div"></div>
                <button class="button" id="edit_btn_${obj.id}">Edit</button>
                <button class="button" id="submit_edit_${obj.id}">Update</button>
            </div>
        </div>
        `        

        listContainer.insertAdjacentHTML("afterbegin", html)
        
        const editBtn = document.querySelector(`#edit_btn_${obj.id}`)
        const updateEdit = document.querySelector(`#submit_edit_${obj.id}`)

        Object.entries(obj).forEach(entry => {
            if (entry[0] !== "photo") {
                document.querySelector(`#employee_${obj.id} .category_div`).insertAdjacentHTML("beforeend", `<li>${entry[0].toUpperCase()}</li>`)
                document.querySelector(`#employee_${obj.id} .detail_div`).insertAdjacentHTML("beforeend", `<li>${entry[1]}</li>`)
            }
        })
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
    const detail = document.querySelector(`#employee_${targetId} .detail_div`)

    editBtn.addEventListener("click", () => {
        detail.setAttribute("contenteditable", true)
        detail.setAttribute("class", "edit_mode")

        detail.addEventListener("keydown", (e) => {
            if (e.code === "Escape") {
                detail.setAttribute("contenteditable", false)
                detail.setAttribute("class", "detail_div")
            }
        })
    })
    updateEdit.addEventListener("click", () => {
        detail.setAttribute("contenteditable", false)
        detail.setAttribute("class", "detail_div")

        const splitAddress = detail.childNodes[5].innerText.split(" ")
        const liChildNode = detail.childNodes
        
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

function dataSort(data) {
    const sortedByFirst = data.map(obj => obj.first)
    sortedByFirst.sort()

    console.log(sortedByFirst)
}