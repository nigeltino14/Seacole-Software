import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { Form, InputGroup, Button, Col } from 'react-bootstrap';
import { postApi, getApi } from '../../../../api/api'
import { toastsuccess } from '../../../utils/notifications'
import ProtectedRoute from '../../../protected/ProtectedRoute'
import { groupActions } from '../../../../store/group'

const initialState = {
    training: '',
    first_name: '',
    last_name: '',
    gender: 'Other',
    date_of_birth: '',
    next_of_kin: '',
    profile_pic: { name: "Choose a photo" },
    mobile: '',
    email: '',
    groups: [],
    address: '',
}
const Addform = () => {
    const dispatch = useDispatch()
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState(false);
    const token = useSelector((state) => state.auth.token).token
    const groups = useSelector((state) => state.group.groupList)
    const [state, setState] = useState(initialState)
    const handleReset = () => {
        setValidated(false);
        setState(initialState)
    }
    const handleSubmit = (event) => {
        setValidated(true);
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            const formData = new FormData();
            formData.append('first_name', state.first_name);
            formData.append('last_name', state.last_name);
            formData.append('training', state.training);
            formData.append('groups', state.groups);
            formData.append('gender', state.gender);
            formData.append('next_of_kin', state.next_of_kin);
            formData.append('email', state.email);
            formData.append('mobile', state.mobile);
            formData.append('address', state.address);
            formData.append('profile_pic', state.profile_pic);
            formData.append('password', state.last_name);
            postApi(_ => {
                toastsuccess("Staff added successfully");
                handleReset();
            }, token, `/api/staff/`, formData, errors_list => { setErrors(errors_list) })
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
                    last_name: event.target.value,
                })
                break;

            case 'training':
                setState({
                    ...state,
                    training: event.target.value
                })
                break;

            case 'groups':
                setState({
                    ...state,
                    groups: event.target.value
                })
                break;

            case 'gender':
                setState({
                    ...state,
                    gender: event.target.value
                })
                break;

            case 'next_of_kin':
                setState({
                    ...state,
                    next_of_kin: event.target.value
                })
                break;

            case 'email':
                setState({
                    ...state,
                    email: event.target.value
                })
                break;

            case 'address':
                setState({
                    ...state,
                    address: event.target.value
                })
                break;


            case 'mobile':
                setState({
                    ...state,
                    mobile: event.target.value
                })
                break;

            case 'profile_pic':
                setState({
                    ...state,
                    profile_pic: event.target.files[0]
                })
                break;

            default:

        }
    }

    useEffect(() => {
        getApi(response => { dispatch(groupActions.setGroup(response.data)) }, token, "/api/group")
    }, [token, dispatch])
    
    return (
        <div className="col-xl-12 col-md-12">
            <div className="ms-panel">
                <div className="ms-panel-header ms-panel-custome">
                    <h6>Add Staff</h6>
                    <ProtectedRoute perm="view_user">
                        <Link to="/staff">Staff List </Link>
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
                                <Form.Label>Last Name</Form.Label>
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
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom07">
                                <Form.Label>Group</Form.Label>
                                {errors.groups && errors.groups.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control as="select" onChange={handleChange}
                                        name="groups"
                                        value={state.groups}

                                    >
                                        <option key="2a">======================= </option>
                                        {groups.map(item => (
                                            <option key={item.id} value={item.id}>{item.name} </option>
                                        ))}
                                    </Form.Control>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom04">
                                <Form.Label>Mobile No.</Form.Label>
                                {errors.mobile && errors.mobile.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control
                                        name="mobile"
                                        required
                                        onChange={handleChange}
                                        value={state.mobile}
                                        type="text"
                                        placeholder="Mobile No."
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
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
                                <Form.Label>Gender</Form.Label>
                                {errors.gender && errors.gender.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control as="select" onChange={handleChange}
                                        name="gender"
                                    >flaticon-list mr-2
                                        <option value="Other">Other</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </Form.Control>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom07">
                                <Form.Label>Next of Kin</Form.Label>
                                {errors.next_of_kin && errors.next_of_kin.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control
                                        name="next_of_kin"
                                        required
                                        onChange={handleChange}
                                        value={state.next_of_kin}
                                        type="text"
                                        as="textarea"
                                        rows={3}
                                        placeholder="Next of Kin                                        "
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom17">
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
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom11">
                                <Form.Label>Start date</Form.Label>
                                {errors.start_date && errors.start_date.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control
                                        name="start_date"
                                        onChange={handleChange}
                                        type="date"
                                        placeholder="Start Date"
                                        value={state.dob}

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
                        </Form.Row>
                        <Button type="reset" variant="warning" className="mt-4 d-inline w-20 mr-2" onClick={handleReset}>Reset</Button>
                        <Button type="submit" className="mt-4 d-inline w-20">Create Staff</Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Addform;