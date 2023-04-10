
import React from 'react';
import BackButton from 'src/components/buttons/goback/BackButton';
const Header = React.lazy(() => import("src/components/header/Header"));

type AppProps = {
    children: React.ReactNode;
};

const AppLayout = ({children}: AppProps) => {
    return (
        <>  
            <Header />
            <BackButton />
            {children}
        </>
    )
}
export default AppLayout;