import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import { data } from '../../../data/patientlist';
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'react-bootstrap';
import AppointmentEdit from '../../../modals/AppointmentEdit';
import { appointmentActions } from '../../../../store/appointment'
import { homeActions } from '../../../../store/home'
import Swal from 'sweetalert2'
import { selectedResident, selectedStaff } from '../../../utils/expand'
import dateToYMD from '../../../utils/dates'
import { deleteApi, getApi } from '../../../../api/api'
import ProtectedRoute from '../../../protected/ProtectedRoute'

const Appointmentlist = () => {
    const [showEdit, setshowEdit] = useState(false)
    const [showDelete, setshowDelete] = useState("false")
    const appointments = useSelector((state) => state.appointment.appointmentList)
    const staff_list = useSelector((state) => state.staff.staffList)
    const resident_list = useSelector((state) => state.resident.residentList)
    const token = useSelector((state) => state.auth.token).token
    const residents = [...resident_list]
    const staff = [...staff_list]

    const handleShowEdit = (id) => {
        const appointment_list = [...appointments]
        const selected = appointment_list.find(item => item.id === id);
        dispatch(appointmentActions.setSelectedSelected(selected))
        setshowEdit(true)
    }
    const handleCloseEdit = () => {
        setshowEdit(false)
    }
    const handleDelete = (id) => {
        const appointment_list = [...appointments]
        const selected = appointment_list.find(item => item.id === id);
        Swal.fire({
            title: 'Are you sure you to delete :?',
            text: `Appointment  : ${selected.description}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(function (result) {
            if (result.value) {
                deleteApi(_ => {
                    Swal.fire('Deleted!', 'Appointment has been deleted.', 'success');
                    setshowDelete(selected.id)
                }, token, '/api/appointment/', selected.id)
            }
        });
    }
    
    const columns = [
        { name: "ID", selector: "id", sortable: true },
        {
            name: "Resident", cell: row =>
                <div >
                    {selectedResident(row.resident, residents)}
                </div>, sortable: true
        },
        {
            name: "Staff", cell: row =>
                <div >
                    {selectedStaff(row.staff, staff)}
                </div>, sortable: true
        },
        { name: "Description", selector: "description", sortable: true },
        {
            name: "Start Time", cell: row =>
                <div >
                    {dateToYMD(row.start_time)}
                </div>, sortable: true
        },
        {
            name: "Start Time", cell: row =>
                <div >
                    {dateToYMD(row.due_time)}
                </div>, sortable: true
        },
        { name: "Status", selector: "status", sortable: true },
        {
            name: "Action", cell: row =>
                <div data-tag="allowRowEvents" >
                    <ProtectedRoute perm="chnage_appointment">
                        <Link to='#' onClick={() => handleShowEdit(row.id)}>
                            <i className='fas fa-pencil-alt ms-text-info  mr-4' />
                        </Link>
                    </ProtectedRoute>
                    <ProtectedRoute perm="delete_appointment">
                        <Link to='#' onClick={() => { handleDelete(row.id) }}>
                            <i className='far fa-trash-alt ms-text-danger  mr-4' />
                        </Link>
                    </ProtectedRoute>
                </div>, sortable: true
        },
    ];

    const tableData = {
        columns,
        data: appointments,
    };
    const dispatch = useDispatch()
    useEffect(() => {
        getApi(response => { dispatch(homeActions.setHome(response.data)) }, token, "/api/home")
        getApi(response => { dispatch(appointmentActions.setAppointments(response.data)) }, token, "/api/appointment")
    }, [dispatch, showDelete, showEdit, token])

    return (
        <div className="ms-panel">
            <div className="ms-panel-header ms-panel-custome">
                <h6>Appointment List</h6>
                <ProtectedRoute perm="add_appointment">
                    <Link to="/appointment/add-appointment">Add Appointment</Link>
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
                    <h4 className="modal-title text-white">Edit Appointment</h4>
                    <button type="button" className="close text-white" onClick={handleCloseEdit}>x</button>
                </Modal.Header>
                <Modal.Body className="p-0 text-left">
                    <AppointmentEdit handleClose={handleCloseEdit} />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Appointmentlist;


