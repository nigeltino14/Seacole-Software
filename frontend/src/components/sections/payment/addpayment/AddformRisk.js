import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, InputGroup, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { postApi, getApi } from '../../../../api/api'
import { toastsuccess } from '../../../utils/notifications'
import ProtectedRoute from '../../../protected/ProtectedRoute'
import { staffActions } from '../../../../store/staff'
import { riskActions } from '../../../../store/riskAssessment';


const Addform = () => {
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState(false);
    const token = useSelector((state) => state.auth.token).token
    const residents = useSelector((state) => state.resident.residentList)
    const user = useSelector((state) => state.auth.user)
    const selected_resident = useSelector((state) => state.resident.selectedResident)
    const selected_risk_schedule = useSelector((state) => state.riskschedulerscheduler.selectedriskScheduler)
    const risks = useSelector((state) => state.risk.riskList)
    const dispatch = useDispatch()

    const initialState = {
        title: '',
        identified_risk: '',
        details: '',
        resident: '',
        created_by: '',
        information_sources_used: '',
        next_assement_date: '',
        is_further_information_needed: true,
        discontinue: false
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
                toastsuccess("Risk Assessment added successfully");
                handleReset();
            }, token, `/api/risk/`, data, errors_list => { setErrors(errors_list) })
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

            case 'identified_risk':
                setState({
                    ...state,
                    identified_risk: event.target.value
                })
                break;

            case 'details':
                setState({
                    ...state,
                    details: event.target.value
                })
                break;

            case 'resident':
                setState({
                    ...state,
                    resident: event.target.value
                })
                break;

            case 'information_sources_used':
                setState({
                    ...state,
                    information_sources_used: event.target.value
                })
                break;

            case 'next_assement_date':
                setState({
                    ...state,
                    next_assement_date: event.target.value
                })
                break;

            case 'is_further_information_needed':
                setState({
                    ...state,
                    is_further_information_needed: event.target.checked
                })
                break;

            case 'discontinue':
                setState({
                    ...state,
                    discontinue: event.target.checked
                })
                break;

            default:
        }
    }

    useEffect(() => {
        setState(prevState => ({
            ...prevState,
            resident: JSON.stringify(selected_resident) !== '{}' ? selected_resident.national_id : '',
            created_by: user.id
        }))
    }, [user, selected_resident])


    useEffect(() => {
        getApi(response => { dispatch(staffActions.setStaff(response.data)) }, token, "/api/staff")
        getApi(response => { dispatch(riskActions.setRisk(response.data)) }, token, "/api/risk")
    }, [dispatch, token])

    useEffect(() => {
        if (JSON.stringify(selected_risk_schedule) !== '{}' && selected_risk_schedule !== undefined) {
            const risk = risks.find(i => i.id === selected_risk_schedule.risk)
            setState(risk)
        }
    }, [selected_risk_schedule])

    return (
        <div className="col-xl-12 col-md-12">
            <div className="ms-panel">
                <div className="ms-panel-header ms-panel-custome">
                    <h6>Add Risk</h6>
                    <ProtectedRoute perm="view_riskactionplan">
                        <Link to="/riskassessment">Risk Assessments </Link>
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
                            {/* <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom02">
                                <Form.Label>Category</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        name="category"
                                        required
                                        onChange={handleChange}
                                        value={state.category}
                                        as="select"
                                    >
                                        <option value='HousingTenancy' >========================</option>
                                        <option value='HousingTenancy' >Housing/Tenancy</option>
                                        <option value='Risk' >Risk</option>
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
                            </Form.Group> */}
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom03">
                                <Form.Label>Identified Risk</Form.Label>
                                {errors.identified_risk && errors.identified_risk.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control
                                        name="identified_risk"
                                        value={state.identified_risk}
                                        as="textarea"
                                        type="text"
                                        onChange={handleChange}
                                    >
                                    </Form.Control>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom04">
                                <Form.Label>Details</Form.Label>
                                {errors.details && errors.details.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control
                                        as="textarea"
                                        type="text"
                                        name="details"
                                        onChange={handleChange}
                                        value={state.details}
                                    >

                                    </Form.Control>
                                </InputGroup>
                            </Form.Group>
                            {JSON.stringify(selected_resident) === '{}' &&
                                <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom07">
                                    <Form.Label>Resident</Form.Label>
                                    {errors.resident && errors.resident.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                    <InputGroup>
                                        <Form.Control as="select" onChange={handleChange}
                                            name="resident"
                                            required
                                            value={state.resident}
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
                                <Form.Label>Information Sources Used</Form.Label>
                                {errors.information_sources_used && errors.information_sources_used.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <InputGroup>
                                    <Form.Control
                                        name="information_sources_used"
                                        required
                                        as="select"
                                        onChange={handleChange}
                                        value={state.information_sources_used}
                                        placeholder="Information Sources Used"
                                    >
                                        <option value='HousingTenancy' >========================</option>
                                        <option value='APPLICANT' >APPLICANT</option>
                                        <option value='CARERS/FRIENDS' >CARERS/FRIENDS</option>
                                        <option value='REFERRER' >REFERRER</option>
                                        <option value='OTHER AGENCIES'> OTHER AGENCIES</option>
                                    </Form.Control>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom07">
                                <Form.Label>Is Further Information Needed</Form.Label>
                                {errors.is_further_information_needed && errors.is_further_information_needed.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <Form.Check
                                    name="is_further_information_needed"
                                    value={state.is_further_information_needed}
                                    type="checkbox"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom07">
                                <Form.Label>Discontinue Evaluation</Form.Label>
                                {errors.discontinue && errors.discontinue.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                                <Form.Check
                                    name="discontinue"
                                    value={true}
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