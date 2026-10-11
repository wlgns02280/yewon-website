
// 하트 배경 애니메이션
const heartsContainer = document.querySelector(".hearts");

function createHeart() {
  if (!heartsContainer) return;

  const heart = document.createElement("span");
  heart.classList.add("heart");

  const symbols = ["♡", "♥", "💕", "🌸"];
  const randomIndex = Math.floor(Math.random() * symbols.length);

  heart.textContent = symbols[randomIndex];

  // 하트 위치
  heart.style.left = Math.random() * 100 + "%";

  // 하트 크기
  heart.style.fontSize = (15 + Math.random() * 20) + "px";

  // 하트 이동 시간
  const duration = 5 + Math.random() * 5;
  heart.style.animationDuration = duration + "s";

  heartsContainer.appendChild(heart);

  // 애니메이션 종료 후 하트 삭제
  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

// 애니메이션 설정을 줄인 사용자는 하트 생략
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!reduceMotion && heartsContainer) {
  // 처음부터 하트가 보이도록 생성
  for (let i = 0; i < 6; i++) {
    createHeart();
  }

  // 0.8초마다 새로운 하트 생성
  setInterval(createHeart, 800);
}


// 스크롤 등장 애니메이션
const reveals = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right"
);

if ("IntersectionObserver" in window && !reduceMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  reveals.forEach((element) => {
    observer.observe(element);
  });
} else {
  // 애니메이션을 사용할 수 없어도 내용은 표시
  reveals.forEach((element) => {
    element.classList.add("active");
  });
}

// Secret TMI 카드 뒤집기
const secretCards = document.querySelectorAll(".secret-card");

secretCards.forEach((card) => {
  card.setAttribute("aria-pressed", "false");

  card.addEventListener("click", () => {
    const isFlipped = card.classList.toggle("flipped");
    card.setAttribute("aria-pressed", String(isFlipped));
  });
});
