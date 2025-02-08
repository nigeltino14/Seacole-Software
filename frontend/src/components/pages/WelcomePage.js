import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setSelectedHome } from '../../store/house'; // Import your Redux action for house selection
import { houseActions } from '../../store/house'; // Make sure you have axios for API calls
import { getApi } from '../../api/api';

const WelcomePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [homes, setHomes] = useState([]); // State to store available houses
    const [selectedHome, setSelectedHome] = useState(null); // Selected house state
    const [error, setError] = useState(null);
    const token = useSelector((state) => state.auth.token).token

    useEffect(() => {
        getApi(
            (response) => {
                setHomes(response.data)
                dispatch(houseActions.setHouses(response.data));
            },
            token,
            "/api/homes/" // Replace with your actual endpoint for fetching houses
        );
    }, [token, dispatch]);

    const handleHouseChange = (e) => {
        setSelectedHome(e.target.value); // Update the selected house state
    };

    const handleProceed = () => {
        if (selectedHome) {

            getApi(
                (response) => {
                    dispatch(houseActions.setResidents(response.data));
                    dispatch(houseActions.setSelectedHome(selectedHome));
                    history.push('/home')
                },
                token,
                `/api/resident/?home=${selectedHome}`

            );

        } else {
            alert("Please select a house to proceed.");
        }
    };

    return (
        <div className="welcome-container" style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to 'CLINIX', Seacole Healthcare Information Management System!</h1>
            <p> Please select the house/home you'd like to access:</p>

            <select
                value={selectedHome || ''}
                onChange={handleHouseChange}
                className="form-select"
                style={{ padding: '10px', fontSize: '16px', marginBottom: '20px' }}
            >
                <option value="">Select a House</option>
                {homes.map(home => (
                    <option key={home.id} value={home.id}>
                        {home.name}
                    </option>
                ))}
            </select>

            <div>
                <button
                    className="btn btn-primary"
                    style={{ padding: '10px 20px', fontSize: '16px' }}
                    onClick={handleProceed}
                >
                    Proceed to Homepage
                </button>
            </div>
        </div>
    );
};

export default WelcomePage;
