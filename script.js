// Функция для выполнения асинхронного GET-запроса
async function fetchFishText(type) {
    const url = `https://fish-text.ru/get?&type=${type}`;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        return data.text;
    } catch (error) {
        console.error(error);

        return 'Ошибка получения текста. Попробуйте снова.';
    }
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

    if (!type) {
        alert('Выберите тип текста!');
        return;
    }

   const text = await fetchFishText(type);
   document.getElementById('outputText').textContent = text;
   saveTextToLocalStorage(text);
});

// Восстановить текст при загрузке страницы
window.addEventListener('load', restoreTextFromLocalStorage);

document.getElementById('clearText').addEventListener('click', () => {
    localStorage.removeItem('generatedText'); // Clear saved text
    document.getElementById('outputText').textContent = ''; // Clear displayed text
});
