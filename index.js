document.addEventListener("DOMContentLoaded", () => { 
    dataFetcher(dataRefiner)
    dataRegister()
    dataFinder()
    timer()
})

function dataFetcher(callback) {
        fetch("http://localhost:3000/employees")
        .then(res => res.json())
        .then(callback)
        .catch(err => console.error(err))
    }

function dataRefiner(data) {
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

    dataDisplayer(destructuredData)
}

function dataDisplayer(data) {
    const sortBtn = document.querySelector("#sort_btn")
    const listContainer = document.querySelector(".employee_list_container")

    data.forEach(obj => {
        const employeeDiv = `
        <div class="employee_div" id="employee_${obj.id}">
            <img src="${obj.photo}">
            <div class="subContainer">
                <div class="category_div"></div>
                <div class="detail_div"></div>
            </div>
        </div>
        <div class="btn_container">
            <button class="button" id="edit_btn_${obj.id}">Edit</button>
            <button class="button" id="submit_edit_${obj.id}">Update</button>
            <button class="button" id="delete_${obj.id}">Delete</button>
        </div>
        `        
        listContainer.insertAdjacentHTML("afterbegin", employeeDiv)
        
        Object.entries(obj).forEach(entry => {
            if (entry[0] !== "photo") {
                document.querySelector(`#employee_${obj.id} .category_div`).insertAdjacentHTML("beforeend", `<li>${entry[0].toUpperCase()}</li>`)
                document.querySelector(`#employee_${obj.id} .detail_div`).insertAdjacentHTML("beforeend", `<li>${entry[1]}</li>`)
            }
        })

        const editBtn = document.querySelector(`#edit_btn_${obj.id}`)
        const updateBtn = document.querySelector(`#submit_edit_${obj.id}`)
        const deleteBtn = document.querySelector(`#delete_${obj.id}`)

        dataEditor(editBtn, updateBtn, obj.id)
        dataRemover(deleteBtn, obj.id)
    })

    sortBtn.addEventListener("click", () => {
        document.querySelector(".employee_list_container").replaceChildren()
        dataDisplayer(data.sort(sortByFirstName))
    }, {once: true})
}

function dataRegister() {
    const registerForm = document.querySelector("#employee_register")
    
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault()

        const inputArr = []
        const inputs = e.target.querySelectorAll("input")

        inputs.forEach(input => inputArr.push(input.value))

        const postContent = {
            id: +inputArr[0],
            first_name: inputArr[1],
            last_name: inputArr[2],
            social_insurance_number: inputArr[3],
            date_of_birth: inputArr[4],
            address: {
                city: inputArr[6],
                street_address: inputArr[5],
                zip_code: inputArr[8],
                state: inputArr[7]
            },
            email: inputArr[9],
            phone_number: inputArr[10],
            employment: {
                title: inputArr[11]
            },
            avatar: inputArr[12]
        }

        fetch("http://localhost:3000/employees", ({
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(postContent)
        }))
        .then(alert("New Employee has been registered."))
        .then(location.reload())
        .catch(err => console.err(err))
    })
}

function dataEditor(editBtn, updateBtn, targetId) {   
    const detail = document.querySelector(`#employee_${targetId} .detail_div`)

    editBtn.addEventListener("click", () => {
        detail.toggleAttribute("contenteditable", true)
        detail.setAttribute("class", "edit_mode")

        detail.addEventListener("keydown", (e) => {
            if (e.code === "Escape") {
                detail.toggleAttribute("contenteditable", false)
                detail.setAttribute("class", "detail_div")
            }
        })
    })

    updateBtn.addEventListener("click", () => {
        detail.toggleAttribute("contenteditable", false)
        detail.setAttribute("class", "detail_div")

        const liChildNode = detail.childNodes
        const splitAddress = detail.childNodes[5].innerText.split(" ")
        
        const cityOf = `${splitAddress[3]} ${splitAddress[4]}`
        const streetAddress = `${splitAddress[0]} ${splitAddress[1]} ${splitAddress[2]}`
        const zip = splitAddress[6]
        const stateOf = splitAddress[5]

        const patchContent = {
            id: +liChildNode[0].innerText, 
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
        .then(alert("Employee information has been updated."))
        .catch(err => console.error(err))
    })
}

function dataFinder() {
    const form = document.querySelector("#employee_finder")

    form.addEventListener("submit", (e) => { 
        e.preventDefault()

        const target = document.querySelector(`#employee_${e.target[0].value}`)

        target.scrollIntoView(true)
        target.setAttribute("class", "search_result")
        target.addEventListener("click", () => target.setAttribute("class", "employee_div"))
    })
}

function dataRemover(deleteBtn, targetId) {
    deleteBtn.addEventListener("click", () => {
        fetch(`http://localhost:3000/employees/${targetId}`, ({
            method: "DELETE"
        }))
        .then(alert("Employee has been deleted."))
        .then(location.reload())
        .catch(err => console.err(err))
    })
}

function sortByFirstName(a, b) {
    const nameA = a.first.toUpperCase()
    const nameB = b.first.toUpperCase()

    return nameA > nameB ? -1 : nameA < nameB ? 1 : 0
}

function timer() {
    const startBtn = document.querySelector("#start_timer")
    const stopBtn = document.querySelector("#stop_timer")
    const time = document.querySelector("#time")
    const pauseBtn = document.querySelector("#pause_timer")
    const resumeBtn = document.querySelector("#resume_timer")

    let interval
    let timePaused = false
    let count = 0

    startBtn.addEventListener("click", () => {
        timePaused = false
        startBtn.toggleAttribute("disabled")
        stopBtn.toggleAttribute("disabled", false)
        pauseBtn.toggleAttribute("hidden", false)
    
        interval = setInterval(() => {
            if (!timePaused) {
                time.innerText = count += 1
            }
        }, 1000)
    })

    pauseBtn.addEventListener("click", () => {
        timePaused = true
        
        pauseBtn.toggleAttribute("hidden", true)
        resumeBtn.toggleAttribute("hidden", false)
    })

    resumeBtn.addEventListener("click", () => {
        timePaused = false

        resumeBtn.toggleAttribute("hidden", true)
        pauseBtn.toggleAttribute("hidden", false)
    })

    stopBtn.addEventListener("click", () => {
        clearInterval(interval)
        time.innerText = ""
        count = 0

        startBtn.toggleAttribute("disabled", false)
        stopBtn.toggleAttribute("disabled", true)
        pauseBtn.toggleAttribute("hidden", true)
        resumeBtn.toggleAttribute("hidden", true)
    })
}