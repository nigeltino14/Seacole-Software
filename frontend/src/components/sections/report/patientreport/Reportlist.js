import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { deleteApi, getApi, putApi } from '../../../../api/api'
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
import PrintButton from '../../../utils/print'


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
    const [selectedNote, setSelectedNote] = useState(null);
    const user = useSelector((state) => state.auth.user);

    const handleCloseEdit = () => {
        setshowEdit(false)
    }
    
    const handleRowClick = (row) => {
        setSelectedNote(row);
    };
   
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

// Adding the archive function, this is being used to delete items

  const handleArchive = (id) => {
    const note_list = [...note]
    const selected = note_list.find(item => item.id === id);
    Swal.fire({
      title: 'Are you sure you want to delete this item?',
      text: 'This action might be permanent.',
      input: 'text',
      inputPlaceholder: 'Please provide a reason for deletion...',
      inputValidator: (value) => {
         if (!value) {
           return 'You need to provide a reason!';
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
            
             setDisplayNotes((prevDisplayNotes) => prevDisplayNotes.filter((item) => item.id !== id));
             Swal.fire('Deleted', 'Stock item has been deleted.', 'success'); 
         },
         token,
         `/api/note/`,
         {...temp_note, },
         id
       );
      }
    });
  };


    const columns = [

        { name: "Number", selector: "id", sortable: true },
        { name: "Subject", selector: "subject", sortable: true },
        { name: "Entry", selector: "entry", sortable: true },
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

       {
            name: "Action", cell: row =>
                <div data-tag="allowRowEvents" >
                    <ProtectedRoute perm="delete_note">
                        <Link to='#' onClick={() => handleArchive(row.id)}>
                            <i className='fas fa-trash-alt ms-text-info  mr-4' />
                        </Link>
                    </ProtectedRoute>
       
                </div>, sortable: true
       },

    ];

    console.log("Notes to display:", diplay_notes)
    const filteredNotes = diplay_notes.filter((item) => item.is_deleted !==true)

    const tableData = {
        columns,
        data: filteredNotes,
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



//The function below allows for the selection of a certain note to see in detail
    const SelectedNoteModal = () => {
        if (!selectedNote) {
            return null;
        }

    const onClose = () => {
        setSelectedNote(null);
        setshowEdit(false);
    };

        return (
            <Modal show={true} className="ms-modal-dialog-width ms-modal-content-width" onHide={onClose} centered>
                <Modal.Header className="ms-modal-header-radius-0">
                 <div>
                    <h1 style={{ fontSize: '24px', marginBottom: '0' }}>Seacole Health</h1>
                    <h4 className="modal-title text-white">Selected Note</h4>
                    <p>Date recorded: {selectedNote.created_on}</p>
                 </div>
                    <button type="button" className="close text-red w-20 mr-2" onClick={onClose}>x</button>
                    <PrintButton />
                </Modal.Header>
                <Modal.Body style={{ padding: '20px', fontSize: '16px', lineHeight: '1.5' }}>
                    <div>
                        <h5>Subject: {selectedNote.subject}</h5>
                        <p>Entry: {selectedNote.entry}</p>
                        <p>Resident: {`${selectedNote.name_first_name} ${selectedNote.name_last_name}`}</p>
                        <p>Type of note: {selectedNote.type_of_note}</p>
                        <p>Staff responsible: {selectedNote.staff}</p>
                        
                        {/* Display other note details here */}
                    </div>
                </Modal.Body>
            </Modal>
        );
    };
  
    console.log("Filtered:", filteredNotes)
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
                                    data={filteredNotes}
                                    pagination
                                    responsive={true}
                                    striped
                                    noHeader
                                    onRowClicked={handleRowClick}
                                />
                            </DataTableExtensions>
                        </div>
                    </div>
                     <SelectedNoteModal onClose={() => setshowEdit(false)} />
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