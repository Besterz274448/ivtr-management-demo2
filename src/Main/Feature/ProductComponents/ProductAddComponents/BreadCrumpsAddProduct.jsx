import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

export default function BreadCrumpsAddProduct() {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="primary" href="/dashboard" >
        home
      </Link>
      <Link color="primary" href="/product/" >
        รายการสินค้า
      </Link>
      <Typography color="textPrimary">เพิ่มสินค้า</Typography>
    </Breadcrumbs>
  );
}