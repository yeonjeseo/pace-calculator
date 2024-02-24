const btnCalculatePace = document.getElementById('btn-calculate-pace');
const btnCalculateYassoPace = document.getElementById('btn-calculate-yasso-pace');
const marathonTab = document.getElementById('tab_marathon_calc');
const yassoTab = document.getElementById('tab_yasso_calc');

const onClickTabButton = (tabId) => {
  const marathonContainer = document.getElementById('paceCalculator');
  const yassoContainer = document.getElementById('yassoCalculator');

  switch (tabId) {
    case "marathon": {
      marathonContainer.style.display = "flex";
      yassoContainer.style.display = "none";
      marathonTab.className = "tab_selected";
      yassoTab.className = "";
      break;
    }
    case "yasso": {
      yassoContainer.style.display = "flex";
      marathonContainer.style.display = "none";
      yassoTab.className = "tab_selected";
      marathonTab.className = "";
    }
  }
}

function calculatePace() {
  const distance = document.getElementById('distance').value;
  const time = document.getElementById('time').value;

  if (distance && time) {
    const [hours, minutes, seconds] = time.split(':').map((num) => parseFloat(num));
    const totalMinutes = hours * 60 + minutes + seconds / 60;
    const pace = totalMinutes / distance;
    const paceMinutes = Math.floor(pace);
    const paceSeconds = Math.round((pace - paceMinutes) * 60);
    document.getElementById('pace').value = `${padZero(paceMinutes)}:${padZero(paceSeconds)}`;
  } else {
    alert('거리와 시간을 모두 입력해주세요.');
  }
}

function calculateDistance() {
  const time = document.getElementById('time').value;
  const pace = document.getElementById('pace').value;

  if (time && pace) {
    const [paceMinutes, paceSeconds] = pace.split(':').map((num) => parseFloat(num));
    const [hours, minutes, seconds] = time.split(':').map((num) => parseFloat(num));
    const totalMinutes = hours * 60 + minutes + seconds / 60;
    const distance = totalMinutes / (paceMinutes + paceSeconds / 60);
    document.getElementById('distance').value = distance.toFixed(2);
  } else {
    alert('페이스와 시간을 모두 입력해주세요.');
  }
}

function calculateYassoPace() {
  const marathonTime = document.getElementById('marathonTime').value;
  const resultContainer = document.getElementById("yassoResult");
  resultContainer.style.display = "flex";
  if (marathonTime) {
    const [hours, minutes] = marathonTime.split(':').map((num) => parseFloat(num));

    // Yasso 800 페이스 계산 (마라톤 시간의 시간 부분을 분으로)
    const yassoPace = `${padZero(hours)}:${padZero(0)}`;
    document.getElementById('yassoPace').value = yassoPace;

    // 400미터 소요 시간 계산 (Yasso 800 페이스의 절반)
    const yassoPaceMinutes = hours / 2;
    const timeFor400m = `${padZero(yassoPaceMinutes)}:${padZero(0)}`;
    document.getElementById('timeFor400m').value = timeFor400m;

    const [kmPaceMinutes, kmPaceSeconds] = timeFor400m.split(':').map((num) => parseFloat(num));
    const totalSeconds = (kmPaceMinutes * 60 + kmPaceSeconds) * 2.5; // 400미터 시간의 2.5배
    const minutesFor1000m = Math.floor(totalSeconds / 60);
    const secondsFor1000m = Math.round(totalSeconds % 60);
    // 킬로미터당 페이스 계산 (마라톤 시간의 시간 부분을 10으로 나눔)
    const kmPace = `${padZero(minutesFor1000m)}:${padZero(secondsFor1000m)}`;
    document.getElementById('kmPace').value = kmPace;
  } else {
    alert('마라톤 목표 시간을 입력해주세요.');
  }
}

function padZero(number) {
  return number < 10 ? `0${number}` : number;
}

btnCalculatePace.addEventListener('click', calculatePace);
btnCalculateYassoPace.addEventListener('click', calculateYassoPace);
marathonTab.addEventListener('click', () => onClickTabButton("marathon"));
yassoTab.addEventListener('click', () => onClickTabButton("yasso"));

document.addEventListener('DOMContentLoaded', () => { });
