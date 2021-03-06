import React, { PropTypes } from 'react';

/**
*
* @param {coordinate string} will be a set of coordinates
* @returns parsed string, allows the map to be updated with new
* coordinates when the event location is clicked;
*/
const parseCoordinates = function parseCoordinates(coordString) {
  let coordinates = coordString.split('longitude');
  const coordinateObj = {
    address: coordinates[0]
  };
  coordinates = coordinates[1].split(' ');
  coordinateObj.latitude = +coordinates[coordinates.length - 1];
  coordinateObj.longitude = +coordinates[1];

  return coordinateObj;
};

const Event = ({ event, event: {
  title,
  eventTime,
  username,
  eventDate,
  businessName,
  busLink,
  location,
}, setCoordinates, setDetailsBox }) => {
/* setDetailsBox passed down from mappage
 * @param {props.event} an event item
 * @returns sets the Event details box to this event
 */
  function setDetBox() {
    setDetailsBox(event);
  }

  function setCoords() {
    const coordinates = parseCoordinates(location);
    setCoordinates(coordinates);
  }

  const addAttendee = function addAttendee() {
    fetch('/addAttendee', { method: 'POST',
      params: { username: localStorage.getItem('email'), event: title }
    }).then((attended) => {
      if (attended) {
        event.attendees += 1;
      }
    });
  };
  return (
    <article className="eventdetail">
      <div className="eventlistbox">
        <button type="button" onClick={setDetBox}>{title}</button>
        <div>Poster: {username}</div>
        <div>Event Time: {eventTime}</div>
        <div>Event Date: {eventDate}</div>
        <button type="button" onClick={setCoords}>Location: {location}</button>
        {businessName !== '' && <div>Business: {businessName}</div>}
        {busLink !== '' && <a target="_blank" rel="noreferrer noopener" href={busLink}>Website</a>}
      </div>
    </article>
  );
};

Event.propTypes = {
  event: PropTypes.object.isRequired,
};

export default Event;
