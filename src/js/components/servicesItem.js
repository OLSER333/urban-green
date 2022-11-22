export function hintWork() {
  const hintW = 100;
  const hints = document.querySelectorAll(".services__hint");

  const items = document.querySelectorAll(".services__list-item");
  for (let i = 0; i < items.length; i++) {
    const hint = hints[i];
    const item = items[i];
    item.addEventListener("mouseenter", (e) => {
      console.log(e);
      // hint.innerText = this.dataset.description;
      // hint.style.display = "inline-block";
      hint.style.transform = `scale(1) translateY(0px) `;
    });
    item.addEventListener("mouseleave", () => {
      hint.style.transform = `scale(0) translateY(-200px) `;
    });
    item.addEventListener("mousemove", (e) => {
      console.log("e", e);

      if (e.pageX + hintW * 1.5 < document.body.offsetWidth) {
        // hint.style.transform = `translate(${e.pageX + 10}px, ${
        //   e.pageY + -hintW
        // }px)`;
        hint.style.top = e.pageY + -hintW + "px";
        hint.style.left = e.pageX + 10 + "px";
      } else {
        // hint.style.transfrom = `translate(${e.pageY - hintW}px, ${
        //   e.pageX - hint.offsetWidth - 10
        // }px)`;
        hint.style.top = e.pageY - hintW + "px";
        hint.style.left = e.pageX - hint.offsetWidth - 10 + "px";
      }
    });
  }
}
