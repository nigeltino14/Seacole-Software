import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import { data } from '../../../data/patientlist';
import { useDispatch, useSelector } from 'react-redux'
import { getApi, deleteApi } from '../../../../api/api'
import { Modal } from 'react-bootstrap';
import SuggestionEdit from '../../../modals/SuggestionEdit';
import { suggestionActions } from '../../../../store/suggestion'
import Swal from 'sweetalert2'
import { selectedStaff, selectedHome, selectedFamily } from '../../../utils/expand'
import dateToYMD from '../../../utils/dates'
import ProtectedRoute from '../../../protected/ProtectedRoute'

const SuggestionList = () => {
    const [showEdit, setshowEdit] = useState(false)
    const [showDelete, setshowDelete] = useState("")
    const suggestions = useSelector((state) => state.suggestion.suggestionList)
    const staff_list = useSelector((state) => state.staff.staffList)
    const staff = [...staff_list]
    const token = useSelector((state) => state.auth.token).token
    const home_list = useSelector((state) => state.home.homeList)
    const family = useSelector((state) => state.family.familyList)
    const homes = [...home_list]
    const handleShowEdit = (id) => {
        const suggestions_list = [...suggestions]
        const selected = suggestions_list.find(item => item.id === id);
        dispatch(suggestionActions.setSelectedSuggestion(selected))
        setshowEdit(true)
    }
    const handleCloseEdit = () => {
        setshowEdit(false)
    }
    const handleDelete = (id) => {
        const suggestions_list = [...suggestions]
        const selected = suggestions_list.find(item => item.id === id);
        Swal.fire({
            title: 'Are you sure you to delete :?',
            text: `Suggestion  : ${selected.subject}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(function (result) {
            if (result.value) {
                deleteApi(_ => {
                    Swal.fire('Deleted!', 'Suggestion has been deleted.', 'success');
                    setshowDelete(id)
                }, token, '/api/suggestion/', selected.id)
            }
        });
    }
    const columns = [
        {
            name: "Created On", cell: row =>
                <div >
                    {dateToYMD(row.created_on)}
                </div>, sortable: true
        },
        { name: "Subject", selector: "subject", sortable: true },
        { name: "Follow Up Notes", selector: "follow_up_notes", sortable: true },
        { name: "Future  Action", selector: "future_preventative_action", sortable: true },
        { name: "Review Date", selector: "next_assement_date", sortable: true },
        { name: "Action Taken", selector: "action_taken", sortable: true },
        {
            name: "Home", cell: row =>
                <div >
                    {selectedHome(row.location, homes)}
                </div>, sortable: true
        },
        {
            name: "Staff", cell: row =>
                <div >
                    {selectedStaff(row.staff, staff)}
                </div>, sortable: true
        }, {
            name: "Action", cell: row =>
                <div data-tag="allowRowEvents" >
                    <ProtectedRoute perm="change_suggestioncomplains">
                        <Link to='#' onClick={() => handleShowEdit(row.id)}>
                            <i className='fas fa-pencil-alt ms-text-info  mr-4' />
                        </Link>
                    </ProtectedRoute>
                    <ProtectedRoute perm="delete_suggestioncomplains">
                        <Link to='#' onClick={() => { handleDelete(row.id) }}>
                            <i className='far fa-trash-alt ms-text-danger  mr-4' />
                        </Link>
                    </ProtectedRoute>
                </div>, sortable: true
        },
    ];

    const tableData = {
        columns,
        data: suggestions,
    };
    const dispatch = useDispatch()
    useEffect(() => {
        getApi(response => {
            dispatch(suggestionActions.setSuggestions(response.data));
        }, token, "/api/suggestion")
    }, [dispatch, token, showDelete])
    return (
        <div className="ms-panel">
            <div className="ms-panel-header ms-panel-custome">
                <h6>Accident/Incident</h6>
                <ProtectedRoute perm="add_suggestioncomplains">
                    <Link to="/suggesion/add-suggestion">Add Accident & Incident</Link>
                </ProtectedRoute>
            </div>
            <div className="ms-panel-body">
                <div className="thead-primary datatables">
                    <DataTableExtensions {...tableData} print={false} export={false}>
                        <DataTable
                            columns={columns}
                            data={data}
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
                    <h4 className="modal-title text-white">Edit Suggestion</h4>
                    <button type="button" className="close text-white" onClick={handleCloseEdit}>x</button>
                </Modal.Header>
                <Modal.Body className="p-0 text-left">
                    <SuggestionEdit handleClose={handleCloseEdit} />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default SuggestionList;


