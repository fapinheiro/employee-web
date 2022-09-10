import React, { Component } from "react";
import { Modal, Button, Row, Col, Form, Image} from 'react-bootstrap';

export class AddEmpModal extends Component {

    photofilename = 'anonymous.png';

    imagesrc = process.env.REACT_APP_PHOTO_URI + '/' + this.photofilename;

    constructor(props) {
        super(props);
        this.state={deps:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_URI + '/department')
        .then(res => res.json())
        .then(data => {
            this.setState({ deps: data });
        })
        .catch(error => console.error(error));
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API_URI + '/employee',{
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                EmployeeName : event.target.EmployeeName.value,
                Department : event.target.Department.value,
                DateOfJoin : event.target.DateOfJoin.value,
                PhotoFileName : this.photofilename
            })
        })
        .then(res => res.json())
        .then(data => alert('Added Succesfully!'))
        .catch(error => {
            alert('Failed! Please try again latter.');
            console.error(error);
        });
    }

    handleFileSelected(event) {
        event.preventDefault();
        this.photofilename = event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "file",
            event.target.files[0],
            this.photofilename,
        );

        fetch(process.env.REACT_APP_API_URI + '/employee/photo',{
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(() => {
            this.imagesrc = process.env.REACT_APP_PHOTO_URI + '/' + this.photofilename;
        })
        .catch(error => {
            alert('Failed! Please try again latter.');
            console.error(error);
        });
    }

    render() {
        return (
            <div className="container">

                <Modal {...this.props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
                    <Modal.Header closeButton>
                        <Modal.Title id='contained-modal-title-vcenter'>
                            Add Employee
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="EmployeeName">
                                        <Form.Label>EmployeeName</Form.Label>
                                        <Form.Control type='text' name='EmployeeName' required placeholder="EmployeeName"/>
                                    </Form.Group>

                                    <Form.Group controlId="Department">
                                        <Form.Label>Department</Form.Label>
                                        <Form.Control as='select'>
                                            {this.state.deps.map(dep => <option key={dep.DepartmentId}>{dep.DepartmentName}</option>)}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="DateOfJoin">
                                        <Form.Label>DateOfJoin</Form.Label>
                                        <Form.Control type='date' name='DateOfJoin' required placeholder="DateOfJoin"/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type='submit'>
                                            Add Employee
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>

                            <Col sm={6}>
                                <Image width='200px' height='200px' src={this.imagesrc}/>
                                <input onChange={this.handleFileSelected} type='file'/>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}