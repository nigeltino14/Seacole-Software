import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, InputGroup, Button, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { postApi } from '../../../../api/api'
import { toastsuccess } from '../../../utils/notifications'
import { min_date, max_date } from '../../../utils/dob'
import ProtectedRoute from '../../../protected/ProtectedRoute'

const initialState = {
    national_id: '',
    first_name: '',
    last_name: '',
    gender: 'Other',
    date_of_birth: '',
    room: '',
    home: '',
    profile_pic: { name: "Choose a photo" },
    phone: '',
    NHS_number: '',
    email: '',
    address: '',
    height: '',
    next_of_kin: '',

}
const Addform = () => {

    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState(false);
    const [state, setState] = useState(initialState)
    const token = useSelector((state) => state.auth.token).token
    const homes = useSelector((state) => state.home.homeList)
    const handleReset = () => {
        setValidated(false);
        setState(initialState)
    }
    const handleSubmit = (event) => {
        setValidated(true);
        const form = event.currentTarget;
        const formData = new FormData();
        formData.append('national_id', state.national_id);
        formData.append('NHS_number', state.NHS_number);
        formData.append('first_name', state.first_name);
        formData.append('last_name', state.last_name);
        formData.append('gender', state.gender);
        formData.append('date_of_birth', state.date_of_birth);
        formData.append('room', state.room);
        formData.append('home', state.home);
        formData.append('profile_pic', state.profile_pic);
        formData.append('phone', state.phone);
        formData.append('email', state.email);
        formData.append('address', state.address);
        formData.append('height', state.height);
        formData.append('next_of_kin', state.next_of_kin);

        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            postApi(_ => {
                toastsuccess("Resident added successfully");
                handleReset();
            }, token, `/api/resident/`, formData, errors_list => { setErrors(errors_list) })
        }


    };

    const handleChange = (event) => {
        switch (event.target.name) {

            case 'first_name':
                setState({
                    ...state,
                    first_name: event.target.value
                })
                break;

            case 'last_name':
                setState({
                    ...state,
                    last_name: event.target.value
                })
                break;

            case 'national_id':
                setState({
                    ...state,
                    national_id: event.target.value
                })
                break;

            case 'NHS_number':
                setState({
                    ...state,
                    NHS_number: event.target.value
                })
                break;

            case 'gender':
                setState({
                    ...state,
                    gender: event.target.value
                })
                break;

            case 'date_of_birth':
                setState({
                    ...state,
                    date_of_birth: event.target.value
                })
                break;

            case 'room':
                setState({
                    ...state,
                    room: event.target.value
                })
                break;

            case 'home':
                setState({
                    ...state,
                    home: event.target.value
                })
                break;

            case 'profile_pic':
                setState({
                    ...state,
                    profile_pic: event.target.files[0]
                })
                break;

            case 'email':
                setState({
                    ...state,
                    email: event.target.value
                })
                break;

            case 'phone':
                setState({
                    ...state,
                    phone: event.target.value
                })
                break;

            case 'address':
                setState({
                    ...state,
                    address: event.target.value
                })
                break;

            case 'height':
                setState({
                    ...state,
                    height: event.target.value
                })
                break;

            case 'next_of_kin':
		setState({
		   ...state,
		   next_of_kin: event.target.value
                   
		})
		break;
            default:

        }
    }


    return (
        <div className="col-xl-12 col-md-12">
            <div className="ms-panel">
                <div className="ms-panel-header ms-panel-custome">
                    <h6>Add Resident</h6>
                    <ProtectedRoute perm="view_resident">
                        <Link to="/resident">Resident List </Link>
                    </ProtectedRoute>
                </div>
                <div className="ms-panel-body">
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom01">
                                <Form.Label>First Name</Form.Label>
                                {errors.first_name && errors.first_name.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control
                                        name="first_name"
                                        onChange={handleChange}
                                        required
                                        value={state.first_name}
                                        type="text"
                                        placeholder="Enter First Name"
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom02">
                                <Form.Label>Surname</Form.Label>
                                {errors.last_name && errors.last_name.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control
                                        name="last_name"
                                        required
                                        onChange={handleChange}
                                        value={state.last_name}
                                        type="text"
                                        placeholder="Enter Last Name"
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom03">
                                <Form.Label>NI Number</Form.Label>
                                {errors.national_id && errors.national_id.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control
                                        name="national_id"
                                        required
                                        onChange={handleChange}
                                        value={state.national_id}
                                        type="text"
                                        placeholder="NI Number"
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom03">
                                <Form.Label>NHS Number</Form.Label>
                                {errors.NHS_number && errors.NHS_number.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control
                                        name="NHS_number"
                                        required
                                        onChange={handleChange}
                                        value={state.NHS_number}
                                        type="text"
                                        placeholder="NHS Number"
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom04">
                                <Form.Label>Phone No.</Form.Label>
                                {errors.phone && errors.phone.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control
                                        name="phone"
                                        required
                                        onChange={handleChange}
                                        value={state.phone}
                                        type="number"
                                        placeholder="Phone No."
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom05">
                                <Form.Label>Email</Form.Label>
                                {errors.email && errors.email.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control
                                        name="email"
                                        required
                                        onChange={handleChange}
                                        value={state.email}
                                        type="email"
                                        placeholder="Email"
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom07">
                                <Form.Label>Home</Form.Label>
                                {errors.home && errors.home.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control as="select" onChange={handleChange}
                                        name="home"
                                    >
                                        <option > ======================= </option>

                                        {homes.map(home => (
                                            <option key={home.id} value={home.id}>{home.name}</option>
                                        ))}
                                    </Form.Control>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom08">
                                <Form.Label>Room</Form.Label>
                                {errors.room && errors.room.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control
                                        name="room"
                                        required
                                        onChange={handleChange}
                                        value={state.room}
                                        type="text"
                                        placeholder="Room Number"
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom09">
                                <Form.Label>Profile Pic</Form.Label>
                                {errors.profile_pic && errors.profile_pic.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.File
                                        name="profile_pic"
                                        label={state.profile_pic.name}
                                        onChange={handleChange}
                                        lang="en"
                                        custom
                                        accept="image/*"
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom10">
                                <Form.Label>Date of Birth</Form.Label>
                                {errors.date_of_birth && errors.date_of_birth.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control
                                        name="date_of_birth"
                                        required
                                        min={min_date()}
                                        max={max_date()}
                                        onChange={handleChange}
                                        value={state.date_of_birth}
                                        type="date"
                                        placeholder="Date of Birth"
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom07">
                                <Form.Label>Gender</Form.Label>
                                {errors.gender && errors.gender.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control as="select" onChange={handleChange}
                                        name="gender"
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </Form.Control>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom11">
                                <Form.Label>Add Address</Form.Label>
                                {errors.address && errors.address.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control
                                        name="address"
                                        onChange={handleChange}
                                        as="textarea" rows={3}
                                        value={state.address}

                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom07">
                                <Form.Label>Height</Form.Label>
                                {errors.height && errors.height.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control
                                        name="height"
                                        required
                                        min={0}
                                        max={3}
                                        step={0.01}
                                        onChange={handleChange}
                                        value={state.height}
                                        type="number"
                                        placeholder="Height"
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom12">
                                <Form.Label>Next of Kin</Form.Label>
                                {errors.next_of_kin && errors.next_of_kin.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control
                                        name="next_of_kin"
                                        onChange={handleChange}
                                        value={state.next_of_kin}
                                        type="text"
                                        placeholder="Next of Kin"
                                   />
                               </InputGroup>
                           </Form.Group>


                        </Form.Row>
                        <Button type="reset" variant="warning" className="mt-4 d-inline w-20 mr-2" onClick={handleReset}>Reset</Button>
                        <Button type="submit" className="mt-4 d-inline w-20">Create Resident</Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Addform;