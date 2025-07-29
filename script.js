let resultData = {};

function calculate() {
  const birthdate = document.getElementById("birthdate").value;
  const ageInput = document.getElementById("age").value;
  let age;

  if (birthdate) {
    const birth = new Date(birthdate);
    const now = new Date();
    age = (now - birth) / (365.25 * 24 * 60 * 60 * 1000);
  } else if (ageInput) {
    age = parseInt(ageInput, 10);
  } else {
    alert("生年月日または年齢を入力してください");
    return;
  }

  if (isNaN(age) || age < 0) {
    alert("有効な年齢を入力してください");
    return;
  }

  const averageLifespan = 84;
  const sleepHours = 7;
  const wakingRate = (24 - sleepHours) / 24;

  const remainingYears = Math.max(0, averageLifespan - age);
  const freeYears = remainingYears * wakingRate;
  const freeDays = freeYears * 365.25;
  const freeHours = freeDays * 24;
  const freeMinutes = freeHours * 60;

  resultData = {
    years: freeYears.toFixed(1),
    days: Math.floor(freeDays).toLocaleString(),
    hours: Math.floor(freeHours).toLocaleString(),
    minutes: Math.floor(freeMinutes).toLocaleString(),
  };

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <p><strong>私に残された自由な時間は──</strong></p>
    <p>約 ${resultData.years} 年</p>
    <p>約 ${resultData.days} 日</p>
    <p>約 ${resultData.hours} 時間</p>
    <p>約 ${resultData.minutes} 分</p>
  `;

  document.getElementById("todo-area").style.display = "block";
}

function share() {
  const todo1 = document.getElementById("todo1").value || "（空白）";
  const todo2 = document.getElementById("todo2").value || "（空白）";
  const todo3 = document.getElementById("todo3").value || "（空白）";

  const text = `
私に残された自由な時間は──

⏳ 約 ${resultData.years} 年
🗓️ 約 ${resultData.days} 日
⏰ 約 ${resultData.hours} 時間
⏳ 約 ${resultData.minutes} 分

だから、絶対にやりたいことを3つだけ書いた。

1. ${todo1}
2. ${todo2}
3. ${todo3}

時間はもう、思ってるほど多くない。
あなたも今すぐ「残り時間」計算してみて

#残り時間チェッカー
`;

  const url = "https://h22486.github.io/remaining-time-checker/";
  const encodedText = encodeURIComponent(text + url);
  window.open(`https://twitter.com/intent/tweet?text=${encodedText}`);
}
