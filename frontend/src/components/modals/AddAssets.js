import React, { useState, useEffect } from 'react';
import { Form, InputGroup, Button, Col } from 'react-bootstrap';
import { postApi, getApi } from '../../api/api';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
//import '../../assets/css/AddHouseAsset.css';
import { homeActions } from '../../store/home';
import { toastsuccess } from '../utils/notifications';

const initialState = {
  name: '',
  serial_number: '',
  date_of_acquisition: '',
  condition: '',
  location: '',
  recorded_by: '',
  recorded_on: '',
  category: '',
  value:'',
};

const categories = [
  { id: 1, name: 'Furniture' },
  { id: 2, name: 'Machinery' },
  { id: 3, name: 'Vehicles' },
  { id: 4, name: 'Cleaning Equipment' },
  { id: 5, name: 'Electrical Gadgets' },
  { id: 6, name: 'General/Other' },
 ];

const AddHouseAsset = () => {
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token).token;
  
  const [homes, setHomes] = useState([]);
  const history = useHistory();
  const [state, setState] = useState(initialState);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      postApi(
        (response) => {
          console.log('House asset added:', response.data);
          toastsuccess('House Asset added successfully');
        },
        token,
        '/api/house-asset/',
        state,
        (errors_list) => {
          setErrors(errors_list);
        }
      );
    }
    setValidated(true);
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      recorded_by: user.id,
      recorded_on: new Date().toISOString(),
    }));
  }, [user]);

   useEffect(() => {
     const apiUrl = '/api/home/';
     console.log('Fetching homes...');
    
     getApi(
        (response) => {
          if (response && response.data) {
            console.log('Homes data:', response.data);
            setHomes(response.data);
          } else {
            console.error('Empty response:', response);
          }
         },
         token,
         apiUrl,
         (error) => {
            console.error('Error fetching homes:', error);
         }
       );
     }, [token]);

   const handleGoBack = () => {
     history.goBack();
   };

  return (
    <div className="col-xl-12 col-md-12">
      <div className="ms-panel ms-panel-bshadow-none">
        <div className="ms-panel-body">
          <h2 className="text-center line-between" style={{ fontSize: '24px', fontWeight: 'bold', color: 'teal', position: 'relative', backgroundColor: 'black', bottom: '-5px' }}>
            Please fill in below details for the house asset you want to record.
          </h2>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom01">
                <Form.Label>Name</Form.Label>
                {errors.name && errors.name.map((err) => <p key={err} className="ms-text-danger">{err}</p>)}
                <InputGroup>
                  <Form.Control
                    name="name"
                    required
                    onChange={handleChange}
                    value={state.name}
                    type="text"
                    placeholder="Name"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom02">
                <Form.Label>Serial Number</Form.Label>
                {errors.serial_number && errors.serial_number.map((err) => <p key={err} className="ms-text-danger">{err}</p>)}
                <InputGroup>
                  <Form.Control
                    name="serial_number"
                    required
                    onChange={handleChange}
                    value={state.serial_number}
                    type="text"
                    placeholder="Serial Number"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom07">
                   <Form.Label>Value</Form.Label>
                   {errors.value && errors.value.map(err => { return (<p key={err} className='ms-text-danger'>{err}</p>) })}
                   <InputGroup>
                       <Form.Control onChange={handleChange}
                           name="value" value={state.value} type="text"
                       />
                   </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom03">
                <Form.Label>Date of Acquisition</Form.Label>
                {errors.date_of_acquisition && errors.date_of_acquisition.map((err) => <p key={err} className="ms-text-danger">{err}</p>)}
                <InputGroup>
                  <Form.Control
                    name="date_of_acquisition"
                    required
                    onChange={handleChange}
                    value={state.date_of_acquisition}
                    type="date"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom04">
                <Form.Label>Condition</Form.Label>
                {errors.condition && errors.condition.map((err) => <p key={err} className="ms-text-danger">{err}</p>)}
                <InputGroup>
                  <Form.Control
                    name="condition"
                    required
                    onChange={handleChange}
                    value={state.condition}
                    type="text"
                    placeholder="Condition"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom05">
                <Form.Label>Location</Form.Label>
                {errors.location && errors.location.map((err) => <p key={err} className="ms-text-danger">{err}</p>)}
                <InputGroup>
                  <Form.Control
                    as="select"
                    name="location"
                    //required
                    onChange={handleChange}
                    value={state.location}
                    type="text"
                    placeholder="Location"
                  >
                       <option value="">Select Location</option>
                       {homes.map((home) => (
                         <option key={home.id} value={home.id}>
                           {home.name}
                       </option>
                     ))}
                  </Form.Control>
                </InputGroup>
              </Form.Group>
               <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom03">
                <Form.Label>Category</Form.Label>
                {errors.category && errors.category.map((err) => <p key={err} className="ms-text-danger">{err}</p>)}
                <InputGroup>
                  <Form.Control
                    as="select"
                    name="category"
                    required
                    onChange={handleChange}
                    value={state.category}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Control>
                </InputGroup>
              </Form.Group>
            </Form.Row>
            <Button type="submit" className="mt-4 d-inline w-20 mr-2">Save</Button>
            <button type="button" onClick={handleGoBack} className="btn btn-primary">Back</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddHouseAsset;
