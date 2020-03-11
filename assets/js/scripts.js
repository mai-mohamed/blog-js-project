
$(document).ready(function () {
  var count = 0;
  var ajaxId = [];

  /*===================================
  api for getting both home and db data
  ===================================*/

  $.ajax({
    url: 'https://jsonplaceholder.typicode.com/posts',
    Type: 'GET',
    success: function (resp) {
      homeArticles(resp);
      dBArticles(resp);
      if (storedId) {
        $(`#${storedId-1}`).parent().parent().find(".descrep").html((localStorage.getItem(`editBody`).split(","))[storedId-1]);
        $(`#${storedId-1}`).parent().parent().find(".title").html((localStorage.getItem(`editTitle`).split(","))[storedId-1]);
      }
    },
    error: function (err) {
      alert('Something wrong try again');
    }
  });

  /*===================================
  api for edit 
  ===================================*/

  function editApi(btnId){
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/posts/' + ajaxId[$(btnId).attr('id')],
      Type: 'GET',
      success: function (response) {
        localStorage.setItem(`id`, response.id);
        localStorage.setItem(`title`, response.title);
        localStorage.setItem(`body`, response.body);
        window.location.href = "edit.html";
      },
      error: function (err) {
        alert('Sorry! Something wrong Please try again later.');
      }
    });
  }
 /*=====================================
 api for confirm edit
 ======================================*/

 function confirmEdit(){
  $.ajax({
    url: 'https://jsonplaceholder.typicode.com/posts/' + storedId,
    Type: 'PUT',
    success: function (request) {  
     var existingTitle = localStorage.getItem(`editTitle`);
     existingTitle = existingTitle ? existingTitle.split(',') : [];
     existingTitle.push($(".form-edit input").val());
     localStorage.setItem(`editTitle`,existingTitle);

     var existingBody = localStorage.getItem(`editBody`);
     existingBody = existingBody ? existingBody.split(',') : [];
     existingBody.push( $(".form-edit textarea").val());
     localStorage.setItem(`editBody`,existingBody);
 
 
      window.location.href = "dashboard.html";
    },
    error: function (err) {
      alert('Sorry! Something wrong Please try again later.');
    }
  });
 }
  /*=========================
  landing page posts creation
  =========================/*/

  function homeArticles(data){
   for(var i=0 ; i<data.length ;i++){
    $(".blog-content__wrapper").append($("<article>").append($('<h2>').html(data[i].title)));
    $("article:last").append($('<p>').html(data[i].body));
   }
  }

  /*=====================
  dashboard posts creation
  =======================/*/

  function dBArticles(data){
    for (var i = 0; i < data.length; i++) {
      $("table").append($("<tr>").append($("<td>").html(data[i].title).attr("class", "title")));
      $("tr:last").append($('<td>').html(data[i].body).attr("class", "descrep"));
      $("tr:last").append($('<td>').append($("<a>").html("edit").attr("href", "#").attr("class", "edit").attr("id", (count + ''))));
      $("td:last").append($("<a>").html("delete").attr("href", "#").attr("class", "delete").attr("id", (count + '')));
      ajaxId.push(data[i].id);
      count++;
    }
  }
  /*============================================================
  handling dashboard edit ,confirm edit and delete buttons 
  =============================================================*/
  /*========
  delete button
  =========*/

  $(document).on("click", ".delete", function () {
    var deleteBtn = this;
    console.log(ajaxId[$(this).attr('id')])
    var confirmResponse = confirm("delete this post sure !!");
    if (confirmResponse == true) {
      $.ajax({
        url: 'https://jsonplaceholder.typicode.com/posts/' + ajaxId[$(this).attr('id')],
        Type: 'DELETE',
        success: function (result) {
          $(deleteBtn).parent().parent().remove()
        },
        error: function (err) {
          alert('Sorry! Something wrong Please try again later.');
        }
      });
    }
  })

  
  /*==========
  edit button
  ===========*/

  $(document).on("click", ".edit", function (e) {
    var editBtn = this;
    editApi(editBtn);
  });

  /*=================
  confirm edit button
  ==================*/

  var titleData = localStorage.getItem(`title`);
  var bodyData = localStorage.getItem(`body`);
  var storedId = localStorage.getItem(`id`);
  $(".form-edit input").val(titleData);
  $(".form-edit textarea").html(bodyData);

  $(".form-edit button").on("click", function (e) {
    e.preventDefault();
    if ($(".form-edit input").val() !== "" && $(".form-edit textarea").val() !== "") {  
      confirmEdit();
    }
    else {
      alert("required input fields should have a data")
    }
  });
})


















// $(document).ready(function () {
//   var count = 0;
//   var ajaxId = [];
//   var dataArr=[];
//   var editArr=[];
//   /*===================================
//   api for getting both home and db data
//   ===================================*/

