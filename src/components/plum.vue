<template>
  <div class="canvasWrapper">
    <canvas ref="el"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { rand, useWindowSize } from "@vueuse/core";
import { onMounted, ref } from "vue";
import { r15, r90, polar2cart, initCanvas } from "../../utils/canvas";
let leng = ref(7);
let el = ref<HTMLCanvasElement>()!;
let { width, height } = useWindowSize();
const f = {
  start: () => {},
};
onMounted(() => {
  type Point = { x: number; y: number; theta: number };
  const canvas = el.value!;

  const { random } = Math;
  let stack: Function[] = [];
  let currStack: Function[] = [];
  let count = 1;
  const { ctx } = initCanvas(canvas, width.value, height.value);
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#88888825";
  function lineTo(p1: Point, p2: Point) {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }

  function step(start: Point) {
    count++;
    const length = leng.value * random();
    const [nx, ny] = polar2cart(start.x, start.y, length, start.theta);
    const end1: Point = {
      x: nx,
      y: ny,
      theta: start.theta + r15 * random(),
    };
    const end2: Point = {
      x: nx,
      y: ny,
      theta: start.theta - r15 * random(),
    };
    lineTo(start, end1);
    if (nx > width.value || nx < 0 || ny > height.value || ny < 0) return;
    if (count <= 10 || random() > 0.5) stack.push(() => step(end1));
    if (count <= 10 || random() > 0.5) stack.push(() => step(end2));
  }
  const run = () => {
    currStack = stack;
    stack = [];
    currStack.forEach((f) => f());
  };
  function fram(fn: Function) {
    const foo = function () {
      fn();
      requestAnimationFrame(foo as FrameRequestCallback);
    };
    requestAnimationFrame(foo as FrameRequestCallback);
  }
  stack = [
    () => step({ x: random() * width.value, y: 0, theta: r90 }),
    () => step({ x: random() * width.value, y: height.value, theta: -r90 }),
    () => step({ x: 0, y: random() * height.value, theta: 0 }),
    () => step({ x: width.value, y: random() * height.value, theta: Math.PI }),
  ];
  fram(run);
});
</script>

<style scoped lang="less">
.canvasWrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}
</style>