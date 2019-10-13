import React from 'react';
import './style.scss';

export const Header = (props) => {

  const { realoadAssignments } = props;

  const onReloadAssignmentsClick = () => {
    realoadAssignments();
  };
  const onAddAssignmentClick = () => {

  };


  return (<div className="header">
    {/* <a href="https://twitter.com/flexdinesh">
        <img src={Banner} alt="react-redux-boilerplate - Logo" />
      </a> */}
    <div className="nav-bar">
      <a className="router-link" onClick={onReloadAssignmentsClick}>
        Reload assignments
      </a>
      <a className="router-link" onClick={onAddAssignmentClick}>
        Add assignment
      </a>
    </div>
  </div>
  );
}

export default Header;