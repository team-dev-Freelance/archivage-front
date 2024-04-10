import { Menu } from "./menu";

export const navAdmin: Menu[] = [

    {
        label: "Tableau de bord",
        icon: "dashboard",
        routerlink: "administrator/dashboard",
        expandable: false
    },
    {
        label: "Paramétrage",
        icon: "settings",
        expandable: true,
        subMenu: [
            // Groupe Administration
            {
                label: "Année académique",
                icon: "event",
                routerlink: "administrator/anneeacademique/"
            },
            {
                label: "Département",
                icon: "business",
                routerlink: "administrator/departement/"
            },
          

            // Groupe Cours
           
            {
                label: "Filière",
                icon: "folder_special",
                routerlink: "administrator/filiere/"
            },
            {
                label: "Cycle",
                icon: "loop",
                routerlink: "administrator/cycle/"
            },
            {
                label: "Niveau",
                icon: "trending_up",
                routerlink: "administrator/niveau/"
            },
            {
                label: "Parcours",
                icon: "timeline",
                routerlink: "administrator/parcours/"
            },
          
          

          
        ]
    },

    // Region Abdel
  
    {
        label: "Gestion-étudiants",
        icon: "school",
        expandable: true,
        subMenu: [
            {
                label: "Préinscription",
                icon: "perm_contact_calendar",
                routerlink: "etudiant/listepreinscription/"
            },
           
            {
                label: "Inscription ",
                icon: "person_add",
                routerlink: "administrator/etudiant/liste"
            },
           
        ]
    },
   
    {
        label: "Gestion-des-jurys",
        icon: "supervisor_account",
        routerlink: "/administrator/jury/",
        expandable: false,
    },
   
    {
        label: "Archivage-memoires",
        icon: "archive",
        expandable: true,
        subMenu: [
            {
                label: "Enregistrer un memoire",
                icon: "description",
                routerlink: "notes/nouvelle/"
            },
        
            {
                label: "Liste-des-memoires",
                icon: "list_alt",
                routerlink: "notes/listenote/"
            },

        ]
    },
    {
        label: "Envoi-des-fichiers",
        icon: "cloud_upload",
        expandable: true,
        subMenu: [
            {
                label: "transfert-fichier",
                icon: "cloud_upload",
                routerlink: "sendfile/newsendfile/"
            },
        
            {
                label: "historique des envois",
                icon: "history",
                routerlink: "sendfile/listsendfiles/"
            },

        ]
    },

    
    
]
