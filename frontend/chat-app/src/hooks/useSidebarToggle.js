import { useState } from 'react';

const useSidebarToggle = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setSidebarVisible(prev => !prev);
    };

    const hideSidebar = () => {
        setSidebarVisible(false);
    };

    return { isSidebarVisible, toggleSidebar, hideSidebar };
};

export default useSidebarToggle;