const dragElement = document.getElementById("drag");
// 拖拽功能
dragElement.addEventListener("mousedown", startDrag);
function startDrag(event) {
  event.preventDefault();
  const currentHandle = event.target;
  const isResizeHandle = currentHandle.className.includes("resize-handle");
  if (isResizeHandle) return;
  const startX = event.clientX;
  const startY = event.clientY;
  const startLeft = dragElement.offsetLeft;
  const startTop = dragElement.offsetTop;
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", stopDrag);
  function drag(event) {
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    const newLeft = startLeft + dx;
    const newTop = startTop + dy;
    dragElement.style.left = newLeft + "px";
    dragElement.style.top = newTop + "px";
  }
  function stopDrag() {
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", stopDrag);
  }
}
// 缩放功能
const resizeHandles = document.getElementsByClassName("resize-handle");
Array.from(resizeHandles).forEach((handle) => {
  handle.addEventListener("mousedown", startResize);
});

function startResize(event) {
  event.preventDefault();
  const currentHandle = event.target;
  const direction = currentHandle.className.split(" ")[1];
  const startX = event.clientX;
  const startY = event.clientY;
  const startWidth = dragElement.offsetWidth;
  const startHeight = dragElement.offsetHeight;
  const startLeft = dragElement.offsetLeft;
  const startTop = dragElement.offsetTop;
  document.addEventListener("mousemove", resize);
  document.addEventListener("mouseup", stopResize);
  function resize(event) {
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    let width = startWidth,
      height = startHeight,
      left = startLeft,
      top = startTop;
    if (direction.includes("left")) {
      width = startWidth - dx + "px";
      left = startLeft + dx / 2 + "px";
    }
    if (direction.includes("right")) {
      width = startWidth + dx + "px";
      left = startLeft + dx / 2 + "px";
    }
    if (direction.includes("top")) {
      height = startHeight - dy + "px";
      top = startTop + dy / 2 + "px";
    }
    if (direction.includes("bottom")) {
      height = startHeight + dy + "px";
      top = startTop + dy / 2 + "px";
    }
    if (parseInt(width) <= 0 || parseInt(height) <= 0) return;
    dragElement.style.width = width;
    dragElement.style.height = height;
    dragElement.style.left = left;
    dragElement.style.top = top;
  }
  function stopResize() {
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResize);
  }
}
