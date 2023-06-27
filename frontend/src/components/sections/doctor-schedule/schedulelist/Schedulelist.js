import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Form, InputGroup, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { residentActions } from '../../../../store/resident'
import { bathActions } from '../../../../store/bath'
import { weightActions } from '../../../../store/weight'
import { fluidIntakeActions } from '../../../../store/fluidIntake'
import { moodActions } from '../../../../store/mood'
import { sleepActions } from '../../../../store/sleep'
import { careActions } from '../../../../store/care'
import { afternoonRoutineActions } from '../../../../store/afternoonRoutine'
import { morningRoutineActions } from '../../../../store/morningRoutine'
import { incidentActions } from '../../../../store/incident'
import { getApi } from '../../../../api/api'
import { selectedResident, selectedStaff, addEmojis } from '../../../utils/expand'
import dateToYMD from '../../../utils/dates'



const Schedulelist = () => {

    const residents = useSelector((state) => state.resident.residentList)
    const showCare = useSelector((state) => state.care.care)
    const staff = useSelector((state) => state.staff.staffList)
    const fluids = useSelector((state) => state.fluidIntake.fluidIntakeList)
    const moods = useSelector((state) => state.mood.moodList)
    const sleep = useSelector((state) => state.sleep.sleepList)
    const weights = useSelector((state) => state.weight.weightList)
    const morningRoutine = useSelector((state) => state.morningRoutine.morningRoutineList)
    const afternoonRoutine = useSelector((state) => state.afternoonRoutine.afternoonRoutineList)
    const incident = useSelector((state) => state.incident.incidentList)
    const selected_resident = useSelector((state) => state.resident.selectedResident)
    const selectedBaths = useSelector((state) => state.resident.selectedBaths)
    const selectedWeights = useSelector((state) => state.resident.selectedWeights)
    const selectedFluids = useSelector((state) => state.resident.selectedFluids)
    const selectedMoods = useSelector((state) => state.resident.selectedMoods)
    const selectedSleeps = useSelector((state) => state.resident.selectedSleeps)
    const selectedMorningRoutines = useSelector((state) => state.resident.selectedMorningRoutine)
    const selectedAfternoonRoutines = useSelector((state) => state.resident.selectedAfternoonRoutine)
    const selectedIncident = useSelector((state) => state.resident.selectedIncident)

    const token = useSelector((state) => state.auth.token).token

    const dispatch = useDispatch();
    const [tableData, setTableData] = useState({ columns: [], data: [] });
    const [present_care, setPresentCare] = useState();
    const [fromdate, setFromDate] = useState(Date.now());
    const [todate, setToDate] = useState(Date.now());




    const weight_columns = [
        {
            name: "Created On", cell: row =>
                <div >
                    {dateToYMD(row.created_on)}
                </div>, sortable: true
        },
        {
            name: "Resident", cell: row =>
                <div >
                    {selectedResident(row.resident, residents)}
                </div>, sortable: true
        },
        {
            name: "Recorded By", cell: row =>
                <div >
                    {selectedStaff(row.staff, staff)}
                </div>, sortable: true
        },

        { name: "Weight", selector: "weight", sortable: true },
        { name: "Additional Infomation", selector: "additional_info", sortable: true },
        {
            name: "Emotion", cell: row =>
                <div >
                    {addEmojis(row.emotion)}
                </div>, sortable: true
        },

    ];

    const mood_columns = [
        {
            name: "Created On", cell: row =>
                <div >
                    {dateToYMD(row.created_on)}
                </div>, sortable: true
        },
        {
            name: "Resident", cell: row =>
                <div >
                    {selectedResident(row.resident, residents)}
                </div>, sortable: true
        },
        {
            name: "Recorded By", cell: row =>
                <div >
                    {selectedStaff(row.staff, staff)}
                </div>, sortable: true
        },
        { name: "Additional Infomation", selector: "additional_info", sortable: true },
        {
            name: "Emotion", cell: row =>
                <div >
                    {addEmojis(row.emotion)}
                </div>, sortable: true
        },
    ];

    const sleep_columns = [
        {
            name: "Created On", cell: row =>
                <div >
                    {dateToYMD(row.created_on)}
                </div>, sortable: true
        },
        {
            name: "Resident", cell: row =>
                <div >
                    {selectedResident(row.resident, residents)}
                </div>, sortable: true
        },
        {
            name: "Recorded By", cell: row =>
                <div >
                    {selectedStaff(row.staff, staff)}
                </div>, sortable: true
        },

        { name: "Hours Slept", selector: "amount", sortable: true },
        { name: "Additional Infomation", selector: "additional_info", sortable: true },
        {
            name: "Emotion", cell: row =>
                <div >
                    {addEmojis(row.emotion)}
                </div>, sortable: true
        },
    ];


    const fluid_columns = [
        {
            name: "Created On", cell: row =>
                <div >
                    {dateToYMD(row.created_on)}
                </div>, sortable: true
        },
        {
            name: "Resident", cell: row =>
                <div >
                    {selectedResident(row.resident, residents)}
                </div>, sortable: true
        },
        {
            name: "Recorded By", cell: row =>
                <div >
                    {selectedStaff(row.staff, staff)}
                </div>, sortable: true
        },

        { name: "Amount Offered", selector: "amount_offered", sortable: true },
        { name: "Amount Taken", selector: "amount", sortable: true },
        { name: "Type Of Fluid", selector: "type_of_fluid", sortable: true },
        { name: "Additional Infomation", selector: "additional_info", sortable: true },
        { name: "Additional Infomation", selector: "additional_info", sortable: true },
        {
            name: "Emotion", cell: row =>
                <div >
                    {addEmojis(row.emotion)}
                </div>, sortable: true
        },];

    const morningRoutine_columns = [
        {
            name: "Created On", cell: row =>
                <div >
                    {dateToYMD(row.created_on)}
                </div>, sortable: true
        },
        {
            name: "Resident", cell: row =>
                <div >
                    {selectedResident(row.resident, residents)}
                </div>, sortable: true
        },
        {
            name: "Recorded By", cell: row =>
                <div >
                    {selectedStaff(row.staff, staff)}
                </div>, sortable: true
        },

        { name: "Washing", selector: "washing", sortable: true },
        { name: "Shaving ", selector: "shaving", sortable: true },
        { name: "Oral Care ", selector: "oral_care", sortable: true },
        { name: "Toilet Use", selector: "toilet_use", sortable: true },
        { name: "Getting Up ", selector: "getting_up", sortable: true },
        { name: "Getting Dressed ", selector: "getting_dressed", sortable: true },
        { name: "Additional Infomation", selector: "additional_info", sortable: true },
        {
            name: "Emotion", cell: row =>
                <div >
                    {addEmojis(row.emotion)}
                </div>, sortable: true
        },
    ];

    const afternoonRoutine_columns = [
        {
            name: "Created On", cell: row =>
                <div >
                    {dateToYMD(row.created_on)}
                </div>, sortable: true
        },
        {
            name: "Resident", cell: row =>
                <div >
                    {selectedResident(row.resident, residents)}
                </div>, sortable: true
        },
        {
            name: "Recorded By", cell: row =>
                <div >
                    {selectedStaff(row.staff, staff)}
                </div>, sortable: true
        },

        { name: "Washing", selector: "washing", sortable: true },
        { name: "Shaving ", selector: "shaving", sortable: true },
        { name: "Oral Care ", selector: "oral_care", sortable: true },
        { name: "Toilet Use", selector: "toilet_use", sortable: true },
        { name: "Getting Up ", selector: "getting_up", sortable: true },
        { name: "Getting Dressed ", selector: "getting_dressed", sortable: true },
        { name: "Additional Infomation", selector: "additional_info", sortable: true },
        {
            name: "Emotion", cell: row =>
                <div >
                    {addEmojis(row.emotion)}
                </div>, sortable: true
        },
    ];

    const incident_columns = [
        { name: "Ref  Number", selector: "id", sortable: true },
        {
            name: "Created On", cell: row =>
                <div>
                    {dateToYMD(row.created_on)}
                </div>, sortable: true
        },
        {
            name: "Resident", cell: row =>
                <div>
                    {selectedResident(row.resident, residents)}
                </div>, sortable: true
        },
        {
            name: "Recorded By", cell: row =>
                <div >
                    {selectedStaff(row.staff, staff)}
                </div>, sortable: true
        },

        { name: "Type", selector: "report_type", sortable: true },
        { name: "Subject ", selector: "subject", sortable: true },
        { name: "Notes  ", selector: "follow_up_notes", sortable: true },
        { name: "Action ", selector: "future_preventative_action", sortable: true },
        { name: "Action Taken ", selector: "action_taken", sortable: true },
        { name: "Details", selector: "inident_details", sortable: true },
        { name: "Location", selector: "location", sortable: true },
        { name: "Date Occured", selector: "date_occured", sortable: true },
        { name: "Review Date", selector: "next_assement_date", sortable: true },
        { name: "Status", selector: "status", sortable: true },

    ];


    useEffect(() => {
        getApi(response => { dispatch(residentActions.setResidents(response.data)) }, token, "/api/resident")
        getApi(response => { dispatch(bathActions.setBaths(response.data)) }, token, "/api/bath")
        getApi(response => { dispatch(weightActions.setWeight(response.data)) }, token, "/api/weight")
        getApi(response => { dispatch(fluidIntakeActions.setFluidIntake(response.data)) }, token, "/api/fluid-intake")
        getApi(response => { dispatch(moodActions.setMoods(response.data)); }, token, "/api/mood")
        getApi(response => { dispatch(sleepActions.setSleep(response.data)) }, token, "/api/sleep")
        getApi(response => { dispatch(morningRoutineActions.setMorningRoutine(response.data)) }, token, "/api/morning-routine")
        getApi(response => { dispatch(afternoonRoutineActions.setAfternoonRoutine(response.data)) }, token, "/api/afternoon-routine")
        getApi(response => { dispatch(incidentActions.setIncident(response.data)); }, token, "/api/suggestion")

    }, [dispatch, token])



    useEffect(() => {
        if (showCare.fluidIntake === true) {
            setPresentCare("Fluid-Intake")
            setTableData({
                columns: fluid_columns,
                data: selectedFluids,
            })
        } if (showCare.weight === true) {
            setPresentCare("Weight")
            setTableData({
                columns: weight_columns,
                data: selectedWeights,
            })

        } if (showCare.mood === true) {
            setPresentCare("Mood")
            setTableData({
                columns: mood_columns,
                data: selectedMoods,

            })
        } if (showCare.sleep === true) {
            setPresentCare("Sleep")
            setTableData({
                columns: sleep_columns,
                data: selectedSleeps,
            })
        } if (showCare.morningRoutine === true) {
            setPresentCare("Morning-Routine")
            setTableData({
                columns: morningRoutine_columns,
                data: selectedMorningRoutines,
            })
        } if (showCare.afternoonRoutine === true) {
            setPresentCare("Afternoon-Routine")
            setTableData({
                columns: afternoonRoutine_columns,
                data: selectedAfternoonRoutines,
            })
        } if (showCare.incident === true) {
            setPresentCare("Incident")
            setTableData({
                columns: incident_columns,
                data: selectedIncident,

            })
        }
    }, [showCare, selectedWeights, selectedBaths, selectedFluids, selectedMoods, selectedSleeps, selected_resident,
        selectedMorningRoutines, selectedAfternoonRoutines, selectedIncident])

    useEffect(() => {
        if (JSON.stringify(selected_resident) === '{}') {
            dispatch(residentActions.setWeights(weights));
            dispatch(residentActions.setFluids(fluids));
            dispatch(residentActions.setMoods(moods))
            dispatch(residentActions.setSleeps(sleep))
            dispatch(residentActions.setMorningRoutine(morningRoutine));
            dispatch(residentActions.setAfternoonRoutine(afternoonRoutine));
            dispatch(residentActions.setIncident(incident))

        } else {
            const selected_weights = weights.filter(item => item.resident === selected_resident.national_id)
            const selected_fluid = fluids.filter(item => item.resident === selected_resident.national_id)
            const selected_moods = moods.filter(item => item.resident === selected_resident.national_id)
            const selected_sleep = sleep.filter(item => item.resident === selected_resident.national_id)
            const selected_morningRoutine = morningRoutine.filter(item => item.resident === selected_resident.national_id)
            const selected_afternoonRoutine = afternoonRoutine.filter(item => item.resident === selected_resident.national_id)
            const selected_incident = incident.filter(item => item.resident === selected_resident.national_id)

            dispatch(residentActions.setWeights(selected_weights));
            dispatch(residentActions.setFluids(selected_fluid));
            dispatch(residentActions.setMoods(selected_moods))
            dispatch(residentActions.setSleeps(selected_sleep))
            dispatch(residentActions.setMorningRoutine(selected_morningRoutine))
            dispatch(residentActions.setAfternoonRoutine(selected_afternoonRoutine));
            dispatch(residentActions.setIncident(selected_incident))
        }

    }, [selected_resident])

    const handleChange = (event) => {
        switch (event.target.name) {
            case 'resident':
                if (event.target.value === 'all') {
                    dispatch(residentActions.setSelectedResident({}))
                } else {
                    const resident_list = [...residents]
                    const resident = resident_list.find(item => item.national_id === event.target.value);
                    dispatch(residentActions.setSelectedResident(resident))
                }
                break;

            case 'fromdate':
                setFromDate(event.target.value)
                break;

            case 'todate':
                setToDate(event.target.value)
                break;

            default:
        }
    }

    const handleCare = (event) => {

        switch (event.target.value) {
            case 'Fluid-Intake':
                dispatch(careActions.setCare({
                    weight: false, bath: false,
                    mood: false, sleep: false,
                    fluidIntake: true, morningRoutine: false,
                    afternoonRoutine: false,
                    incident: false,
                }))
                break;
            case 'Weight':
                dispatch(careActions.setCare({
                    bath: false,
                    mood: false, sleep: false,
                    fluidIntake: true,
                    weight: true, morningRoutine: false,
                    afternoonRoutine: false,
                    incident: false,
                }))
                break;
            case 'Mood':

                dispatch(careActions.setCare({
                    weight: false, bath: false,
                    mood: true, sleep: false,
                    fluidIntake: false, morningRoutine: false,
                    afternoonRoutine: false,
                    incident: false,
                }))
                break;
            case 'Sleep':
                dispatch(careActions.setCare({
                    weight: false, bath: false,
                    mood: false, sleep: true,
                    fluidIntake: false, morningRoutine: false,
                    afternoonRoutine: false,
                    incident: false,
                }))
                break;
            case 'Morning-Routine':

                dispatch(careActions.setCare({
                    weight: false, bath: false,
                    mood: false, sleep: false,
                    fluidIntake: false, morningRoutine: true,
                    afternoonRoutine: false,
                    incident: false,
                }))
                break;
            case 'Afternoon-Routine':
                dispatch(careActions.setCare({
                    weight: false, bath: false, mood: false,
                    sleep: false, fluidIntake: false,
                    morningRoutine: false,
                    afternoonRoutine: true,
                    incident: false,
                }))
                break;
            case 'Incident':
                dispatch(careActions.setCare({
                    weight: false,
                    mood: false, sleep: false,
                    fluidIntake: false,
                    bath: true, morningRoutine: false,
                    afternoonRoutine: false,
                    incident: true,
                }))
                break;
            default:
        }
    }


    return (
        <div className="ms-panel">
            <div className="ms-panel-header ms-panel-custome">
                <h6>Handover : {present_care}</h6>
            </div>
            <div className="ms-panel-header ms-panel-custome">

                <Form>
                    <Form.Row>
                        <Form.Group as={Col} md="3" className="mb-3" controlId="validationCustom01">
                            <Form.Label>Resident </Form.Label>
                            <InputGroup>
                                <Form.Control as="select" onChange={handleChange}
                                    name="resident" value={selected_resident.national_id ? selected_resident.national_id : 'all'} >
                                    <option key="2a" value="all" > All </option>
                                    {residents.map(resident => (
                                        <option key={resident.national_id} value={resident.national_id}>{resident.first_name} {resident.last_name}</option>
                                    ))}
                                </Form.Control>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="3" className="mb-3" controlId="validationCustom01">
                            <Form.Label>Selected Care</Form.Label>
                            <Form.Control as="select"
                                name="careType"
                                value={present_care}
                                onChange={handleCare}
                            >
                                <option>-- Select Care --</option>
                                <option value="Weight">Weight</option>
                                <option value="Sleep">Sleep</option>
                                <option value="Mood">Mood</option>
                                <option value="Morning-Routine">Morning Routine</option>
                                <option value="Afternoon-Routine">Afternoon Routine</option>
                                <option value="Incident">Incidents</option>
                                <option value="Fluid-Intake">Fluid Intake</option>
                                <option value="Bath">Bath</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="3" className="mb-3" controlId="validationCustom10">
                            <Form.Label>From Date</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    name="fromdate"
                                    required
                                    onChange={handleChange}
                                    value={fromdate}
                                    type="date"
                                    placeholder="From Date"
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="3" className="mb-3" controlId="validationCustom10">
                            <Form.Label>To Date</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    name="todate"
                                    required
                                    onChange={handleChange}
                                    value={todate}
                                    type="date"
                                    placeholder="To Date"
                                />
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </div>
            <div className="ms-panel-body">
                <div className="thead-primary datatables">
                    <DataTable
                        columns={tableData.columns}
                        data={tableData.data}
                        pagination
                        responsive={true}
                        noHeader
                        striped
                    />
                </div>
            </div>
        </div>
    );
}



export default Schedulelist;