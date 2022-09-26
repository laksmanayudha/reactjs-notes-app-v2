import AddPage from "../pages/AddPage";
import ArchivesPage from "../pages/ArchivesPage";
import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";
import NotFound404Page from "../pages/NotFound404Page";


const pages = [
    { 
        name: "home",
        href: "/", 
        label: "Catatan Aktif", 
        isNavigation: true,
        el: <HomePage /> 
    },
    { 
        name: "archivePage",
        href: "/archives", 
        label: "Catatan arsip", 
        isNavigation: true,
        el: <ArchivesPage /> 
    },
    {
        name: "detailPage",
        href: "/notes/:id",
        label: "Detail Note",
        isNavigation: false,
        el: <DetailPage />
    },
    {
        name: "addPage",
        href: "/notes/new",
        label: "Tambah Note",
        isNavigation: false,
        el: <AddPage />
    },
    {
        name: "404",
        href: "*",
        label: "404 Not Found",
        isNavigation: false,
        el: <NotFound404Page />
    }
];

function getPages() {
    return pages;
}

function getNavigations() {
  return pages.filter(page => page.isNavigation);
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