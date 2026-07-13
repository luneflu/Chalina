$files = Get-ChildItem -Path public/galeri -Recurse -File | ForEach-Object { $_.FullName }
$batchSize = 20
$totalFiles = $files.Count
$totalBatches = [math]::Ceiling($totalFiles / $batchSize)

Write-Host "Total files to push: $totalFiles in $totalBatches batches"

for ($i = 0; $i -lt $totalFiles; $i += $batchSize) {
    $endIndex = $i + $batchSize - 1
    if ($endIndex -ge $totalFiles) {
        $endIndex = $totalFiles - 1
    }
    $batch = $files[$i..$endIndex]
    
    $batchNum = [math]::Floor($i / $batchSize) + 1
    Write-Host "Processing batch $batchNum of $totalBatches..."
    
    foreach ($file in $batch) {
        git add $file
    }
    
    git commit -m "feat: add gallery images batch $batchNum of $totalBatches"
    
    Write-Host "Pushing batch $batchNum..."
    git push origin main
    
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to push batch $batchNum. Stopping."
        exit 1
    }
}

Write-Host "All batches pushed successfully!"
