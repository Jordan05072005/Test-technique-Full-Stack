import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProjectList from './page/Projects'
import Task from "./page/Task"

function App() {
  return (
    <BrowserRouter>
		<Routes>
			<Route path="/" element={<ProjectList/>} />
			<Route path="/project" element={<Task/>} />
		</Routes>
    </BrowserRouter>
  )
}


export default App
