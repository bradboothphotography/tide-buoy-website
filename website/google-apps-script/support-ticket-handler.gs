const SHEET_NAME = "Support Tickets";
const SPREADSHEET_ID = "1zDX3CIPEmoioXYuJTs8y2keMjP_1iIwEfGZ1um6Q2Dw";
const ALERT_EMAIL = "support@tidebuoy.com";

function doPost(e) {
  if (!e || !e.postData || !e.postData.contents) {
    return ContentService.createTextOutput(
      JSON.stringify({
        ok: false,
        message: "This script must be called by a POST request from the deployed web app URL."
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  const data = JSON.parse(e.postData.contents);
  const sheet = getSupportSheet_();

  sheet.appendRow([
    new Date(),
    data.site || "Tide Buoy",
    data.topic || "",
    data.name || "",
    data.email || "",
    data.appVersion || "",
    data.device || "",
    data.location || "",
    data.message || ""
  ]);

  const subject = `[Tide Buoy Support] ${data.topic || "New Request"} from ${data.name || "Unknown"}`;
  const body = [
    `A new support ticket was submitted from the Tide Buoy website.`,
    ``,
    `Name: ${data.name || ""}`,
    `Email: ${data.email || ""}`,
    `Topic: ${data.topic || ""}`,
    `App Version: ${data.appVersion || ""}`,
    `Device: ${data.device || ""}`,
    `Location: ${data.location || ""}`,
    ``,
    `Message:`,
    data.message || "",
    ``,
    `Submitted At: ${data.submittedAt || ""}`
  ].join("\n");

  MailApp.sendEmail(ALERT_EMAIL, subject, body);

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({
      ok: true,
      message: "Tide Buoy support webhook is live."
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

function getSupportSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow([
      "Submitted At",
      "Site",
      "Topic",
      "Name",
      "Email",
      "App Version",
      "Device",
      "Location",
      "Message"
    ]);
  }

  return sheet;
}
