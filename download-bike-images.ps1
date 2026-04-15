$env:PATH = "C:\Program Files\nodejs;" + $env:PATH
$client = New-Object System.Net.WebClient
$client.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")

$base = "https://hobbymoto.ro"

$bikes = @(
  @{ slug = "v4s";          folder = "sh/v4s";              dest = "ducati-panigale-v4s" },
  @{ slug = "v4rally";      folder = "sh/v4 rally";         dest = "ducati-v4rally" },
  @{ slug = "scrambler";    folder = "sh/scrambler";        dest = "ducati-scrambler" },
  @{ slug = "hayabusa";     folder = "sh/hayabusa";         dest = "suzuki-hayabusa" },
  @{ slug = "harley";       folder = "sh/harley";           dest = "harley-heritage" },
  @{ slug = "bn125";        folder = "sh/bn125";            dest = "benelli-bn125" },
  @{ slug = "k1300s";       folder = "sh/k1300s";           dest = "bmw-k1300s" },
  @{ slug = "f650gs";       folder = "sh/f650gs twin";      dest = "bmw-f650gs" },
  @{ slug = "cbf600";       folder = "sh/cbf600sa";         dest = "honda-cbf600" },
  @{ slug = "nc750";        folder = "sh/nc700";            dest = "honda-nc750" },
  @{ slug = "f800r";        folder = "sh/f800r";            dest = "bmw-f800r" }
)

foreach ($bike in $bikes) {
  $dir = "D:\dev\Hobbymoto\public\bikes\gallery\$($bike.dest)"
  New-Item -ItemType Directory -Force -Path $dir | Out-Null

  for ($i = 1; $i -le 8; $i++) {
    $url = "$base/$($bike.folder)/$i.jpg"
    $out = "$dir\$i.jpg"
    try {
      $client.DownloadFile($url, $out)
      Write-Host "OK: $($bike.dest)/$i.jpg"
    } catch {
      # Stop trying more images for this bike if we get a 404
      break
    }
  }
}
Write-Host "DONE"
