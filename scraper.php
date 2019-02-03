<?php
require 'simple_html_dom.php';

$html = file_get_html('http://www.google.com/');
$title = $html->find('title', 0);
$image = $html->find('img', 0);

echo $title->plaintext."<br>\n";
echo $image->src;
?>