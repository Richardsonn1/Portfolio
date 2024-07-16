import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import React, { createContext, useState } from 'react'
import style from './App.scss'
import PageChanged from 'components/utils/PageChanged'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from 'components/home/Home'
import Navbar from 'components/navbar/Navbar'

export const DarkModeContext = createContext({
  darkMode: true,
  toggleDarkMode: () => {}
})

function App() {
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(true)
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const theme = createTheme({
    typography: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: 14,
      h2: {
        fontSize: '2.4rem',
        fontWeight: 700
      },
      h6: {
        fontSize: '1.2rem',
        fontWeight: 600
      }
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            color: darkMode ? '#FFFFFF' : '#000000'
          }
        }
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#333'
          }
        }
      }
    },
    palette: {
      ...(darkMode
        ? {
            mode: 'dark',
            background: {
              default: '#303030',
              paper: '#383838'
            },
            primary: {
              main: '#5CB1A7'
            },
            secondary: {
              main: '#5CB1A7'
            }
          }
        : {
            mode: 'light',
            background: {
              default: '#efefef',
              paper: '#d1d1d1'
            },
            primary: {
              main: '#5CB1A7'
            },
            secondary: {
              main: '#5CB1A7'
            }
          })
    }
  })

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <PageChanged />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <div>
          <div className={style.main}>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
      </ThemeProvider>
    </DarkModeContext.Provider>
  )
}

export default App
