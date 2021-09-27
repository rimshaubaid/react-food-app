
//Common Function for showing Bootstrap Toast Notifications

export const showToastNotification = (message, status) => {
  if (document.getElementById('show-notification')) {
    document.getElementById('show-notification').innerHTML = `<div aria-live="assertive" aria-atomic="true">
    <div class="toast-bg-color" >
    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false">
    <div class="toast-header"><strong class="mr-auto">${status ? status : ''}</strong>
    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close" onClick="window.hideToast();">
    <span aria-hidden="true">×</span></button></div><div class="toast-body text-left">${message}</div>
    </div></div>`;
  }
  window.showToast(status);
}
