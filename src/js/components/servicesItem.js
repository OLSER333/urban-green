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
    console.log(newX, newY);

    cursorScaleWrapper.style.transform = `scale(${
      coordinates.scale ? 0.375 : 1
    })`;

    cursorWrapper.style.transform = `translate(calc(${newX}px), calc(${newY}px ))`;
    cursor.style.transform = `rotate(${deg}deg) scaleY(${1 - scale}) scaleX(${
      1 + scale
    })`;

    withoutAnimation = false;
    request = requestAnimationFrame(animate);
  };

  const handleCursorMove = (e) => {
    console.log("check", e); // ???
    const isSticky = e.target.hasAttribute("data-pointer");

    if (isSticky) {
      coordinates = getCoordinatesOfTargetCenter(e.target);
    } else {
      if (e.clientX + 150 > document.documentElement.clientWidth) {
        coordinates = { x: e.clientX - 50, y: e.clientY - 50 };
      } else {
        coordinates = { x: e.clientX + 50, y: e.clientY - 50 };
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
