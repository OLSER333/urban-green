export function hintWork() {
  const hint = document.createElement("div");
  const hintW = 100;
  hint.className = "hint";
  document.querySelector(".services__list").appendChild(hint);

  const items = document.querySelectorAll(".services__list-item");
  for (let item of items) {
    // item.addEventListener("mouseenter", =  () => {
    // hint.innerText = this.dataset.description;
    // hint.style.display = "inline-block";
    // });
    item.addEventListener("mouseleave", () => {
      hint.style.transform = "scale(0)";
    });
    item.addEventListener("mousemove", (e) => {
      console.log("e", e);
      hint.style.transform = "scale(1)";
      if (e.pageX + hint.offsetWidth + hintW < document.body.offsetWidth) {
        hint.style.top = e.pageY + -hintW + "px";
        hint.style.left = e.pageX + 10 + "px";
      } else {
        hint.style.top = e.pageY - hintW + "px";
        hint.style.left = e.pageX - hint.offsetWidth - 10 + "px";
      }
    });
  }
}
