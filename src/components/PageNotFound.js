import React from 'react'
import PageNotFoundJPG from "../img/404.png";


function PageNotFound() {

    return (
        <div className="center">

            <img
                width={500}
                className="rounded-circle"
                src={PageNotFoundJPG}
                alt="404"
            />

        </div>
    )
}

export default PageNotFound