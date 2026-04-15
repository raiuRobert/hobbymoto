$env:PATH = "C:\Program Files\nodejs;" + $env:PATH
$base = "https://hobbymoto.ro"
$dest = "D:\dev\Hobbymoto\public"

$images = @(
  @{ url = "$base/images/home.jpg";               out = "$dest/hero-bg.jpg" },
  @{ url = "$base/images/slide-4.jpg";            out = "$dest/slide-4.jpg" },
  @{ url = "$base/images/slide-7.jpg";            out = "$dest/slide-7.jpg" },
  @{ url = "$base/images/slide-60.jpg";           out = "$dest/slide-60.jpg" },
  @{ url = "$base/images/trk702.jpg";             out = "$dest/bikes/trk702.jpg" },
  @{ url = "$base/images/mtsv4.jpg";              out = "$dest/bikes/mtsv4.jpg" },
  @{ url = "$base/images/ducati2.png";            out = "$dest/bikes/ducati2.png" },
  @{ url = "$base/images/page2-img3.jpg";         out = "$dest/about/team-bg.jpg" },
  @{ url = "$base/images/pepe_ducati2.jpg";       out = "$dest/about/team1.jpg" },
  @{ url = "$base/images/toni_ducati2.jpg";       out = "$dest/about/team2.jpg" },
  @{ url = "$base/images/claudia.jpg";            out = "$dest/about/team3.jpg" },
  @{ url = "$base/images/mag.jpeg";               out = "$dest/about/mag1.jpg" },
  @{ url = "$base/images/mag1.jpg";               out = "$dest/about/mag2.jpg" },
  @{ url = "$base/images/mag2.jpeg";              out = "$dest/about/mag3.jpg" },
  @{ url = "$base/images/mag3.jpeg";              out = "$dest/about/mag4.jpg" },
  @{ url = "$base/images/logohotelmoto1.jpg";     out = "$dest/hotel/logo.jpg" },
  @{ url = "$base/images/logohotelmoto.jpg";      out = "$dest/hotel/logo2.jpg" },
  @{ url = "$base/sh/harley/logo.jpg";            out = "$dest/bikes/harley-heritage.jpg" },
  @{ url = "$base/sh/bn125/logo.jpg";             out = "$dest/bikes/benelli-bn125.jpg" },
  @{ url = "$base/sh/k1300s/logo.jpg";            out = "$dest/bikes/bmw-k1300s.jpg" },
  @{ url = "$base/sh/f650gs twin/logo.jpg";       out = "$dest/bikes/bmw-f650gs.jpg" },
  @{ url = "$base/sh/v4 rally/logos.jpg";         out = "$dest/bikes/ducati-v4rally.jpg" },
  @{ url = "$base/sh/scrambler/logoss.jpg";       out = "$dest/bikes/ducati-scrambler.jpg" },
  @{ url = "$base/sh/cbf600sa/logo.jpg";          out = "$dest/bikes/honda-cbf600.jpg" },
  @{ url = "$base/sh/nc700/logo.jpg";             out = "$dest/bikes/honda-nc750.jpg" },
  @{ url = "$base/sh/hayabusa/logo.jpg";          out = "$dest/bikes/suzuki-hayabusa.jpg" },
  @{ url = "$base/sh/f800r/logo.jpg";             out = "$dest/bikes/bmw-f800r.jpg" },
  @{ url = "$base/sh/v4s/logo.jpg";               out = "$dest/bikes/ducati-panigale-v4s.jpg" },
  @{ url = "$base/sh/f800gt/logo.jpg";            out = "$dest/bikes/bmw-f800gt.jpg" }
)

# Create directories
New-Item -ItemType Directory -Force -Path "$dest/bikes" | Out-Null
New-Item -ItemType Directory -Force -Path "$dest/about" | Out-Null
New-Item -ItemType Directory -Force -Path "$dest/hotel" | Out-Null

$client = New-Object System.Net.WebClient
$client.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")

foreach ($img in $images) {
  try {
    $client.DownloadFile($img.url, $img.out)
    Write-Host "OK: $($img.out)"
  } catch {
    Write-Host "FAIL: $($img.url) - $_"
  }
}
Write-Host "DONE"
