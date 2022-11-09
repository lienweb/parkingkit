/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-syntax */
import { createPathComponent } from '@react-leaflet/core';
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

const MarkerClusterGroup = createPathComponent(
  ({ children: _c, ...props }, ctx) => {
    const clusterProps = {};
    const clusterEvents = {};

    for (const [key, value] of Object.entries(props)) {
      key.startsWith('on')
        ? (clusterEvents[key] = value)
        : (clusterProps[key] = value);
    }

    // Creating markerClusterGroup Leaflet element
    // eslint-disable-next-line new-cap
    const markerClusterGroup = new L.markerClusterGroup(clusterProps);

    // Initializing event listeners
    Object.entries(clusterEvents).forEach(([eventAsProp, callback]) => {
      const clusterEvent = `cluster${eventAsProp.substring(2).toLowerCase()}`;
      markerClusterGroup.on(clusterEvent, callback);
    });

    return {
      instance: markerClusterGroup,
      context: { ...ctx, layerContainer: markerClusterGroup },
    };
  },
);

export default MarkerClusterGroup;
