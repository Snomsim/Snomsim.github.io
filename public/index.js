function changeModalHeaderColor(status){
    let modalHeader = document.getElementById('modal-header');
    modalHeader.classList.remove('bg-warning','bg-success','bg-success','bg-danger');

    switch (status) {
        case 'Ongoing':
            modalHeader.classList.add('bg-warning');
        break;
    
        case 'On Queue':
            modalHeader.classList.add('bg-secondary');
        break;   
    
        case 'Completed':
            modalHeader.classList.add('bg-success');
         break;  
    
        default:
            modalHeader.classList.add('bg-danger');
        break;     
     };
}

function assignRowFieldValues(row){
    let columns = row.getElementsByTagName('td');
    let hoyoNo = row.getElementsByTagName('th');

    console.log(`HOYO no: ${hoyoNo[0].textContent}`);
    console.log(`Quality: ${columns[0].textContent}`);
    console.log(`Character: ${columns[1].textContent}`);
    console.log(`Vision: ${columns[2].textContent}`);
    console.log(`Region: ${columns[3].textContent}`);
    console.log(`Weapon: ${columns[4].textContent}`);
    console.log(`Status: ${columns[5].textContent}`);

    let modalTitle  = document.getElementById('modal-ticket-no');
    let starlevel = document.getElementById('starlevel');
    let character = document.getElementById('character');
    let vision = document.getElementById('vision');
    let region = document.getElementById('region');
    let weapon = document.getElementById('weapon');
    let status = document.getElementById('status');
    modalTitle.textContent = hoyoNo[0].textContent;
    
     starlevel.value = columns[0].textContent;
     character.value = columns[1].textContent;
     vision.value = columns[2].textContent;
     region.value = columns[3].textContent;
     weapon.value = columns[4].textContent;
     status.value = columns[5].textContent;

     changeModalHeaderColor(columns[5].textContent);
};

function showHideModalButtons(row, state = '') {
    const columns = row.getElementsByTagName('td');
    const status = columns[5].innerHTML;

    const removeBtns = modalMain.querySelectorAll("#modal-btn-start, #modal-btn-complete, #modal-btn-save, #modal-btn-create");
    removeBtns.forEach(btnCol => {
        btnCol.classList.add('d-none');
    });

    const startBtn = modalMain.querySelector("#modal-btn-start");
    const saveBtn = modalMain.querySelector("#modal-btn-save");
    const completeBtn = modalMain.querySelector("#modal-btn-complete");

    if (status.includes("On Queue") || status.includes("Ongoing")) {
        startBtn.classList.remove('d-none');
    }

    if (state === "") {
        if (status.includes("On Queue")) {
            startBtn.classList.remove('d-none');
        } else if (status.includes("Ongoing")) {
            
            completeBtn.classList.remove('d-none');
        }
    } else {
        saveBtn.classList.remove('d-none');
    }
}

function clearFieldValues() {
    let starlevel = document.querySelector('#starlevel');
    let character = document.querySelector('#character');
    let vision = document.querySelector('#vision');
    let region = document.querySelector('#region');
    let weapon = document.querySelector('#weapon');
    let status = document.querySelector('#status');

    starlevel.value = "";
    character.value = "";
    vision.value = "";
    region.value = "";
    weapon.value = "";
    status.value = "";
}

const ticketNumberGenerator = () => {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const randomLetter = Math.floor(Math.random() * letters.length);
    const numbers = Math.floor(Math.random() * 100000);

    return letters[randomLetter].toUpperCase() + numbers;
    };


    function addTicketRecord() {
        // Generate a new ticket number
        let newTicketNo = `HOTO-${ticketNumberGenerator()}`;
    
        // Get values from input fields
        let starlevel = document.querySelector('#starlevel').value;
        let character = document.querySelector('#character').value;
        let vision = document.querySelector('#vision').value;
        let region = document.querySelector('#region').value;
        let weapon = document.querySelector('#weapon').value;
    
        // Create a new table row
        const tblRow = document.querySelector("#table-onqueue").querySelector('tbody');
        let newRow = tblRow.insertRow();
    
        // Populate cells with values
        newRow.insertCell(0).textContent = newTicketNo;
        newRow.insertCell(1).textContent = starlevel;
        newRow.insertCell(2).textContent = character;
        newRow.insertCell(3).textContent = vision;
        newRow.insertCell(4).textContent = region;
        newRow.insertCell(5).textContent = weapon;
    
        // Add status cell with a badge
        let statusCell = newRow.insertCell(6);
        statusCell.innerHTML = `<td class="align-middle fs-6"><span class="badge rounded-pill text-bg-secondary">On Queue</span></td>`;
    
        // Add actions cell with buttons
        let actionsCell = newRow.insertCell(7);
        actionsCell.innerHTML = `
            <td class="align-middle text-center">
                <button class="btn btn-info view-ticket" data-bs-toggle="modal" data-bs-target="#viewTicketModal">view</button>
                <button class="btn btn-warning edit-ticket" data-bs-toggle="modal" data-bs-target="#viewTicketModal">Edit</button>
                <button class="btn btn-danger delete-ticket" data-bs-toggle="modal" data-bs-target="#deleteTicketModal">Delete</button>
              </td>
        `;
    
    }
    


