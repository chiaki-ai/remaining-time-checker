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
    <p><strong>あなたの人生の時間は、想像よりもずっと短いかもしれません。</strong></p>
    <p><strong>残された自由な時間は──</strong></p>
    <p>約 ${resultData.years} 年</p>
    <p>約 ${resultData.days} 日</p>
    <p>約 ${resultData.hours} 時間</p>
    <p>約 ${resultData.minutes} 分</p>
  `;

  document.getElementById("todo-area").style.display = "block";
  document.getElementById("guidance-section").style.display = "block";
}

function share() {
  const todo1 = document.getElementById("todo1").value || "（空白）";
  const todo2 = document.getElementById("todo2").value || "（空白）";
  const todo3 = document.getElementById("todo3").value || "（空白）";

  const text = `
人生は短い。残された自由な時間は──

🌏 約 ${resultData.years} 年
🗓️ 約 ${resultData.days} 日
⏰ 約 ${resultData.hours} 時間
⏳ 約 ${resultData.minutes} 分

この限られた時間で、本当にやりたいことは何ですか？
私はこの3つをやり遂げたい。

1. ${todo1}
2. ${todo2}
3. ${todo3}

時間は待ってくれない。今すぐあなたの「残り時間」を計算して、行動しよう。

#残り時間チェッカー @yadori816
`;

  const url = "https://remaining-time-checker.vercel.app/";
  const encodedText = encodeURIComponent(text + url);
  window.open(`https://twitter.com/intent/tweet?text=${encodedText}`);
}
🌏