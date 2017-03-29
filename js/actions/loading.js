export const START_SPINNER = 'START_SPINNER' 
export const STOP_SPINNER = 'STOP_SPINNER'

export function startSpinner() {
  return {
    type: START_SPINNER
  };
}

export function stopSpinner() {
  return {
    type: STOP_SPINNER
  };
}