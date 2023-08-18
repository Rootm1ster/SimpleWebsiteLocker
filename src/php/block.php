<?php

/**
 * Simple Website Remote Control Utility (PHP).
 * 
 * This script offers a way to lock and unlock a website through password checks.
 * The mechanism works by inputting the password via the dev tools console. 
 * The current lock status is preserved in a JSON file to maintain the site's state. 
 * If the necessary files don't exist, they will be automatically generated upon POST action, 
 * removing the need for any pre-setup.
 *
 * Note: While this solution is apt for sites with moderate traffic, for high-traffic sites, 
 * using a database-driven approach is advisable for robustness.
 * 
 * PHP version: 7.x, 8.x
 *
 * @category    Web
 * @package     WebsiteLocker
 * @author      Eros "rootm1ster" Calderari
 * @license     https://opensource.org/license/mit/  MIT License
 * @version     1.0
 */

/** 
 * @var string $lockPasswordHash Password hash to lock the website. 
 */
$lockPasswordHash = "hash-or-password-of-your-choice-lock";

/** 
 * @var string $unlockPasswordHash Password hash to unlock the website. 
 */
$unlockPasswordHash = "hash-or-password-of-your-choice-unlock";

/** 
 * @var array $response Default response structure. 
 */
$response = ["message" => "error", "status" => "none"];

/** 
 * @var string $metaFile The filename (or path) that stores meta information about the current status file.
 */
$metaFile = 'meta.json';  // If only the name is specified, the file will be saved in the working directory. 
                         // For a specific path, specify it. For example: /srv/lib/meta.json

/** 
 * @var string $statusFilename Represents the filename (or path) of the status file. 
 * It will be determined based on the content of the $metaFile.
 */
$statusFilename = '';  // If left empty, the file will be saved in the working directory. 
                       // For a specific path, specify it. For example: /srv/lib/

/**
 * Check if meta file exists and get the status filename.
 */
if (file_exists($metaFile)) {
    $metaData = json_decode(file_get_contents($metaFile), true);
    $statusFilename = $metaData['current_status_file'];
}

/**
 * Check the status file if it exists and set response accordingly.
 */
if ($statusFilename && file_exists($statusFilename)) {
    $statusData = json_decode(file_get_contents($statusFilename), true);
    if (isset($statusData['status'])) {
        if ($statusData['status'] == 2) {
            $response["message"] = "ok";
            $response["status"] = "locked";
        } elseif ($statusData['status'] == 1) {
            $response["message"] = "ok";
            $response["status"] = "unlocked";
        }
    }
}

/**
 * Handle POST request, create a new status file, and set response based on provided password.
 */
if (isset($_POST["password"])) {
    $newStatusFilename = 'status-' . time() . '.json';

    if ($_POST["password"] === $lockPasswordHash) {
        $response["message"] = "ok";
        $response["status"] = "locked";
        file_put_contents($newStatusFilename, json_encode(['status' => 2]));
    } elseif ($_POST["password"] === $unlockPasswordHash) {
        $response["message"] = "ok";
        $response["status"] = "unlocked";
        file_put_contents($newStatusFilename, json_encode(['status' => 1]));
    }

    // Update the meta file to point to the new status file.
    // Using a new file name ensures cached versions of the website recognize style changes.
    file_put_contents($metaFile, json_encode(['current_status_file' => $newStatusFilename]));


    // Delete the old status file.
    if ($statusFilename) {
        unlink($statusFilename);
    }
}

// Output the response.
echo json_encode($response);

?>