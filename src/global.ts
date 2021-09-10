import { useEffect, useRef } from 'react';

export const useComponentWillMount: (func: (...args: any) => void) => void = (
 func
) => {
 const willMount = useRef(true);
 if (willMount.current) {
  func();
 }
 useComponentDidMount(() => {
  willMount.current = false;
 });
};

export const useComponentDidMount: (func: (...args: any) => void) => void = (
 func
) => useEffect(func, [func]);

export function shuffle(array: any[]) {
 var currentIndex = array.length,
  randomIndex;

 // While there remain elements to shuffle...
 while (currentIndex != 0) {
  // Pick a remaining element...
  randomIndex = Math.floor(Math.random() * currentIndex);
  currentIndex--;

  // And swap it with the current element.
  [array[currentIndex], array[randomIndex]] = [
   array[randomIndex],
   array[currentIndex],
  ];
 }

 return array;
}
