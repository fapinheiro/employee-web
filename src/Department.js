import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddDepModal } from "./AddDepModal";
import { EditDepModal } from "./EditDepModal";

export class Department extends Component {

    constructor(props) {
        super(props);
        this.state = { deps: [], addModalShow: false, editModalShow: false };
    }

    // componentDidUpdate() {
    //     this.refreshList();
    // }

    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        fetch(process.env.REACT_APP_API_URI + '/department')
            .then(res => res.json())
            .then(data => {
                this.setState({ deps: data });
            })
            .catch(error => console.error(error));
    }

    deleteDep(depid) {
        if (window.confirm('Are you sure?')) {
            fetch(process.env.REACT_APP_API_URI + '/department/' + depid,{
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
        const { deps, depid, depname } = this.state;
        return (
            <div >
                <Table className="mt-4" striped bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th>DepartmentId</th>
                            <th>DepartmentName</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            deps.map(dep =>
                                <tr key={dep.DepartmentId}>
                                    <td>{dep.DepartmentId}</td>
                                    <td>{dep.DepartmentName}</td>
                                    <td>
                                        <ButtonToolbar>
                                            <Button className="mr-2" variant="info" onClick={() => this.setState({ editModalShow: true, depid: dep.DepartmentId, depname: dep.DepartmentName })}>
                                                Edit
                                            </Button>

                                            <Button className="mr-2" variant="danger" onClick={() => this.deleteDep(dep.DepartmentId)}>
                                                Delete
                                            </Button>
                                        </ButtonToolbar>

                                        <EditDepModal show={this.state.editModalShow} onHide={() => this.setState({ editModalShow: false })} depid={depid} depname={depname} />
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant="primary" onClick={() => this.setState({ addModalShow: true })}>
                        Add Department
                    </Button>
                </ButtonToolbar>

                <AddDepModal show={this.state.addModalShow} onHide={() => this.setState({ addModalShow: false })} />

                

                
            </div>

        );
    }

   
}