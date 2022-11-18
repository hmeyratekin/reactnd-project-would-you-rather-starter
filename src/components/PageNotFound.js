import React from 'react'
import {useLocation} from 'react-router-dom'
import PageNotFoundJPG from "../img/404.jpg";


function PageNotFound() {
    const {path} = useLocation()

    return (
        <div className="center">

            <img
                width={250}
                className="rounded-circle"
                src={PageNotFoundJPG}
                alt="404"
            />

        </div>
    )
}

export default PageNotFound