
/**
 * Simple Website Remote Control Utility (JavaScript).
 * 
 * This utility provides functionality to either lock or unlock the website's visual interface 
 * by manipulating CSS properties based on the response from a remote PHP endpoint.
 * 
 * @module      WebsiteLocker
 * @license     https://opensource.org/license/mit/  MIT License
 * @author      Eros "rootm1ster" Calderari
 * @version     1.0
 */

(function() {

    /**
     * @var {object} windowRef                  Reference to window.
     * @var {string} endpointPath               Endpoint path for checking lock status.
     * @var {string} lockedFilterValue          CSS blur value for locked state.
     * @var {string} defaultFilterValue         CSS default value.
     * @var {string} pointerEventsUnlocked      CSS pointer events value for unlocked state.
     * @var {string} lockTextContent            Lock text displayed on lock state.
     * @var {HTMLElement} lockTextElement       Element to hold lock text.
     */
    
    var windowRef = window;
    var endpointPath = "/path_to_file/block.php";
    var lockedFilterValue = "blur(8px)";
    var defaultFilterValue = "none";
    var pointerEventsUnlocked = "auto";
    var lockTextContent = "THIS SITE HAS BEEN LOCKED";
    var lockTextElement;

    /**
    * Create a visible overlay indicating that the site has been locked.
    * 
    * @function
    * @name createLockOverlay
    * @memberof WebsiteLocker
     */
    function createLockOverlay() {
        if (!document.getElementById('lockText')) {
            lockTextElement = document.createElement('div');
            lockTextElement.id = 'lockText';
            lockTextElement.style.position = 'fixed';
            lockTextElement.style.top = '50%';
            lockTextElement.style.left = '50%';
            lockTextElement.style.transform = 'translate(-50%, -50%)';
            lockTextElement.style.color = 'white';
            lockTextElement.style.background = 'rgba(0, 0, 0, 0.7)';
            lockTextElement.style.padding = '20px';
            lockTextElement.style.borderRadius = '10px';
            lockTextElement.style.fontSize = '3em';
            lockTextElement.style.zIndex = '9999';
            lockTextElement.innerText = lockTextContent;
            document.documentElement.appendChild(lockTextElement);
        }
    }

    /**
    * Remove the visible overlay indicating the site's lock.
    * 
    * @function
    * @name removeLockOverlay
    * @memberof WebsiteLocker
    */
    function removeLockOverlay() {
        var textElement = document.getElementById('lockText');
        if (textElement && textElement.parentElement) {
            textElement.parentElement.removeChild(textElement);
        }
    }

    /**
     * Fetches the current status of the website (locked/unlocked) from the remote endpoint 
    * and adjusts the UI accordingly.
    * 
    * @function
    * @name updateSiteAppearance
    * @memberof WebsiteLocker
    */
    function updateSiteAppearance() {
        fetch(endpointPath)
        .then(function(response) { return response.json(); })
        .then(function(data) {
            if (data.message === 'ok') {
                if (data.status === 'locked') {
                    document.body.style.filter = lockedFilterValue;
                    document.body.style.pointerEvents = defaultFilterValue;
                    createLockOverlay();
                } else if (data.status === 'unlocked') {
                    document.body.style.filter = defaultFilterValue;
                    document.body.style.pointerEvents = pointerEventsUnlocked;
                    removeLockOverlay();
                }
            }
        });
    }

    /**
    * Toggles the website's status based on provided input, by sending 
    * a POST request to the remote PHP endpoint.
    * 
    * @function
    * @name toggleSiteStatus
    * @memberof WebsiteLocker
    * 
    * @param {string} i - The password/token to lock or unlock the website.
    */
    windowRef.toggleSiteStatus = function(password) {
        fetch(endpointPath, {
            method: 'POST',
            body: new URLSearchParams({ 'password': password }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(function(response) { return response.json(); })
        .then(function(data) {
            if (data.message === 'ok') {
                if (data.status === 'locked') {
                    document.body.style.filter = lockedFilterValue;
                    document.body.style.pointerEvents = defaultFilterValue;
                    createLockOverlay();
                } else if (data.status === 'unlocked') {
                    document.body.style.filter = defaultFilterValue;
                    document.body.style.pointerEvents = pointerEventsUnlocked;
                    removeLockOverlay();
                }
            }
        });
    }

    // Initial call to fetch and apply the site's current status.
    updateSiteAppearance();

})();