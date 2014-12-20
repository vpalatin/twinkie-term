var input_output;
var self;

var usb = chrome.usb;

/* USB identifier for the Chromium Twinkie dongle */
var GOOGLE_VENDOR_ID = 0x18d1;
var TWINKIE_PRODUCT_ID = 0x500a;

/* USB parameters for the interface */
var CONSOLE_INTERFACE = 0;
var CONSOLE_EP_OUT = 0x1;
var CONSOLE_EP_IN  = 0x81;

var DEVICE_INFO = {"vendorId": GOOGLE_VENDOR_ID, "productId": TWINKIE_PRODUCT_ID, "interfaceId":0};
var permissionObj = {permissions: [{'usbDevices': [DEVICE_INFO] }]};

// utility. extract to another file.
var ab2str=function(buf) {
  var bufView=new Uint8Array(buf);
  var unis=[];
  for (var i=0; i<bufView.length; i++) {
    unis.push(bufView[i]);
  }
  return String.fromCharCode.apply(null, unis);
};

var str2ab = function(str) {
  var buf = new ArrayBuffer(str.length);
  var bufView = new Uint8Array(buf);
  for (var i=0; i<str.length; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

var usbDevs = {};

var Crosh = function(argv) {
  this.argv_ = argv;
  this.io = null;
  this.keyboard_ = null;
  this.pid_ = -1;
  this.connectionId = -1;
  this.portInfo_ = null;
  this.run = function() {
    this.io = this.argv_.io.push();

    this.io.onVTKeystroke = this.sendString_.bind(this, true /* fromKeyboard */);
    this.io.sendString = this.sendString_.bind(this, false /* fromKeyboard */);
    this.io.println("Beagle Term fork for the Twinkie dongle, at https://github.com/vpalatin/twinkie-term");
    input_output = this.io;
    self = this;

    chrome.permissions.contains(permissionObj, function(result) {
      if (result) {
        console.warn("Looking for USB Twinkie devices...");
        chrome.usb.findDevices(DEVICE_INFO, function(devices) {
          var eligiblePorts = devices;

          if (eligiblePorts.length > 0) {
            eligiblePorts.forEach(function(device) {
              var portPicker = document.querySelector('#port-picker');
              var portName = 'Twinkie: USB ' + device.vendorId.toString(16) +":"+ device.productId.toString(16) + ' [' + device.handle + ']';
              portPicker.innerHTML = portPicker.innerHTML + '<option value="' +
                                     device.handle +'">' + portName + '</option>';
              usbDevs[device.handle] = device;
            });
          }
        });
      } else {
        console.warn('cannot get "usbDevices" permission');
      }
    });
  };
  this.sendString_ = function(fromKeyboard, string) {
    var xfer = {
      "direction" : "out",
      "endpoint" : CONSOLE_EP_OUT,
      "data" : str2ab(string)
    };
    chrome.usb.bulkTransfer(self.connectionId, xfer, function (info) { });
  };
  this.exit = function(code) {
  };
};

window.onload = function() {
  hterm.defaultStorage = new lib.Storage.Chrome(chrome.storage.sync);
  var t = new hterm.Terminal("opt_profileName");
  t.decorate(document.querySelector('#terminal'));

  t.onTerminalReady = function() {
    t.runCommandClass(Crosh, document.location.hash.substr(1));
    return true;
  };
};

window.addEventListener('core-overlay-open', function(e) {
  /* console bulk Endpoint reception callback */
  var rxCallback = function(info) {
    if (info.resultCode == 0 && info.data) {
      input_output.print(ab2str(info.data));
    }
    /* prepare to receive the next packet */
    var xfer = {
      "direction" : "in",
      "endpoint" : CONSOLE_EP_IN,
      "length" : 64
    };
    chrome.usb.bulkTransfer(self.connectionId, xfer, rxCallback.bind(this));
  };

  // If |input_output| is null, it means hterm is not ready yet.
  if (!input_output)
    return;
  var nike = document.querySelector('#connect_dialog');
  // TODO(sunglim): Need better method to catch dialog is closed.
  if (!nike.opened) {
    var elem = document.querySelector('#port-picker');
    var handle = elem.options[elem.selectedIndex].value;
 
    self.connectionId = usbDevs[handle];
    chrome.usb.claimInterface(self.connectionId, CONSOLE_INTERFACE, function() {
      input_output.println('Twinkie USB console interface claimed.');
      /* prepare to receive packets */
      var xfer = {
        "direction" : "in",
        "endpoint" : CONSOLE_EP_IN,
        "length" : 64
      };
      chrome.usb.bulkTransfer(self.connectionId, xfer, rxCallback.bind(this));
    });
  }
});
