$dest = "D:\dev\Hobbymoto\public\brands"
New-Item -ItemType Directory -Force -Path $dest | Out-Null

# Query Wikimedia API for real file URLs (handles path hashing correctly)
$files = @(
  @{ file = "Ducati_red_logo.svg";                 out = "$dest\ducati.svg" },
  @{ file = "Indian_Motorcycle_logo.svg";          out = "$dest\indian.svg" },
  @{ file = "Logo_Italjet.svg";                    out = "$dest\italjet.svg" },
  @{ file = "BenelliGlobalPMS485Logo.NoTag.svg";   out = "$dest\benelli.svg" },
  @{ file = "Lambretta_logo_2020.png";             out = "$dest\lambretta.png" }
)

$headers = @{ "User-Agent" = "HobbyMotoWebsite/1.0 (office@hobbymoto.ro)" }

foreach ($f in $files) {
  try {
    $api = "https://commons.wikimedia.org/w/api.php?action=query&titles=File:$($f.file)&prop=imageinfo&iiprop=url&format=json"
    $resp = Invoke-RestMethod -Uri $api -Headers $headers -UseBasicParsing
    $pages = $resp.query.pages.PSObject.Properties.Value
    $url = $pages[0].imageinfo[0].url
    if (-not $url) { Write-Host "NOFILE: $($f.file)"; continue }
    Invoke-WebRequest -Uri $url -Headers $headers -OutFile $f.out -UseBasicParsing
    $size = (Get-Item $f.out).Length
    Write-Host "OK: $($f.out) ($size bytes) from $url"
  } catch {
    Write-Host "FAIL: $($f.file) - $_"
  }
}
Write-Host "DONE"
