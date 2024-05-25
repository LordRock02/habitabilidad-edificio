import Scene from './js/components/Scene/Scene'
import { ContextProvider } from './js/utils/global.context'
function App() {

  return (
    <ContextProvider>
      <Scene />
    </ContextProvider>
  )
}

export default App
