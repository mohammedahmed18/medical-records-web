import { useEffect } from 'react'
import '../styles/globals.css'
// load the theme
import lightTheme from '../themes/light.json'

export default function App({ Component, pageProps }) {

  useEffect(() => {
    // TODO: move this logic to redux actions and add theme switch between light and dark
    // apply the theme to the ui
    const root = document.documentElement;
    Object.entries(lightTheme).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  } , [])

  return <Component {...pageProps} />
}
