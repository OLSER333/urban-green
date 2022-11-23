// const forMouseOn = document.querySelector('.forMouseOn')
// forMouseOn.onr

const getCoordinatesOfTargetCenter = (target) => {
  const rect = target.getBoundingClientRect();
  const withoutScale = target.dataset.pointer !== "without-scale";
  return {
    x: rect.x + rect.width * 0.5,
    y: rect.y + rect.height * 0.5,
    target,
    scale: withoutScale,
  };
};

// export const useCursor = () => {
const cursorWrapperRef = document.querySelector(".cursorWrapperRef");
const cursorScaleWrapperRef = document.querySelector(".cursorScaleWrapperRef");
const cursorRef = document.querySelector(".cursorRef");

let requestRef;
let coordinates = { x: 0, y: 0 };
let withoutAnimation = true;

// useEffect(() => {
let windowWidth = window.innerWidth;

window.addEventListener("resize", () => {
  windowWidth = window.innerWidth;
});

const animate = () => {
  const x = cursorWrapperRef.getBoundingClientRect().x;
  const y = cursorWrapperRef.getBoundingClientRect().y;
  const diffX = x - coordinates.x;
  const diffY = y - coordinates.y;
  const rubberCoef = 10;

  const scale = (Math.abs(diffX) + Math.abs(diffY)) / windowWidth;
  const deg = Math.atan((y - coordinates.y) / (x - coordinates.x)) * 57;

  const newX = withoutAnimation ? coordinates.x : x - diffX / rubberCoef;
  const newY = withoutAnimation ? coordinates.y : y - diffY / rubberCoef;

  cursorScaleWrapperRef.style.transform = `scale(${
    coordinates.scale ? 0.375 : 1
  })`;

  cursorWrapperRef.style.transform = `translate(calc(${newX}px), calc(${newY}px ))`;
  cursorRef.style.transform = `rotate(${deg}deg) scaleY(${1 - scale}) scaleX(${
    1 + scale
  })`;

  withoutAnimation = false;
  requestRef = requestAnimationFrame(animate);
};

requestRef = requestAnimationFrame(animate);

// return () => cancelAnimationFrame(requestRef.current);
// }, []);

export const handleCursorMove = (e) => {
  // console.log(e); // ???
  const isSticky = e.target.hasAttribute("data-pointer");

  if (isSticky) {
    coordinates = getCoordinatesOfTargetCenter(e.target);
  } else {
    coordinates = { x: e.clientX, y: e.clientY };
  }
  cursorWrapperRef.style.opacity = 1;
};

export const handleCursorLeave = () => {
  cursorWrapperRef.style.opacity = 0;
};

export const handleCursorEnter = () => {
  withoutAnimation = true;
};

const forMouseOn = document.querySelector(".forMouseOn");
forMouseOn.addEventListener("mouseenter", (e) => handleCursorEnter(e));
forMouseOn.addEventListener("mouseleave", (e) => handleCursorLeave(e));
forMouseOn.addEventListener("mousemove", (e) => handleCursorMove(e));

// return { handleCursorMove, handleCursorLeave, handleCursorEnter };
// };

//==================================================================
//==================================================================
/*
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

 */
