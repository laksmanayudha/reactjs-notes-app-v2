import AddPage from "../pages/AddPage";
import ArchivesPage from "../pages/ArchivesPage";
import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";
import NotFound404Page from "../pages/NotFound404Page";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";


const pages = [
    { 
        name: "login",
        href: "/", 
        label: "loginNav", 
        isNavigation: true,
        withAuth: false,
        el: (props) => (<LoginPage {...props}  />)
    },
    { 
        name: "anotherLogin",
        href: "*", 
        label: "anotherLoginNav", 
        isNavigation: false,
        withAuth: false,
        el: (props) => (<LoginPage {...props}  />)
    },
    { 
        name: "register",
        href: "/register", 
        label: "registerNav", 
        isNavigation: true,
        withAuth: false,
        el: () => (<RegisterPage />) 
    },
    { 
        name: "home",
        href: "/", 
        label: "activeNoteNav", 
        isNavigation: true,
        withAuth: true,
        el: () => (<HomePage />)
    },
    { 
        name: "archivePage",
        href: "/archives", 
        label: "archiveNoteNav", 
        isNavigation: true,
        withAuth: true,
        el: () => (<ArchivesPage />)
    },
    {
        name: "detailPage",
        href: "/notes/:id",
        label: "detailNoteNav",
        isNavigation: false,
        withAuth: true,
        el: () => (<DetailPage />)
    },
    {
        name: "addPage",
        href: "/notes/new",
        label: "addNoteNav",
        isNavigation: false,
        withAuth: true,
        el: () => (<AddPage />)
    },
    {
        name: "404",
        href: "*",
        label: "notFoundNav",
        isNavigation: false,
        withAuth: true,
        el: () => (<NotFound404Page />)
    }
];

function getPages({ auth }) {
    if (auth === true){
        return pages.filter(page => page.withAuth === true);
    }else{
        return pages.filter(page => page.withAuth === false);
    }
}

function getNavigations({ auth }) {
    const navigations = pages.filter(page => page.isNavigation);
    
    if (auth === true) {
        return navigations.filter(nav => nav.withAuth === true);
    }else{
        return navigations.filter(nav => nav.withAuth === false);
    }
}

function routes(name) {
    const route = pages.find(page => page.name === name);
    return route.href;
}

export {
    getPages,
    getNavigations,
    routes,
};