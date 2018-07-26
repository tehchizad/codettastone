const CLIENT_ID = "826170491074-5lavnlvi3nsqflhv0t3hrafsdivfmkv4.apps.googleusercontent.com",
  DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"],
  SCOPES = "https://www.googleapis.com/auth/youtube.readonly";

const authorizeButton = document.getElementById("authorize-button"),
  signoutButton = document.getElementById("signout-button"),
  content = document.getElementById("content"),
  channelForm = document.getElementById("channel-form"),
  channelInput = document.getElementById("channel-input"),
  videoContainer = document.getElementById("video-container");

const defaultChannel = "";

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load("client:auth2", initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client
    .init({
      discoveryDocs: DISCOVERY_DOCS,
      clientId: CLIENT_ID,
      scope: SCOPES
    })
    .then(() => {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
      // Handle the initial sign-in state.
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      authorizeButton.onclick = handleAuthClick;
      signoutButton.onclick = handleSignoutClick;
    });
}
/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = "none";
    signoutButton.style.display = "block";
    content.style.display = "block";
    videoContainer.style.display = "block";
    getChannel();
  } else {
    authorizeButton.style.display = "block";
    signoutButton.style.display = "none";
    content.style.display = "none";
    videoContainer.style.display = "none";
  }
}
// Sign in
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}
// Sign out
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

function getChannel() {
  gapi.client.youtube.channels
    .list({
      part: "snippet,contentDetails,statistics",
      forUsername: "GoogleDevelopers"
    })
    .then(function(response) {
      var channel = response.result.items[0];
      appendPre(
        `This channel's ID is ${channel.id}. Its title is ${channel.snippet.title}, and it has ${channel.statistics.viewCount} views.`
      );
    });
}