<?php
// File path to your resume
$filepath = 'resume.pdf';

// Check if the file exists
if (file_exists($filepath)) {
    // Set headers for download
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="'.basename($filepath).'"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($filepath));
    readfile($filepath); // Output the file
    exit;
} else {
    // File not found
    echo 'File not found.';
}
?>
