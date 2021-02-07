import { Slider } from "./src/slider.js";
import "./src/style";

const slider = new Slider("#slider", {
  elements: [
    {
      title: "Element 1",
      content: "Content 1",
      color: "#d3a613",
    },
    {
      title: "Element 2",
      content: "Content 2",
      img: "https://i.stack.imgur.com/fhEwl.png",
    },
    {
      title: "Element 3",
      content: "Content 3",
      color: "#ffa3a3",
    },
    {
      title: "Element 4",
      content: "Content 4",
      color: "#d3a613",
    },
    {
      title: "Element 5",
      content: "Content 5",
      img: "https://bipbap.ru/wp-content/uploads/2017/05/57597430aad91155356dde3c.jpg",
    },
    {
      title: "Element 6",
      content: "Content 6",
      color: "#ffa3a3",
    },
  ],
  delay: 2000,
});

window.s = slider;
