let resultData = {};

function calculate() {
  try {
    const birthdate = document.getElementById("birthdate").value;
    const ageInput = document.getElementById("age").value;
    const favoriteSeason = document.getElementById("favoriteSeason").value;
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
      remainingYears: remainingYears
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

    const eventResultDiv = document.getElementById("event-result");
    const remainingSeasonsCount = Math.floor(remainingYears);

    let eventHTML = ``;

    const seasonTemplates = {
        "春": `あなたが桜の花びらを髪に受ける春は、あと ${remainingSeasonsCount}回 です。<br>桜並木の下で花びらが舞い落ちる瞬間<br>新しい制服やスーツで溢れる駅の朝<br>花粉症でポケットティッシュを使い切る日々<br>公園でお弁当を広げる家族連れの笑い声<br>冬物コートを片付けるか迷う肌寒い夕方`,
        "夏": `あなたが夕立の後のアスファルトの匂いを嗅げる夏は、あと ${remainingSeasonsCount}回 です。<br>夕立の後のむっとした熱気<br>花火大会で浴衣姿の人が集まるざわめき<br>冷たいスイカをかじる甘さと種飛ばし<br>海水浴で砂を波で洗い流す感覚<br>セミの鳴き声が一斉にやむ真夏の午後`,
        "秋": `あなたが金木犀の香りを感じられる秋は、あと ${remainingSeasonsCount}回 です。<br>焼き芋の甘い匂いに誘われる帰り道<br>落ち葉を踏むサクサクという音<br>夕焼けが街をオレンジ色に染める時間<br>金木犀の香りで深呼吸したくなる瞬間<br>読書の秋を気取りつつスマホを触る自分`,
        "冬": `あなたが吐く息が白く見える冬は、あと ${remainingSeasonsCount}回 です。<br>息が白くなる嬉しさ<br>手袋を外した瞬間の冷気の痛み<br>鍋から立ち上る湯気とあたたかい匂い<br>コタツから出られなくなる夜<br>クリスマスのイルミネーションで浮き立つ街`
    };

    if (favoriteSeason && seasonTemplates[favoriteSeason]) {
        eventHTML += `<p>${seasonTemplates[favoriteSeason]}</p>`;
    } else {
        // デフォルトは夏
        eventHTML += `<p>🌻 ちなみに、あなたが夕立の後のアスファルトの匂いを嗅げる夏は、あと ${remainingSeasonsCount}回 です。<br>夕立の後のむっとした熱気<br>花火大会で浴衣姿の人が集まるざわめき<br>冷たいスイカをかじる甘さと種飛ばし<br>海水浴で砂を波で洗い流す感覚<br>セミの鳴き声が一斉にやむ真夏の午後</p>`;
    }

    eventResultDiv.innerHTML = eventHTML;

    document.getElementById("todo-area").style.display = "block";
    document.getElementById("guidance-section").style.display = "block";
  } catch (error) {
    alert("計算中にエラーが発生しました: " + error.message);
    console.error("Calculation error:", error);
  }
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

document.addEventListener('DOMContentLoaded', function () {
    const accordionHeader = document.querySelector('.accordion-header');
    const accordionContent = document.querySelector('.accordion-content');
    const accordionIcon = document.querySelector('.accordion-icon');

    if (accordionHeader) {
        accordionHeader.addEventListener('click', function () {
            if (accordionContent.style.display === 'block') {
                accordionContent.style.display = 'none';
                accordionIcon.classList.remove('open');
            } else {
                accordionContent.style.display = 'block';
                accordionIcon.classList.add('open');
            }
        });
    }
});
