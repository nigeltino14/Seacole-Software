import React, { useState } from 'react';
import { Form, InputGroup, Button, Col } from 'react-bootstrap';
import { postApi } from '../../api/api'
import { useDispatch, useSelector } from 'react-redux'
import { planActions } from '../../store/supportPlans'


const EditQuestion = (props) => {
    const [validated, setValidated] = useState(false);
    const token = useSelector((state) => state.auth.token).token
    const residents = useSelector((state) => state.resident.residentList)
    const selected_plan = useSelector((state) => state.plan.selectedPlan)
    const dispatch = useDispatch()
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            postApi(_ => { props.handleClose() }, token, `/api/plan/`, selected_plan)
        }

        setValidated(true);
    };


    const handleChange = (event) => {
        switch (event.target.name) {

            case 'title':
                dispatch(planActions.setSelectedPlans({
                    ...selected_plan,
                    title: event.target.value
                }))
                break;

            case 'category':
                dispatch(planActions.setSelectedPlans({
                    ...selected_plan,
                    category: event.target.value
                }))
                break;

            case 'identified_risk':
                dispatch(planActions.setSelectedPlans({

                    ...selected_plan,
                    identified_risk: event.target.value
                }))
                break;

            case 'details':
                dispatch(planActions.setSelectedPlans({

                    ...selected_plan,
                    details: event.target.value
                }))
                break;

            case 'resident':
                dispatch(planActions.setSelectedPlans({

                    ...selected_plan,
                    resident: event.target.value
                }))
                break;


            case 'information_sources_used':
                dispatch(planActions.setSelectedPlans({

                    ...selected_plan,
                    information_sources_used: event.target.value
                }))
                break;

            case 'assesment_date':
                dispatch(planActions.setSelectedPlans({

                    ...selected_plan,
                    assesment_date: event.target.value
                }))
                break;

            case 'is_further_information_needed':
                dispatch(planActions.setSelectedPlans({

                    ...selected_plan,
                    is_further_information_needed: event.target.value
                }))
                break;

            case 'yes_no':
                dispatch(planActions.setSelectedPlans({

                    ...selected_plan,
                    yes_no: event.target.value
                }))
                break;

            default:


        }

    }


    return (
        <div className="col-xl-12 col-md-12">
            <div className="ms-panel ms-panel-bshadow-none">
                <div className="ms-panel-header">

                </div>
                <div className="ms-panel-body">
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom01">
                                <Form.Label>Title</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        name="title"
                                        onChange={handleChange}
                                        required
                                        value={selected_plan.title}
                                        type="text"
                                        as="textarea"
                                        rows={3} placeholder="Title"
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom02">
                                <Form.Label>Category</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        name="category"
                                        required
                                        onChange={handleChange}
                                        value={selected_plan.category}
                                        as="select"
                                    >
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
                                        <option value='ServicesprovidedbyHousingorEselected_planManagementService' >Services provided by Housing or Eselected_plan Management Service</option>
                                        <option value='ServicesprovidedbySupportWorker' >Services provided by Support Worker</option>
                                        <option value='SupportWorkersViewsofIssuesNeedsorActions' >Support Worker's Views of Issues, Needs or Actions</option>
                                    </Form.Control>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom03">
                                <Form.Label>Issue</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        name="issue"
                                        value={selected_plan.issue}
                                        as="textarea"
                                        type="text"
                                        onChange={handleChange}
                                    >
                                    </Form.Control>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom04">
                                <Form.Label>Action Plan</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        as="textarea"
                                        type="text"
                                        name="action_plan"
                                        onChange={handleChange}
                                        value={selected_plan.action_plan}
                                    >

                                    </Form.Control>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom04">
                                <Form.Label>Resident</Form.Label>
                                <InputGroup>
                                    <Form.Control as="select" onChange={handleChange}
                                        name="resident"
                                        value={selected_plan.resident}
                                    >
                                        <option key="2a" > ------------- </option>
                                        {residents.map(user => (
                                            <option key={user.national_id} value={user.national_id}>{user.first_name} {user.last_name}</option>
                                        ))}
                                    </Form.Control>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom07">
                                <Form.Label>By Whom</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        name="by_whom"
                                        required
                                        as="textarea"
                                        type="text"
                                        onChange={handleChange}
                                        value={selected_plan.by_whom}
                                        placeholder="By Whom"
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom07">
                                <Form.Label>By Who</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        name="by_who"
                                        required
                                        onChange={handleChange}
                                        value={selected_plan.by_who}
                                        type="text"
                                        as="textarea"
                                        placeholder="Assesment Date"
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom07">
                                <Form.Label>By When</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        name="by_when"
                                        required
                                        onChange={handleChange}
                                        value={selected_plan.by_when}
                                        type="text"
                                        as="textarea"
                                        placeholder="By When"
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom07">
                                <Form.Label>Goal</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        name="goal"
                                        required
                                        onChange={handleChange}
                                        value={selected_plan.goal}
                                        type="text"
                                        as="textarea"
                                        placeholder="Goal"
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom07">
                                <Form.Label>Goal</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        name="achievements"
                                        required
                                        onChange={handleChange}
                                        value={selected_plan.achievements}
                                        type="text"
                                        as="textarea"
                                        placeholder="Achievements"
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Button type="submit" className="mt-4 d-inline w-20">Save</Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default EditQuestion;