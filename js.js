document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('smeshnushka-button');
  const modal = document.getElementById('modal');
  const overlay = document.getElementById('overlay');
  const closeModalButton = document.getElementById('close-modal');
  const modalContent = document.getElementById('modal-content');

  // Массив с рандомными текстами (шутками)
  const jokes = [
    "У тестировщика всегда чётное количество синяков: если он наступил на грабли - обязан воспроизвести ошибку.",
    "Тестировщик — это тот, кто знает, что сломается, ещё до того, как это сделают разработчики.",
    "Жизнь тестировщика — это бесконечная игра в 'найди десять отличий'.",
    "Тестировщик никогда не говорит: 'Это работает'. Он говорит: 'Пока не сломалось'.",
    "Если тестировщик не нашёл багов, значит, он их ещё не искал.",
    "Наконец-то программа перешла из состояния 'Блин, она не компилируется!' в состояние 'Блин, она не запускается!' =)",
    "У тестировщика есть правило: если ты нашёл один баг — ищи второй, потому что они всегда ходят парами.",
    "Тестировщик — это человек, который находит ошибки там, где разработчик даже не подозревал, что их можно сделать.",
    "Разработчик говорит: 'Я всё проверил, работает!' Тестировщик отвечает: 'Проверь ещё раз, я тебя умоляю.'",
    "Если тестировщик спрашивает: 'А как это должно работать?', знай — скоро будет много вопросов."
  ];

  // Функция для получения случайного элемента из массива
  function getRandomJoke() {
    const randomIndex = Math.floor(Math.random() * jokes.length);
    return jokes[randomIndex];
  }

  // Функция для открытия модального окна
  function openModal() {
    const randomJoke = getRandomJoke();
    modalContent.textContent = randomJoke; // Вставляем шутку в модальное окно
    modal.style.display = 'block'; // Показываем модальное окно
    overlay.style.display = 'block'; // Показываем фон затемнения
  }

  // Функция для закрытия модального окна
  function closeModal() {
    modal.style.display = 'none'; // Скрываем модальное окно
    overlay.style.display = 'none'; // Скрываем фон затемнения
  }

  // Открываем модальное окно при нажатии на кнопку "Смешнушка"
  button.addEventListener('click', openModal);

  // Закрываем модальное окно при нажатии на кнопку "Закрыть"
  closeModalButton.addEventListener('click', closeModal);

  // Закрываем модальное окно при клике на затемнённый фон
  overlay.addEventListener('click', closeModal);

  // Закрываем модальное окно при нажатии клавиши Esc
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeModal();
    }
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