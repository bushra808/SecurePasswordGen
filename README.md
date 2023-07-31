# SecurePasswordGen

It serves the following functionalities:
1) Suggest randomized passwords based on: if we want to include uppercase or lowercase letters, numbers, or symbols
2) Customizable password length
3) Suggest password strength
4) We can exclude specific symbols


You can also make it into an extension using the following manifest.json file content:

{
    "manifest_version": 2,
    "name": "Password Generator Extension",
    "version": "1.0",
    "description": "Generate random passwords with this extension.",
    "permissions": ["activeTab"],
    "browser_action": {
      "default_popup": "home.html"
    },
    "content_scripts": [
      {
        "matches": ["<all_urls>"],
        "css": ["style.css"],
        "js": ["script.js"],
        "run_at": "document_idle"
      }
    ],
    "web_accessible_resources": ["popup.html"]
  }
  