//   $.ajax({
//     url: 'https://jsonplaceholder.typicode.com/posts',
//     Type: 'GET',
//     success: function (resp) {
//       homeArticles(resp);
//       dBArticles(resp);
//       if (storedId) {
//         // $(`#${storedId-1}`).parent().parent().find(".descrep").html((localStorage.getItem(`editBody`).split(","))[storedId-1]);
//         // $(`#${storedId-1}`).parent().parent().find(".title").html((localStorage.getItem(`editTitle`).split(","))[storedId-1]);
//       }
//     },
//     error: function (err) {
//       alert('Something wrong try again');
//     }
//   });

//   /*===================================
//   api for edit 
//   ===================================*/

//   function editApi(btnId){
//     $.ajax({
//       url: 'https://jsonplaceholder.typicode.com/posts/' + ajaxId[$(btnId).attr('id')],
//       Type: 'GET',
//       success: function (response) {
//         var obj = {
//           id : response.id,
//           title : response.title,
//           body : response.body
//         }
//         dataArr.push(obj);
//         localStorage.setItem("data" ,JSON.stringify(dataArr));
//         window.location.href = "edit.html";
//       },
//       error: function (err) {
//         alert('Sorry! Something wrong Please try again later.');
//       }
//     });
//   }
//  /*=====================================
//  api for confirm edit
//  ======================================*/

//  function confirmEdit(){
//   $.ajax({
//     url: 'https://jsonplaceholder.typicode.com/posts/' + (JSON.parse(localStorage.getItem("data"))[JSON.parse(localStorage.getItem("data")).length-1].id),
//     Type: 'PUT',
//     success: function (request) {  
//      var editObj ={
//        id : (JSON.parse(localStorage.getItem("data"))[JSON.parse(localStorage.getItem("data")).length-1].id),
//        title : $(".form-edit input").val() ,
//        body :$(".form-edit textarea").val() 
//      }
//      editArr.push(editObj)
//      localStorage.setItem("editData" ,JSON.stringify(editArr));
//      for (var i=0 ; i<editArr.length ; i++){
//       if (( ).id == editArr[i].id) {
        
//       }
//      }
//       window.location.href = "dashboard.html";
//     },
//     error: function (err) {
//       alert('Sorry! Something wrong Please try again later.');
//     }
//   });
//  }
//   /*=========================
//   landing page posts creation
//   =========================/*/

//   function homeArticles(data){
//    for(var i=0 ; i<data.length ;i++){
//     $(".blog-content__wrapper").append($("<article>").append($('<h2>').html(data[i].title)));
//     $("article:last").append($('<p>').html(data[i].body));
//    }
//   }

//   /*=====================
//   dashboard posts creation
//   =======================/*/

//   function dBArticles(data){
//     for (var i = 0; i < data.length; i++) {
//       $("table").append($("<tr>").append($("<td>").html(data[i].title).attr("class", "title")));
//       $("tr:last").append($('<td>').html(data[i].body).attr("class", "descrep"));
//       $("tr:last").append($('<td>').append($("<a>").html("edit").attr("href", "#").attr("class", "edit").attr("id", (count + ''))));
//       $("td:last").append($("<a>").html("delete").attr("href", "#").attr("class", "delete").attr("id", (count + '')));
//       ajaxId.push(data[i].id);
//       count++;
//     }
//   }
//   /*============================================================
//   handling dashboard edit ,confirm edit and delete buttons 
//   =============================================================*/
//   /*==========
//   edit button
//   ===========*/

//   $(document).on("click", ".edit", function (e) {
//     var editBtn = this;
//     editApi(editBtn);
//   });

//   /*=================
//   confirm edit button
//   ==================*/
//   var storedId  = JSON.parse(localStorage.getItem('data'));
//   console.log(storedId)
//   if(storedId ){
//       for(var i=0;i<storedId .length;i++){
//       inputData(storedId [i]);
//       }
//   }
//   function inputData(obj){
//     $(".form-edit input").val(obj.title);
//     $(".form-edit textarea").html(obj.body);
//   }

//   $(".form-edit button").on("click", function (e) {
//     e.preventDefault();
//     if ($(".form-edit input").val() !== "" && $(".form-edit textarea").val() !== "") {  
//       confirmEdit();
//     }
//     else {
//       alert("required input fields should have a data")
//     }
//   });
// })


//   /*========
//   delete button
//   =========*/

//   $(document).on("click", ".delete", function () {
//     var deleteBtn = this;
//     console.log(ajaxId[$(this).attr('id')])
//     var confirmResponse = confirm("delete this post sure !!");
//     if (confirmResponse == true) {
//       $.ajax({
//         url: 'https://jsonplaceholder.typicode.com/posts/' + ajaxId[$(this).attr('id')],
//         Type: 'DELETE',
//         success: function (result) {
//           $(deleteBtn).parent().parent().remove()
//         },
//         error: function (err) {
//           alert('Sorry! Something wrong Please try again later.');
//         }
//       });
//     }
//   })


















