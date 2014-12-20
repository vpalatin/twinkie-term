chrome.app.runtime.onLaunched.addListener(function() {
  new BeagleWindow();
});

var BeagleWindow = function() {
  var connectedSerialId = 0;
  chrome.app.window.create(
    'build.html',
    {
      bounds: {
        width: 1024,
        height: 768
      }
    },
    function(win) {
      win.contentWindow.AddConnectedSerialId = function(id) {
        connectedSerialId = id;
      };
      win.onClosed.addListener(function() {
	 chrome.usb.closeDevice(connectedSerialId, function () {
        });
      });
    }
  );
}
