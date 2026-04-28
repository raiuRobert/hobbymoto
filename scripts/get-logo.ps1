$client = New-Object System.Net.WebClient
$client.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
$client.DownloadFile("https://hobbymoto.ro/images/logo4.png", "D:\dev\Hobbymoto\public\logo.png")
Write-Host "Downloaded logo4.png"
