const saEvent = (eventName,a,b) => {
  if (window){
     if (window.mixpanel) return window.mixpanel.track(eventName,a);
     if (window.sa_event) return window.sa_event(eventName,a,b);
  }
};
export default saEvent;
