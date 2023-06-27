import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import { data } from '../../../data/patientlist';
import { useDispatch, useSelector } from 'react-redux'
import { getApi, putApi, deleteApi } from '../../../../api/api'
import { staffActions } from '../../../../store/staff'
import { Modal } from 'react-bootstrap';
import StaffEdit from '../../../modals/StaffEdit';
import { homeActions } from '../../../../store/home'
import Swal from 'sweetalert2'
import ProtectedRoute from '../../../protected/ProtectedRoute'
import { print } from '../../../utils/pdf-export'

const Doctorlist = () => {
    const [showEdit, setshowEdit] = useState(false)
    const [refresh, setRefresh] = useState("")
    const [showdelete, setshowdelete] = useState("")
    const staff = useSelector((state) => state.staff.staffList)
    const token = useSelector((state) => state.auth.token).token
    const dispatch = useDispatch()

    const handleShowEdit = (id) => {
        const staff_list = [...staff]
        const selected = staff_list.find(item => item.id === id);
        dispatch(staffActions.setSelectedStaff(selected))
        setshowEdit(true)
    }
    const handleCloseEdit = () => {
        setshowEdit(false)
    }
    const handleDelete = (id) => {
        const staff_list = [...staff]
        const selected = staff_list.find(item => item.id === id);
        Swal.fire({
            title: 'Are you sure you to delete :?',
            text: `Staff  : ${selected.first_name} ${selected.last_name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(function (result) {
            if (result.value) {
                deleteApi(_ => {
                    Swal.fire('Deleted!', 'Staff has been deleted.', 'success');
                    setshowdelete(id)
                }, token, '/api/staff/', selected.id)
            }
        });
    }
    const handleArchive = (id) => {
        const staff_list = [...staff]
        const selected = staff_list.find(item => item.id === id);
        if (selected.is_active === false) {
            const temp_staff = { is_active: true }
            Swal.fire({
                title: 'Are you sure you to Enable :?',
                text: `Staff  : ${selected.first_name} ${selected.last_name}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, enable it!'
            }).then(function (result) {
                if (result.value) {
                    putApi(_ => { Swal.fire('Enable!', 'Staff has been disabled.', 'success') }, token, `/api/staff/`, temp_staff, selected.id)
                }
                setRefresh(selected.national_id);
            });
        } else {
            const temp_staff = { is_active: false }
            Swal.fire({
                title: 'Are you sure you to Disable :?',
                text: `Staff  : ${selected.first_name} ${selected.last_name}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, disable it!'
            }).then(function (result) {
                if (result.value) {
                    putApi(_ => { Swal.fire('Disable!', 'Staff has been disabled.', 'success') }, token, `/api/staff/`, temp_staff, selected.id)
                }
                setRefresh(selected.national_id);
            });
        }
    }
    const sweetalertautoclose = (title) => {
        var timerInterval = void 0;
        Swal.fire({
            title: title,
            html: '',
            timer: 1000,
            onBeforeOpen: function onBeforeOpen() {
                Swal.showLoading();
                timerInterval = setInterval(function () {
                }, 100);
            },
            onClose: function onClose() {
                clearInterval(timerInterval);
            }
        }).then(function (result) {
            if (
                result.dismiss === Swal.DismissReason.timer);
        });
    }
    const columns = [
        {
            name: "Name", cell: row => <div data-tag="allowRowEvents" >
                <img src={row.profile_pic} style={{ width: '30px', borderRadius: '50%', marginRight: '5px' }} alt={row.email} />
                {row.first_name} {row.last_name}
            </div>, sortable: true
        },
        { name: "Next of Kin", selector: "next_of_kin", sortable: true },
        { name: "Gender", selector: "gender", sortable: true },
        { name: "Mobile", selector: "mobile", sortable: true },
        {
            name: "Email", cell: row => <div data-tag="allowRowEvents" >
                <Link to={"/mailto:someone@yoursite.com"} rel="noopener noreferrer">
                    {row.email}
                </Link>
            </div>, sortable: true
        },
        {
            name: "Groups", cell: row => <div data-tag="allowRowEvents" >
                {row.groups.map(item => <span key={item.id}>
                    <ProtectedRoute perm="view_group">
                        <Link to="/group"> {item.name}{" "}</Link>
                    </ProtectedRoute>
                </span>)}
            </div>, sortable: true
        },
        {
            name: "Active", cell: row =>
                <div>
                    <label className="ms-switch">
                        <input type="checkbox" id={row.id} value={row.id} checked={row.is_active} onChange={() => handleArchive(row.id)} />
                        <span className="ms-switch-slider round" />
                    </label>                </div>
            , sortable: true
        },
        {
            name: "Action", cell: row =>
                <div data-tag="allowRowEvents" >
                    <ProtectedRoute perm="change_user">
                        <Link to='#' onClick={() => handleShowEdit(row.id)}>
                            <i className='fas fa-pencil-alt ms-text-info mr-4' />
                        </Link>
                    </ProtectedRoute>
                    <Link to='#' onClick={() => { handleDelete(row.id) }}>
                        <i className='far fa-trash-alt ms-text-danger mr-4' />
                    </Link>
                </div>, sortable: true

        },
    ];
    const tableData = {
        columns,
        data: staff,
    };
    useEffect(() => {
        getApi(response => { dispatch(homeActions.setHome(response.data)) }, token, "/api/home")
        getApi(response => { dispatch(staffActions.setStaff(response.data)) }, token, "/api/staff")
    }, [showdelete, showEdit, refresh, token, dispatch])

    return (
        <div className="ms-panel">
            <div className="ms-panel-header ms-panel-custome">
                <h6>Staff List</h6>
                <Link to="#" onClick={print}>
                    <i className='fa fa-print ms-text-info  mr-4' />
                </Link>
                <ProtectedRoute perm="add_user">
                    <Link to="/staff/add-staff">Add Staff</Link>
                </ProtectedRoute>
            </div>
            <div className="ms-panel-body">
                <div className="thead-primary datatables">

                    <DataTableExtensions {...tableData} print={false} export={false} >
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
                    <h4 className="modal-title text-white">Edit Staff</h4>
                    <button type="button" className="close text-white" onClick={handleCloseEdit}>x</button>
                </Modal.Header>
                <Modal.Body className="p-0 text-left">
                    <StaffEdit handleClose={handleCloseEdit} />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Doctorlist;


