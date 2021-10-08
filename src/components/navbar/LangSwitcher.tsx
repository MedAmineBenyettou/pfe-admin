import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../store';
import icon from '../../assets/2479273.png';
import { Menu, Button, MenuItem, Divider } from '@material-ui/core';
import { setLang } from '../../actions/lang';

const LangSwitcher = ({ lang: { lang, langs }, setLang }: PropsFromRedux) => {
 //  useEffect(() => {
 //   var elems = document.querySelectorAll('.dropdown-trigger');
 //   var instances = M.Dropdown.init(elems, { closeOnClick: true });
 //  }, []);
 const [anchorEl, setAnchorEl] = useState(null);
 const open = Boolean(anchorEl);
 const handleClick = (event: any) => {
  setAnchorEl(event.currentTarget);
 };
 const handleClose = () => {
  setAnchorEl(null);
 };

 const display = () => {
  var t = [];
  var myL = langs.find((l) => l.lang.match(lang.dict.lang));
  if (myL) {
   t.push(
    <MenuItem className="blue-text sidenav-close" value={myL.lang}>
     {myL.language}
    </MenuItem>
   );
   t.push(<Divider />);
  }
  langs.forEach((l) => {
   if (!l.lang.match(lang.dict.lang))
    t.push(
     <MenuItem
      className="sidenav-close"
      key={l.lang}
      value={l.lang}
      onClick={() => setLang(l.lang)}
     >
      {l.language}
     </MenuItem>
    );
  });
  return t;
 };

 return (
  <div>
   <Button
    id="basic-button"
    className="translation-btn"
    aria-controls="basic-menu"
    aria-haspopup="true"
    aria-expanded={open ? 'true' : undefined}
    onClick={handleClick}
   >
    <img src={icon} alt={'translate'} />
   </Button>
   <Menu
    id="basic-menu"
    anchorEl={anchorEl}
    open={open}
    onClose={handleClose}
    MenuListProps={{
     'aria-labelledby': 'basic-button',
    }}
   >
    {display()}
   </Menu>
  </div>
 );
};

const mapStateToProps = (state: AppState) => ({
 lang: state.lang,
});

const mapDispatchToProps = { setLang };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(LangSwitcher);
