/**
 * PUBLIC MAIN SCRIPT
 */
import ReactDOM from 'react-dom';
import React from 'react';
import ReactAppThemeOne from './react/ReactAppThemeOne';

class App {
  constructor() {
    console.info('Lee Goff React Lead Plugin is now active!');
    // LUNCHING REACT APP THEME ONE
    const appThemeOne = document.getElementById('REACT-PLUGIN-APP');
    if (appThemeOne) {
      ReactDOM.render(<ReactAppThemeOne />, appThemeOne);
    }
  }
}

export default App;
