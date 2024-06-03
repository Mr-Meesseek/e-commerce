
    // //  document.addEventListener("DOMContentLoaded", function() {
    // //      document.getElementById("submitFormButton").addEventListener("click", submitForm);
    // //      document.getElementById("closeButtonId").addEventListener("click", closeNotificationAndSaveData);
    // //  });
    // //  function disableOtherDivs(exceptId) {
    // //      // Get all div elements
    // //      var divs = document.querySelectorAll('div');
            
    // //     // Iterate through all div elements
    // //      divs.forEach(function(div) {
    // //         // If it's not the div we want to keep active
    // //         if (div.id !== exceptId) {
    // //             div.style.pointerEvents = 'none'; // Disables click events on the div
    // //              div.style.opacity = '0.4'; // Lowers opacity to visually indicate it is disabled
    // //          } else {
    // //              div.style.pointerEvents = 'auto'; // Ensure the exceptId div can still be interacted with
    // //              div.style.opacity = '1'; // Fully visible
    // //         }
    // //      });
    // //  }

    // // // function calculmontant(){
    // // //     var montant = document.getElementById('montant').value;
    // // //     var duree = document.getElementById('duree').value;
    // // //     var taux = document.getElementById('taux').value;
    // // // }
    // //     // div first
    // //     function checkNameAndToggleRadios() {
    // //         var nameInput = document.getElementById('fullName').value;
    // //          var radios = document.querySelectorAll('input[name="residence"]');
    // //         radios.forEach(radio => {
    // //             radio.disabled = nameInput.trim() === '';
    // //          });
    // //     }


    // // //     //div0
    // //      function enableProfessionRadios() {
    // //         var phoneNumber = document.getElementById('phoneNumber').value.trim();
    // //          var email = document.getElementById('emaill').value.trim();
    // //          var fullAddress = document.getElementById('fulladd').value.trim();
    // //          var isPhoneNumberValid = phoneNumber.length === 8; // Assurez-vous que la validation est correcte
    // //          var isEmailValid = (email.includes('@') && email.includes('.'));
    // //          var isAddressValid = fullAddress.length > 0;

    // //          var allValid = isPhoneNumberValid && isEmailValid && isAddressValid;

    // //          document.querySelectorAll('input[name="profession"]').forEach(function(radio) {
    // //              radio.disabled = !allValid;
    // //          });
    // //      }

    // // //     document.getElementById('phoneNumber').addEventListener('input', enableProfessionRadios);
    // // //     document.getElementById('emaill').addEventListener('input', enableProfessionRadios);
    // // //     document.getElementById('fulladd').addEventListener('input', enableProfessionRadios);
    // //      //end div0
    // //                  window.onload = function() {
    // //              disableRadioButtons(true);
    // //              };
    // //              function closeDivById(divId) {
    // //          var div = document.getElementById(divId);
    // //          if (div) {
    // //              div.style.display= 'none';
    // //          }
    // //      }

    // //              function toggle(formId) {
    // //                  var x = document.getElementById(formId);
    // //                  if (x.style.display=== "none") {
    // //                      x.style.display= "block";
    // //                  } else {
    // //                      x.style.display= "none";
    // //                  }
    // //              }

    // //              function showForm0(idform) {
    // //                  var form = document.getElementById(idform);
    // //                  if (form) {
    // //                      console.log(`Displaying form: ${idform}`);
    // //                      form.style.display = 'block';
    // //                 } else {
    // //                      console.error(`Failed to find form: ${idform}`);
    // //                 }
    // //              }
        
    // //              function disableRadioButtons(disable) {
    // //                  var radios = document.querySelectorAll('input[type="radio"]');
    // //                 radios.forEach(function(radio) {
    // //                      radio.disabled = disable;
    // //                  });
    // //              }

    // //              function validatePhoneNumber(input) {
    // //                  var pattern = /^[0-9]{8}$/;  // Example pattern  adjust to fit your needs
    // //                  if (pattern.test(input.value)) {
    // //                      disableRadioButtons(false);
    // //                } else {
    // //                      disableRadioButtons(true);
    // //                  }
    // //              }

    // //              function maskOtherRadios(selectedRadio) {
    // //                  var radios = document.querySelectorAll('#div0 input[type="radio"]');
    // //                  radios.forEach(function(radio) {
    // //                      if (radio !== selectedRadio) {
    // //                          radio.parentNode.style.opacity = 0.5; // Dim the label and radio
    // //                          radio.disabled = true;  // Disable the radio
    // //                      }
    // //                  });
    // //              }


    // //              function verif() {
    // //                  var inputNumber = document.getElementById('salaireInput').value;
    // //                  inputNumber = Number(inputNumber);  

    // //                  if (inputNumber >= 700) {
    // //                     showForm0('div_loan'); 
    // //                      scrollToBottomSmooth();
    // //                 } else {
    // //                      showForm0('div_notif');
    // //                      disableOtherDivs('div_notif');
    // //                      //to edit 
    // //                  }
    // //              }



    // //      function reloadPage() {
    // //              window.location.reload();
    // //      }


    // //      function scrollToBottomSmooth() {
    // //          window.scrollTo({
    // //              top : document.body.scrollHeight,
    // //              behavior : 'smooth'
    // //          });
    // //      }

    // //      function verif3(){
    // //          salaire=document.getElementById('salaireInput').value;
    // //          y1=document.getElementById('loan_obtained_durationy').value*12;
    // //          m1=document.getElementById('loan_obtained_durationm').value;
    // //          y2=document.getElementById('total_durationy').value*12;
    // //          m2=document.getElementById('total_durationm').value;
    // //          monthly_payment=document.getElementById('monthly_payment').value;
    // //          if((y1=="" && m1=="" )||(y2=="" && m2=="")||monthly_payment==""){
    // //              alert('لا يمكنك المتابعة الا عند استكمال ادخال المعلومات');
    // //          }else if ((monthly_payment<(salaire*0.4)) &&(y2+m2>((y1+m1)/2))){
    // //              showForm0('div_notif8');
    // //              disableOtherDivs('div_notif8');
    // //          }else{
    // //              showForm0('div_notif9');
    // //              disableOtherDivs('div_notif9');

    // //          }

    // //     }
    // //      function verif4(){
    // //          y1=document.getElementById('loan_obtained_durationycharika').value*12;
    // //          m1=document.getElementById('loan_obtained_durationmcharika').value;
    // //          y2=document.getElementById('total_durationycharika').value*12;
    // //         m2=document.getElementById('total_durationmcharika').value;
    // //          monthly_payment=document.getElementById('monthly_paymentcharika').value;
    // //          if((y1=="" && m1=="" )||(y2=="" && m2=="")||monthly_payment==""){
    // //              alert('لا يمكنك المتابعة الا عند استكمال ادخال المعلومات');
    // //         }else {
    // //              showForm0('charika8'); 
    // //             scrollToBottomSmooth();
    // //          }

    // //      }

    // //      function vv(){
    // //         var v=Number(document.getElementById('batindaInput').value); 
    // //          var m =document.getElementById('madkhoul').value;
    // //          if(v=="" || m==""){
    // //              alert('لا يمكنك المتابعة الا عند استكمال ادخال المعلومات');
    // //          }else if(v>6){
    // //              showForm0('divBatinda02');
    // //              scrollToBottomSmooth();
    // //          }else{
    // //              showForm0('div_notif11');
    // //              disableOtherDivs('div_notif11');

    // //          }
    // //      }
    // //      function vv2(){
    // //          var v=Number(document.getElementById('charikaInput').value); 
    // //          var chy=document.getElementById('charikaYes').checked;
    // //          var chn=document.getElementById('charikaNo').checked;
    // //          var m=document.getElementById('madkhoull').value;
    // //          if(v=="" || (chy==false && chn==false) ||m=="" ){
    // //              alert('لا يمكنك المتابعة الا عند استكمال ادخال المعلومات');
    // //          }else if(v>6){
    // //              showForm0('charika2');
    // //              scrollToBottomSmooth();
    // //          }else{
    // //              showForm0('div_notif11');
    // //              disableOtherDivs('div_notif11');
    // //         }
    // //      }

    // //      function v2(){
    // //          var age=Number(document.getElementById('ageInput').value);
    // //          if(age<65 && age >30){
    // //              showForm0('div_ret2');
    // //              scrollToBottomSmooth();
    // //          }else{
    // //              showForm0('div_notif00'); 
    // //              disableOtherDivs('div_notif00');
    // //          }
    // //      }

    // //      function v3() {
    // //                  var inputNumber = document.getElementById('jiraya').value;
    // //                  inputNumber = Number(inputNumber);  

    // //                  if (inputNumber >= 700 && inputNumber <10000) {
    // //                      showForm0('div_loan2'); 
    // //                      scrollToBottomSmooth();
    // //                  } else {
    // //                      showForm0('div_notif17'); //to edit 
    // //                      disableOtherDivs('div_notif17');
    // //                  }
    // //              }

    // //              function alr(){
    // //                 var phone = document.getElementById('phoneNumber').value;
    // //                 var email = document.getElementById('emaill').value;
    // //                 var address= document.getElementById('fulladd').value;
    // //                  var cp = document.getElementById('codePostal').value;
    // //                  if(phone==""  || email=="" ||address== "" || cp==""|| cp.length!=4){
    // //                      alert('لا يمكنك المتابعة الا عند استكمال ادخال المعلومات');
    // //                  }else{
    // //                      showForm0('dvi');
    // //                      scrollToBottomSmooth();
    // //                  }
    // //              }

    // //              function ctr(){
    // //                  var whats = document.getElementById('Whatsappnum').value; 
    // //                  var maill = document.getElementById('maill').value; 
    // //                  var isvalid = (maill.includes('@') && maill.includes('.'));
    // //                  var addr = document.getElementById('fulladdr').value;
    // //                  var a=document.getElementById('arabic').checked;
    // //                  var f= document.getElementById('forignn').checked;
    // //              if(!isvalid || whats ==""||addr==""||(a==false&& f==false)){
    // //                  alert('لا يمكنك المتابعة الا عند استكمال ادخال المعلومات');
    // //                  }else{
    // //                  showForm0('forign2');
    // //                  scrollToBottomSmooth();
    // //              }
                    
    // //              }
    // //              function alrrt(){
    // //                  var m =document.getElementById('consumercharika').checked;
    // //                  var c =document.getElementById('carcharika').checked;
    // //                  var r =document.getElementById('realEstatecharika').checked;
    // //                  var s =document.getElementById('smallloancharika').checked;
    // //                  if(m==false && c==false && r==false && s==false){
    // //                      alert('لا يمكنك المتابعة الا عند استكمال ادخال المعلومات');
    // //                  }else{
    // //                  showForm0('charika7');
    // //                  scrollToBottomSmooth();
    // //              }}

    // //              function alrr(){
    // //                  var m =document.getElementById('MConsumer').checked;
    // //                  var c =document.getElementById('CConsumer').checked;
    // //                  var r =document.getElementById('RConsumer').checked;
    // //                  if(m==false && c==false && r==false){
    // //                      alert('لا يمكنك المتابعة الا عند استكمال ادخال المعلومات');
    // //                  }else{
    // //                  showForm0('divv');
    // //                  scrollToBottomSmooth();
    // //              }}
    // //              function alrrr()
    // //              {
    // //                  var a= document.getElementById('mablegh').value;
    // //                  var b= document.getElementById('why').value;
    // //                  if(a==""||b==""){
    // //                      alert('لا يمكنك المتابعة الا عند استكمال ادخال المعلومات');
    // //                  }else{
    // //                      showForm0("div_notif21");
    // //                      disableOtherDivs('div_notif21');
    // //                  }
    // //              }
    // //              function alrt()
    // //             {
    // //                  var a= document.getElementById('howmuch').value;
    // //                  var b= document.getElementById('whyy').value;
    // //                  if(a==""||b==""){
    // //                      alert('لا يمكنك المتابعة الا عند استكمال ادخال المعلومات');
    // //                 }else{
    // //                     showForm0("div_notif21");
    // //                     disableOtherDivs('div_notif21');
    // //                  }
    // //              }

    // //              function verfiforign(){
    // //                  var yy=document.getElementById('seniorityy').value;
    // //                  var mm=document.getElementById('senioritym').value;
    // //                  if(yy=="" || mm==""){
    // //                      alert('لا يمكنك المتابعة الا عند استكمال ادخال المعلومات');
    // //                  }else{
    // //                      showForm0('div_notif22');
    // //                  }
    // //              }
    // //              function verfiforign1(){
    // //                  var cy = document.getElementById('contracty').value;
    // //                  var cm=document.getElementById('contractm').value;
    // //                  var yy=document.getElementById('seniorityy2').value;
    // //                  var mm=document.getElementById('senioritym2').value;
    // //                  if(cy=="" || cm=="" || yy=="" || mm==""){
    // //                      alert('لا يمكنك المتابعة الا عند استكمال ادخال المعلومات');
    // //                  }else{
    // //                      showForm0('div_notif23');
    // //                  }
    // //              }
    // //              function submicloseNotificationAndSaveDatatForm() {
    // //                 const fullName = document.getElementById('fullName').value;
    // //                 const phoneNumber = document.getElementById('phoneNumber').value;
    // //                 const email = document.getElementById('emaill').value;
    // //                 const residence = document.querySelector('input[name="residence"]:checked')?.value || '';
    // //     const state = document.getElementById('state').value;
    // //     const codePostal = document.getElementById('codePostal').value;
    // //     const fulladd = document.getElementById('fulladd').value;
    // //     const country = document.getElementById('country').value;
    // //     const profession = document.querySelector('input[name="profession"]:checked')?.value || '';
    // //     const madkhoull = document.getElementById('madkhoull').value;
    // //     const contarcts =document.querySelector('input[name="contarcts"]:checked')?.value || '';
    // //     const howmuch = document.getElementById('howmuch').value;
    // //     const typeloan = document.querySelector('input[name="typeloan"]:checked')?.value || '';

    // //                 console.log('Sending data:', { fullName, phoneNumber, email, residence });
        
    // //                 fetch('http://localhost:8000/submit-form/', {
    // //                     method: 'POST',
    // //                     headers: {
    // //                         'Content-Type': 'application/json'
    // //                     },
    // //                     body: JSON.stringify({
    // //                         fullName: fullName,
    // //                         phoneNumber: phoneNumber,
    // //                         email: email,
    // //                         residence: residence,
    // //                         state: state,
    // //                         codePostal: codePostal,
    // //                         fulladd: fulladd,
    // //                         country: country,
    // //                         profession: profession,
    // //                         madkhoull: madkhoull,
    // //                         contarcts: contarcts,
    // //                         howmuch: howmuch,
    // //                         typeloan: typeloan
    // //                     })
    // //                 })
    // //                 .then(response => response.json())
    // //                 .then(data => {
    // //                     console.log('Success:', data);
    // //                 })
    // //                 .catch(error => {
    // //                     console.error('Error:', error);
    // //                 });
    // //             }
                
    // //             function submitForm() {
    // //                 const fullName = document.getElementById('fullName').value;
    // //                 const phoneNumber = document.getElementById('phoneNumber').value;
    // //                 const email = document.getElementById('emaill').value;
    // //                 const residence = document.querySelector('input[name="residence"]:checked')?.value || '';
    // //                 const state = document.getElementById('state').value;
    // //                 const codePostal = document.getElementById('codePostal').value;
    // //                 const fulladd = document.getElementById('fulladd').value;
    // //                 const country = document.getElementById('country').value;
    // //                 const profession = document.querySelector('input[name="profession"]:checked')?.value || '';
    // //                 const madkhoull = document.getElementById('madkhoull').value;
    // //                 const contarcts =document.querySelector('input[name="contarcts"]:checked')?.value || '';
    // //                 const howmuch = document.getElementById('howmuch').value;
    // //                 const typeloan = document.querySelector('input[name="typeloan"]:checked')?.value || '';
                
    // //                 console.log('Sending data for permanent save:', { fullName, phoneNumber, email, residence });
        
    // //                 fetch('http://localhost:8000/save-form', {
    // //                     method: 'POST',
    // //                     headers: {
    // //                         'Content-Type': 'application/json'
    // //                     },
    // //                     body: JSON.stringify({
    // //                         fullName: fullName,
    // //                         phoneNumber: phoneNumber,
    // //                         email: email,
    // //                         residence: residence,
    // //                         state: state,
    // //                         codePostal: codePostal,
    // //                         fulladd: fulladd,
    // //                         country: country,
    // //                         profession: profession,
    // //                         madkhoull: madkhoull,
    // //                         contarcts: contarcts,
    // //                         howmuch: howmuch,
    // //                         typeloan: typeloan
    // //                     })
    // //                 })
    // //                 .then(response => response.json())
    // //                 .then(data => {
    // //                     console.log('Success:', data);
    // //                 })
    // //                 .catch(error => {
    // //                     console.error('Error:', error);
    // //                 });
    // //             }
    // // //             // function submitFormData() {
    // // //             //     var formData = new FormData(document.getElementById("DForm"));
                
    // // //             //     fetch('/save-form', {
    // // //             //         method: 'POST',
    // // //             //         body: formData
    // // //             //     })
    // // //             //     .then(response => response.json())
    // // //             //     .then(data => alert("Données enregistrées avec succès"));
    // // //             // }
    // // //             function submitForm() {
    // // //                 const fullName = document.getElementById('fullName').value;
    // // //                 const phoneNumber = document.getElementById('phoneNumber').value;
    // // //                 const email = document.getElementById('emaill').value;
    // // //                 const residence = document.querySelector('input[name="residence"]:checked')?.value || '';
        
    // // //                 fetch('http://localhost:8000/submit-form/', {
    // // //                     method: 'POST',
    // // //                     headers: {'Content-Type': 'application/json'},
    // // //                     body: JSON.stringify({fullName, phoneNumber, email, residence})
    // // //                 })
    // // //                 .then(response => response.json())
    // // //                 .then(data => {
    // // //                     console.log('Success:', data);
    // // //                 })
    // // //                 .catch(error => {
    // // //                     console.error('Error:', error);
    // // //                 });
    // // //             }
    // // //             function closeNotificationAndSaveData() {
    // // //                 const formElement = document.getElementById('DForm');
    // // //                 const formData = new FormData(formElement);
        
    // // //                 fetch('http://localhost:8000/save-form', {
    // // //                     method: 'POST',
    // // //                     body: JSON.stringify(Object.fromEntries(formData))
    // // //                 })
    // // //                 .then(response => response.json())
    // // //                 .then(data => {
    // // //                     console.log("Success:", data);
    // // //                 })
    // // //                 .catch((error) => {
    // // //                     console.error('Error:', error);
    // // //                 });
    // // //             }
                
    // // //             document.getElementById("closeButtonId").addEventListener("click", closeNotificationAndSaveData);





    // // // document.addEventListener("DOMContentLoaded", function() {
    // // //     document.getElementById("submitFormButton").addEventListener("click", submitForm);
    // // //     document.getElementById("closeButtonId").addEventListener("click", closeNotificationAndSaveData);
    // // // });

    // // // function submitForm() {
    // // //     const fullName = document.getElementById('fullName').value;
    // // //     const phoneNumber = document.getElementById('phoneNumber').value;
    // // //     const email = document.getElementById('emaill').value;
    // // //     const residence = document.querySelector('input[name="residence"]:checked')?.value || '';

    // // //     console.log('Sending data:', { fullName, phoneNumber, email, residence });

    // // //     fetch('http://localhost:8000/submit-form/', {
    // // //         method: 'POST',
    // // //         headers: {
    // // //             'Content-Type': 'application/json'
    // // //         },
    // // //         body: JSON.stringify({
    // // //             fullName: fullName,
    // // //             phoneNumber: phoneNumber,
    // // //             email: email,
    // // //             residence: residence
    // // //         })
    // // //     })
    // // //     .then(response => response.json())
    // // //     .then(data => {
    // // //         console.log('Success:', data);
    // // //     })
    // // //     .catch(error => {
    // // //         console.error('Error:', error);
    // // //     });
    // // // }

    // // // function closeNotificationAndSaveData() {
    // // //     const fullName = document.getElementById('fullName').value;
    // // //     const phoneNumber = document.getElementById('phoneNumber').value;
    // // //     const email = document.getElementById('emaill').value;
    // // //     const residence = document.querySelector('input[name="residence"]:checked')?.value || '';

    // // //     console.log('Sending data for permanent save:', { fullName, phoneNumber, email, residence });

    // // //     fetch('http://localhost:8000/save-form', {
    // // //         method: 'POST',
    // // //         headers: {
    // // //             'Content-Type': 'application/json'
    // // //         },
    // // //         body: JSON.stringify({
    // // //             fullName: fullName,
    // // //             phoneNumber: phoneNumber,
    // // //             email: email,
    // // //             residence: residence
    // // //         })
    // // //     })
    // // //     .then(response => response.json())
    // // //     .then(data => {
    // // //         console.log('Success:', data);
    // // //     })
    // // //     .catch(error => {
    // // //         console.error('Error:', error);
    // // //     });
    // // // }
    // // document.addEventListener("DOMContentLoaded", function () {
    // //     document.getElementById("submitFormButton").addEventListener("click", submitForm);
    // //     document.getElementById("closeButtonId").addEventListener("click", closeNotificationAndSaveData);
    // // });

    // // function disableOtherDivs(exceptId) {
    // //     var divs = document.querySelectorAll('div');
    // //     divs.forEach(function (div) {
    // //         if (div.id !== exceptId) {
    // //             div.style.pointerEvents = 'none';
    // //             div.style.opacity = '0.4';
    // //         } else {
    // //             div.style.pointerEvents = 'auto';
    // //             div.style.opacity = '1';
    // //         }
    // //     });
    // // }

    // // function checkNameAndToggleRadios() {
    // //     var nameInput = document.getElementById('fullName').value;
    // //     var radios = document.querySelectorAll('input[name="residence"]');
    // //     radios.forEach(function (radio) {
    // //         radio.disabled = nameInput.trim() === '';
    // //     });
    // // }

    // // function enableProfessionRadios() {
    // //     var phoneNumber = document.getElementById('phoneNumber').value.trim();
    // //     var email = document.getElementById('emaill').value.trim();
    // //     var fullAddress = document.getElementById('fulladd').value.trim();
    // //     var isPhoneNumberValid = phoneNumber.length === 8;
    // //     var isEmailValid = email.includes('@');
    // //     var isAddressValid = fullAddress.length > 0;

    // //     var allValid = isPhoneNumberValid && isEmailValid && isAddressValid;

    // //     var radios = document.querySelectorAll('input[name="profession"]');
    // //     radios.forEach(function (radio) {
    // //         radio.disabled = !allValid;
    // //     });
    // // }

    // // function closeDivById(divId) {
    // //     var div = document.getElementById(divId);
    // //     if (div) {
    // //         div.style.display = 'none';
    // //     }
    // // }

    // // function showForm0(idform) {
    // //     var form = document.getElementById(idform);
    // //     if (form) {
    // //         form.style.display = 'block';
    // //     }
    // // }

    // // function maskOtherRadios(selectedRadio) {
    // //     var radios = document.querySelectorAll('input[name="profession"]');
    // //     radios.forEach(function (radio) {
    // //         if (radio !== selectedRadio) {
    // //             radio.parentNode.style.opacity = 0.5;
    // //             radio.disabled = true;
    // //         }
    // //     });
    // // }

    // // function alr() {
    // //     var phone = document.getElementById('phoneNumber').value;
    // //     var email = document.getElementById('emaill').value;
    // //     var address = document.getElementById('fulladd').value;
    // //     var cp = document.getElementById('codePostal').value;
    // //     if (phone === "" || email === "" || address === "" || cp === "" || cp.length != 4) {
    // //         alert('لا يمكنك المتابعة الا عند استكمال ادخال المعلومات');
    // //     } else {
    // //         showForm0('dvi');
    // //         scrollToBottomSmooth();
    // //     }
    // // }

    // // function scrollToBottomSmooth() {
    // //     window.scrollTo({
    // //         top: document.body.scrollHeight,
    // //         behavior: 'smooth'
    // //     });
    // // }
    // // function submitForm() {
    // // const fullName = document.getElementById('fullName').value;
    // //      const phoneNumber = document.getElementById('phoneNumber').value;
    // //      const email = document.getElementById('emaill').value;
    // //      const residence = document.querySelector('input[name="residence"]:checked')?.value || '';

    // //      console.log('Sending data:', { fullName, phoneNumber, email, residence });

    // //      fetch('http://localhost:8000/submit-form/', {
    // //          method: 'POST',
    // //          headers: {
    // //              'Content-Type': 'application/json'
    // //          },
    // //          body: JSON.stringify({
    // //              fullName: fullName,
    // //              phoneNumber: phoneNumber,
    // //              email: email,
    // //              residence: residence
    // //         })
    // //     })
    // //     .then(response => response.json())
    // //      .then(data => {
    // //          console.log('Success:', data);
    // //      })
    // //      .catch(error => {
    // //          console.error('Error:', error);
    // //      });
    // //  }
    // //  function closeNotificationAndSaveData() {
    // //          const fullName = document.getElementById('fullName').value;
    // //          const phoneNumber = document.getElementById('phoneNumber').value;
    // //          const email = document.getElementById('emaill').value;
    // //          const residence = document.querySelector('input[name="residence"]:checked')?.value || '';
        
    // //          console.log('Sending data for permanent save:', { fullName, phoneNumber, email, residence });

    // //          fetch('http://localhost:8000/save-form', {
    // //              method: 'POST',
    // //              headers: {
    // //                  'Content-Type': 'application/json'
    // //              },
    // //              body: JSON.stringify({
    // //                  fullName: fullName,
    // //                  phoneNumber: phoneNumber,
    // //                  email: email,
    // //                 residence: residence
    // //              })
    // //          })
    // //         .then(response => response.json())
    // //          .then(data => {
    // //              console.log('Success:', data);
    // //          })
    // //          .catch(error => {
    // //              console.error('Error:', error);
    // //          });
    // //      }
    // //////////////////////////////////////////////////////////////
    // // document.addEventListener("DOMContentLoaded", function() {
    // //     document.getElementById("submitFormButton").addEventListener("click", submitForm);
    // //     document.getElementById("closeButtonId").addEventListener("click", closeNotificationAndSaveData);
    // // });




    // function disableOtherDivs(exceptId) {
    //     // Get all div elements
    //     var divs = document.querySelectorAll('div');
        
    //     // Iterate through all div elements
    //     divs.forEach(function(div) {
    //         // If it's not the div we want to keep active
    //         if (div.id !== exceptId) {
    //             div.style.pointerEvents = 'none'; // Disables click events on the div
    //             div.style.opacity = '0.4'; // Lowers opacity to visually indicate it is disabled
    //         } else {
    //             div.style.pointerEvents = 'auto'; // Ensure the exceptId div can still be interacted with
    //             div.style.opacity = '1'; // Fully visible
    //         }
    //     });
    // }

    // // div first
    // function checkNameAndToggleRadios() {
    //     var nameInput = document.getElementById('fullName').value;
    //     var radios = document.querySelectorAll('input[name="residence"]');
    //     radios.forEach(radio => {
    //         radio.disabled = nameInput.trim() === '';
    //     });
    // }

    // document.getElementById('fullName').addEventListener('input', checkNameAndToggleRadios);

    // //End div first 

    // //div0
    // function enableProfessionRadios() {
    //     var phoneNumber = document.getElementById('phoneNumber').value.trim();
    //     var email = document.getElementById('emaill').value.trim();
    //     var fullAddress = document.getElementById('fulladd').value.trim();
    //     var isPhoneNumberValid = phoneNumber.length == 8; // Implement or use your validatePhoneNumber function
    //     var isEmailValid = (email.includes('@') && email.includes('.'));
    //     var isAddressValid = fullAddress.length > 0;

    //     var allValid = isPhoneNumberValid && isEmailValid && isAddressValid;

    //     document.querySelectorAll('input[name="profession"]').forEach(function(radio) {
    //         radio.disabled = !allValid;
    //     });
    // }

    // document.getElementById('phoneNumber').addEventListener('input', enableProfessionRadios);
    // document.getElementById('emaill').addEventListener('input', enableProfessionRadios);
    // document.getElementById('fulladd').addEventListener('input', enableProfessionRadios);
    // //end div0

    //             window.onload = function() {
    //         disableRadioButtons(true);
    //         };

    //         function closeDivById(divId) {
    //     var div = document.getElementById(divId);
    //     if (div) {
    //         div.style.display= 'none';
    //     }
    // }

    //         function toggle(formId) {
    //             var x = document.getElementById(formId);
    //             if (x.style.display=== "none") {
    //                 x.style.display= "block";
    //             } else {
    //                 x.style.display= "none";
    //             }
    //         }

    //         function showForm0(idform) {
    //             var form0 = document.getElementById(idform); 
    //             form0.style.display= "block";
    //         }

    //         function disableRadioButtons(disable) {
    //             var radios = document.querySelectorAll('input[type="radio"]');
    //             radios.forEach(function(radio) {
    //                 radio.disabled = disable;
    //             });
    //         }

    //         function validatePhoneNumber(input) {
    //             var pattern = /^[0-9]{8}$/;  // Example pattern  adjust to fit your needs
    //             if (pattern.test(input.value)) {
    //                 disableRadioButtons(false);
    //             } else {
    //                 disableRadioButtons(true);
    //             }
    //         }

    //         function maskOtherRadios(selectedRadio) {
    //             var radios = document.querySelectorAll('#div0 input[type="radio"]');
    //             radios.forEach(function(radio) {
    //                 if (radio !== selectedRadio) {
    //                     radio.parentNode.style.opacity = 0.5; // Dim the label and radio
    //                     radio.disabled = true;  // Disable the radio
    //                 }
    //             });
    //         }


    //         function verif() {
    //             var inputNumber = document.getElementById('salaireInput').value;
    //             inputNumber = Number(inputNumber);  

    //             if (inputNumber >= 700) {
    //                 showForm0('div_loan'); 
    //                 scrollToBottomSmooth();
    //             } else {
    //                 showForm0('div_notif');
    //                 disableOtherDivs('div_notif');
    //                 //to edit 
    //             }
    //         }



    // function reloadPage() {
    //         window.location.reload();
    // }


    // function scrollToBottomSmooth() {
    //     window.scrollTo({
    //         top : document.body.scrollHeight,
    //         behavior : 'smooth'
    //     });
    // }


    // function verif3(){
    //     salaire=document.getElementById('salaireInput').value;
    //     y1=document.getElementById('loan_obtained_durationy').value*12;
    //     m1=document.getElementById('loan_obtained_durationm').value;
    //     y2=document.getElementById('total_durationy').value*12;
    //     m2=document.getElementById('total_durationm').value;
    //     monthly_payment=document.getElementById('monthly_payment').value;
    //     if((y1=="" && m1=="" )||(y2=="" && m2=="")||monthly_payment==""){
    //         alert('لا يمكنك المتابعة الا عند استكمال ادخال المعلومات');
    //     }else if ((monthly_payment<(salaire*0.4)) &&(y2+m2>((y1+m1)/2))){
    //         showForm0('div_notif8');
    //         disableOtherDivs('div_notif8');
    //     }else{
    //         showForm0('div_notif9');
    //         disableOtherDivs('div_notif9');

    //     }

    // }
    // function verif4(){
    //     y1=document.getElementById('loan_obtained_durationycharika').value*12;
    //     m1=document.getElementById('loan_obtained_durationmcharika').value;
    //     y2=document.getElementById('total_durationycharika').value*12;
    //     m2=document.getElementById('total_durationmcharika').value;
    //     monthly_payment=document.getElementById('monthly_paymentcharika').value;
    //     if((y1=="" && m1=="" )||(y2=="" && m2=="")||monthly_payment==""){
    //         alert('لا يمكنك المتابعة الا عند استكمال ادخال المعلومات');
    //     }else {
    //         showForm0('charika8'); 
    //         scrollToBottomSmooth();
    //     }

    // }

    // function vv(){
    //     var v=Number(document.getElementById('batindaInput').value); 
    //     var m =document.getElementById('madkhoul').value;
    //     if(v=="" || m==""){
    //         alert('لا يمكنك المتابعة الا عند استكمال ادخال المعلومات');
    //     }else if(v>6){
    //         showForm0('divBatinda02');
    //         scrollToBottomSmooth();
    //     }else{
    //         showForm0('div_notif11');
    //         disableOtherDivs('div_notif11');

    //     }
    // }
    // function vv2(){
    //     var v=Number(document.getElementById('charikaInput').value); 
    //     var chy=document.getElementById('charikaYes').checked;
    //     var chn=document.getElementById('charikaNo').checked;
    //     var m=document.getElementById('madkhoull').value;
    //     if(v=="" || (chy==false && chn==false) ||m=="" ){
    //         alert('لا يمكنك المتابعة الا عند استكمال ادخال المعلومات');
    //     }else if(v>6){
    //         showForm0('charika2');
    //         scrollToBottomSmooth();
    //     }else{
    //         showForm0('div_notif11');
    //         disableOtherDivs('div_notif11');
    //     }
    // }


    // function v2(){
    //     var age=Number(document.getElementById('ageInput').value);
    //     if(age<65 && age >30){
    //         showForm0('div_ret2');
    //         scrollToBottomSmooth();
    //     }else{
    //         showForm0('div_notif00'); 
    //         disableOtherDivs('div_notif00');
    //     }
    // }


    // function v3() {
    //             var inputNumber = document.getElementById('jiraya').value;
    //             inputNumber = Number(inputNumber);  

    //             if (inputNumber >= 700 && inputNumber <10000) {
    //                 showForm0('div_loan2'); 
    //                 scrollToBottomSmooth();
    //             } else {
    //                 showForm0('div_notif17'); //to edit 
    //                 disableOtherDivs('div_notif17');
    //             }
    //         }

    //         function alr(){
    //             var phone = document.getElementById('phoneNumber').value;
    //             var email = document.getElementById('emaill').value;
    //             var address= document.getElementById('fulladd').value;
    //             var cp = document.getElementById('codePostal').value;
    //             if(phone==""  || email=="" ||address== "" || cp==""|| cp.length!=4){
    //                 alert('لا يمكنك المتابعة الا عند استكمال ادخال المعلومات');
    //             }else{
    //                 showForm0('dvi');
    //                 scrollToBottomSmooth();
    //             }
    //         }

    //         function ctr(){
    //             var whats = document.getElementById('Whatsappnum').value; 
    //             var maill = document.getElementById('maill').value; 
    //             var isvalid = (maill.includes('@') && maill.includes('.'));
    //             var addr = document.getElementById('fulladdr').value;
    //             var a=document.getElementById('arabic').checked;
    //             var f= document.getElementById('forignn').checked;
    //         if(!isvalid || whats ==""||addr==""||(a==false&& f==false)){
    //             alert('لا يمكنك المتابعة الا عند استكمال ادخال المعلومات');
    //             }else{
    //             showForm0('forign2');
    //             scrollToBottomSmooth();
    //         }
                
    //         }
    //         function alrrt(){
    //             var m =document.getElementById('consumercharika').checked;
    //             var c =document.getElementById('carcharika').checked;
    //             var r =document.getElementById('realEstatecharika').checked;
    //             var s =document.getElementById('smallloancharika').checked;
    //             if(m==false && c==false && r==false && s==false){
    //                 alert('لا يمكنك المتابعة الا عند استكمال ادخال المعلومات');
    //             }else{
    //             showForm0('charika7');
    //             scrollToBottomSmooth();
    //         }}

    //         function alrr(){
    //             var m =document.getElementById('MConsumer').checked;
    //             var c =document.getElementById('CConsumer').checked;
    //             var r =document.getElementById('RConsumer').checked;
    //             if(m==false && c==false && r==false){
    //                 alert('لا يمكنك المتابعة الا عند استكمال ادخال المعلومات');
    //             }else{
    //             showForm0('divv');
    //             scrollToBottomSmooth();
    //         }}
    //         function alrrr()
    //         {
    //             var a= document.getElementById('mablegh').value;
    //             var b= document.getElementById('why').value;
    //             if(a==""||b==""){
    //                 alert('لا يمكنك المتابعة الا عند استكمال ادخال المعلومات');
    //             }else{
    //                 showForm0("div_notif21");
    //                 disableOtherDivs('div_notif21');
    //             }
    //         }
    //         function alrt()
    //         {
    //             var a= document.getElementById('howmuch').value;
    //             var b= document.getElementById('whyy').value;
    //             if(a==""||b==""){
    //                 alert('لا يمكنك المتابعة الا عند استكمال ادخال المعلومات');
    //             }else{
    //                 showForm0("div_notif21");
    //                 disableOtherDivs('div_notif21');
    //             }
    //         }

    //         function verfiforign(){
    //             var yy=document.getElementById('seniorityy').value;
    //             var mm=document.getElementById('senioritym').value;
    //             if(yy=="" || mm==""){
    //                 alert('لا يمكنك المتابعة الا عند استكمال ادخال المعلومات');
    //             }else{
    //                 showForm0('div_notif22');
    //             }
    //         }
    //         function verfiforign1(){
    //             var cy = document.getElementById('contracty').value;
    //             var cm=document.getElementById('contractm').value;
    //             var yy=document.getElementById('seniorityy2').value;
    //             var mm=document.getElementById('senioritym2').value;
    //             if(cy=="" || cm=="" || yy=="" || mm==""){
    //                 alert('لا يمكنك المتابعة الا عند استكمال ادخال المعلومات');
    //             }else{
    //                 showForm0('div_notif23');
    //             }
    //         }
        
    //         function saveData() {
    //             const fullName = document.getElementById('fullName')?.value || '';
    //             const phoneNumber = parseInt(document.getElementById('phoneNumber')?.value) || null;
    //             const email = document.getElementById('emaill')?.value || '';
    //             // const email = document.getElementById('email')?.value || '';
    //             const residence = document.querySelector('input[name="residence"]:checked')?.value || '';
    //             const state = document.querySelector('select[name="state"]')?.value || '';
    //             const fulladd = document.getElementById('fulladd')?.value || '';
    //             const profession = document.querySelector('input[name="profession"]:checked')?.value || '';
    //             const madkhoull = parseInt(document.getElementById('madkhoull')?.value) || null;
    //             const charik1bank = document.querySelector('select[name="charik1bank"]')?.value || '';
    //             const situation = document.querySelector('input[name="situation"]:checked')?.value || '';
    //             const mablegh = parseInt(document.getElementById('mablegh')?.value) || null;
    //             const why = document.getElementById('why')?.value || '';
    //             const salaire = parseInt(document.getElementById('salaireInput')?.value) || null;
    //             const seniorityy = parseInt(document.getElementById('seniorityy')?.value) || null;
            
    //             console.log('Sending data for permanent save:', {
    //                 fullName,
    //                 phoneNumber,
    //                 email,
    //                 // emaill,
    //                 residence,
    //                 state,
    //                 fulladd,
    //                 profession,
    //                 madkhoull,
    //                 charik1bank,
    //                 situation,
    //                 mablegh,
    //                 why,
    //                 salaire,
    //                 seniorityy
    //             });
            
    //             fetch('http://localhost:8000/save-form', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify({
    //                     fullName,
    //                     phoneNumber,
    //                     email,
    //                     // emaill,
    //                     residence,
    //                     state,
    //                     fulladd,
    //                     profession,
    //                     madkhoull,
    //                     charik1bank,
    //                     situation,
    //                     mablegh,
    //                     why,
    //                     salaire,
    //                     seniorityy
    //                 })
    //             })
    //             .then(response => {
    //                 console.log('Raw response from /save-form:', response);
    //                 if (!response.ok) {
    //                     return response.json().then(err => { throw err; });
    //                 }
    //                 return response.json();
    //             })
    //             .then(data => {
    //                 console.log('Success from /save-form:', data);
    //                 return data;
    //             })
    //             .catch(error => {
    //                 console.error('Error in /save-form:', error);
    //                 alert(`Error in save-form: ${JSON.stringify(error)}`);
    //             });
    //         }
            
    //         document.addEventListener("DOMContentLoaded", function() {
    //             document.getElementById("submitFormButton").addEventListener("click", saveData);
    //         });
            
        
    //         //   function reloadPage() {
    //         //       window.location.reload();
    //         //   }
    //         //  function handleClose() {
    //         //      closeNotificationAndSaveData().then(data => {
    //         //          if (data && data.message === "Data saved successfully") {
    //         //              reloadPage();
    //         //          } else {
    //         //              console.error('Data was not saved successfully:', data);
    //         //          }
    //         //      });
    //         //  }
    //         ///////////////////////////////////////////////////////////////
    //         // function submitForm() {
    //         //      const fullName = document.getElementById('fullName').value;
    //         //          const phoneNumber = document.getElementById('phoneNumber').value;
    //         //       const email = document.getElementById('emaill').value;
    //         //           const residence = document.querySelector('input[name="residence"]:checked')?.value || '';
                
    //         //           console.log('Sending data:', { fullName, phoneNumber, email, residence });
                
    //         //           fetch('http://localhost:8000/submit-form/', {
    //         //               method: 'POST',
    //         //               headers: {
    //         //               'Content-Type': 'application/json'
    //         //               },
    //         //               body: JSON.stringify({
    //         //                   fullName: fullName,
    //         //                   phoneNumber: phoneNumber,
    //         //                  email: email,
    //         //                   residence: residence
    //         //              })
    //         //          })
    //         //          .then(response => response.json())
    //         //           .then(data => {
    //         //               console.log('Success:', data);
    //         //           })
    //         //           .catch(error => {
    //         //               console.error('Error:', error);
    //         //       });
    //         //   }
    //         //       function closeNotificationAndSaveData() {
    //         //               const fullName = document.getElementById('fullName').value;
    //         //               const phoneNumber = document.getElementById('phoneNumber').value;
    //         //               const email = document.getElementById('emaill').value;
    //         //               const residence = document.querySelector('input[name="residence"]:checked')?.value || '';
                    
    //         //               console.log('Sending data for permanent save:', { fullName, phoneNumber, email, residence });
                
    //         //               fetch('http://localhost:8000/save-form', {
    //         //                   method: 'POST',
    //         //                   headers: {
    //         //                       'Content-Type': 'application/json'
    //         //                   },
    //         //                   body: JSON.stringify({
    //         //                       fullName: fullName,
    //         //                       phoneNumber: phoneNumber,
    //         //                       email: email,
    //         //                      residence: residence
    //         //                   })
    //         //               })
    //         //              .then(response => response.json())
    //         //               .then(data => {
    //         //                   console.log('Success:', data);
    //         //               })
    //         //               .catch(error => {
    //         //                   console.error('Error:', error);
    //         //               });
    //         //           }
    //         ///////////////////////////////////////
    // // function disableOtherDivs(exceptId) {
    // //     var divs = document.querySelectorAll('div');
    // //     divs.forEach(function (div) {
    // //         if (div.id !== exceptId) {
    // //             div.style.pointerEvents = 'none';
    // //             div.style.opacity = '0.4';
    // //         } else {
    // //             div.style.pointerEvents = 'auto';
    // //             div.style.opacity = '1';
    // //         }
    // //     });
    // // }

    // // function checkNameAndToggleRadios() {
    // //     var nameInput = document.getElementById('fullName').value;
    // //     var radios = document.querySelectorAll('input[name="residence"]');
    // //     radios.forEach(function (radio) {
    // //         radio.disabled = nameInput.trim() === '';
    // //     });
    // // }

    // // function enableProfessionRadios() {
    // //     var phoneNumber = document.getElementById('phoneNumber').value.trim();
    // //     var email = document.getElementById('emaill').value.trim();
    // //     var fullAddress = document.getElementById('fulladd').value.trim();
    // //     var isPhoneNumberValid = phoneNumber.length === 8;
    // //     var isEmailValid = email.includes('@');
    // //     var isAddressValid = fullAddress.length > 0;

    // //     var allValid = isPhoneNumberValid && isEmailValid && isAddressValid;

    // //     var radios = document.querySelectorAll('input[name="profession"]');
    // //     radios.forEach(function (radio) {
    // //         radio.disabled = !allValid;
    // //     });
    // // }

    // // function enableProfessionRadios() {
    // //     document.getElementById('Employee').disabled = false;
    // //     document.getElementById('Contract').disabled = false;
    // //     document.getElementById('tax').disabled = false;
    // //     document.getElementById('nottax').disabled = false;
    // //     document.getElementById('charika').disabled = false;
    // //     document.getElementById('Retired').disabled = false;
    // //     document.getElementById('unemployed').disabled = false;
    // // }

    // // function closeDivById(divId) {
    // //     var div = document.getElementById(divId);
    // //     if (div) {
    // //         div.style.display = 'none';
    // //     }
    // // }

    // // function showForm0(idform) {
    // //     var form = document.getElementById(idform);
    // //     if (form) {
    // //         form.style.display = 'block';
    // //     }
    // // }

    // // function maskOtherRadios(selectedRadio) {
    // //     var radios = document.querySelectorAll('input[name="profession"]');
    // //     radios.forEach(function (radio) {
    // //         if (radio !== selectedRadio) {
    // //             radio.parentNode.style.opacity = 0.5;
    // //             radio.disabled = true;
    // //         }
    // //     });
    // // }

    // // function alr() {
    // //     var phone = document.getElementById('phoneNumber').value;
    // //     var email = document.getElementById('emaill').value;
    // //     var address = document.getElementById('fulladd').value;
    // //     var cp = document.getElementById('codePostal').value;
    // //     if (phone === "" || email === "" || address === "" || cp === "" || cp.length != 4) {
    // //         alert('لا يمكنك المتابعة الا عند استكمال ادخال المعلومات');
    // //     } else {
    // //         showForm0('dvi');
    // //         scrollToBottomSmooth();
    // //     }
    // // }

    // // function scrollToBottomSmooth() {
    // //     window.scrollTo({
    // //         top: document.body.scrollHeight,
    // //         behavior: 'smooth'
    // //     });
    // // }function submitForm() {
    // //     const formData = new FormData(document.getElementById('DForm'));
    // //     const data = {};
    // //     formData.forEach((value, key) => {
    // //         data[key] = value.trim();
    // //     });

    // //     console.log('Sending data:', data);

    // //     fetch('http://localhost:8000/submit-form/', {
    // //         method: 'POST',
    // //         headers: {
    // //             'Content-Type': 'application/json'
    // //         },
    // //         body: JSON.stringify(data)
    // //     })
    // //     .then(response => response.json())
    // //     .then(data => {
    // //         console.log('Success:', data);
    // //         if (data.message === "Data stored temporarily. Click close to save permanently.") {
    // //             closeNotificationAndSaveData();
    // //         }
    // //     })
    // //     .catch(error => {
    // //         console.error('Error:', error);
    // //     });
    // // }
    // // function closeNotificationAndSaveData() {
    // //     fetch('http://localhost:8000/confirm-form/', {
    // //         method: 'POST',
    // //         headers: {
    // //             'Content-Type': 'application/json'
    // //         }
    // //     })
    // //     .then(response => response.json())
    // //     .then(data => {
    // //         console.log('Success:', data);
    // //     })
    // //     .catch(error => {
    // //         console.error('Error:', error);
    // //     });
    // // }
