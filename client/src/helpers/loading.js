import React, { Fragment } from 'react'

export const showLoading = () => {
    return (
        <Fragment>
            <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </Fragment>
    )
}
