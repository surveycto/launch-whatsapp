/* global getPluginParameter, fieldProperties, setAnswer */

var whatsAppNumber = getPluginParameter('number')
var whatsAppMessage = getPluginParameter('message')
var whatsAppURL = 'https://wa.me/'
var buttonLabel = getPluginParameter('button_label')
var previewNumberContainer = document.getElementById('preview-number-container')
var previewMessageContainer = document.getElementById('preview-message-container')
var btnLaunchWhatsApp = document.getElementById('btn-launch-whatsapp')
var errorMessageContainer = document.getElementById('error-message-container')

// Update the button label
btnLaunchWhatsApp.innerText = buttonLabel || 'Launch WhatsApp'

// If a phone number was supplied, add it to the URL and show a preview in the UI
if (whatsAppNumber) {
  whatsAppURL += whatsAppNumber
  previewNumberContainer.innerHTML = whatsAppNumber
// If a phone number wasn't supplied, hide the number preview element from the UI
} else {
  document.getElementById('preview-number-wrapper').classList.add('hidden')
}

// If a message was supplied, add it to the URL and show a preview in the UI
if (whatsAppMessage) {
  var URLEncodedMsg = encodeURI(whatsAppMessage)
  whatsAppURL += '?text=' + URLEncodedMsg
  previewMessageContainer.innerHTML = whatsAppMessage
// If a message wasn't supplied, hide the message preview element from the UI
} else {
  document.getElementById('preview-message-wrapper').classList.add('hidden')
}

// Define what the "Launch WhatsApp" button does when the field is not marked readonly.
if (!fieldProperties.READONLY) {
  var URLEncodedMsg = encodeURI(whatsAppMessage)
  btnLaunchWhatsApp.setAttribute('href', whatsAppURL)
  btnLaunchWhatsApp.onclick = function () {
    saveResponse()
  }
} else {
  disableField('This field is disabled')
}

// Define how to store the response
function saveResponse () {
  var successResponse = 'WhatsApp message: Recipient: ' + whatsAppNumber + '. Message: "' + whatsAppMessage + '".'
  setAnswer(successResponse)
}

function disableField (reason) {
  btnLaunchWhatsApp.classList.add('disabled')
  errorMessageContainer.innerHTML = reason
}
