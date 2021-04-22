export const drag = (headerEle, dragEle) => {
  headerEle.style.cursor = "move";

  // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
  const sty = dragEle.currentStyle || window.getComputedStyle(dragEle, null);

  headerEle.onmousedown = e => {
    // 鼠标按下，计算当前元素距离可视区的距离
    const disX = e.clientX - headerEle.offsetLeft;
    const disY = e.clientY - headerEle.offsetTop;
    // console.log(e.clientX, headerEle.offsetLeft);
    // 获取视口宽度和高度
    const screenWidth = document.body.clientWidth;
    const screenHeight = document.body.clientHeight;

    const minDragLeft = dragEle.offsetLeft;
    const maxDragLeft = screenWidth - dragEle.offsetLeft - dragEle.offsetWidth;
    const minDragTop = dragEle.offsetTop;
    const maxDragTop = screenHeight - dragEle.offsetTop - dragEle.offsetHeight;

    // console.log(minDragLeft, maxDragLeft, minDragTop, maxDragTop)

    // 获取到的值带px 正则匹配替换
    let styL, styT;

    // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
    if (sty.left.includes("%")) {
      /* eslint-disable */
      styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
      styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
    } else {
      styL = +sty.left.replace(/\px/g, '') // 写成/px/g 也行
      styT = +sty.top.replace(/\px/g, '')
    }

    document.onmousemove = function(e) {
      // 通过事件委托，计算移动的距离
      let left = e.clientX - disX
      let top = e.clientY - disY

      // 边界处理
      if (-left > minDragLeft) {
        left = -minDragLeft
      } else if (left > maxDragLeft) {
        left = maxDragLeft
      }

      if (-top > minDragTop) {
        top = -minDragTop
      } else if (top > maxDragTop) {
        top = maxDragTop
      }

      // 移动当前元素
      dragEle.style.left = `${left + styL}px`
      dragEle.style.top = `${top + styT}px`
    }

    document.onmouseup = function() {
      document.onmousemove = null
      document.onmouseup = null
    }
  }
}
