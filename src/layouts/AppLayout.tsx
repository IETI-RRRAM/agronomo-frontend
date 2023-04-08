
import React from 'react';
import { Link } from 'react-router-dom'
const Header = React.lazy(() => import("src/components/header/Header"));

type AppProps = {
    children: React.ReactNode;
};

const AppLayout = ({children}: AppProps) => {
    return (
        <>  
            <Header />
            {children}
        </>
    )
}
export default AppLayout;