// Function to handle navigation to different apps
function navigateTo(app) {
    switch (app) {
      case 'calendar':
        window.location.href = 'calendar.html';
        break;
      case 'todo':
        window.location.href = 'todo.html';
        break;
      case 'notes':
        window.location.href = 'notes.html';
        break;
      case 'mood':
        window.location.href = 'mood.html';
        break;
      default:
        console.error('Invalid app name!');
    }
  }
  