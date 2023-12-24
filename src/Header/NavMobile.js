import { Data, NoteAdd, PasswordCheck } from 'iconsax-react';
import React from 'react';
import Navparam from './Navparam';
import './NavMobile.css'

function NavMobile({data}) {
    
  function handleView(e) {
    data.setView(true);
    data.setAdd(false);
    data.setRm(false);
    data.setPass(false);
}

function handleAdd(e) {
    data.setView(false);
    data.setAdd(true);
    data.setRm(false);
    data.setPass(false);
}
//   function handleRm(e) {
//       data.setView(false);
//       data.setAdd(false);
//       data.setRm(true);
//       data.setPass(false);
// }

function PassChange(e) {
    data.setView(false);
    data.setAdd(false);
    data.setRm(false);
    data.setPass(true);
}
// console.log(data.isView, data.isAdd, data.isPass);
  return (
    <div className="NavMobile">
        <Navparam  Text="View" Icon={<Data size="20" />}  active = {data.isView} onClick={(e) =>handleView(e)}/>
        <Navparam  Text="Add" Icon={<NoteAdd size="20"  />}  active = {data.isAdd}  onClick={(e) =>handleAdd(e)}/>
        <Navparam  Text="Change Password" Icon={<PasswordCheck size="20" />} active = {data.isPass} onClick={(e) =>PassChange(e)} />
    </div>
  );
}

export default NavMobile;