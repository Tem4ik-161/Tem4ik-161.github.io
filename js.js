document.addEventListener('DOMContentLoaded', function () {
  /* Это объявление переменной, мы нашли кнопку по тегу */
  const button = document.querySelector('button');

  /* Проверяем, что кнопка найдена */
  if (!button) {
    console.error("Кнопка не найдена!");
    return;
  }

  /* Массив с рандомными текстами (шутками) */
  const jokes = [
    "У тестировщика всегда чётное количество синяков: если он наступил на грабли - обязан воспроизвести ошибку.",
    "Тестировщик — это тот, кто знает, что сломается, ещё до того, как это сделают разработчики.",
    "Жизнь тестировщика — это бесконечная игра в 'найди десять отличий'.",
    "Тестировщик никогда не говорит: 'Это работает'. Он говорит: 'Пока не сломалось'.",
    "Если тестировщик не нашёл багов, значит, он их ещё не искал."
  ];

  /* Функция для получения случайного элемента из массива */
  function getRandomJoke() {
    const randomIndex = Math.floor(Math.random() * jokes.length); // Генерируем случайный индекс
    return jokes[randomIndex]; // Возвращаем случайную шутку
  }

  /* Тут на кнопку навешиваем обработчик, который ждёт клика и тогда запустит логику */
  button.addEventListener('click', function () {
    const randomJoke = getRandomJoke(); // Получаем случайную шутку
    alert(randomJoke); // Показываем её в alert
  });
});

// Получаем контейнер
const matrix = document.querySelector('.matrix');

// Определяем ширину и высоту экрана
const width = window.innerWidth;
const height = window.innerHeight;

// Создаем массив строк, которые будут падать
const columns = Math.floor(width / 20); // Количество колонок (20px между символами)
const symbols = Array(columns).fill(1); // Начальная позиция для каждой колонки

// Функция для генерации случайного символа
function getRandomSymbol() {
  const chars = 'QA '; // Символы, которые будут падать
  return chars[Math.floor(Math.random() * chars.length)];
}

// Функция для создания падающего эффекта
function drawMatrix() {
  matrix.innerHTML = ''; // Очищаем предыдущий кадр

  // Обновляем позицию каждого столбца
  symbols.forEach((symbolPosition, index) => {
    const char = document.createElement('div');
    char.textContent = getRandomSymbol();
    char.style.position = 'absolute';
    char.style.left = `${index * 20}px`; // Расстояние между символами
    char.style.top = `${symbolPosition * 20}px`; // Позиция по вертикали

    // Если символ ушел за пределы экрана, сбрасываем его позицию
    if (symbolPosition * 20 > height && Math.random() > 0.975) {
      symbols[index] = 0;
    }

    // Добавляем символ на страницу
    matrix.appendChild(char);
  });

  // Обновляем позиции символов
  symbols.forEach((_, index) => {
    symbols[index]++;
  });
}

// Запускаем анимацию
setInterval(drawMatrix, 50); // Обновляем каждые 50 мс