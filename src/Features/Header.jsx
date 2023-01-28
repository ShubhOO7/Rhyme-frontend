import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
import AdbIcon from '@mui/icons-material/LibraryMusic';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Modal from "react-modal";
import { TextField, Typography, Button } from "@material-ui/core";
import '../Css/Header.css';
import Axios from 'axios';


// import { useNavigate } from 'react-router-dom';
// import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';
// 

const pages = ['Create'];
const settings = ['Logout'];

const customStyles = {
    content: {
        width: "90%",
        top: "50%",
        left: "50%",
        right: "auto",
        padding: "none",
        bottom: "auto",
        marginRight: "-50%",
        background: "transparent",
        transform: "translate(-50%, -50%)",
        border: "none"
    }
};
// Modal.setAppElement('#app');

function ResponsiveAppBar({ user, url }) {
    const navigate = useNavigate();
    // console.log("URL : " + url);

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [song, setSong] = React.useState("");

    const handleOpenNavMenu = (event) => {
        // console.log(event.currentTarget);
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        // console.log(event.currentTarget);
        setAnchorElUser(event.currentTarget);
    };
    const handleCreate = (event) => {
        // console.log("hellllll ");
        setIsOpen(true);
    }
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleLogout = () => {
        navigate('/');
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const [searchParams] = useSearchParams();
    const handleSong = () => {
        // console.log(song);
        if (searchParams.get('user') === null) {
            alert("Kindly Login Again To Create a rhyme ");
            return;
        }

        if (song === "") {
            alert("Please Enter some Rhymes");
            return;
        } else {
            Axios.post("http://localhost:8000/tickets",
                {
                    Username: searchParams.get('user'),
                    Song: song,
                    imageUrl: searchParams.get('imageUrl'),
                }).then(response => {
                    window.location.reload();
                    // navigate({
                    //     pathname: '/tickets',
                    //     search: createSearchParams({
                    //         user: searchParams.get('user'),
                    //         imageUrl: searchParams.get('imageUrl')
                    //     }).toString()
                    // });
                });
        }
    }

    // let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function afterOpenModal() {
        // subtitle.style.color = "#f00";
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <AppBar position="static">
            <Container  >
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    {/* <Typography
                        variant="h6"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        RHYME
                    </Typography> */}

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}

                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}  >
                                    <Typography onClick={handleCreate}  >{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        // noWrap
                        // component="a"
                        style={{ marginRight: "35%" }}
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        RHYME
                    </Typography>

                    <Box
                        sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
                        onClick={handleCreate}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                style={{ color: 'white' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={user} src={url} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu} >
                                    <Typography onClick={handleLogout}  >{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Example Modal"
            >
                <form>
                    <div className="coverm">
                        <Typography variant="h3" style={{ marginBottom: 8 }} className="tit" >
                            Create your own Rhyme
                        </Typography>
                        <TextField
                            label="Rhyme"
                            fullWidth
                            className="form-input"
                            value={song}
                            onChange={e => setSong(e.target.value)}
                        />
                        <Button
                            color="primary"
                            size="medium"
                            variant="contained"
                            className="form-input butm"
                            onClick={handleSong}
                            style={{ borderRadius: "32px", backgroundColor: "rgb(32, 177, 255)" }}
                        >
                            Create
                        </Button>
                    </div>
                </form>
            </Modal>
        </AppBar >
    );
}
export default ResponsiveAppBar;
