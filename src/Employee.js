import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddEmpModal } from "./AddEmpModal";
import { EditEmpModal } from "./EditEmpModal";

export class Employee extends Component {

    constructor(props) {
        super(props);
        this.state = { emps: [], addModalShow: false, editModalShow: false };
    }

    // componentDidUpdate() {
    //     this.refreshList();
    // }

    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        fetch(process.env.REACT_APP_API_URI + '/employee')
            .then(res => res.json())
            .then(data => {
                this.setState({ emps: data });
            })
            .catch(error => console.error(error));
    }

    deleteEmp(empid) {
        if (window.confirm('Are you sure?')) {
            fetch(process.env.REACT_APP_API_URI + '/employee/' + empid,{
                method: 'DELETE',
                headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
                },
            })
            .then(res => res.json())
            .then(data => {
                alert('Deleted Successfully!');
            })
            .catch(error => console.error(error));
        }
    }

    render() {
        const { emps, empid, empname, empdpt, empphoto, empdate } = this.state;
        return (
            <div >
                <Table className="mt-4" striped bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th>EmployeeId</th>
                            <th>EmployeeName</th>
                            <th>EmployeeDateOfJoining</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            emps.map(emp =>
                                <tr key={emp.EmployeeId}>
                                    <td>{emp.EmployeeName}</td>
                                    <td>{emp.Department}</td>
                                    <td>{emp.DateOfJoin.substring(0,10)}</td>
                                    <td>
                                        <ButtonToolbar>
                                            <Button className="mr-2" variant="info" onClick={() => this.setState({ editModalShow: true, empid: emp.EmployeeId, empname: emp.EmployeeName, empdpt: emp.Department, empphoto: emp.PhotoFileName, empdate: emp.DateOfJoin.substring(0,10)})}>
                                                Edit
                                            </Button>

                                            <Button className="mr-2" variant="danger" onClick={() => this.deleteEmp(emp.EmployeeId)}>
                                                Delete
                                            </Button>
                                        </ButtonToolbar>

                                        <EditEmpModal show={this.state.editModalShow} onHide={() => this.setState({ editModalShow: false })} empid={empid} empname={empname} empdpt={empdpt} empphoto={empphoto} empdate={empdate}/>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant="primary" onClick={() => this.setState({ addModalShow: true })}>
                        Add Employee
                    </Button>
                </ButtonToolbar>

                <AddEmpModal show={this.state.addModalShow} onHide={() => this.setState({ addModalShow: false })} />
                
            </div>

        );
    }

   
}