export function getAbsolutePosition(element: any) {
  const rect = element.getBoundingClientRect();
  // 结合页面的滚动距离来计算相对于整个文档的绝对位置
  const x = rect.left + window.scrollX;
  const y = rect.top + window.scrollY;
  return { x, y };
}