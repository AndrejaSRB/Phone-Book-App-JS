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
    let formNumber = document.querySelector('#form-number');
    let editFormId = document.querySelector('#edit-form-id');
    let editFormName = document.querySelector('#edit-form-name');
    let editFormNumber = document.querySelector('#edit-form-number');
    let editFormCard = document.querySelector('#edit-form-cCard');
    let editFormBtn = document.querySelector('#edit-formBtn');
    let validate = document.querySelector('#validate-form');
    let searchBtn = document.querySelector('.search');
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
    searchInput.addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { 
        searchLastName();
      }
  });
  createTable(db);
    



function searchLastName() {
  let filter = searchInput.value.toUpperCase();
  let results = [];
for (let i = 0; i < db.length; i++) {
  let LastNames = db[i].lastName;
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
        text += '<td>'+db[i].lastName+'</td>';
        text += '<td>'+db[i].number+'</td>';
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
      editFormName.value = currentAccount.lastName;
      editFormNumber.value = currentAccount.number;
    }
    function addEditedAccount() {
      let id = editFormId.value;
      let lastName = editFormName.value;
      let number = editFormNumber.value;
      let editedAccount = {
        id : id,
        lastName : lastName,
        number : number,
      }
      db[num] = editedAccount;
      createTable(db);
    }
    
    function saveAccount() {
    let formNumberValue = document.querySelector('#form-number').value;
     
      if (isNaN(formNumberValue) || formNumberValue < 1) {
        validate.style.display = "block";
        saveAccount();
    } else {
        let id = formId.value;
        let lastName = formName.value;
        let number = formNumber.value;
        let newAccount = {
            id : id,
            lastName : lastName,
            number : number,
          }
          db.push(newAccount);
          formId.value = "";
          formName.value = "";
          formNumber.value = "";
          createTable(db);
          displayTable();
          validate.style.display = "none";
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
        text += '<td>'+allAccounts[i].lastName+'</td>';
        text += '<td>'+allAccounts[i].number+'</td>';
        text += '</tr>'
      }
    tbody.innerHTML = text
    }