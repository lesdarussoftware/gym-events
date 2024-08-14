import { BrowserRouter, Route, Routes } from "react-router-dom"
import { createTheme } from "@mui/material"
import { ThemeProvider } from "@emotion/react"

import { MessageProvider } from "./providers/MessageProvider"

import { Events } from "./pages/Events"
import { Participants } from "./pages/Participants"

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#1DFDF4',
      }
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <MessageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Events />} />
            <Route path="/participants" element={<Participants />} />
          </Routes>
        </BrowserRouter>
      </MessageProvider>
    </ThemeProvider>
  )
}

export default App
