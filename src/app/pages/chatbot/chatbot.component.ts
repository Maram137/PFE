import { Component, OnInit } from '@angular/core';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  messages: Message[] = [];
  userInput: string = '';
  isOpen: boolean = false;
  initialMessageSent: boolean = false;
  showPredefinedQuestions: boolean = false;

  predefinedQuestions: string[] = [
    'What is the scheduled date for your event?',
    'Where will your event take place?',
    'What type of event are you organizing',
    'How to inform participants of last-minute program changes?'
  ];

  predefinedResponses: { [key: string]: string } = {
    'good morning': 'Good morning! How can I help you?',
    'aide': 'Bien sûr, je suis là pour vous aider. Choisissez une question ci-dessous :',
    'au revoir': 'Au revoir ! Passez une bonne journée !',
    'where will your event take place?': 'Exhibition and Trade Center, Kram.',
    'what is the scheduled date for your event?': 'The event is scheduled for June 26-29 2024.',
    'what type of event are you organizing': 'We are organizing a business conference focused on technology and innovation.',
    'how to inform participants of last-minute program changes?': 'Program updates are available on our site'
  };

  ngOnInit() {
    this.sendInitialMessage();
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen && !this.initialMessageSent) {
      this.sendInitialMessage();
    }
  }

  sendInitialMessage() {
    const initialBotMessage: Message = {
      text: 'Good morning! How can I help you?',
      sender: 'bot'
    };
    this.messages.push(initialBotMessage);
    this.initialMessageSent = true;
  }

  sendMessage() {
    if (this.userInput.trim() !== '') {
      const userMessage: Message = {
        text: this.userInput,
        sender: 'user'
      };
      this.messages.push(userMessage);

      const botResponseText = this.getBotResponse(this.userInput.toLowerCase().trim());

      const botResponse: Message = {
        text: botResponseText,
        sender: 'bot'
      };
      this.messages.push(botResponse);

      this.showPredefinedQuestions = true;

      this.userInput = '';
    }
  }

  getBotResponse(userInput: string): string {
    return this.predefinedResponses[userInput] || "Sorry, I don't understand that.";
  }

  addQuestionToInput(question: string) {
    this.userInput = question;
    this.showPredefinedQuestions = false;
    this.predefinedQuestions = this.predefinedQuestions.filter(q => q !== question);
  }

  handleQuestionClick(question: string) {
    this.userInput = question;
    this.sendMessage();
    this.predefinedQuestions = this.predefinedQuestions.filter(q => q !== question);
  }
}
