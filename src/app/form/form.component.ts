
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { FormDataService } from '../form-data.service';
import { HttpClient } from '@angular/common/http';
declare function disableOtherDivs(exceptId: string): void;
declare function checkNameAndToggleRadios(): void;
declare function showForm0(formId: string): void;
declare function enableProfessionRadios(): void;
declare function verifForign(): void;
declare function verifForign1(): void;
declare function reloadPage(): void;


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})

export class FormComponent implements OnInit {

   isProfessionEnabled = false;
   isResidenceDisabled = true;
  
   constructor() { }
  
   ngOnInit(): void { }
  
   onSubmit(): void {
     console.log('Form submitted!');
   }
  
   toggleElementVisibility(id: string): void {
     const element = document.getElementById(id);
     if (element) {
       element.style.display = element.style.display === 'none' ? 'block' : 'none';
    } else {
       console.error(`Element with ID: ${id} not found.`);
     }
   }
  
   checkNameAndToggleRadios(): void {
     const nameInput = (document.getElementById('fullName') as HTMLInputElement)?.value;
     this.isResidenceDisabled = nameInput?.trim() === '';
     this.toggleElementVisibility('residenceOptions');
   }
  
   submitSection(id: string): void {
    this.toggleElementVisibility(id);
     this.scrollToBottomSmooth();
   }
  
   scrollToBottomSmooth(): void {
     window.scrollTo({
       top: document.body.scrollHeight,
       behavior: 'smooth'
     });
   }
 }  

//   isProfessionEnabled = false;
//   isResidenceDisabled = true;

//   constructor() { }

//   ngOnInit(): void {
//   }

//   onSubmit(): void {
//     console.log('Form submitted!');
//   }

//   toggleElementVisibility(id: string): void {
//          // This function toggles the visibility of elements by ID
//          const element = document.getElementById(id);
//          if (element) {
//            element.style.display = element.style.display === 'none' ? 'block' : 'none';
//          } else {
//            console.error(`Element with ID: ${id} not found.`);
//          }
//        }

//   checkNameAndToggleRadios(): void {
//     const nameInput = (document.getElementById('fullName') as HTMLInputElement)?.value;
//     this.isResidenceDisabled = nameInput?.trim() === '';
//     this.toggleElementVisibility('residenceOptions');
//   }

//   enableProfessionRadios(): void {
//     const phoneNumber = (document.getElementById('phoneNumber') as HTMLInputElement)?.value.trim();
//     const email = (document.getElementById('email') as HTMLInputElement)?.value.trim();
//     const fullAddress = (document.getElementById('fullAddress') as HTMLInputElement)?.value.trim();
//     this.isProfessionEnabled = phoneNumber.length === 8 && email.includes('@') && fullAddress.length > 0;
//   }

//   submitSection(id: string): void {
//     this.toggleElementVisibility(id);
//     this.scrollToBottomSmooth();
//   }

//   scrollToBottomSmooth(): void {
//     window.scrollTo({
//       top: document.body.scrollHeight,
//       behavior: 'smooth'
//     });
//   }
// }
