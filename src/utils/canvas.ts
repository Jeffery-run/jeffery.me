export const r15 = Math.PI / 12;
export const r30 = Math.PI / 6;
export const r180 = Math.PI;
export const r90 = Math.PI / 2;
// 初始化canvas函数
export function initCanvas(
  canvas: HTMLCanvasElement,
  width: number = 400,
  height: number = 400,
  _dpi?: number
) {
  const ctx = canvas.getContext("2d")!;
  const dpr = window.devicePixelRatio || 2;
  // @ts-expect-error
  const bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio ||1;
  const dpi =_dpi || dpr/bsr;
  canvas.style.width=`${width}px`;
  canvas.style.height=`${height}px`
  canvas.width = dpi * width;
  canvas.height = dpi * height;
  ctx?.scale(dpi,dpi);
  return {ctx,dpi}
}
// 计算移动的距离
export function polar2cart(x = 0,y=0,r=0,theta = 0){
  const dx = Math.cos(theta) * r;
  const dy = Math.sin(theta) * r;
  return [x+dx,y+dy]
}
