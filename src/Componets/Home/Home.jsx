import React, { useState } from 'react'
import { Button, Card, Container, FormControl, InputGroup, ListGroup } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { getData } from '../../Services/Helper/helper';
import { useNavigate } from 'react-router';
import { Form } from 'react-bootstrap';
import Header from '../Header/Header';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';


function Home() {


    const [view, setView] = useState(getData("myData"));
    const [imageUrl,setImageUrl] = useState("");


    console.log("view", view);

    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    }

    const handleDelete = (id) => {
        //delete logic

        const data = view.filter((data) => {
            return data.id !== id
        })


        localStorage.setItem("myData", JSON.stringify(data));
        setView(data)


    }

    const handleSort = (key) => {

        let sortedData;

        switch (key) {
            case "asc":
                sortedData = [...view].sort((dataF, dataS) => {
                    return dataF.fname.localeCompare(dataS.fname)
                })
                break;
            case "des":
                sortedData = [...view].sort((dataF, dataS) => {
                    return dataS.fname.localeCompare(dataF.fname)
                })
                break;

            default:
                break;
        }


        setView(sortedData)
    }
    
    const [search, setSearch] = useState('');
    const handleSearch = (e) => {



    }

//    const async handleImageChange = (e) => {
//         console.log(e.target.files[0]);
//         const image= e.target.files[0];
//         if(image){
//             try{
//                 setUploading(true);
//                 const storage = getStorage(app);
//                 const storageRef= ref(storage,"images/" + image.name);
//                 await uploadBytes(storageRef,image);
//                 const downloadURL =await getDownloadURL(storageRef);
//                 setImageUrl(downloadURL);
//             }catch(error){
//                 console.log(error);
                
//             }finally{
//                 setUploading(false);
//             }
//         }
//     }
// }



    return (

        <>
            <Header />
            <div>
                <h1 className='text-center font-bold  fs-4 mb-16 mt-16'>
                    VIEW RECIPE
                </h1>

                <Container>
                {/* <input type='file' onChange={handleImageChange}/>
                <button disabled={uploading}>
                    {uploading ? "uploading" : "upload Image"}
                </button>
                {imageUrl && <img src={imageUrl} style={{maxWidth:150}} />} */}

                   <div className='flex justify-end'>
                   <Form className='mb-10 w-80 '>
                        <InputGroup>
                            <FormControl onChange={(e) => setSearch(e.target.value)} placeholder='Search Title,Cuisine type,Cooking Time'/>
                        </InputGroup>
                    </Form>
                   </div>

                   

                    <div className="row gap-3  justify-center w-full ">

                        {
                            view.filter((item)=>{
                                return search.toLowerCase() === ''
                                ?item 
                                :item.title.toLowerCase().includes(search.toLowerCase()),item.cuisin.toLowerCase().includes(search.toLowerCase()),item.cooking.toLowerCase().includes(search.toLowerCase())
                            }).map((data) => {
                                return (
                                    <Card className='col-3 border-none '>
                                        <Card.Img variant="top" src=''  className='w-full h-60 border-none'/>
                                        <Card.Body>
                                            <Card.Title className='h-6 overflow-hidden'> Title :-{data.title}</Card.Title>
                                            <Card.Text className='h-10 overflow-auto'>
                                            Ingredients:-{data.ingre}
                                            </Card.Text>
                                        </Card.Body>
                                        <ListGroup className="list-group-flush ">
                                            <ListGroup.Item className='h-28 overflow-auto'>Instructions:-{data.instru}</ListGroup.Item>
                                            <ListGroup.Item>Cuisine type:-{data.cuisin}</ListGroup.Item>
                                            <ListGroup.Item>Cooking Time:-{data.cooking}</ListGroup.Item>
                                        </ListGroup>
                                        <Card.Body>
                                        <Card.Footer className="text-muted">
                                                <button  className='btnclicked editbutton' onClick={() => handleEdit(data.id)}>Edit</button>||
                                                <button  className='btnclicked editbutton'  onClick={() => handleDelete(data.id)}>Delete</button>
                                                
                                            </Card.Footer>
                                        </Card.Body>
                                    </Card>
                                )
                            })
                        }


                    </div>









                </Container>
            </div>
        </>
    )
}

export default Home
