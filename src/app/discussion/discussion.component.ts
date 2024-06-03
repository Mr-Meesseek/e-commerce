import { Component } from '@angular/core';
import { ChatService } from '../chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-discussion',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './discussion.component.html',
  styleUrl: './discussion.component.css'
})
export class DiscussionComponent {
  messages: { text: string, sender: string }[] = [{ text: 'مرحبا بك ،كيف يمكنني مساعدتك', sender: 'bot' }]; // Initialize with welcome message
  newMessage: string = '';
  showChat: boolean = false; // Controls the visibility of the chat interface

  constructor(private chatService: ChatService) {}

  toggleChat(): void {
    this.showChat = !this.showChat; // Toggle the visibility
  }

  public sendMessage(): void {
    if (this.newMessage.trim()) {
      const messageToSend = this.newMessage.trim();  // Store message before clearing
      this.messages.push({ text: messageToSend, sender: 'user' });  // Immediately add user message to UI
      this.newMessage = '';  // Clear the input field

      this.chatService.sendMessage(messageToSend).subscribe({
        next: (response) => {
          response.responses.forEach((resp: string) => {
            this.messages.push({ text: resp, sender: 'bot' });  // Add bot's response to the chat
          });
        },
        error: (error) => {
          console.error('Error:', error);
          this.messages.push({
            text: 'أحنا وسيط نتعاملو مع البنوك و مؤسسات التمويل، عنا منصة رقمية و نخدمو عن بعد نوجهو و ننصحو و نعاونو في القرض إذا فما إمكانية حسب المعطيات الي نسمعوها',
            sender: 'bot'
          });
        }
      });
    }
  }
  }
