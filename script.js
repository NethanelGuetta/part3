let personels = [];
let count = 1;
const inputFullName = document.querySelector("#inputFullName"); 
const inputRank = document.querySelector("#inputRank");
const inputPosition = document.querySelector("#inputPosition");
const inputPlatoon = document.querySelector("#inputPlatoon");
const inputMissionTime = document.querySelector("#inputMissionTime");
const inputSelect = document.querySelector("#inputSelect");
const addPersonBtn = document.querySelector("#addPersonBtn");
const filterBtn = document.querySelector("#filterBtn");


addPersonBtn.addEventListener("click", () => {
    const person = {
        name: inputFullName.value,
        rank: inputRank.value,
        Position: inputPosition.value,
        platoon: inputPlatoon.value,
        missionTime: inputMissionTime.value,
        status: inputSelect.value,
        Id: Math.floor(Math.random()*1000)
    }
    console.log(personels);
    resetInputs();
    changeLocalStorage(person);
    window.location.reload();

})
function resetInputs() {
    inputFullName.value = "";
    inputRank.value = "";
    inputPosition.value = "";
    inputPlatoon.value = "";
    inputMissionTime.value = ""; 
}

function saveToLocalStorage(arr) {
    localStorage.setItem("personels", JSON.stringify(arr));
}

function getFromLocalStorage() {
    const arr = JSON.parse(localStorage.getItem("personels"));
    if (!arr) {
        saveToLocalStorage(personels)
        return [];
    }
    return arr;
}
function changeLocalStorage(params) {
    oldArr = getFromLocalStorage();
    oldArr.push(params);
    saveToLocalStorage(oldArr);
}

function renderTable( filteredTable = JSON.parse(localStorage.getItem("personels"))){
    const tBody = document.querySelector("#test");
    tBody.textContent = "";

    filteredTable.forEach((person) => {
        const tr = document.createElement("tr");
        const nameTd = document.createElement("td");
        nameTd.textContent = person.name;
        tr.appendChild(nameTd);

        const rankTd = document.createElement("td");
        rankTd.textContent = person.rank;
        tr.appendChild(rankTd);

        const PositionTd = document.createElement("td");
        PositionTd.textContent = person.Position;
        tr.appendChild(PositionTd);

        const platoonTd = document.createElement("td");
        platoonTd.textContent = person.platoon;
        tr.appendChild(platoonTd);

        const statusTd = document.createElement("td");
        statusTd.textContent = person.status;
        tr.appendChild(statusTd);

        const actionTd = document.createElement("td");
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Remove";
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.onclick = () => deletePerson(person.Id);
        actionTd.appendChild(deleteBtn);

        if (person.status === "Active" || person.status === "Reserved") {
            const MissionBtn = document.createElement("button");
            MissionBtn.textContent = "Mission";
            actionTd.appendChild(MissionBtn);
            MissionBtn.addEventListener("click", () => {
                let countdown = person.missionTime;
        
                
                const timer = setInterval(() => {
                    if(countdown >= 0){
                        MissionBtn.textContent = countdown;
                        countdown--;
                    }
                    else{
                        clearInterval(timer);
                        MissionBtn.textContent = "Mission Completed";
                    }
                }, 1000);
            })
        }
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("editBtn");
        actionTd.appendChild(editBtn);
   
        tr.appendChild(actionTd);

        tBody.append(tr);
    })
}

renderTable();


function deletePerson(id) {
    console.log(id);
    
    let oldList = getFromLocalStorage();
    newArray = oldList.filter(function (element) {
      return element.Id != id;
    });
    saveToLocalStorage(newArray);
    renderTable();
  }
filterBtn.addEventListener("click", sortArray);
function sortArray() {
    if (count % 2 === 0) {
        let oldList = getFromLocalStorage();
        const sortedArray = oldList.sort((a, b) => b.name.localeCompare(a.name));
        renderTable(sortedArray);
        console.log(sortedArray);
        count++;
        
    }
    else{
        let oldList = getFromLocalStorage();
        const sortedArray = oldList.sort((a, b) => a.name.localeCompare(b.name));
        renderTable(sortedArray);
        console.log(sortedArray);
        count++;
    }
  
    
}