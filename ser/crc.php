<?php
function generateCRC32Table() {
    $table = [];
    $polynomial = 0xedb88320;
    for ($i = 0; $i < 256; $i++) {
        $crc = $i;
        for ($j = 8; $j > 0; $j--) {
            $crc = ($crc & 1) ? ($crc >> 1) ^ $polynomial : $crc >> 1;
        }
        $table[$i] = $crc;
    }
    return $table;
}

function calculateCRC32($filePath) {
    $crc = 0xffffffff;
    $chunkSize = 8192; // 8KB
    $table = generateCRC32Table();

    if (!file_exists($filePath)) throw new Exception("File not found: $filePath");
    $handle = fopen($filePath, 'rb') or throw new Exception("Unable to open file: $filePath");

    while (!feof($handle)) {
        $chunk = fread($handle, $chunkSize);
        foreach (str_split($chunk) as $byte) {
            $crc = ($crc >> 8) ^ $table[($crc ^ ord($byte)) & 0xff];
        }
    }

    fclose($handle);
    return sprintf('%08X', ($crc ^ 0xffffffff) & 0xffffffff);
}

function calculateFileCRC32($filePath) {
    $checksum = calculateCRC32($filePath);
    return ['checksum' => $checksum];
}


function readFileContents($filePath) {
    if (!file_exists($filePath)) throw new Exception("File not found: $filePath");
    return file_get_contents($filePath);
}


function extractCRCAndFilenames($filePath) {
    if (!file_exists($filePath)) throw new Exception("File not found: $filePath");
    $fileContent = file_get_contents($filePath);

    // Regex to match CRC values and filenames from the content
    preg_match_all('/^([A-F0-9]{8})\s+(\d+)\s+(.*)$/m', $fileContent, $matches);
 // Add static text to each filename
    $staticText = 'content';
    $filenamesWithStaticText = array_map(function($filename) use ($staticText) {
        return $staticText . $filename;
    }, $matches[3]);

    // Return both CRC values and filenames
    return [
        'crc' => $matches[1],
        'filenames' => $filenamesWithStaticText
    ];
}


?>