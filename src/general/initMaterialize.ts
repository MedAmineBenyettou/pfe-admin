import M from 'materialize-css';

export const initMaterialize = () => {
 setTimeout(() => {
  M.Sidenav.init(document.querySelectorAll('.sidenav'));
  M.Sidenav.init(document.querySelectorAll('.petSideMenu'), {
   edge: 'right',
   draggable: true,
  });
  M.Modal.init(document.querySelectorAll('.modal'));
  initDatePickers();
  console.log('init Materialize!');
 }, 500);
};

const initDatePickers = () => {
 //TODO change
 // M.Datepicker.init(document.getElementById('petdateOfAcquisition'), {
 //  yearRange: [1950, moment().year()],
 //  maxDate: moment().toDate(),
 //  container: $('#landing'),
 //  format: 'dd/mm/yyyy',
 //  autoClose: true,
 // });
 // M.Datepicker.init(document.getElementById('petdateOfBirth'), {
 //  yearRange: [1950, moment().year()],
 //  maxDate: moment().toDate(),
 //  container: $('#landing'),
 //  format: 'dd/mm/yyyy',
 //  autoClose: true,
 // });
};