const modalMain = document.querySelector('#viewTicketModal');


// main
document.addEventListener('DOMContentLoaded', function() {
    const rows = document.querySelectorAll('.table tbody tr');
    let activeRow = null;
    rows.forEach(row => {
       const columns = row.getElementsByTagName('td');
       console.log(columns[5]);
       if(columns[5].textContent == 'Completed'){
          let removeButtons = columns[6].querySelectorAll(".btn-warning,.btn-danger");
          removeButtons[0].classList.add('d-none');
          removeButtons[1].classList.add('d-none'); 
       }
    });
 });
 
 viewButton = document.querySelectorAll('.view-ticket');
 viewButton.forEach(function(button){
     button.addEventListener('click', function(){
         let row = this.parentElement.parentElement;
 
         activeRow = row;
         assignRowFieldValues(row);
 
         showHideModalButtons(row);
     });
 });

   
   editButton = document.querySelectorAll('.edit-ticket');
   editButton.forEach(function(button){
      button.addEventListener('click', function(){
       let row = this.parentElement.parentElement;
       activeRow = row;
       assignRowFieldValues(row);
   
       const inputFields = document.querySelectorAll(".form-control");

inputFields.forEach(input => {
    if (input.id !== "status") {
        input.removeAttribute("disabled");
    }
});

showHideModalButtons(row, "edit");
   });
   });
   
   mdlSaveButton = document.querySelector('#modal-btn-save');
   mdlSaveButton.addEventListener('click', function(){
       
       const columns  = activeRow.querySelectorAll('td')
       const modalMain = document.querySelector('#viewTicketModal')
   
      
       columns[0].textContent = modalMain.querySelector('#starlevel').value
       columns[1].textContent = modalMain.querySelector('#character').value
       columns[2].textContent = modalMain.querySelector('#vision').value
       columns[3].textContent = modalMain.querySelector('#region').value
       columns[4].textContent = modalMain.querySelector('#weapon').value
   });

   const modalWindow = document.querySelector('#viewTicketModal');

    modalWindow.addEventListener("hidden.bs.modal", function() {
        const inputFields = document.querySelectorAll(".form-control");
        inputFields.forEach(input => {
            input.setAttribute("disabled", "");
        });
    });

    deleteButton = document.querySelectorAll('.delete-ticket');
    deleteButton.forEach(function(button){
      button.addEventListener('click', function(){
       let row = this.parentElement.parentElement;
       const modalDelete = document.querySelector("#deleteTicketModal");
       const confirmDelBtn = modalDelete.querySelector("#modal-btn-delete")

       confirmDelBtn.addEventListener("click", function(){
        row.remove();
    });
    

      });
   });

   addButton = document.querySelector('#add-ticket');
   addButton.addEventListener('click', function(){
        clearFieldValues()

        removeBtns = modalMain.querySelectorAll("#modal-btn-process,#modal-btn-complete,#modal-btn-save");
        removeBtns.forEach(btnCol => {
        btnCol.classList.add('d-none');
        });
        showBtns = modalMain.querySelectorAll("#modal-btn-create");
        showBtns.forEach(btnCol => {
        btnCol.classList.remove('d-none');
         });

       const inputFields = document.querySelectorAll(".form-control");

        inputFields.forEach(input => {
            if(input.id != "status") input.removeAttribute("disabled");
        });
        const createButton = document.querySelector("#modal-btn-create");
    createButton.addEventListener('click', function(){
        addTicketRecord();

    });
       
   });
document.addEventListener('DOMContentLoaded', function () {
    const transferButtons = document.querySelectorAll('.transfer-btn');

    transferButtons.forEach(button => {
        button.addEventListener('click', function () {
            const row = this.closest('tr');
            const tableOnQueueBody = document.querySelector('#table-onqueue tbody');
            const tableCompletedBody = document.querySelector('#table-completed tbody');

            // Clone the row and append it to the completed table
            const clonedRow = row.cloneNode(true);
            tableCompletedBody.appendChild(clonedRow);

            // Remove the original row from the on queue table
            row.remove();
        });
    });
});

