// Функция для выполнения асинхронного GET-запроса
async function fetchFishText(type) {
    const url = `https://fish-text.ru/get?&type=${type}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.text;
}

// Функция для сохранения сгенерированного текста в LocalStorage
function saveTextToLocalStorage(text) {
    localStorage.setItem('generatedText', text);
}

// Функция для восстановления текста из LocalStorage при перезагрузке страницы
function restoreTextFromLocalStorage() {
    const savedText = localStorage.getItem('generatedText');
    if (savedText) {
        document.getElementById('outputText').textContent = savedText;
    }
}

// Обработчик отправки формы
document.getElementById('fishTextForm').addEventListener('submit', async  e => {
   e.preventDefault();
   const type = document.getElementById('textType').value;
   const text = await fetchFishText(type);
   document.getElementById('outputText').textContent = text;
   saveTextToLocalStorage(text);
});

// Восстановить текст при загрузке страницы
window.addEventListener('load', restoreTextFromLocalStorage);