/* global getPluginParameter, fieldProperties, setAnswer */

var whatsAppNumber = getPluginParameter('number')
var whatsAppRecipientName = getPluginParameter('name')
var whatsAppMessage = getPluginParameter('message')
var whatsAppURL = 'https://wa.me/'
var buttonLabel = getPluginParameter('button_label')
var previewNumberContainer = document.getElementById('preview-number-container')
var previewMessageContainer = document.getElementById('preview-message-container')
var btnLaunchWhatsApp = document.getElementById('btn-launch-whatsapp')
var errorMessageContainer = document.getElementById('error-message-container')

// Update the button label.
btnLaunchWhatsApp.innerText = buttonLabel || 'Launch WhatsApp'

// If a phone number was supplied, add it to the URL and show a preview in the UI.
if (whatsAppNumber) {
  whatsAppURL += cleanPhoneNumber(whatsAppNumber)
  if (whatsAppRecipientName) {
    // If the 'name' parameter was supplied, use the name instead of the number.
    previewNumberContainer.innerHTML = whatsAppRecipientName
  } else {
    // If no name was supplied, just show the number.
    previewNumberContainer.innerHTML = whatsAppNumber
  }
// If a phone number wasn't supplied, hide the number preview element from the UI.
} else {
  document.getElementById('preview-number-wrapper').classList.add('hidden')
}

// If a message was supplied, add it to the URL and show a preview in the UI.
if (whatsAppMessage) {
  var URLEncodedMsg = encodeURI(whatsAppMessage)
  whatsAppURL += '?text=' + URLEncodedMsg
  previewMessageContainer.innerHTML = whatsAppMessage
// If a message wasn't supplied, hide the message preview element from the UI.
} else {
  document.getElementById('preview-message-wrapper').classList.add('hidden')
}

// Define what the "Launch WhatsApp" button does when the field is not marked readonly.
if (!fieldProperties.READONLY) {
  btnLaunchWhatsApp.setAttribute('href', whatsAppURL)
  btnLaunchWhatsApp.onclick = function () {
    saveResponse()
  }
} else {
  disableField('This field is marked read-only')
}

// Function to get rid of any invalid characters in the phone number
function cleanPhoneNumber(str) {
  // Filter only numbers from the input
  var cleaned = ('' + str).replace(/\D/g, '')
  return validatedPhoneNumber = '+' + cleaned
}

// Define how to store the response.
function saveResponse () {
  var successResponse = 'WhatsApp:'
  // Add any supplied parameters to the response.
  if (whatsAppRecipientName) {
    successResponse += ' name=' + whatsAppRecipientName + ';'
  }
  if (whatsAppNumber) {
    successResponse += ' number=' + whatsAppNumber + ';'
  }
  if (whatsAppMessage) {
    successResponse += ' message="' + whatsAppMessage + '"'
  }
  // Store the response.
  setAnswer(successResponse)
}

// Generic function to disable the field and show a note in the UI about why the field was disabled
function disableField (reason) {
  btnLaunchWhatsApp.classList.add('disabled')
  errorMessageContainer.innerHTML = reason
}
