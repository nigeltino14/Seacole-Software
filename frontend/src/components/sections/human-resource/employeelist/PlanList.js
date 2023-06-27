import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'react-bootstrap';
import EditPlan from '../../../modals/EditPlan';
import { planActions } from '../../../../store/supportPlans'
import { getApi, deleteApi } from '../../../../api/api'
import { selectedResident, selectedStaff } from '../../../utils/expand'
import dateToYMD from '../../../utils/dates'
import ProtectedRoute from '../../../protected/ProtectedRoute'
import Swal from 'sweetalert2'


const Addform = () => {
    const [showEdit, setShowEdit] = useState(false)
    const [showDetails, setShowDetails] = useState(false)
    const token = useSelector((state) => state.auth.token).token
    const plans = useSelector((state) => state.plan.planList)
    const selected_resident = useSelector((selected_resident) => selected_resident.resident.selectedResident)
    const staff = useSelector((state) => state.staff.staffList)
    const residents = useSelector((state) => state.resident.residentList)
    const [showdelete, setshowdelete] = useState("")
    const dispatch = useDispatch()

    const columns = [
        {
            name: "Title", cell: row =>
                <Link to='#' onClick={() => handleShowDetails(row.id)}>{row.title}
                </Link>, sortable: true

        },
        { name: "Category", selector: "category", sortable: true },
        { name: "Action Plan", selector: "action_plan", sortable: true },
        { name: "By Whom", selector: "by_whom", sortable: true },
        { name: "By When", selector: "by_when", sortable: true },
        { name: "Goal", selector: "goal", sortable: true },
        { name: "Achievements", selector: "achievements", sortable: true },
        {
            name: "Resident", cell: row =>
                <div >
                    {selectedResident(row.resident, residents)}
                </div>, sortable: true
        },
        {
            name: "Staff", cell: row =>
                <div >
                    {selectedStaff(row.created_by, staff)}
                </div>, sortable: true
        },
        {
            name: "Created on", cell: row =>
                <div >
                    {dateToYMD(row.created_on)}
                </div>, sortable: true
        },
        {
            name: "Action", cell: row =>
                <div data-tag="allowRowEvents" >
                    <ProtectedRoute perm="chnage_supportplan">
                        <Link to='#' onClick={() => handleShowEdit(row.id)}>
                            <i className='fas fa-pencil-alt ms-text-info  mr-4' />
                        </Link>
                    </ProtectedRoute>
                    <ProtectedRoute perm="delete_supportplan">
                        <Link to='#' onClick={() => { handleDelete(row.id) }}>
                            <i className='far fa-trash-alt ms-text-danger  mr-4' />
                        </Link>
                    </ProtectedRoute>
                </div>, sortable: true

        },
    ];

    const tableData = {
        columns: columns,
        data: plans,
    };

    const handleCloseEdit = () => {
        setShowEdit(false)
    }
    const handleCloseDEtails = () => {
        setShowEdit(false)
    }

    const handleShowEdit = (id) => {
        const selected_plan = plans.find(item => item.id === id)
        dispatch(planActions.setSelectedPlans(selected_plan))
        setShowEdit(true)
    }
    const handleShowDetails = (id) => {
        const selected_plan = plans.find(item => item.id === id)
        dispatch(planActions.setSelectedPlans(selected_plan))
        setShowDetails(true)
    }

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
                    setshowdelete(id)
                }, token, '/api/plan/', selected.id)
            }
        });
    }


    useEffect(() => {
        getApi(response => { dispatch(planActions.setPlans(response.data)); }, token, "/api/plan")
    }, [dispatch, token, showdelete])

    return (
        <div className="ms-panel">
            <div className="ms-panel-header ms-panel-custome">
                <h6>Support Plans : {selected_resident.first_name} {selected_resident.last_name}</h6>
                <ProtectedRoute perm="add_supportplan">
                    <ProtectedRoute perm="add_supportplan">
                        <Link to="/supportplan/add-supportplan">Add Plan</Link>
                    </ProtectedRoute>
                </ProtectedRoute>
            </div>
            <div className="ms-panel-body">
                <div className="thead-primary datatables">
                    <DataTableExtensions {...tableData} print={false} export={false}>
                        <DataTable
                            columns={tableData.columns}
                            data={tableData.data}
                            pagination
                            responsive={true}
                            striped
                            noHeader
                        />
                    </DataTableExtensions>
                </div>
            </div>
            <Modal show={showEdit} className="ms-modal-dialog-width ms-modal-content-width" onHide={handleCloseEdit} centered>
                <Modal.Header className="ms-modal-header-radius-0">
                    <h4 className="modal-title text-white">Edit Plan</h4>
                    <button type="button" className="close text-white" onClick={handleCloseEdit}>x</button>
                </Modal.Header>
                <Modal.Body className="p-0 text-left">
                    <EditPlan handleClose={handleCloseEdit} />
                </Modal.Body>
            </Modal>
            <Modal show={showDetails} className="ms-modal-dialog-width ms-modal-content-width" onHide={handleCloseDEtails} centered>
                <Modal.Header className="ms-modal-header-radius-0">
                    <h4 className="modal-title text-white">Plan Information</h4>
                    <button type="button" className="close text-white" onClick={handleCloseDEtails}>x</button>
                </Modal.Header>
                <Modal.Body className="p-0 text-left">
                    <EditPlan handleClose={handleCloseDEtails} />
                </Modal.Body>
            </Modal>
        </div>


    );
}


export default Addform;

