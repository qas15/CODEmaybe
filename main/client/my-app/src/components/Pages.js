import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../AppContextProvider";
import { Pagination } from "react-bootstrap";

const Pages = observer(() => {
    const { device } = useContext(Context);
    const pages = [];


    return (
        <Pagination className="pagination">
            {pages.map(page => (
                <Pagination.Item
                    key={page}
                    active={device.page === page}
                    onClick={() => device.setPage(page)}
                    className={`pagination-item ${device.page === page ? 'active' : ''}`}
                >
                    {page}
                </Pagination.Item>
            ))}
        </Pagination>
    );
});

export default Pages;
