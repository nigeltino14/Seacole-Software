import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { deleteApi, getApi } from '../../../../api/api'
import { noteActions } from '../../../../store/note'
import { staffActions } from '../../../../store/staff'
import { residentActions } from '../../../../store/resident'
import { Modal } from 'react-bootstrap';
import NoteEdit from '../../../modals/NoteEdit';
import Swal from 'sweetalert2'
import dateToYMD from '../../../utils/dates'
import { selectedStaff, selectedResident, addEmojis } from '../../../utils/expand'
import ProtectedRoute from '../../../protected/ProtectedRoute'
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import { print } from '../../../utils/pdf-export'


const Reportlist = () => {
    const [showEdit, setshowEdit] = useState(false)
    const selected_resident = useSelector((state) => state.resident.selectedResident)
    const [diplay_notes, setDisplayNotes] = useState([])
    const [showDelete, setshowDelete] = useState("")
    const staff_list = useSelector((state) => state.staff.staffList)
    const staff = [...staff_list]
    const note = useSelector((state) => state.note.noteList)
    const token = useSelector((state) => state.auth.token).token
    const dispatch = useDispatch()
    const residents = useSelector((state) => state.resident.residentList)

    const handleCloseEdit = () => {
        setshowEdit(false)
    }

    const handleDelete = (id) => {
        const note_list = [...note]
        const selected = note_list.find(item => item.id === id);
        Swal.fire({
            title: 'Are you sure you to delete :?',
            text: `Note : ${selected.subject} `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(function (result) {
            if (result.value) {
                deleteApi(_ => {
                    Swal.fire('Deleted!', 'Report has been deleted.', 'success');
                    setshowDelete(id)
                }, token, '/api/note/', selected.id)
            }
        });
    }
    const columns = [

        { name: "Number", selector: "id", sortable: true },
        { name: "Subject", selector: "subject", sortable: true },
        { name: "Description", selector: "description", sortable: true },
        { name: "Note Type", selector: "type_of_note", sortable: true },
        {
            name: "Resident", cell: row => <div data-tag="allowRowEvents" >
                <div >
                    {selectedResident(row.resident, residents)}
                </div>
            </div>, sortable: true
        },
        {
            name: "Emotion", cell: row => <div data-tag="allowRowEvents" >
                <span>{addEmojis(row.emotion)}</span>
            </div>, sortable: true
        },
        {
            name: "Staff", cell: row => <div data-tag="allowRowEvents" >
                <div >
                    {selectedStaff(row.staff, staff)}
                </div>
            </div>, sortable: true
        },
        {
            name: "Date Entered", cell: row => <div data-tag="allowRowEvents" >
                <div >
                    {dateToYMD(row.created_on)}                </div>
            </div>, sortable: true
        },

    ];
    const tableData = {
        columns,
        data: diplay_notes,
    };
    useEffect(() => {
        getApi(response => { dispatch(noteActions.setNote(response.data)) }, token, "/api/note")
        getApi(response => { dispatch(staffActions.setStaff(response.data)) }, token, "/api/staff")
        getApi(response => { dispatch(residentActions.setResidents(response.data)) }, token, "/api/resident")
    }, [dispatch, token, showDelete, showEdit])

    useEffect(() => {
        if (JSON.stringify(selected_resident) === '{}') {
            setDisplayNotes(note)
        } else {
            const data = note.filter(item => item.resident === selected_resident.national_id)
            setDisplayNotes(data)
        }
    }, [dispatch, token, note, selected_resident])
    return (
        <div className="col-xl-12 col-md-12">
            <div className="ms-panel ms-panel-fh">
                <div className="ms-panel-body">
                    <div className="ms-panel-header ms-panel-custome">
                        <h6>Notes</h6>
                        <Link to="#" onClick={print}>
                            <i className='fa fa-print ms-text-info  mr-4' />
                        </Link>
                        <ProtectedRoute perm="add_note">
                            <Link to="/note/add-note">Write Note</Link>
                        </ProtectedRoute>
                    </div>
                    <div className="ms-panel-body">
                        <div className="thead-primary datatables">

                            <DataTableExtensions {...tableData} print={false} export={false} >
                                <DataTable
                                    columns={columns}
                                    data={diplay_notes}
                                    pagination
                                    responsive={true}
                                    striped
                                    noHeader
                                />
                            </DataTableExtensions>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showEdit} className="ms-modal-dialog-width ms-modal-content-width" onHide={handleCloseEdit} centered>
                <Modal.Header className="ms-modal-header-radius-0">
                    <h4 className="modal-title text-white">Edit Note</h4>
                    <button type="button" className="close text-white" onClick={handleCloseEdit}>x</button>
                </Modal.Header>
                <Modal.Body className="p-0 text-left">
                    <NoteEdit handleClose={handleCloseEdit} />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Reportlist;