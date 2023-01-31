// friends section
const closeFriends_btn = document.querySelector(".show-friends");

const showFriends = function () {
  const aside = document.querySelector("aside");
  aside.classList.toggle("d-none");
};

closeFriends_btn.onclick = showFriends;
