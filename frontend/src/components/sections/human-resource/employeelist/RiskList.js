import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'react-bootstrap';
import EditRisk from '../../../modals/EditRisk';
import { riskActions } from '../../../../store/riskAssessment'
import { getApi, deleteApi } from '../../../../api/api'
import { selectedResident, selectedStaff } from '../../../utils/expand'
import Swal from 'sweetalert2'
import ProtectedRoute from '../../../protected/ProtectedRoute'
import PrintButton from '../../../utils/print'

const Addform = () => {
    const [showEdit, setShowEdit] = useState(false)
    const [showDetails, setShowDetails] = useState(false)
    const [showDelete, setShowDelete] = useState("")
    const token = useSelector((state) => state.auth.token).token
    const risks = useSelector((state) => state.risk.riskList)
    const selected_resident = useSelector((selected_resident) => selected_resident.resident.selectedResident)
    const staff = useSelector((state) => state.staff.staffList)
    const residents = useSelector((state) => state.resident.residentList)
    const dispatch = useDispatch()
    const [selectedrisk, setSelectedrisk] = useState(null);

    const handleRowClick = (row) => {
        setSelectedrisk(row);
    };
    
    const columns = [
        {
            name: "Title", cell: row =>
                <Link to='#' onClick={() => handleShowDetails(row.id)}>{row.title}
                </Link>, sortable: true

        }, { name: "Category", selector: "category", sortable: true },
        { name: "Identified Risk", selector: "identified_risk", sortable: true },
        { name: "Details", selector: "details", sortable: true },
        { name: "Triggers", selector: "triggers", sortable: true },
        { name: "Support Needs", selector: "support_needs", sortable: true },
        { name: "Information Sources", selector: "information_sources_used", sortable: true },
        // { name: "Yes/No", selector: "yes_no", sortable: true },
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
            name: "Action", cell: row =>
                <div data-tag="allowRowEvents" >
                    <ProtectedRoute perm="change_riskactionplan">
                        <Link to='#' onClick={_ => handleShowEdit(row.id)}>
                            <i className='fas fa-pencil-alt ms-text-info  mr-4' />
                        </Link>
                    </ProtectedRoute>
                    <ProtectedRoute perm="delete_riskactionplan">
                        <Link to='#' onClick={() => { handleDelete(row.id) }}>
                            <i className='far fa-trash-alt ms-text-danger  mr-4' />
                        </Link>
                    </ProtectedRoute>
                </div>, sortable: true

        },
    ];

    const tableData = {
        columns: columns,
        data: risks,
    };
    const handleShowDetails = (id) => {
        const selected_risk = risks.find(item => item.id === id)
        dispatch(riskActions.setSelectedrisk(selected_risk))
        setShowDetails(true)
    }
    const handleCloseDEtails = () => {
        setShowEdit(false)
    }

    const handleCloseEdit = () => {
        setShowEdit(false)
    }
    const handleShowEdit = (id) => {
        const selected_risk = risks.find(item => item.id === id)
        dispatch(riskActions.setSelectedrisk(selected_risk))
        setShowEdit(true)
    }
    const handleDelete = (id) => {
        const selected = risks.find(item => item.id === id);
        Swal.fire({
            title: 'Are you sure you to delete :?',
            text: `Risk Assessment : ${selected.title}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(function (result) {
            if (result.value) {
                deleteApi(_ => {
                    Swal.fire('Deleted!', 'Risk Assessment  has been deleted.', 'success');
                    setShowDelete(selected.id)
                }, token, '/api/risk/', selected.id)
            }
        });
    }

    useEffect(() => {
        getApi(response => { dispatch(riskActions.setRisk(response.data)); }, token, "/api/risk")
    }, [dispatch, token, showEdit, showDelete])

//The function below allows for the selection of a certain risk to see in detail
    const SelectedRiskModal = () => {
        if (!selectedrisk) {
            return null;
        }

    const onClose = () => {
        setSelectedrisk(null);
        setShowEdit(false);
    };

        return (
            <Modal show={true} className="ms-modal-dialog-width ms-modal-content-width" onHide={onClose} centered>
                <Modal.Header className="ms-modal-header-radius-0">
                 <div>
                   <h1 style={{ fontSize: '24px', marginBottom: '0' }}>Seacole Health</h1>
                    <h4 className="modal-title text-white">Selected Risk</h4>
                    <p>Date recorded: {selectedrisk.created_on}</p>
                 </div>
                    <button type="button" className="close text-red w-20 mr-2" onClick={onClose}>x</button>
                    <PrintButton />
                </Modal.Header>
                <Modal.Body style={{ padding: '20px', fontSize: '16px', lineHeight: '1.5' }}>
                    <div>
                        <h5>Risk statement for: {selectedrisk.resident}</h5>
                        <p>Risk Identified: {selectedrisk.identified_risk}</p>
                        <p>Risk details: {selectedrisk.details}</p>
                        <p>Any triggers: {selectedrisk.triggers}</p>
                        <p>Support needed: {selectedrisk. support_needs}</p>
                        <p>Furhter info needed: {selectedrisk.is_further_information_needed}</p>
                        <p>Staff responsible: {selectedrisk.created_by}</p>
                        
                        {/* Display other note details here */}
                    </div>
                </Modal.Body>
            </Modal>
        );
    };
  
    return (
        <div className="ms-panel">
            <div className="ms-panel-header ms-panel-custome">
                <h6>Risk Assessment : {selected_resident.first_name} {selected_resident.last_name}</h6>
                <ProtectedRoute perm="add_riskactionplan">
                    <Link to="/riskassessment/add-riskassessment">Start Risk Assessment</Link>
                </ProtectedRoute>
                <PrintButton /> 
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
                            onRowClicked={handleRowClick}
                        />
                    </DataTableExtensions>
                </div>
                 <SelectedRiskModal onClose={() => setShowEdit(false)} />
            </div>
            <Modal show={showEdit} className="ms-modal-dialog-width ms-modal-content-width" onHide={handleCloseEdit} centered>
                <Modal.Header className="ms-modal-header-radius-0">
                    <h4 className="modal-title text-white">Edit Risk Assessment </h4>
                    <button type="button" className="close text-white" onClick={handleCloseEdit}>x</button>
                </Modal.Header>
                <Modal.Body className="p-0 text-left">
                    <EditRisk handleClose={handleCloseEdit} />
                </Modal.Body>
            </Modal>
            <Modal show={showDetails} className="ms-modal-dialog-width ms-modal-content-width" onHide={handleCloseDEtails} centered>
                <Modal.Header className="ms-modal-header-radius-0">
                    <h4 className="modal-title text-white">Plan Information</h4>
                    <button type="button" className="close text-white" onClick={handleCloseDEtails}>x</button>
                </Modal.Header>
                <Modal.Body className="p-0 text-left">
                    <EditRisk handleClose={handleCloseDEtails} />
                </Modal.Body>
            </Modal>
       
        </div>


    );
}


export default Addform;