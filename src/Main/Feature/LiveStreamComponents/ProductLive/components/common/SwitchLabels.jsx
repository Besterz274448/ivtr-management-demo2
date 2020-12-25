import React from 'react';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';

export default function SwitchLabels(props) {
  const { checked, setChecked } = props;

  return (
    <Switch
      checked={checked}
      onChange={setChecked}
      name="checkedB"
      color="primary"
    />
  );
}

SwitchLabels.protoTypes = {
  checked: PropTypes.string,
  setChecked: PropTypes.func,
}