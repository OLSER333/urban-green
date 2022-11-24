export const useCursor = () => {
  const itemsWithCursor = document.querySelectorAll(".forMouseOn");
  itemsWithCursor.forEach((el) => cursorLogic(el));
};

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

const cursorLogic = (withCursor) => {
  const cursorWrapper = withCursor.querySelector(".cursorWrapper");
  const cursorScaleWrapper = withCursor.querySelector(".cursorScaleWrapper");
  const cursor = withCursor.querySelector(".cursor");
  const cursorImg = withCursor.querySelector(".cursor-img");

  let request;
  let coordinates = { x: 0, y: 0 };
  let withoutAnimation = true;

  let windowWidth = window.innerWidth;

  window.addEventListener("resize", () => {
    windowWidth = window.innerWidth;
  });

  const animate = () => {
    const x = cursorWrapper.getBoundingClientRect().x;
    const y = cursorWrapper.getBoundingClientRect().y;

    const diffX = x - coordinates.x;
    const diffY = y - coordinates.y;
    const rubberCoef = 10;

    const scale = (Math.abs(diffX) + Math.abs(diffY)) / windowWidth;
    const deg = Math.atan((y - coordinates.y) / (x - coordinates.x)) * 57;

    const newX = withoutAnimation ? coordinates.x : x - diffX / rubberCoef;
    const newY = withoutAnimation ? coordinates.y : y - diffY / rubberCoef;

    cursorScaleWrapper.style.transform = `scale(1)`;

    cursorWrapper.style.transform = `translate(calc(${newX}px), calc(${newY}px ))`;
    cursor.style.transform = `rotate(${deg}deg) scaleY(${1 - scale}) scaleX(${
      1 + scale
    })`;
    cursorImg.style.transform = `rotate(${-deg}deg)`;

    withoutAnimation = false;
    request = requestAnimationFrame(animate);
  };

  const handleCursorMove = (e) => {
    const isSticky = e.target.hasAttribute("data-pointer");

    if (isSticky) {
      coordinates = getCoordinatesOfTargetCenter(e.target);
    } else {
      if (e.clientX + 250 > document.documentElement.clientWidth) {
        coordinates = { x: e.clientX - 120, y: e.clientY - 100 };
      } else {
        coordinates = { x: e.clientX + 100, y: e.clientY - 100 };
      }
    }
    cursorWrapper.style.opacity = 1;
  };

  const handleCursorLeave = () => {
    cursorWrapper.style.opacity = 0;
    cancelAnimationFrame(request);
  };

  const handleCursorEnter = () => {
    withoutAnimation = true;
    request = requestAnimationFrame(animate);
  };

  withCursor.addEventListener("mouseenter", (e) => handleCursorEnter(e));
  withCursor.addEventListener("mouseleave", (e) => handleCursorLeave(e));
  withCursor.addEventListener("mousemove", (e) => handleCursorMove(e));
};
