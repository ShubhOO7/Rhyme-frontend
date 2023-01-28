import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import PencilIcon from '@mui/icons-material/ModeEditOutline';
import Avatar from '@mui/material/Avatar';
import { useSearchParams } from 'react-router-dom';
import Axios from 'axios';
import Modal from "react-modal";
import { TextField, Typography, Button } from "@material-ui/core";

import '../Css/TicketForm.css';

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
const Ticket = ({ data }) => {
    // console.log(data.imageUrl);
    // window.location.reload();
    const [song, setSong] = React.useState(data.Song);
    const [searchParams] = useSearchParams();

    const handleUpdate = (event) => {
        // console.log(data.Username);
        // console.log(data.Song);
        setIsOpen(true);
        // setSong(data.song);
    }
    const handleSongUpdate = (event) => {
        // console.log(data.Username);
        // console.log(searchParams.get('user'));
        if (searchParams.get('user') === null) {
            alert("Kindly Login Again To Update this song ");
            return;
        }
        if (song === "") {
            alert("Please Enter some Rhymes");
            return;
        } else {
            Axios.post("http://localhost:8000/tickets/create",
                {
                    Username: data.Username,
                    Song: song,
                    imageUrl: data.imageUrl,
                }).then(response => {
                    // console.log(response);
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
    const handleDelete = (event) => {
        // console.log(data.Username);
        // console.log(searchParams.get('user'));
        if (searchParams.get('user') === null) {
            alert("Kindly Login Again To Update this song ");
            return;
        } else {
            Axios.post("http://localhost:8000/tickets/delete",
                {
                    Username: data.Username,
                    Song: song,
                    imageUrl: data.imageUrl,
                }).then(response => {
                    alert("Successfully deleted this Rhyme");
                    window.location.reload();
                });
        }
    }
    const [modalIsOpen, setIsOpen] = React.useState(false);

    // function openModal() {

    // }

    function afterOpenModal() {
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <div className="covert" >
                <Avatar
                    alt={data.Username}
                    src={data.imageUrl}
                    sx={{ width: 56, height: 56 }}
                    className='Profile'
                />
                <h3
                    className="form-input but"
                    size="large"
                >
                    {data.Song}
                </h3>
                <div className="icon">
                    <IconButton
                        aria-label="delete"
                        size="large"
                        className='dml'
                        onClick={handleUpdate}
                    >
                        <PencilIcon
                            fontSize="inherit"
                            style={{
                                color: "rgb(32, 177, 255)"
                            }} />
                    </IconButton>

                    <IconButton
                        aria-label="delete"
                        size="large"
                        className='dml'
                        onClick={handleDelete}
                    >
                        <DeleteIcon fontSize="inherit" style={{
                            color: "rgb(32, 177, 255)"
                        }} />
                    </IconButton>
                </div>


            </div>
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
                            Update this rhyme
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
                            onClick={handleSongUpdate}
                            style={{ borderRadius: "32px", backgroundColor: "rgb(32, 177, 255)" }}
                        >
                            Update
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Ticket;
