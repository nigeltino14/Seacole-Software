import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, InputGroup, Button, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { postApi } from '../../../../api/api'
import { toastsuccess } from '../../../utils/notifications'
import ProtectedRoute from '../../../protected/ProtectedRoute'


const Addform = () => {
    const [errors, setErrors] = useState(false);
    const [validated, setValidated] = useState(false);
    const token = useSelector((state) => state.auth.token).token
    const user = useSelector((state) => state.auth.user)
    const selected_resident = useSelector((state) => state.resident.selectedResident)
    const residents = useSelector((state) => state.resident.residentList)
    const plans = useSelector((state) => state.plan.planList)
    const selected_plans_schedule = useSelector((state) => state.planscheduler.selectedPlanScheduler)

    const initialState = {
        title: '',
        category: 'Education',
        issue: '',
        action_plan: '',
        by_who: '',
        created_by: '',
        by_whom: '',
        by_when: '',
        goal: '',
        achievements: '',
        

    }
    const [state, setState] = useState(initialState)

    const handleReset = () => {
        setValidated(false);
        setState(initialState)
    }
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            let data = { ...state }
            if (data.discontinue) {
                delete data["next_assement_date"]
            }
            postApi(_ => {
                toastsuccess("Support Plan added successfully");
                handleReset();
            }, token, `/api/plan/`, data, errors_list => { setErrors(errors_list) })
        }
        setValidated(true);

    };

    const handleChange = (event) => {
        switch (event.target.name) {

            case 'title':
                setState({
                    ...state,
                    title: event.target.value
                })
                break;

            case 'category':
                setState({
                    ...state,
                    category: event.target.value
                })
                break;

            case 'issue':
                setState({
                    ...state,
                    issue: event.target.value
                })
                break;

            case 'action_plan':
                setState({
                    ...state,
                    action_plan: event.target.value
                })
                break;

            case 'by_who':
                setState({
                    ...state,
                    by_who: event.target.value
                })
                break;

            case 'by_whom':
                setState({
                    ...state,
                    by_whom: event.target.value
                })
                break;

            case 'goal':
                setState({
                    ...state,
                   goal: event.target.value
                })
                break;

            case 'achievements':
                setState({
                    ...state,
                    achievements: event.target.value
                })
                break;

            case 'created_by':
                setState({
                    ...state,
                    created_by: event.target.checked
                })
                break;

            case 'by_when':
                setState({
                    ...state,
                    by_when: event.target.value
                })
                break;
            default:
        }

    }

    useEffect(() => {
        setState(prevState => ({
            ...prevState,
            staff: user.id,
            resident: JSON.stringify(selected_resident) !== '{}' ? selected_resident.national_id : ''
        }))
    }, [user, selected_resident])
    useEffect(() => {
        setState(prevState => ({
            ...prevState,
            created_by: user.id,
            staff: user.id,
            resident: JSON.stringify(selected_resident) !== '{}' ? selected_resident.national_id : ''
        }))
    }, [user, selected_resident])


    useEffect(() => {
        if (JSON.stringify(selected_plans_schedule) !== '{}') {
            const plan = plans.find(i => i.id === selected_plans_schedule.support_plan)
            setState(plan)
        }
    }, [selected_plans_schedule])


    return (
        <div className="col-xl-12 col-md-12">
            <div className="ms-panel">
                <div className="ms-panel-header ms-panel-custome">
                    <h6>Add Support Plan</h6>
                    <ProtectedRoute perm="view_supportplan">
                        <Link to="/supportplan">Support Plans </Link>
                    </ProtectedRoute>
                </div>
                <div className="ms-panel-body">
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom01">
                                <Form.Label>Title</Form.Label>
                                {errors.title && errors.title.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control
                                        name="title"
                                        onChange={handleChange}
                                        required
                                        value={state.title}
                                        type="text"
                                        as="textarea"
                                        rows={3} placeholder="Title"
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom02">
                                <Form.Label>Category</Form.Label>
                                {errors.category && errors.category.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control
                                        name="category"
                                        required
                                        onChange={handleChange}
                                        value={state.category}
                                        as="select"
                                    >
                                        <option value='HousingTenancy' >Housing/Tenancy</option>
                                        {/* <option value='Risk' >Risk</option> */}
                                        <option value='FinanceMoneyBenefitManagement' >Finance/Money/Benefit Management</option>
                                        <option value='RentArrearsServiceUsers' >Rent Arrears - Service Users</option>
                                        <option value='RentArrearsServiceUsers' >Rent Arrears - Service Users</option>
                                        <option value='Education' >Education</option>
                                        <option value='Training' >Training</option>
                                        <option value='Employment' >Employment</option>
                                        <option value='MentalHealthSubstanceUse' >Mental Health/Substance Use</option>
                                        <option value='EthnicCulturalReligiousNeeds' >Ethnic/Cultural/Religious Needs -</option>
                                        <option value='LeisureSocialNetwork' >LeisureSocialNetwork</option>
                                        <option value='MovingOn' >Moving On</option>
                                        <option value='FurtherConcernsNeeds' >Further Concerns/Needs -</option>
                                        <option value='ServicesprovidedbyHousingorEstateManagementService' >Services provided by Housing or Estate Management Service</option>
                                        <option value='ServicesprovidedbySupportWorker' >Services provided by Support Worker</option>
                                        <option value='SupportWorkersViewsofIssuesNeedsorActions' >Support Worker's Views of Issues, Needs or Actions</option>
                                    </Form.Control>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom03">
                                <Form.Label>Issue</Form.Label>
                                {errors.issue && errors.issue.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control
                                        name="issue"
                                        value={state.issue}
                                        as="textarea"
                                        type="text"
                                        onChange={handleChange}
                                    >
                                    </Form.Control>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom04">
                                <Form.Label>Action Plan</Form.Label>
                                {errors.action_plan && errors.action_plan.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control
                                        as="textarea"
                                        type="text"
                                        name="action_plan"
                                        onChange={handleChange}
                                        value={state.action_plan}
                                    >

                                    </Form.Control>
                                </InputGroup>
                            </Form.Group>
                            {/* <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom04">
                                <Form.Label>Resident</Form.Label>
                                <InputGroup>
                                    <Form.Control as="select" onChange={handleChange}
                                        name="resident"
                                        value={state.resident}
                                    >
                                        <option key="2a" > ------------- </option>
                                        {residents.map(user => (
                                            <option key={user.national_id} value={user.national_id}>{user.first_name} {user.last_name}</option>
                                        ))}
                                    </Form.Control>
                                </InputGroup>
                            </Form.Group> */}
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom07">
                                <Form.Label>By Whom</Form.Label>
                                {errors.by_whom && errors.by_whom.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control
                                        name="by_whom"
                                        required
                                        as="textarea"
                                        type="text"
                                        onChange={handleChange}
                                        value={state.by_whom}
                                        placeholder="By Whom"
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom07">
                                <Form.Label>By Who</Form.Label>
                                {errors.by_who && errors.by_who.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control
                                        name="by_who"
                                        required
                                        onChange={handleChange}
                                        value={state.by_who}
                                        type="text"
                                        as="textarea"
                                        placeholder="By Who"
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom07">
                                <Form.Label>By When</Form.Label>
                                {errors.by_when && errors.by_when.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control
                                        name="by_when"
                                        required
                                        onChange={handleChange}
                                        value={state.by_when}
                                        type="text"
                                        as="textarea"
                                        placeholder="By When"
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom07">
                                <Form.Label>Goal</Form.Label>
                                {errors.goal && errors.goal.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control
                                        name="goal"
                                        required
                                        onChange={handleChange}
                                        value={state.goal}
                                        type="text"
                                        as="textarea"
                                        placeholder="Goal"
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom07">
                                <Form.Label>Achievements</Form.Label>
                                {errors.achievements && errors.achievements.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control
                                        name="achievements"
                                        required
                                        onChange={handleChange}
                                        value={state.achievements}
                                        type="text"
                                        as="textarea"
                                        placeholder="Achievements"
                                    />
                                </InputGroup>
                            </Form.Group>
                            {JSON.stringify(selected_resident) === '{}' &&
                                <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom07">
                                    <Form.Label>Resident</Form.Label>
                                    {errors.resident && errors.resident.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                    <InputGroup>
                                        <Form.Control as="select" onChange={handleChange}
                                            name="resident"
                                            value={state.resident}
                                            required
                                        >
                                            <option key="2a" > ------------- </option>
                                            {residents.map(resident => (
                                                <option key={resident.national_id} value={resident.national_id}>{resident.first_name} {resident.last_name}</option>
                                            ))}
                                        </Form.Control>
                                    </InputGroup>
                                </Form.Group>
                            }
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom07">
                                <Form.Label>Discontinue Evaluation</Form.Label>
                                {errors.discontinue && errors.discontinue.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <Form.Check
                                    name="discontinue"
                                    value={state.discontinue}
                                    type="checkbox"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            {!state.discontinue &&
                                <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom07">
                                    <Form.Label>Next Evaluation Date</Form.Label>
                                    {errors.next_assement_date && errors.next_assement_date.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                    <InputGroup>
                                        <Form.Control
                                            name="next_assement_date"
                                            required
                                            onChange={handleChange}
                                            value={state.next_assement_date}
                                            type="datetime-local"
                                            placeholder="Next Evaluation Date"
                                        />
                                    </InputGroup>
                                </Form.Group>
                            }
                        </Form.Row>
                        <Button type="reset" variant="warning" className="mt-4 d-inline w-20 mr-2" onClick={handleReset}>Reset</Button>
                        <Button type="submit" className="mt-4 d-inline w-20">Save</Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Addform;