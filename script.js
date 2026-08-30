const audio = document.querySelector("#audio");
const playButton = document.querySelector("#play-button");
const progress = document.querySelector("#progress");
const currentTime = document.querySelector("#current-time");
const duration = document.querySelector("#duration");

const now = new Date();
const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const firstDay = new Date(2026, 0, 1);
const daysSinceFirstDay = Math.floor((startOfToday - firstDay) / 86400000);

const noteBeginnings = [
  "Se eu pudesse embrulhar um carinho em forma de música,",
  "Entre tantas músicas no mundo, hoje meu coração escolheu esta",
  "Para acompanhar seu dia e lembrar que alguém pensa muito em você,",
  "Quando você apertar o play, imagina que estou pertinho",
  "Hoje acordei querendo deixar um pedacinho de afeto no seu caminho,",
  "Essa música chegou até você carregando um abraço meu,",
  "Para a pessoa que consegue deixar meus dias mais bonitos,",
  "Guarde esta música como um bilhetinho secreto entre nós,",
  "Mesmo quando a distância aparece, meu carinho encontra um jeito,",
  "Seu sorriso merecia uma trilha sonora só dele, então",
  "Mais um dia começou e, como sempre, lembrei de você,",
];

const noteEndings = [
  "seria esta — todinha sua, com amor.",
  "e espero que ela faça você sorrir nem que seja só um pouquinho.",
  "para você sentir meu abraço em cada pedacinho dela.",
  "porque estar na sua vida é uma das minhas partes favoritas.",
  "e deixar o seu dia mais leve é tudo o que eu queria agora.",
  "com aquele lembrete diário: você é muito, muito especial para mim.",
  "porque até os dias comuns ficam lindos quando penso em nós.",
  "e ela vai ficar aqui fazendo companhia até eu poder fazer isso pessoalmente.",
  "só para dizer baixinho que gosto de você mais a cada dia.",
  "porque meu lugar favorito sempre acaba sendo perto de você.",
  "e amanhã tem outro carinho esperando por você aqui.",
];

function noteForDay(index) {
  const beginning = noteBeginnings[index % noteBeginnings.length];
  const ending = noteEndings[Math.floor(index / noteBeginnings.length) % noteEndings.length];
  return `${beginning} ${ending}`;
}

function formatTime(value) {
  if (!Number.isFinite(value)) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

async function loadSong() {
  try {
    const response = await fetch("songs.json");
    if (!response.ok) throw new Error("Não foi possível carregar o catálogo.");
    const songs = await response.json();
    const index = ((daysSinceFirstDay % songs.length) + songs.length) % songs.length;
    const song = songs[index];

    document.querySelector("#song-title").textContent = song.title;
    document.querySelector("#artist").textContent = song.artist;
    document.querySelector("#note").textContent = `“${noteForDay(index)}”`;
    audio.src = song.file;
  } catch (error) {
    document.querySelector("#song-title").textContent = "A música está descansando";
    document.querySelector("#artist").textContent = "Tente novamente em instantes";
    document.querySelector("#note").textContent = "“Não consegui carregar a faixa de hoje.”";
    playButton.disabled = true;
    console.error(error);
  }
}

playButton.addEventListener("click", async () => {
  if (audio.paused) await audio.play();
  else audio.pause();
});

audio.addEventListener("play", () => {
  playButton.textContent = "❚❚";
  playButton.setAttribute("aria-label", "Pausar música");
});

audio.addEventListener("pause", () => {
  playButton.textContent = "▶";
  playButton.setAttribute("aria-label", "Tocar música");
});

audio.addEventListener("loadedmetadata", () => {
  duration.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  currentTime.textContent = formatTime(audio.currentTime);
  progress.value = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
});

audio.addEventListener("ended", () => {
  progress.value = 0;
  audio.currentTime = 0;
});

progress.addEventListener("input", () => {
  if (audio.duration) audio.currentTime = (Number(progress.value) / 100) * audio.duration;
});

document.querySelector("#today").textContent = new Intl.DateTimeFormat("en-US", {
  day: "2-digit", month: "long", year: "numeric",
}).format(now).toUpperCase();

loadSong();
