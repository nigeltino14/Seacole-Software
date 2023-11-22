import React, { Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Topbar from '../../layouts/Topbar';
import Setting from '../../layouts/Settings';
import Sidenav from '../../layouts/Sidenav';
import Content from '../../sections/house/Content';

const Houseoverview = () => {
    return (
        <Fragment>
            <MetaTags>
                <title>Seacole  | House Overview</title>
                <meta
                    name="description"
                    content="#"
                />
            </MetaTags>
            <div className="body ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar" id="body">
                <Setting />
                <Sidenav />
                <main className="body-content">
                    <Topbar />
                    <Content />
                </main>
            </div>
        </Fragment>
    );
}

export default Houseoverview;