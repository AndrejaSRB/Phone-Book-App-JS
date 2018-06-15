window.addEventListener('beforeunload',function () {
    save();
    })
    if(localStorage.db){
      var db = JSON.parse(localStorage.db)
      var localArray = JSON.parse(localStorage.db);
    }else {
      var db =[];
    }
    
    let tbody = document.querySelector('tbody');
    let editTbody = document.querySelector('#editTbody');
    let accBtn = document.querySelector('#accBtn');
    let addBtn = document.querySelector('#addBtn');
    let editBtn = document.querySelector('#editBtn');
    let accountView = document.querySelector('#account-view');
    let addView = document.querySelector('#add-view');
    let editView = document.querySelector('#edit-view');
    let editFormView = document.querySelector('#edit-form-view');
    let formBtn = document.querySelector('#formBtn');
    let formId = document.querySelector('#form-id');
    let formName = document.querySelector('#form-name');
    let formDeposit = document.querySelector('#form-deposit');
    let formcCard = document.querySelector('#form-cCard');
    let editFormId = document.querySelector('#edit-form-id');
    let editFormName = document.querySelector('#edit-form-name');
    let editFormDeposit = document.querySelector('#edit-form-deposit');
    let editFormCard = document.querySelector('#edit-form-cCard');
    let editFormBtn = document.querySelector('#edit-formBtn');
    let validate = document.querySelector('#validate-form');
    let searchBtn = document.querySelector('.fa-search');
    let searchInput = document.querySelector('#search');
    let mainTable = document.querySelector('#main-table');

    let num;
    //listeneres
    accBtn.addEventListener('click',displayTable);
    addBtn.addEventListener('click',displayForm);
    formBtn.addEventListener('click',saveAccount);
    editBtn.addEventListener('click',showEditTable);
    editFormBtn.addEventListener('click',addEditedAccount);
    searchBtn.addEventListener('click', searchLastName);
    createTable(db);
    



function searchLastName() {
  let filter = searchInput.value.toUpperCase();
  let results = [];
for (let i = 0; i < db.length; i++) {
  let LastNames = db[i].name;
  if (LastNames.toUpperCase() === filter){
    results.push(db[i]);
    
  }

}
createTable(results);
}


    function displayTable() { 
      mainTable.style.display = "block";
      accountView.style.display = "block";
      searchInput.style.display = "block";
      searchBtn.style.display = "block";
      addView.style.display = "none";
      editView.style.display = "none";
      editFormView.style.display = "none";
      searchInput.value = "";
      createTable(db);
    }
    function displayForm() {
      addView.style.display = "block";
      searchInput.style.display = "none";
      searchBtn.style.display = "none";
      accountView.style.display = "none";
      editView.style.display = "none";
      editFormView.style.display = "none";
   
    }
    function showEditTable() {
      searchInput.style.display = "block";
      searchBtn.style.display = "block";
      editView.style.display = "block";
      accountView.style.display = "none";
      addView.style.display = "none";
      editFormView.style.display = "none"
      
    
      let text = "";
      for (var i = 0; i < db.length; i++) {
        text += '<tr>';
        text += '<td>'+db[i].id+'</td>';
        text += '<td>'+db[i].name+'</td>';
        text += '<td>'+db[i].deposit+'</td>';
        text += '<td><button id="'+i+'"class="btn btn-danger btn-sm delete">Delete</button></td>';
        text += '<td><button class="btn btn-warning btn-sm edit" data-num="'+i+'">&nbsp;Edit</button></td>';
        text += '</tr>'
      }
    
    editTbody.innerHTML = text;
    let deleteBtns = document.querySelectorAll('.delete');
    let editBtns = document.querySelectorAll('.edit');
    for (var i = 0; i < deleteBtns.length; i++) {
      deleteBtns[i].addEventListener('click', deleteAccount)
      editBtns[i].addEventListener('click', showEditForm)
      }
    }
    function showEditForm() {
      addView.style.display = "none";
      accountView.style.display = "none";
      editView.style.display = "none";
      editFormView.style.display = "block"
      num = this.getAttribute('data-num');
      let currentAccount = db[num];
      editFormId.value = currentAccount.id;
      editFormName.value = currentAccount.name;
      editFormDeposit.value = currentAccount.deposit;
    
    }
    function addEditedAccount() {
      let id = editFormId.value;
      let name = editFormName.value;
      let deposit = editFormDeposit.value;
      let editedAccount = {
        id : id,
        name : name,
        deposit : deposit,
      }
      db[num] = editedAccount;
    
      createTable(db);
    }
    
    function saveAccount() {
    let formDepositValue = document.querySelector('#form-deposit').value;
     
      if (isNaN(formDepositValue) || formDepositValue < 1) {
        validate.style.display = "block";
        saveAccount();
    } else {
        let id = formId.value;
        let name = formName.value;
        let deposit = formDeposit.value;
        let newAccount = {
            id : id,
            name : name,
            deposit : deposit,
          }
          db.push(newAccount);
          formId.value = "";
          formName.value = "";
          formDeposit.value = "";
          createTable(db);
          displayTable();
    }
      
      
    
    
    }
    function deleteAccount() {
          let index = this.id;
          db.splice(index,1); 
          createTable(db);
          displayTable();
        
    }
    
    function save() {
      localStorage.db = JSON.stringify(db)
    }
    
    
    
    function createTable(allAccounts) {
      addView.style.display = "none";
      accountView.style.display = "block";
      editView.style.display = "none";
      editFormView.style.display = "none"
      let text = "";
      for (var i = 0; i < allAccounts.length; i++) {
        text += '<tr>';
        text += '<td>'+allAccounts[i].id+'</td>';
        text += '<td>'+allAccounts[i].name+'</td>';
        text += '<td>'+allAccounts[i].deposit+'</td>';
        text += '</tr>'
      }
    tbody.innerHTML = text
    }
    