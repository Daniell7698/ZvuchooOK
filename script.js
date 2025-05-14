// Начало
const tracks = [
  {
    title: "Я Эту Жизнь Тебе Отдам",
    artist: "Филипп Киркоров",
    genre: "Поп",
    src: "поп.mp3"
  },
  {
    title: "Закрой За Мной Дверь, я ухожу",
    artist: "Виктор Цой",
    genre: "Рок",
    src: "рок.mp3"
  },
  {
    title: "Моя Игра",
    artist: "Баста",
    genre: "Хип-хоп",
    src: "хип-хоп.mp3"
  },
  {
    title: "Bangarang",
    artist: "Skrillex",
    genre: "Электронная",
    src: "электронная.mp3"
  },
  {
    title: "П.И.Чайковский",
    artist: "Вальс цветов из балета Щелкунчик",
    genre: "Классика",
    src: "классика.mp3"
  }
];

function renderAllTracks() {
  const container = document.getElementById("allTracks");
  container.innerHTML = "";
  tracks.forEach(track => {
    const li = document.createElement("li");
    li.textContent = `${track.title} - ${track.artist}`;
    const audio = document.createElement("audio");
    audio.controls = true;
    audio.src = track.src;
    li.appendChild(audio);
    container.appendChild(li);
  });
}

function renderGenres() {
  const container = document.getElementById("genreContainers");
  container.innerHTML = "";
  const genres = [...new Set(tracks.map(t => t.genre))];
  genres.forEach(genre => {
    const div = document.createElement("div");
    div.style.marginBottom = "20px";
    const h3 = document.createElement("h3");
    h3.textContent = genre;
    div.appendChild(h3);

    const ul = document.createElement("ul");
    ul.className = "genre-list";

    tracks.filter(t => t.genre === genre).forEach(track => {
      const li = document.createElement("li");
      li.textContent = `${track.title} - ${track.artist}`;
      const audio = document.createElement("audio");
      audio.controls = true;
      audio.src = track.src;
      li.appendChild(audio);
      ul.appendChild(li);
    });

    div.appendChild(ul);
    container.appendChild(div);
  });
}


const tabButtons = document.querySelectorAll("nav button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    tabButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const tabId = btn.getAttribute("data-tab");
    tabContents.forEach(tc => {
      tc.classList.toggle("active", tc.id === tabId);
    });

    if (tabId === "home") renderAllTracks();
    if (tabId === "genres") renderGenres();
  });
});


document.getElementById("addTrackForm").addEventListener("submit", e => {
  e.preventDefault();

  const title = document.getElementById("trackTitle").value.trim();
  const artist = document.getElementById("trackArtist").value.trim();
  const genre = document.getElementById("trackGenre").value;
  const fileInput = document.getElementById("trackFile");
  const file = fileInput.files[0];

  if (!title || !artist || !genre || !file) {
    alert("Пожалуйста, заполните все поля и выберите файл.");
    return;
  }

  // Локальное воспроизведение
  const fileURL = URL.createObjectURL(file);

  tracks.push({ title, artist, genre, src: fileURL });

  alert("Трек добавлен!");

  e.target.reset();

  
  tabButtons.forEach(b => b.classList.remove("active"));
  tabContents.forEach(tc => tc.classList.remove("active"));
  document.querySelector('nav button[data-tab="home"]').classList.add("active");
  document.getElementById("home").classList.add("active");
  renderAllTracks();
});

// Инициализация
renderAllTracks();
