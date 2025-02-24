
document.addEventListener("DOMContentLoaded", () => {
    console.log("Страница загружена, скрипт выполняется.");
  
    // Получаем данные из localStorage
    const serverName = localStorage.getItem("serverName");
    const userId = localStorage.getItem("userId");
    const characterId = localStorage.getItem("characterId");
  
    console.log("Данные из localStorage:");
    console.log("Сервер:", serverName);
    console.log("ID Пользователя:", userId);
    console.log("ID Персонажа:", characterId);
  
    // Селекторы для мобильной версии (block sm:hidden)
    const serverNameMobile = document.querySelector(".text-white\\/65 div:nth-child(1) .block.sm\\:hidden");
    const userIdMobile = document.querySelector(".text-white\\/65 div:nth-child(2) .block.sm\\:hidden");
    const characterIdMobile = document.querySelector(".text-white\\/65 div:nth-child(3) .block.sm\\:hidden");
  
    // Селекторы для десктопной версии (hidden sm:block)
    const serverNameDesktop = document.querySelector(".hidden.sm\\:block p:nth-child(1)");
    const userIdDesktop = document.querySelector(".hidden.sm\\:block p:nth-child(2)");
    const characterIdDesktop = document.querySelector(".hidden.sm\\:block p:nth-child(3)");
  
    if (serverName && userId && characterId) {
      console.log("Данные найдены, вставляем в блоки.");
      
      // Вставляем данные в мобильную версию
      serverNameMobile.textContent = serverName;
      userIdMobile.textContent = userId;
      characterIdMobile.textContent = characterId;
  
      // Вставляем данные в десктопную версию
      serverNameDesktop.textContent = serverName;
      userIdDesktop.textContent = userId;
      characterIdDesktop.textContent = characterId;
    } else {
      console.log("Данные не найдены в localStorage.");
      
      // Устанавливаем сообщение "Данные не найдены" в мобильную версию
      serverNameMobile.textContent = "Данные не найдены";
      userIdMobile.textContent = "Данные не найдены";
      characterIdMobile.textContent = "Данные не найдены";
  
      // Устанавливаем сообщение "Данные не найдены" в десктопную версию
      serverNameDesktop.textContent = "Данные не найдены";
      userIdDesktop.textContent = "Данные не найдены";
      characterIdDesktop.textContent = "Данные не найдены";
    }
  });


