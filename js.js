/* Это объявление переменной, мы наши кнопку по тегу */
const button = document.querySelector('button');

/* Тут на кнопку навешиваем обрабочик, который ждёт клика и тогда запустит логику */
button.addEventListener('click', function() {
	alert('У тестировщика всегда чётное количество синяков: если он наступил на грабли - обязан воспроизвести ошибку.')
})

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