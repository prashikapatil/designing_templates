import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/styles/brainyLingo.css';
import { Gi3DStairs } from "react-icons/gi";

export const BrainyLingo = () => {
    const [arr, setArr] = useState([]);
    const [headerImageUrl, setHeaderImageUrl] = useState('');

    useEffect(() => {
        axios.get('https://child.onrender.com/api/sciencefiction')
            .then((res) => {
                setArr(res.data);
                setHeaderImageUrl(`https://ik.imagekit.io/dev24/${res.data[0]?.Image}`);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const getButtonColor = (index) => {
        if (index === 0 || index === 4) return 'blue';
        else if (index === 1 || index === 5) return 'orange';
        else return '#39FF14';
    };

    return (
        <div className="header-container">
            <div className="header-image" style={{ backgroundImage: `url(${headerImageUrl})` }}>
                <div className="container">
                    <div className="row sub_header_content">
                        <div className="sub-header">
                            <h3>BrainyLingo</h3>
                        </div>
                        <div className="sub_header_list">
                            <ul>
                                <li>Home</li>
                                <li>LeaderBoard</li>
                                <li>Daily Quiz</li>
                                {arr.length > 0 && (
                                    <li className="nav-item dropdown">
                                        <button className="nav-link dropdown-toggle sub_header_dropdown_button" data-bs-toggle="dropdown" style={{backgroundColor:'none'}}>Dropdown</button>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div> <button className={`btn sub_header_button`}>Sign Out</button></div>
                    </div>
                </div>
                <h1 className="header-title">Science Fiction Stories</h1>
                <div className='container'>
                    <div className='row'>
                        {arr.slice(0, 4).map((items, index) => (
                            <div key={index} className="col-sm-3">
                                <button className={`btn btn-primary`} style={{ backgroundColor: getButtonColor(index) }}><Gi3DStairs style={{ "marginRight": "10px", "fontSize": "20px" }} />{items.Status}</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className="row card-grid">
                    {arr.slice(0, 8).map((items, index) => (
                        <div key={index} className="col-md-3 mb-4">
                            <div className="card gradiant-bg">
                                <img className="card-img-top" src={`https://ik.imagekit.io/dev24/${items?.Image}`} alt="Card" />
                                <div className="card-body">
                                    <h4 className="card-title">The Galactic Time Travelers</h4>
                                    <button className={`btn btn-primary`} style={{ color: getButtonColor(index) }}>{items.Status}</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
