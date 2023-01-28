import React, { useEffect, useState } from 'react';
// import { TextField, Typography, Button } from "@material-ui/core";
import TicketForm from "../Features/TicketForm";
import Header from "../Features/Header";
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';


const Ticket = () => {
    const [data, setData] = useState([]);

    const fetchData = () => {
        return axios.get("http://localhost:8000/tickets")
            .then((res) => {
                // console.log(res.data);
                setData(res.data);
            });
    }

    useEffect(() => {
        fetchData();
        // console.log('i fire once');
    }, [])
    // console.log(data[0].Song);


    const [searchparams] = useSearchParams();

    // console.log("USER : " + searchparams.get("user"));
    // console.log("URL : " + searchparams.get("imageUrl"));
    const user = searchparams.get("user");
    const url = searchparams.get("imageUrl");
    return (
        <div className="ticket-container">
            <Header username={user} url={url} />
            {data.map((dat, i) => (
                <TicketForm data={dat} key={i} />
            ))}

        </div>
    );
};

export default Ticket;
