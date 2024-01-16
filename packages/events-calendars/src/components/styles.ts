const styles = {
  '.events-future, .some-event-unreported, .all-events-reported': {
    position: 'relative',
  },
  '.events-future:after, .some-event-unreported:after, .all-events-reported:after': {
    position: 'absolute',
    top: '0px',
    right: '0px',
  },
  '.events-future:after': {
    color: '#605ca8',
    fontSize: '1.2rem',
    content: "'⦿'",
  },
  '.some-event-unreported:after': {
    color: 'orange',
    fontSize: '3rem',
    content: "'•'",
  },
  '.all-events-reported:after': {
    color: 'green',
    fontSize: '3rem',
    content: "'•'",
  },
};

export default styles;
