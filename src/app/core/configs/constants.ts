
import { environment } from '../../../environments/environment';
if (typeof window !== 'undefined') {
  // Votre code qui utilise window.location ici
  const loc = window.location;
  const currentBaseUrl = `${loc.protocol}//${loc.hostname}:${loc.port}`;
}



export const NatureUe = [
  "Complementaire", "Professionnelle", "Fondamentale"
];
export const TYPE_EVALUATION = [
  "CC","TPE","TP", "EE"
];

export const SESSION = [
  "Normal", "Rattrapage"
];

// region abdel
export const TYPE_ETUDIANT = [
  "Regulier","Libre",
];
//end region






/**
 * API settings
 */
export const api = {

  baseUrl: environment.apiUrl,
 

  home: {},

  auth: {
    login: 'auth/authenticate',
    logout: 'auth/logout',
    register: 'auth/register',
  },

  admin: {
    anneeAcademique: {
      getAll: 'admin/anneeAcademique/findAllAnneeAcademique ',
      create: 'admin/anneeAcademique/addAnneeAcademique',
      delete: 'admin/anneeAcademique/deleteAnneeAca/', // + id
      uptade: 'admin/anneeAcademique/updateAnneeAca/', // + id
      getOne: 'admin/anneeAcademique/findAnneeAcaById/', // +id
      getOneById: (id: number) => `admin/anneeAcademique/findAnneeAcaById/${id}`,
    },
    anonymat: {
      create: 'addAnonymat/variable/',
      getOne: 'findAnonymatById/',
      getAll: 'findAllAnonymat',
      delete: 'deleteAnonymat/'
    },
    cours: {
      create: 'admin/cours/addCours',
      getOne: 'admin/cours/findCoursById/ ',
      // region abdel
      getOneByCode: (code: string) => `admin/cours/findCoursByCode?code=${code}`,
      getAllByDepartCode: (code: string) => `admin/cours/findAllCoursByDepart?code=${code}`,
      //end region
      getAll: 'admin/cours/findAllCours',
      update: 'admin/cours/updateCours/',
      delete: 'admin/cours/deleteCours/'
    },
    credit: {
      create: 'admin/credit/addCredit',
      getOne: 'admin/credit/findCreditById/',
      getAll: 'admin/credit/findAllCredit',
      update: 'admin/credit/updateCredit/',
      delete: 'admin/credit/deleteCredit/'
    },
    cycle: {
      create: 'admin/cycle/addCycle',
      getOne: 'admin/cycle/findCycleById/',
      getAll: 'admin/cycle/findAllCycle',
      update: 'admin/cycle/updateCycle/',
      delete: 'admin/cycle/deleteCycle/'
    },
    departement: {
      create: 'admin/departement/addDepartement',
      getOne: 'admin/departement/findDepartById/',
      getAll: 'admin/departement/findAllDepartement',
      update: 'admin/departement/updateDepart/',
      delete: 'admin/departement/deleteDepart/'
    },
    enseignant: {
      create: 'admin/addEnseignant',
      getOne: 'admin/findEnseignantById/',
      getAll: 'admin/findAllEnseignant',
      getAllCoursByEnseignant: 'admin/findTeachByEnseignant/',
      update: 'admin/updateEnseignant/',
      delete: 'admin/deleteEnseignant/'
    },
    etudiant: {
      create: 'admin/etudiant/addEtudiant',
      getOne: 'admin/etudiant/findEtudiantById/',
      getAll: 'admin/etudiant/findAllEtudiant',
      getOneByMatricule: 'admin/etudiant/findEtudiantByMatricule/', //?matricule=value ,
      getAllByDepartement: 'admin/etudiant/findAllEtudiantByDepart', //?code=value ,
      getAllByCours: 'admin/etudiant/findAllEtudiantByParcours',
      getAllByCoursAndAnnee: (annee: number, label: string) => `admin/etudiant/findAllEtudiantByParcours/annee/${annee}/parcours?label=${label}`,
      update: 'admin/etudiant/updateEtudiant/',
      delete: 'admin/etudiant/deleteEtudiant /'
    },
    evaluation: {
      create: 'admin/addEvaluation',
      getAll: 'admin/findAllEvaluation',
      getOne: 'admin/findEvaluationById/',
      getOneByCode: 'admin/findEvaluationByCode/',
      update: 'admin/updateEvaluation/',
      delete: 'admin/deleteEvaluation/'
    },
    fichier: {
      create: 'user/fichier/add',//{id},
      getFileListByUser: 'user/fichier/boite/',//{id}',
      deleteFile: 'user/fichier/deleteOneFile/', // +id
      deleteBoite: 'user/fichier//deleteBoiteUser/', // +id
    },
    inscription: {
      create: 'admin/inscription/addInscription',
      getAll: 'admin/inscription/findAllEtudiantInscrit/anneeAca /' + /*{ numeroDebut }*/ '/ parcours', //? label = value ,
      getOne: 'admin/inscription/findInscriptionById/',
      delete: 'admin/inscription/deleteInscription/'
    },
    jury:{
      create: 'admin/jury/add',
      getAll: 'admin/jury/findAll',
      getOne: 'admin/jury/findById/',// id
      delete: 'admin/jury/delete/',
      
      update: 'admin/jury/update/'
    },
    memoire:{
      
      create: 'admin/memoire/add',
     
      getAll: 'admin/memoire/findAll',
      getOne: 'admin/memoire/findById/',// id
      findByKeyworld: 'admin/memoire/findByKeyworld/',
      findByOption: 'admin/memoire/findByOption/',
      findByEtudiant: 'admin/memoire/findByEtudiant/',
      getAllByCoursAndAnnee: ( label: string, anneeAca: number) => `admin/memoire/findByParcours?label=${label}&anneeAca=${anneeAca}`,
      findByParcours: 'admin/memoire/findByParcours/',
      findByDepartement: 'admin/memoire/findByDepartement/',
      delete: 'admin/memoire/delete/',
      update: 'admin/memoire/update/'
    },
    module: {
      create: 'admin/addModule',
      getAll: 'admin/findAllModule',
      getOne: 'admin/findModuleById/',
      getAllModsByCours: (code: string) => `admin/findModuleByCode?code=${code}`,
      getAllByCours: 'admin/findModuleByCode/',//?code=value ,
      update: 'admin/updateModule/',
      delete: 'admin/deleteModule/'
    },
    niveau: {
      create: 'admin/niveau/addNiveau',
      getAll: 'admin/niveau/findAllNiveau',
      getOne: 'admin/niveau/findNiveauById/',
      update: 'admin/niveau/updateNiveau/',
      delete: 'admin/niveau/deleteNiveau/'
    },
    option: {
      create: 'admin/option/addOption',
      getAll: 'admin/option/findAllOptions',
      getOne: 'admin/option/findOptionById/',
      getAllDept: 'admin/option/findAllOptionByDepart/', //?code=value ,
      update: 'admin/option/updateOption/',
      delete: 'admin/option/deleteOption/'
    },
    parcours: {
      create: 'admin/parcours/addParcours',
      getAll: 'admin/parcours/findAllParcours',
      getOne: 'admin/parcours/findParcoursById/',
      getParcoursByDept: 'admin/parcours/findParcoursByDepart?code=',
      // region abdel
      getAllByDept: (code: string) => `admin/parcours/findParcoursByDepart?code=${code}`,
      getAllByNivAndOpt: (niveau: number, code: string) => `admin/parcours/findParcoursByNiveauAndOption/niveau/${niveau}/option?code=${code}`,
      // end region
      delete: 'admin/parcours/deleteParcours/'
    },
    semestre: {
      create: 'admin/semestre/addSemestre',
      getAll: 'admin/semestre/findAllSemestre',
      getOne: 'admin/semestre/findSemestreById/',
      delete: 'admin/semestre/deleteSemestre/',
      update: 'admin/semestre/updateSemestre/'
    },
    typeCours: {
      create: 'admin/addTypeCours',
      getAll: 'admin/findAllTypeCours',
      getOne: 'admin/findTypeCoursById/',
      update: 'admin/updateTypeCours/',
      delete: 'admin/deleteTypeCours/'
    },
    user: {
      create: '',
      getOne: 'admin/user/user/findByEmail/',
      getOneId: 'admin/user/user/findById/',
      getAll: 'admin/user/user/findAll',
      update: '',
      delete: ''
    },
   
    statistique: {
      getGlobalStat:'admin/findGloalStat',
      countAllYears: 'admin/findAllActifAnneeAca',
      countAllDept: 'admin/findAllActifDepartement',
      countAllStudent: 'admin/findAllActifEtudiant',
      countAllStudentByDept: 'admin/findAllActifEtudiantDepartement',
      countAllStudentByCours: 'admin/findAllActifEtudiantParcours',
      countAllUE: 'admin/findAllActifCours',
      countAllUEByDept: 'admin/findAllActifCoursDepartement',
      countAllParcours: 'admin/findAllActifParcours',
      countAllCoursByDept: 'admin/findAllActifParcoursDepartement',
      countTauxReuste: 'admin/findPassedStats', //taux de reussite global by departmt
  
    }
  
  },

  aci: {

  },
};
