import React, { useEffect, useState } from 'react'
import { Container, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import generateUniqueId from 'generate-unique-id';
import { getData } from '../../Services/Helper/helper';
import { Navigate, useNavigate } from 'react-router';

import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { db } from '../../firebase';
import { v4 } from 'uuid';


function AddData() {

    const [inputData, setInputData] = useState({
        id: '',
        title: '',
        ingre: '',
        instru :'',
        cuisin :' ',
        cooking: ''




    });

    


    const [addData, setAddData] = useState(getData("myData"));
    const navigate = useNavigate();
    const [myfalse, setMyFalse] = useState(false);

    const handleChange = (e) => {

        let name = e.target.name;
        let value = e.target.value;
        setInputData({ ...inputData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

      

        let obj = {
            ...inputData,
            id: generateUniqueId({
                length: 2,
                useLetters: false
            })
        }
        setAddData([...addData, obj]);
        setMyFalse(true);

        

    }
    useEffect(() => {

        localStorage.setItem("myData", JSON.stringify(addData));
    }, [addData]);

    useEffect(() => {
        if (myfalse) {
            navigate('/home');
        }
    }, [myfalse])

    


    return (
        <div>
            <Container className=' p-4 login-container  lw'>
            <h1 className='text-center display-1 mb-5 font-extrabold'>
                Recipe Listing
            </h1>
            
                <Form onSubmit={handleSubmit} className='form w-full'>
                    <Form.Control name='id' value={inputData.id} onChange={handleChange} hidden />

                    <Row className="mb-3 ">
                        <Form.Group as={Col} >
                            <Form.Label className='p-3'>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter Title" name='title' value={inputData.title} onChange={handleChange}
                            className="  rounded-sm" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3 ">
                        <Form.Group as={Col} >
                            <Form.Label className='p-3'>Ingredients</Form.Label>
                            <Form.Control type="text" placeholder="EnterIngredients" name='ingre' value={inputData.ingre} onChange={handleChange}
                            className="  rounded-sm" />
                        </Form.Group>
                    </Row>

                   
                    <Row className="mb-3 ">
                        

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Instructions</Form.Label>
                            <Form.Control as="textarea" rows={3}  name='instru' value={inputData.instru} onChange={handleChange}
                            className="input rounded-sm" />

                        </Form.Group>

                    </Row>

                    <Row className="mb-3 ">
                        <Form.Group as={Col} >
                            <Form.Label className='p-3'>Cuisine type</Form.Label>
                            <Form.Control type="text" placeholder="Enter Cuisine type" name='cuisin' value={inputData.cuisin} onChange={handleChange}
                            className="  rounded-sm" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3 ">
                        <Form.Group as={Col} >
                            <Form.Label className='p-3'>Cooking Time</Form.Label>
                            <Form.Control type="number" placeholder=" Enter Cooking Time hours" name='cooking' value={inputData.cooking} onChange={handleChange}
                            className="  rounded-sm" />
                            
                        </Form.Group>
                    </Row>



                    <div className='d-flex justify-content-center pt-4 pb-4 '>
                        <Button variant="primary" type="submit" className = 'pt-4  pb-4 h-1/2 font-bold  fs-4 '>
                            Add Recipe
                        </Button>
                    </div>



                </Form>
            </Container>

        </div>
    )
}

export default AddData
