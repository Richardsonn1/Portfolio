import {
  AppBar,
  Box,
  Button,
  createTheme,
  Drawer,
  IconButton,
  ListItemIcon,
  Paper,
  ThemeProvider,
  Toolbar,
  Typography
} from '@mui/material'
import { Info, Home, Email, RateReview, Menu } from '@mui/icons-material'
import React, { useState } from 'react'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { useNavigate } from 'react-router-dom'

const drawerWidth = 240
export const navItems = [
  { icon: <Home />, title: 'Hem', linkPath: '/' },
  { icon: <Info />, title: 'Information', linkPath: '/information' },
  { icon: <Email />, title: 'Anmälan', linkPath: '/inform' },
  { icon: <RateReview />, title: 'Kontakt', linkPath: '/contact' }
]

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleClick = (path: string) => {
    navigate(path)
  }

  const drawer = (
    <ThemeProvider
      theme={createTheme({
        components: {
          MuiListItemButton: {
            defaultProps: {
              disableTouchRipple: true
            }
          }
        },
        palette: {
          mode: 'dark',
          primary: { main: 'rgb(102, 157, 246)' },
          background: { paper: 'rgb(5, 30, 52)' }
        }
      })}>
      <Paper
        elevation={0}
        sx={{ maxWidth: 256, height: '100vh', borderRadius: 0 }}>
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
          <Typography
            variant="h6"
            sx={{ my: 2, color: 'rgba(255,255,255,0.8)' }}>
            {`3 Juni 2023`}
          </Typography>
          <Divider />
          <List>
            {navItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,0.8)' }}
                  onClick={() => handleClick(item.linkPath)}>
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: 'medium'
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </ThemeProvider>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}>
            <Menu />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            {`3 Juni 2023`}
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item, index) => (
              <Button
                key={index}
                sx={{ color: '#000000' }}
                onClick={() => handleClick(item.linkPath)}>
                {item.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}>
          {drawer}
        </Drawer>
      </Box>
    </Box>
  )
}
export default Navbar
