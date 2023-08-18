# Simple Website Remote Control Utility

This script offers a straightforward mechanism to lock and unlock a website through password checks. This mechanism works by inputting the password via the developer tools console. The current lock status is preserved in a JSON file to maintain the site's state. 

## Table of Contents
- [Simple Website Remote Control Utility](#simple-website-remote-control-utility)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Usage](#usage)
  - [Examples](#examples)
  - [Disclaimer](#disclaimer)
  - [License](#license)

## Getting Started

1. Download the files or Clone the repository to your local machine or web server.
2. Update the $lockPasswordHash and $unlockPasswordHash in the PHP file with your desired (hashed) passwords.
3. Ensure the path for the endpoint in the JavaScript file matches the location of your PHP file.

## Usage

1. Include the JavaScript code in your website.
2. When you want to lock/unlock the website, open the developer tools console on your browser.
3. Use the toggleSiteStatus('hash-or-password-of-your-choice') function to change the status of the site.
4. Lock and Unlock are based on the input password.

## Examples

``` javascript
// This will lock the site
toggleSiteStatus('hash-or-password-of-your-choice-lock');
```
``` javascript
// This will unlock the site
toggleSiteStatus('hash-or-password-of-your-choice-unlock');
```

## Disclaimer

This tool is for educational purposes only. I am not responsible for any misuse or any damage that may arise from using this tool. Ensure you have proper authorization before locking or unlocking any website.

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit/).