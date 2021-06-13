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
) => useEffect(func, []);
