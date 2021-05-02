import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { listActions } from '../../_actions';
import Pagination from '../../_components/pagination/pagination';

import './list-page.scss';
function ListPage() {
    const list = useSelector(state => state.list);
    const [currentItems, setCurrentItems] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listActions.getAll());
    }, []);



    function handleDeleteItem(id) {
        dispatch(listActions.delete(id));
    }

    function onChangePage(pager) {
        console.log("pager", pager);
        setCurrentItems(pager.items);
    }

    return (
        <>
            <div className=" table-list col-lg-8 offset-lg-2">
                {list.loading && <em>Loading items...</em>}
                {list.error && <span className="text-danger">ERROR: {list.error}</span>}
                {currentItems &&
                    <MDBTable responsive>
                        <MDBTableHead className="header">
                            <tr className="table-tr">
                                <td>ID</td>
                                <td>TITLE</td>
                                <td>COMPLETED</td>
                                <td>USERID</td>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>

                            {currentItems.map((item, index) =>
                                <tr key={item.id}>
                                    <td >
                                        key={item.id}
                                    </td>
                                    <td>
                                        {item.title}
                                    </td>
                                    <td>
                                        {item.completed}
                                    </td>
                                    <td>
                                        {item.userId}
                                    </td>
                                </tr>

                            )}

                        </MDBTableBody>
                    </MDBTable>
                }
            </div>
            <Pagination items={list.items} onChangePage={onChangePage} />
            {/* <Pagination /> */}
        </>

    );
}

export { ListPage };