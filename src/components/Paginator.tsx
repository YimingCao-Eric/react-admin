/**
 * Paginator Component
 * 
 * A pagination control component that provides Previous and Next buttons
 * for navigating through paginated data. Prevents navigation beyond the first
 * and last pages.
 */
import React from 'react';
import {useState} from "react";

const Paginator = (
    props: {
        page: number,
        lastPage: number,
        pageChanged: (page:number) => void
    }) => {

    /**
     * Navigates to the next page if not already on the last page
     */
    const next = () => {
        if (props.page < props.lastPage) {
            props.pageChanged(props.page + 1);
        }
    }

    /**
     * Navigates to the previous page if not already on the first page
     */
    const prev = () => {
        if (props.page >= 1 ) {
            props.pageChanged(props.page - 1);
        }
    }

    return (
        <>
            <ul className="pagination">
                <li className="page-item">
                    <a href="#" className="page-link" onClick={prev}>Previous</a>
                </li>
                <li className="page-item">
                    <a href="#" className="page-link" onClick={next}>Next</a>
                </li>
            </ul>
        </>
    );
};

export default Paginator;