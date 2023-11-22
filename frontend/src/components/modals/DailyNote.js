import React, { useState, useEffect } from 'react';
import { Form, InputGroup, Button, Col } from 'react-bootstrap';
import { postApi } from '../../api/api'
import { useDispatch, useSelector } from 'react-redux'
import {toastsuccess } from '../utils/notifications';
import { Link, useHistory } from 'react-router-dom';


const AddDailyNote = (props) => {
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState(false);
    const user = useSelector((state) => state.auth.user)
    const selected_resident = useSelector((selected_resident) => selected_resident.resident.selectedResident)
    const token = useSelector((state) => state.auth.token).token
    const dispatch = useDispatch()
    const history = useHistory();
    const [state, setState] = useState({
        entry: '',
        resident: '',
        staff: '',
        subject: '',
        emotion: 'unknown',
        type_of_note: ''
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            postApi(_ => { props.handleClose('notes') 
            toastsuccess("Daily Note added succesfully");
              }, token, `/api/note/`, state, errors_list => { setErrors(errors_list) })
        }

        setValidated(true);
    };
    useEffect(() => {
        setState(prevState => ({
            ...prevState,
            staff: user.id,
            resident: selected_resident.national_id,
        }))
    }, [dispatch, token])
    const handleChange = (event) => {
        switch (event.target.name) {

            case 'entry':
                setState({
                    ...state,
                    entry: event.target.value
                })
                break;

            case 'subject':
                setState({
                    ...state,
                    subject: event.target.value
                })
                break;

            case 'type_of_note':
                setState({
                    ...state,
                    type_of_note: event.target.value
                })
                break;

            case 'emotion':
                setState({
                    ...state,
                    emotion: event.target.value
                })
                break;

            default:

        }
    }
    
   const handleGoBack = () => {
       history.goBack();
     };

    return (
        <div className="col-xl-12 col-md-12">
            <div className="ms-panel ms-panel-bshadow-none">
                <div className="ms-panel-body">
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom07">
                                <Form.Label>Subject</Form.Label>
                                {errors.subject && errors.subject.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control
                                        name="subject"
                                        required
                                        onChange={handleChange}
                                        value={state.subject}
                                        type="text"
                                        placeholder="Subject"
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom07">
                                <Form.Label>Entry</Form.Label>
                                {errors.entry && errors.entry.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control
                                        name="entry"
                                        required
                                        onChange={handleChange}
                                        value={state.entry}
                                        type="text"
                                        as="textarea"
                                        rows={3}
                                        placeholder="Entry"
                                    />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom07">
                                <Form.Label>Day/Night note</Form.Label>
                                {errors.type_of_note && errors.type_of_note.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control as="select" onChange={handleChange}
                                        name="type_of_note"
                                        value={state.type_of_note}
                                    >
                                        <option value="">---------------</option>
                                        <option value="day">Day</option>
                                        <option value="night">Night</option>
                                    </Form.Control>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom07">
                                <Form.Label>Emotion</Form.Label>
                                {errors.emotion && errors.emotion.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control as="select" onChange={handleChange}
                                        name="emotion"
                                        value={state.emotion}
                                    >
                                        <option value="unknown">❓ Unknown</option>
                                        <option value="joyful">😊  Joyful</option>
                                        <option value="sad">😔 Sad</option>
                                        <option value="tearful">😢 Tearful</option>
                                        <option value="angry">😡 Angry</option>
                                        <option value="annoyed">🙄 Annoyed</option>
                                        <option value="sleeping">😴 Sleeping</option>
                                    </Form.Control>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Button type="submit" className="mt-4 d-inline w-20 mr-2">Save</Button>
                        <button onClick={handleGoBack} className="btn btn-primary">Back</button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default AddDailyNote;