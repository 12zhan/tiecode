
import { useRoutes } from 'react-router-dom'
import router from './router'

//MDUI Install
import 'mdui/mdui.css';
import 'mdui';
import { Theme } from './components/mdui/theme';
import { ThemeColor } from './components/mdui/themeColor';
import './App.css';

function App() {

  const element = useRoutes(router as any)

  return (
    <>
      <Theme />
      <ThemeColor />
      {element}
    </>
  )
}

export default App
