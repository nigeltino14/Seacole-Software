import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import { data } from '../../../data/patientlist';
import { useDispatch, useSelector } from 'react-redux';
import { getApi, putApi, deleteApi } from '../../../../api/api';
import { staffActions } from '../../../../store/staff';
import { Modal } from 'react-bootstrap';
import StaffEdit from '../../../modals/StaffEdit';
import { homeActions } from '../../../../store/home';
import Swal from 'sweetalert2';
import ProtectedRoute from '../../../protected/ProtectedRoute';
import { print } from '../../../utils/pdf-export';
import { genderActions } from '../../../../store/gender';
import GenderFilter from '../../../modals/GenderFilter';
import html2pdf from 'html2pdf.js';


const Doctorlist = () => {
    const [showEdit, setShowEdit] = useState(false);
    const [refresh, setRefresh] = useState("");
    const [showDelete, setShowDelete] = useState("");
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [selectedGender, setSelectedGender] = useState("");
    const staff = useSelector((state) => state.staff.staffList);
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();


    const [deletionReason, setDeletionReason] = useState('');
    const [enableReason, setEnableReason] = useState('');

    const handleShowEdit = (id) => {
        const selected = staff.find(item => item.id === id);
        dispatch(staffActions.setSelectedStaff(selected));
        setSelectedStaff(selected);
        setShowEdit(true);
    };

    const handleCloseEdit = () => {
        setShowEdit(false);
    };

    const handleRowClick = (row) => {
        setSelectedStaff(row);
        setShowEdit(true);
    };
    const saveAsPDF = () => {
        const element = document.getElementById('SelectedStaffModal'); // ID of the container element
        html2pdf().from(element).save();
    };

    const handleDelete = (id) => {
        const selected = staff.find(item => item.id === id);
        Swal.fire({
            title: 'Are you sure you want to delete?',
            text: `Staff: ${selected.first_name} ${selected.last_name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteApi(() => {
                    Swal.fire('Deleted!', 'Staff has been deleted.', 'success');
                    setShowDelete(id);
                }, token, '/api/staff/', selected.id);
            }
        });
    };

    const handleArchive = (id) => {
        const selected = staff.find(item => item.id === id);
        if (selected.is_active === false) {
            Swal.fire({
                title: 'Are you sure you want to enable?',
                text: `Staff: ${selected.first_name} ${selected.last_name}`,
                input: 'text',
                inputPlaceholder: 'Please provide a reason for enabling...',
                inputValidator: (value) => {
                   if (!value) {
                     return 'You need to provide a reason!';
                   }
                },
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, enable it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    const reason = result.value;
                    const tempStaff = { is_active: true, enable_reason: reason };
                    putApi(() => {
                        Swal.fire('Enabled!', 'Staff has been enabled.', 'success');
                        setRefresh(selected.national_id);
                    }, token, `/api/staff/`, tempStaff, selected.id);
                }
            });
        } else {
            Swal.fire({
                title: 'Are you sure you want to disable?',
                text: `Staff: ${selected.first_name} ${selected.last_name}`,
                input: 'text',
                inputPlaceholder: 'Please provide a reason for disabling...',
                inputValidator: (value) => {
                   if (!value) {
                     return 'You need to provide a reason!';
                   }
                },
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, disable it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    const reason = result.value;
                    const tempStaff = { is_active: false, deletion_reason: reason };
                    putApi(() => {
                        Swal.fire('Disabled!', 'Staff has been disabled.', 'success');
                        setRefresh(selected.national_id);
                    }, token, `/api/staff/`, tempStaff, selected.id);
                }
            });
        }
    };

    useEffect(() => {
        let apiUrl = '/api/staff';
        if (selectedGender) {
            apiUrl += `?gender=${selectedGender}`;
        }
        getApi(response => { dispatch(homeActions.setHome(response.data)) }, token, "/api/home");
        getApi(response => { dispatch(staffActions.setStaff(response.data)) }, token, apiUrl);
    }, [selectedGender, showDelete, showEdit, refresh, token, dispatch]);

    const handleGenderChange = (event) => {
        const newSelectedGender = event.target.value;
        setSelectedGender(newSelectedGender);
        const filteredStaff = staff.filter(item => !newSelectedGender || item.gender === newSelectedGender);
        dispatch(staffActions.setStaff(filteredStaff));
    };

    const SelectedStaffModal = () => {
        if (!selectedStaff) {
            return null;
        }

        const onClose = () => {
            setSelectedStaff(null);
            setShowEdit(false);
        };

        return (
            <Modal show={true} className="ms-modal-dialog-width ms-modal-content-width" onHide={onClose}  style={{display:'flex', position:'fixed', background:'whitesmoke', }}>
                <Modal.Header className="ms-modal-header-radius-0" style={{background:'lightgreen', color:'antiquewhite', justifyContent:'space-between',}} >
                    <div>
                        <h1 className="modal-title" style={{fontSize: '24px', marginBottom: '0'}}>Seacole
                            Healthcare</h1>
                        <h4 className="modal-title text-white">Staff Details</h4>
                        <button onClick={saveAsPDF}>Save as PDF</button>


                    </div>
                    <button type="button" className="close text-red w-20 mr-2" onClick={onClose}>x</button>
                </Modal.Header>
                <Modal.Body style={{ background: 'white', padding: '5px', fontSize: '24px', lineHeight: '2.5' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {staff.map((staff, index) => (
                            <div key={staff.id} style={{ background:  'black', padding: '5px', border: '1px solid black'}}>
                                <Modal.Body style={{ padding: '5px', fontSize: '24px', lineHeight: '2.0' }}>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ border: '1px solid black', background: 'lightgreen', padding: '5px', marginBottom: '5px' }}>
            <p style={{ margin: '0' }}>First Name: {selectedStaff.first_name}</p>
        </div>
        <div style={{ border: '1px solid black', background: 'white', padding: '5px', marginBottom: '5px' }}>
            <p style={{ margin: '0' }}>Last Name: {selectedStaff.last_name}</p>
        </div>
        <div style={{ border: '1px solid black', background: 'lightgreen', padding: '5px', marginBottom: '5px' }}>
            <p style={{ margin: '0' }}>Email: {selectedStaff.email}</p>
        </div>
        <div style={{ border: '1px solid black', background: 'white', padding: '5px', marginBottom: '5px' }}>
            <p style={{ margin: '0' }}>Gender: {selectedStaff.gender}</p>
        </div>
        <div style={{ border: '1px solid black', background: 'lightgreen', padding: '5px', marginBottom: '5px' }}>
            <p style={{ margin: '0' }}>Address: {selectedStaff.address}</p>
        </div>
        <div style={{ border: '1px solid black', background: 'white', padding: '5px', marginBottom: '5px' }}>
            <p style={{ margin: '0' }}>Nationality: {selectedStaff.nationality}</p>
        </div>
        <div style={{ border: '1px solid black', background: 'lightgreen', padding: '5px', marginBottom: '5px' }}>
            <p style={{ margin: '0' }}>Category: {selectedStaff.category}</p>
        </div>
        <div style={{ border: '1px solid black', background: 'white', padding: '5px', marginBottom: '5px' }}>
            <p style={{ margin: '0' }}>NI Number: {selectedStaff.NI_number}</p>
        </div>
        <div style={{ border: '1px solid black', background: 'lightgreen', padding: '5px', marginBottom: '5px' }}>
            <p style={{ margin: '0' }}>Mobile: {selectedStaff.mobile}</p>
        </div>
        <div style={{ border: '1px solid black', background: 'white', padding: '5px', marginBottom: '5px' }}>
            <p style={{ margin: '0' }}>Start Date: {selectedStaff.start_date}</p>
        </div>
        <div style={{ border: '1px solid black', background: 'lightgreen', padding: '5px', marginBottom: '5px' }}>
            <p style={{ margin: '0' }}>Location: {selectedStaff.location}</p>
        </div>
        <div style={{ border: '1px solid black', background: 'white', padding: '5px', marginBottom: '5px' }}>
            <p style={{ margin: '0' }}>Ethnic Origin: {selectedStaff.ethnic_origin}</p>
        </div>
        <div style={{ border: '1px solid black', background: 'lightgreen', padding: '5px', marginBottom: '5px' }}>
            <p style={{ margin: '0' }}>Marital Status: {selectedStaff.marital_status}</p>
        </div>
    </div>
</Modal.Body>


                            </div>
                          ))}
                    </div>
                </Modal.Body>
            </Modal>
        );
    };

    const columns = [
        {
            name: "Staff Name",
            cell: row => (
                <div data-tag="allowRowEvents">
                    <img src={row.profile_pic} style={{ width: '30px', borderRadius: '50%', marginRight: '5px' }} alt={row.email} />
                    {row.first_name} {row.last_name}
                </div>
            ),
            sortable: true
        },
        { name: "Next of Kin", selector: "next_of_kin", sortable: true },
        { name: "Gender", selector: "gender", sortable: true },
        { name: "Mobile", selector: "mobile", sortable: true },
        {
            name: "Email",
            cell: row => (
                <div data-tag="allowRowEvents">
                    <Link to={`mailto:${row.email}`} rel="noopener noreferrer">
                        {row.email}
                    </Link>
                </div>
            ),
            sortable: true
        },
        {
            name: "Groups",
            cell: row => (
                <div data-tag="allowRowEvents">
                    {row.groups.map(item => (
                        <span key={item.id}>
                            <ProtectedRoute perm="view_group">
                                <Link to="/group"> {item.name}{" "}</Link>
                            </ProtectedRoute>
                        </span>
                    ))}
                </div>
            ),
            sortable: true
        },
        {
            name: "Active",
            cell: row => (
                <div>
                    <label className="ms-switch">
                        <input type="checkbox" id={row.id} value={row.id} checked={row.is_active} onChange={() => handleArchive(row.id)} />
                        <span className="ms-switch-slider round" />
                    </label>
                </div>
            ),
            sortable: true
        },
        {
            name: "Action",
            cell: row => (
                <div data-tag="allowRowEvents">
                    <ProtectedRoute perm="change_user">
                        <Link to='#' onClick={() => handleShowEdit(row.id)}>
                            <i className='fa fa-pencil ms-text-dark mr-2' />
                        </Link>
                    </ProtectedRoute>
                    <ProtectedRoute perm="delete_user">
                        <Link to='#' onClick={() => handleDelete(row.id)}>
                            <i className='fa fa-trash ms-text-danger' />
                        </Link>
                    </ProtectedRoute>
                </div>
            )
        }
    ];

    const tableData = {
        columns: columns,
        data: staff
    };

    return (
        <div className="ms-panel">
            <div className="ms-panel-header ms-panel-custome">
                <h6>Staff List</h6>
                <Link to="#" onClick={print}>
                    <i className='fa fa-print ms-text-info mr-4' />
                </Link>
                <ProtectedRoute perm="add_user">
                    <Link to="/staff/add-staff">Add Staff</Link>
                </ProtectedRoute>
                <ProtectedRoute perm="view_user_history">
                    <Link to="staff/UserHistory">User History</Link>
                </ProtectedRoute>
            </div>
            <div className="ms-panel-body">
                <div className="thead-primary datatables">
                    <DataTableExtensions {...tableData} print={false} export={false}>
                        <DataTable
                            columns={columns}
                            data={staff.filter(item => !selectedGender || item.gender === selectedGender)}
                            pagination
                            responsive={true}
                            striped
                            noHeader
                            onRowClicked={handleRowClick}
                        />
                    </DataTableExtensions>
                </div>
            </div>
            {showEdit && <SelectedStaffModal />}
        </div>
    );
};

export default Doctorlist;
