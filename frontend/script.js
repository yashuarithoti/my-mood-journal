const moodButtons = document.querySelectorAll('.mood-button');
const entryBox = document.getElementById('entry');
const saveBtn = document.getElementById('save');
const affirmationEl = document.getElementById('affirmation');


let selectedMood = '';

moodButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    selectedMood = btn.dataset.mood;
    moodButtons.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  });
});

saveBtn.addEventListener('click', () => {
  const entry = entryBox.value.trim();
  const date = new Date().toLocaleDateString("en-GB"); // DD/MM/YYYY

  if (!selectedMood || !entry) {
    alert("Select a mood and write something 💭");
    return;
  }
  
  fetch('http://localhost:3000/save-mood', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ mood: selectedMood, entry, date })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message || "Mood saved!");
  })
  .catch(err => {
    console.error('Error:', err);
    alert("Something went wrong while saving.");
  });

  createEmojiRain(getEmoji(selectedMood));
  const todayMoodBanner = document.getElementById("today-banner");
  const todayMoodText = document.getElementById("today-mood");

  todayMoodText.textContent = `${getEmoji(selectedMood)} ${selectedMood}`;
  todayMoodBanner.style.display = 'block';
  affirmationEl.textContent = affirmations[selectedMood] || '';
  applyMoodBackground(selectedMood);
  const moodAffirmations = affirmations[selectedMood];
  affirmationEl.textContent = moodAffirmations[Math.floor(Math.random() * moodAffirmations.length)] || '';

  entryBox.value = '';
  moodButtons.forEach(b => b.classList.remove('selected'));
  selectedMood = '';
});

const affirmations = {
  Happy: ["Keep spreading your sunshine ☀️", "Joy looks so good on you 💛","Your joy is contagious 💫","Smiles like yours light up rooms ✨","Keep choosing happiness,it suits you ☀️"],
  Sad: ["It’s okay to feel sad — better days are coming 💖", "You are not alone. You are loved 🫂","Crying is healing,let it flow💧","You don’t have to pretend to be okay 🌧","You're allowed to rest in softness 💖"],
  Meh: ["Not every day has to be exciting 🌥", "Just showing up is enough today 💗","Neutral days can be a quiet kind of magic 🔮🌫","Even slow days hold meaning 🌙","You’re doing the best you can, and that’s enough 🫶"],
  Angry: ["Take a deep breath, you’re doing your best 🧘", "Your feelings are valid 💥","Your anger is valid, let it guide, not consume ⚡","Pause. Breathe. Respond, don’t react 🔁","You’re allowed to feel upset. Don’t bottle it in 🧃"],
  Calm: ["You radiate peace ☁️", "Your calmness is powerful ✨","Peace looks beautiful on you 🕊️","You’re safe in this moment 🫧"],
  Stressed: ["Breathe in, breathe out. You’ve got this 🌬️", "One thing at a time 💆‍♀️","Overwhelm doesn’t define you 💼🫂","You’ve handled 100% of your hard days so far 🧷"],
  Tired: ["Rest is productive 😴", "You deserve a break 💜","Your body and mind deserve gentleness 🛌","Exhaustion is a sign, not a failure 🚨"]
};

function getEmoji(mood) {
  const emojiMap = {
    Happy: "😊",
    Meh: "😐",
    Sad: "😔",
    Angry: "😠",
    Calm: "😌",
    Stressed: "😤",
    Tired: "😴"
  };
  return emojiMap[mood] || "";
}
function applyMoodBackground(mood) {
  const moodColors = {
    Happy: "#fff9c4",     // light yellow
    Sad: "#e1f5fe",       // light blue
    Angry: "#ffebee",     // light red
    Meh: "#f0f0f0",       // grey
    Calm: "#e8f5e9",      // light green
    Stressed: "#fce4ec",  // pinkish
    Tired: "#ede7f6"      // lavender
  };

  document.body.style.backgroundColor = moodColors[mood] || "#fff7fa";
}

function createEmojiRain(emoji) {
  for (let i = 0; i < 25; i++) {
    const drop = document.createElement('div');
    drop.classList.add('emoji');
    drop.textContent = emoji;
    drop.style.left = Math.random() * 100 + 'vw';
    drop.style.animationDelay = (Math.random() * 2) + 's';
    document.body.appendChild(drop);

    setTimeout(() => {
      drop.remove();
    }, 3000);
  }
}
fetch("http://localhost:3000/entries")
  .then(res => res.json())
  .then(data => {
     console.log("Fetched entries:", data);
  })
  .catch(err => console.error("Error fetching entries:", err));
