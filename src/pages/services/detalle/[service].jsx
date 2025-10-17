import React from 'react';
import Servicios from '../../../features/services/Servicios';

export default function ServiceDetailWrapper(props) {
  // The original project appears to render service details inside the Servicios feature.
  // This wrapper keeps the pages/servicios/detalle route working by delegating to that component.
  return <Servicios {...props} />;
}

export async function getServerSideProps(ctx) {
  // Preserve possibility to use getServerSideProps; forward empty props for now.
  return { props: {} };
}
