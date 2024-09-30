import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import EditPlan from '../../../modals/EditPlan';
import '../../../../assets/css/PlanStyle.css';
import AddPlanEvaluation from "../../payment/addpayment/AddPlanEvaluation";
import { planActions } from '../../../../store/supportPlans';
import { planEvaluationActions} from "../../../../store/planevaluations";
import PlanEvaluations from "../../payment/addpayment/PlanEvaluations";
import { getApi, deleteApi, putApi } from '../../../../api/api';
import { selectedResident, selectedStaff } from '../../../utils/expand';
import dateToYMD from '../../../utils/dates';
import ProtectedRoute from '../../../protected/ProtectedRoute';
import Swal from 'sweetalert2';
import PrintButton from '../../../utils/print';

const Addform = () => {
    const [activeModal, setActiveModal] = useState(null);
    const [display_plans, setDisplayPlans] = useState([]);
    const token = useSelector((state) => state.auth.token).token;
    const plans = useSelector((state) => state.plan.planList);
    const evaluations = useSelector((state) => state.evaluation.evaluations);
    const selected_resident = useSelector((state) => state.resident.selectedResident);
    const staff = useSelector((state) => state.staff.staffList);
    const residents = useSelector((state) => state.resident.residentList);
    const [showDelete, setShowDelete] = useState("");
    const dispatch = useDispatch();
    const [selectedPlan, setSelectedPlan] = useState(null);
    const user = useSelector((state) => state.auth.user);
    const [selectedEvaluations, setSelectedEvaluations] = useState([]);



    /*const handleRowClick = (row) => {
        setSelectedPlan(row);
    };*/

    const getEvaluationColor = (dateString) => {
        const today = new Date();
        const evaluationDate = new Date(dateString);

        today.setHours(0, 0, 0, 0);
        evaluationDate.setHours(0, 0, 0, 0);

        if (evaluationDate < today) {
            return 'red'; // Evaluation date has passed
        } else if (evaluationDate.toDateString() === today.toDateString()) {
            return 'blue'; // Evaluation date is today
        } else {
            return 'green'; // Evaluation date is in the future
        }
    };

    const columns = [
        {
            name: 'Evaluations', cell: row =>
                <ProtectedRoute perm="view_planevaluation">
                        <Link to='#' onClick={(event) => {
                            event.stopPropagation();
                            handleShowEvaluations(row);
                        }}>
                            <i className='fas fa-eye ms-text-info mr-4' />
                        </Link>
                    </ProtectedRoute>
        },
        {
            name: "Title", selector: "title", sortable: true
        },
        { name: "Category", selector: "category", sortable: true },
        //{ name: "Action Plan", selector: "action_plan", sortable: true },
        { name: "Approved By", selector: "approved_by", sortable: true},

        //{ name: "CP Duration", selector: "cp_duration", sortable: true},
        { name: "Care Rating", selector: "care_rating", sortable: true},
        //{ name: "By Who", selector: "by_who", sortable: true },
        //{ name: "By When", selector: "by_when", sortable: true },
        //{ name: "Goal", selector: "goal", sortable: true },
        //{ name: "Achievements", selector: "achievements", sortable: true },
        {
            name: "Resident", cell: row =>
                <div>
                    {selectedResident(row.resident, residents)}
                </div>, sortable: true
        },
        {
            name: "Staff", cell: row =>
                <div>
                    {selectedStaff(row.created_by, staff)}
                </div>, sortable: true
        },
        {
            name: "Created on", cell: row =>
                <div>
                    {dateToYMD(row.created_on)}
                </div>, sortable: true
        },
        {
            name: "Last Reviewed", cell: row =>
                <div>
                    {dateToYMD(row.last_evaluated_date)}
                </div>, sortable: true
        },
        {
            name: "Date of Next Evaluation", cell: row =>
                <div style={{ color: getEvaluationColor(row.next_assement_date) }}>
                    {dateToYMD(row.next_assement_date)}
                </div>, sortable: true
        },
        {
            name: "", cell: row =>
                <div>
                    <button
                        onClick={(event) => {
                            event.stopPropagation();
                            handleShowDetails(row.id);
                        }}
                    >
                        View Details
                    </button>
                </div>, sortable:  true
        },
        {
            name: "", cell: row =>
                <div data-tag="allowRowEvents">
                    <ProtectedRoute perm="chnage_supportplan">
                        <Link to='#' onClick={(event) => {
                            event.stopPropagation();
                            handleShowEdit(row.id);
                        }}>
                            <i className='fas fa-pencil-alt ms-text-info  mr-4'/>
                        </Link>
                    </ProtectedRoute>
                    <ProtectedRoute perm="delete_supportplan">
                        <Link to='#' onClick={(event) => {
                           event.stopPropagation();
                            handleDelete(row.id);
                        }}>

                        </Link>
                    </ProtectedRoute>
                    <ProtectedRoute perm="view_planevaluation">
                        <Link to='#'  onClick={(event) => {
                            event.stopPropagation();
                            handleShowAddPlanEvaluation(event, row);
                        }}>
                            <i className='fas fa-plus ms-text-info mr-4' />
                        </Link>
                    </ProtectedRoute>

                    <ProtectedRoute perm="delete_supportplan">
                        <Link to='#' onClick={ () => handleArchive(row.id)}>
                            <i className='fas fa-archive ms-text-info mr-4' />
                        </Link>
                    </ProtectedRoute>
                </div>, sortable: true
        },
    ];

    /*const handleCloseEdit = () => {
        setShowEdit(false);
    };*/

    /*const handleCloseDetails = () => {
        setShowDetails(false);
    };*/

    console.log('Selected Plan:', selectedPlan);


    const handleShowEdit = (id) => {
        const selected_plan = plans.find(item => item.id === id);
        setSelectedPlan(selected_plan);
        setActiveModal("edit");
    };

    const handleShowDetails = (id) => {
        const selected_plan = plans.find(item => item.id === id);
        console.log("handleShowDetails: selected_plan", selected_plan);
        setSelectedPlan(selected_plan);
        dispatch(planActions.setSelectedPlans(selected_plan));
        setActiveModal("details");
    };

    const handleShowAddPlanEvaluation = (event, row) => {
        event.stopPropagation();  // Prevent triggering row actions
        const selected_plan = plans.find(item => item.id === row.id);
        setSelectedPlan(selected_plan);
        setActiveModal("addEvaluation");
    };


    const handleShowEvaluations = (plan) => {
        console.log("Selected Plan ID:", plan.id);
        console.log("handleShowEvaluations: selected_plan", plan);
        if (plan && plan.id) {
            setSelectedPlan(plan);
            dispatch(planEvaluationActions.fetchPlanEvaluations(token, plan.id));  // Fetch evaluations for the selected plan
            setActiveModal("viewEvaluations")
        }
    };

    const handleDelete = (id) => {
        const selected = plans.find(item => item.id === id);
        Swal.fire({
            title: 'Are you sure you to delete :?',
            text: `Support Plan for : ${selectedStaff(selected.staff, staff)}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(function (result) {
            if (result.value) {
                deleteApi(r => {
                    Swal.fire('Deleted!', 'Support Plan has been deleted.', 'success');
                    setShowDelete(id);
                }, token, '/api/plan/', selected.id);
            }
        });
    };

    const handleArchive = (id) => {
        const plan_list = [...plans];
        const selected = plan_list.find(item => item.id === id);
        Swal.fire({
            title: 'Are you sure to delete this Support plan?',
            text: 'This might be a permanent action',
            input: 'text',
            inputPlaceholder: 'Write reason for deletion here',
            inputValidator: (value) => {
                if (!value) {
                    return 'Please provide a reason!';
                }
            },
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                const reason = Swal.getInput().value;
                const temp_note = { is_deleted: true, deletion_reason: reason };
                const userId = user.id;
                putApi(
                    () => {
                        setDisplayPlans((prevDisplayPlans) => prevDisplayPlans.filter((item) => item.id !== id));
                        Swal.fire('Deleted', 'Support Plan has been archived.', 'success');
                    },
                    token,
                    `/api/plan/`,
                    { ...temp_note },
                    id
                );
            }
        });
    };

    // Filter plans based on 'deletion' status
    const filteredPlans = display_plans.filter((item) => item.is_deleted !== true);

    const tableData = {
        columns,
        data: filteredPlans,
    };

    useEffect(() => {
        getApi(response => {
            dispatch(planActions.setPlans(response.data));
        }, token, "/api/plan");

        if (selectedPlan) {
            getApi(response => {
                setSelectedEvaluations(response.data);
            }, token, `/api/support-plan/${selectedPlan.id}/evaluations`);
        }

    }, [dispatch, token, showDelete, selectedPlan]);

    useEffect(() => {
        if (JSON.stringify(selected_resident) === '{}') {
            setDisplayPlans(plans);
        } else {
            const data = plans.filter(item => item.resident === selected_resident.national_id);
            setDisplayPlans(data);
        }
    }, [dispatch, token, plans, selected_resident]);






    // SelectedSupportPlanModal Component
    const SelectedSupportPlanModal = () => {
        if (!selectedPlan) {
            return null;
        }

        /*const onClose = () => {
            setSelectedPlan(null);
            setShowEdit(false);
        };*/

        const careRatingColors = {
            "Low": "green",
            "Medium": "blue",
            "High": "red",
    // Add more ratings and colors as needed
        };

        const getCareRatingColor = (rating) => {
             return careRatingColors[rating] || "black"; // Default to black if rating is not found
        };

        return (
            <Modal show={activeModal === "details"} className="ms-modal-dialog-width ms-modal-content-width custom-modal" onHide={() => setActiveModal(null)} centered>
                <Modal.Header className="ms-modal-header-radius-0 custom-modal-header">
                    <table className="table table-bordered border style={{ borderColor: 'black' }}">
                        <thead>
                            <tr style={{ borderColor: 'red' }}>
                                <td style={{ borderColor: 'orangered', fontSize: '20px', backgroundColor: 'black', color: 'white' }}>SEACOLE HEALTHCARE</td>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                        <tr style={{borderColor: 'red'}}>
                            <td style={{
                                borderColor: 'orangered',
                                fontSize: '16px',
                                color: 'whitesmoke',
                                backgroundColor: 'black'
                            }}>Support Plan
                            </td>
                        </tr>
                        <tr style={{borderColor: 'red'}}>
                            <td style={{
                                borderColor: 'orangered',
                                fontSize: '16px',
                                backgroundColor: 'black',
                                color: 'whitesmoke'
                            }}>Date recorded: {dateToYMD(selectedPlan.created_on)}</td>
                        </tr>
                        <tr style={{borderColor: 'red'}}>
                            <td style={{
                                borderColor: 'orangered',
                                fontSize: '16px',
                                backgroundColor: 'black',
                                color: 'whitesmoke'
                            }}>Next Evaluation Date: {dateToYMD(selectedPlan.next_assement_date)}</td>
                        </tr>
                        <tr style={{
                            borderColor: 'orangered',
                            fontSize: '20px',
                            color: 'red',
                            backgroundColor: 'black'
                        }}>
                            <button type="button" className="custom-close-button no-print" onClick={() => setActiveModal(null)}>Close
                            </button>
                        </tr>
                        <tr style={{
                            borderColor: 'black',
                            fontSize: '20px',
                            color: 'red',
                            backgroundColor: 'black',
                            border: 'orangered'
                        }}>
                            <PrintButton style={{backgroundColor: 'black', color: 'red', border: 'black'}}/>
                        </tr>
                        </tbody>
                    </table>
                </Modal.Header>
                <Modal.Body style={{padding: '20px', fontSize: '16px', lineHeight: '1.5'}}>
                    <table className="plan-table">
                        <tbody>
                        <tr className="table-active">
                                <td>Resident</td>
                                <td>{`${selectedPlan.firstname} ${selectedPlan.lastname}`}</td>
                            </tr>
                            <tr>
                                <td>Title</td>
                                <td>{selectedPlan.title}</td>
                            </tr>
                            <tr>
                                <td>Category</td>
                                <td>{selectedPlan.category}</td>
                            </tr>
                            <tr>
                                <td>Approved By</td>
                                <td>{selectedPlan.approved_by}</td>
                            </tr>
                            <tr>
                                <td>Care Rating</td>
                                <td style={{ color: getCareRatingColor(selectedPlan.care_rating) }}>{selectedPlan.care_rating}</td>
                            </tr>
                            <tr>
                                <td>Care Plan Duration</td>
                                <td>{selectedPlan.cp_duration}</td>
                            </tr>
                            <tr>
                                <td>Issue</td>
                                <td>{selectedPlan.issue}</td>
                            </tr>
                            <tr>
                                <td>Action Plan</td>
                                <td>{selectedPlan.action_plan}</td>
                            </tr>
                            <tr>
                                <td>By who</td>
                                <td>{selectedPlan.by_who}</td>
                            </tr>
                            <tr>
                                <td>Key-worker</td>
                                <td>{`${selectedPlan.name_first} ${selectedPlan.name_last}`}</td>
                            </tr>
                            <tr>
                                <td>By When</td>
                                <td>{selectedPlan.by_when}</td>
                            </tr>
                            <tr>
                                <td>Goal</td>
                                <td>{selectedPlan.goal}</td>
                            </tr>
                            <tr>
                                <td>Achievements</td>
                                <td>{selectedPlan.achievements}</td>
                            </tr>
                            <tr>
                                <td>Next Evaluation Date</td>
                                <td>{dateToYMD(selectedPlan.next_assement_date)}</td>
                            </tr>
                            <tr>
                                <td>Last Evaluated</td>
                                <td>{dateToYMD(selectedPlan.last_evaluated_date)}</td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
            </Modal>
        );
    };

    return (
        <div className="ms-panel">
            <div className="ms-panel-header ms-panel-custome">
                <h6>Support Plans</h6>
                <ProtectedRoute perm="add_supportplan">
                    <Link to="/supportplan/add-supportplan">Add Plan</Link>
                </ProtectedRoute>
            </div>
            <div className="ms-panel-body">
                <div className="thead-primary datatables">
                    <DataTableExtensions {...tableData} print={false} export={false}>
                        <DataTable
                            columns={tableData.columns}
                            data={filteredPlans}
                            pagination
                            responsive={true}
                            striped
                            noHeader
                            //onRowClicked={handleRowClick}
                        />
                    </DataTableExtensions>
                </div>
                <SelectedSupportPlanModal onClose={() => setActiveModal(false)} />

            </div>
            <Modal show={activeModal === "edit"} className="ms-modal-dialog-width ms-modal-content-width" onHide={() => setActiveModal(null)} centered>
                <Modal.Header className="ms-modal-header-radius-0">
                    <tr>
                        <button type="button" className="close text-white" onClick={() => setActiveModal(null)}>Close</button>
                    </tr>

                </Modal.Header>
                <Modal.Body className="p-0 text-left">
                    <EditPlan handleClose={() => setActiveModal(null)}/>
                </Modal.Body>
            </Modal>

            <Modal show={activeModal === "addEvaluation"} onHide={() => setActiveModal(null)}>
            <Modal.Header closeButton>
                <Modal.Title>Add Evaluation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddPlanEvaluation plan={selectedPlan} handleClose={() => setActiveModal(null)}/>
            </Modal.Body>
        </Modal>
        <Modal show={activeModal === "viewEvaluations"} onHide={() => setActiveModal(null)}>
            <PlanEvaluations
                show={activeModal === "viewEvaluations"}
                handleClose={() => setActiveModal(false)}
                plan={selectedPlan}
                evaluations={selectedEvaluations}
            />
        </Modal>

        </div>
    );
};

export default Addform;
