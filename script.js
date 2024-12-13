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
  
  function arrangeIcons() {
    const icons = document.querySelectorAll('.app-icon');
    const radius = 150;
    const angleStep = (2 * Math.PI) / icons.length;
  
    icons.forEach((icon, index) => {
      const angle = index * angleStep;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      icon.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    });
  }
  
  document.addEventListener('DOMContentLoaded', arrangeIcons);
  